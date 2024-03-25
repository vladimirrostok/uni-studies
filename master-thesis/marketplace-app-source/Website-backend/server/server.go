package server

import (
	"backend/marketplace/cmd/config"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
	"io"
	"net/http"
)

// HTTPClient interface to mock the network requests for test purposes.
type HTTPClient interface {
	Do(req *http.Request) (*http.Response, error)
	Post(url, contentType string, body io.Reader) (*http.Response, error)
}

// Server is a wrapper for the service context.
type Server struct {
	DB            *gorm.DB
	S3Client      *s3.S3
	Router        *mux.Router
	Addr          string
	Configuration config.Config
}
