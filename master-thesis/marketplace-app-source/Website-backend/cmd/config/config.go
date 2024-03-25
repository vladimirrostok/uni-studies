package config

// Config declares connection details.
type Config struct {
	DBHost        string `mapstructure:"EW_MARKETPLACE_BACKEND_DB_HOST"`
	DBUsername    string `mapstructure:"EW_MARKETPLACE_BACKEND_DB_USERNAME"`
	DBPassword    string `mapstructure:"EW_MARKETPLACE_BACKEND_DB_PASSWORD"`
	DBName        string `mapstructure:"EW_MARKETPLACE_BACKEND_DB_NAME"`
	DBPort        string `mapstructure:"EW_MARKETPLACE_BACKEND_DB_PORT"`
	DBSSLRequired string `mapstructure:"EW_MARKETPLACE_BACKEND_DB_SSL_REQUIRED"`

	BackendAPIAddress string `mapstructure:"EW_MARKETPLACE_BACKEND_BACKEND_API_ADDRESS"`

	SpaceEndpoint  string `mapstructure:"EW_MARKETPLACE_BACKEND_SPACE_ENDPOINT"`
	SpaceRegion    string `mapstructure:"EW_MARKETPLACE_BACKEND_DO_SPACE_REGION"`
	SpaceName      string `mapstructure:"EW_MARKETPLACE_BACKEND_DO_SPACE_NAME"`
	SpaceAccessKey string `mapstructure:"EW_MARKETPLACE_BACKEND_DO_SPACE_ACCESS_KEY"`
	SpaceSecretKey string `mapstructure:"EW_MARKETPLACE_BACKEND_DO_SPACE_SECRET_KEY"`
}
