package main

import (
	"backend/marketplace/cmd/config"
	"backend/marketplace/routes"
	"backend/marketplace/server"
	"backend/marketplace/storage"
	"backend/marketplace/utils"
	"context"
	"crypto/tls"
	validation "github.com/go-ozzo/ozzo-validation"
	"github.com/spf13/viper"
	"net"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gorilla/mux"
	"go.uber.org/zap"
)

var cfg config.Config

const exitCodeSuccess = 0
const exitCodeError = 1

// initLogger initializes the zap logger with reasonable defaults and replaces the global logger.
func initLogger() error {
	logger, _ := zap.NewProduction()
	defer logger.Sync() // flushes buffer, if any

	// Then replace the globals.
	zap.ReplaceGlobals(logger)

	zap.S().Infof("Replaced zap's global loggers with %s", "Sugared logger")

	return nil
}

func loadConfigurationFromENV() error {
	// Set the file name of the configurations file
	viper.SetConfigName("configuration")

	// Set the path to look for the configurations file
	viper.AddConfigPath("./cmd/config")

	viper.SetConfigType("env")

	// To read values from environment variables. So we call viper.AutomaticEnv() to tell viper to automatically
	// override values that it has read from config file with the values of the corresponding
	// environment variables if they exist.
	viper.AutomaticEnv()

	err := viper.ReadInConfig()
	if err != nil {
		return err
	}

	err = viper.Unmarshal(&cfg)
	if err != nil {
		return err
	}

	cfg.DBHost = viper.Get("EW_MARKETPLACE_BACKEND_DB_HOST").(string)
	cfg.DBUsername = viper.Get("EW_MARKETPLACE_BACKEND_DB_USERNAME").(string)
	cfg.DBPassword = viper.Get("EW_MARKETPLACE_BACKEND_DB_PASSWORD").(string)
	cfg.DBName = viper.Get("EW_MARKETPLACE_BACKEND_DB_NAME").(string)
	cfg.DBPort = viper.Get("EW_MARKETPLACE_BACKEND_DB_PORT").(string)
	cfg.DBSSLRequired = viper.Get("EW_MARKETPLACE_BACKEND_DB_SSL_REQUIRED").(string)
	cfg.BackendAPIAddress = viper.Get("EW_MARKETPLACE_BACKEND_BACKEND_API_ADDRESS").(string)

	cfg.SpaceEndpoint = viper.Get("EW_MARKETPLACE_BACKEND_SPACE_ENDPOINT").(string)
	cfg.SpaceRegion = viper.Get("EW_MARKETPLACE_BACKEND_DO_SPACE_REGION").(string)
	cfg.SpaceName = viper.Get("EW_MARKETPLACE_BACKEND_DO_SPACE_NAME").(string)
	cfg.SpaceAccessKey = viper.Get("EW_MARKETPLACE_BACKEND_DO_SPACE_ACCESS_KEY").(string)
	cfg.SpaceSecretKey = viper.Get("EW_MARKETPLACE_BACKEND_DO_SPACE_SECRET_KEY").(string)

	err = validation.ValidateStruct(&cfg,
		validation.Field(&cfg.DBHost, validation.Required),
		validation.Field(&cfg.DBUsername, validation.Required),
		validation.Field(&cfg.DBPassword, validation.Required),
		validation.Field(&cfg.DBName, validation.Required),
		validation.Field(&cfg.DBPort, validation.Required),
		validation.Field(&cfg.DBSSLRequired, validation.Required),
		validation.Field(&cfg.BackendAPIAddress, validation.Required),

		validation.Field(&cfg.SpaceEndpoint, validation.Required),
		validation.Field(&cfg.SpaceRegion, validation.Required),
		validation.Field(&cfg.SpaceName, validation.Required),
		validation.Field(&cfg.SpaceAccessKey, validation.Required),
		validation.Field(&cfg.SpaceSecretKey, validation.Required),
	)
	if err != nil {
		return err
	}

	return nil
}

// Initialize database connection and HTTP router.
func initializeServer(server *server.Server, cfg config.Config) error {
	var err error

	server.DB, err = utils.GetDBConnection(cfg.DBUsername, cfg.DBPassword, cfg.DBPort, cfg.DBHost, cfg.DBName, cfg.DBSSLRequired)
	if err != nil {
		return err
	}

	server.S3Client, err = storage.InitializeS3Session(cfg.SpaceAccessKey, cfg.SpaceSecretKey, cfg.SpaceEndpoint, cfg.SpaceRegion)
	if err != nil {
		return err
	}

	server.Router = mux.NewRouter()
	routes.InitializeRoutes(server)

	// Keep config in server to pass down Space settings succinctly (non-verbose).
	server.Configuration = cfg

	return nil
}

func main() {
	// Global logging synchronizer.
	// This ensures the logged data is flushed out of the buffer before program exits.
	defer zap.S().Sync()

	err := initLogger()
	if err != nil {
		zap.S().Fatal(err)
	}

	err = loadConfigurationFromENV()
	if err != nil {
		zap.S().Fatal(err)
	}

	srv := server.Server{}
	srv.Addr = cfg.BackendAPIAddress

	err = initializeServer(&srv, cfg)
	if err != nil {
		zap.S().Fatal(err)
	}

	// Disable cert verification to use self-signed certificates for internal service needs.
	http.DefaultTransport.(*http.Transport).TLSClientConfig = &tls.Config{InsecureSkipVerify: true}

	zap.S().Info("Configuration loaded successfully")

	if signalled := runWithSignalHandling(&srv); signalled {
		zap.S().Info("Stopping due to signal")
		os.Exit(exitCodeSuccess)
	}

	os.Exit(exitCodeError)
}

func runWithSignalHandling(srv *server.Server) bool {
	// Listen to the OS termination signals.
	ctx, stop := signal.NotifyContext(context.Background(),
		syscall.SIGINT,
		syscall.SIGKILL,
		syscall.SIGHUP,
		syscall.SIGQUIT,
		syscall.SIGTERM,
		syscall.SIGPIPE,
	)

	// Close connection when program exits.
	defer func() {
		sqlDB, err := srv.DB.DB()
		if err != nil {
			zap.S().Errorf("Can't get DB connection: %v", err)
		}

		sqlDB.Close()
		// Send Done signal to context and exit the function.
		stop()
	}()

	// Run until error returns or signal notified.
	if err := run(ctx, srv, stop); err != nil {
		zap.S().Error(err)
	}

	// Exit when ctx.Err() is called down the stack.
	return ctx.Err() != nil
}

func run(ctx context.Context, srv *server.Server, cancel func()) error {
	httpSrv := &http.Server{
		Addr:        srv.Addr,
		Handler:     srv.Router,
		BaseContext: func(_ net.Listener) context.Context { return ctx },
	}
	httpSrv.RegisterOnShutdown(cancel)

	// Provide channel without buffer (0) for errors from the API goroutines.
	errors := make(chan error, 0)

	// Start the API without TLS/SSL.
	// Certificates are auto-handled by Cloud, Digital Ocean (Apps platform).
	go func() {
		zap.S().Infof("Server starting on %s", srv.Addr)

		if err := httpSrv.ListenAndServe(); err != nil {
			errors <- err
			return
		}
	}()

	// Block till err/termination chan comes in.
	select {
	case err := <-errors:
		return err
	case <-ctx.Done():
		zap.S().Info("os.Interrupt - shutting down...")
	}

	// Gracefully shutdown the server when error/exit happens.
	gracefulCtx, cancelShutdown := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancelShutdown()

	if err := httpSrv.Shutdown(gracefulCtx); err != nil {
		return err
	}

	zap.S().Info("gracefully stopped")

	// Send empty err signal to notify the signal listener to shut down the application.
	return ctx.Err()
}
