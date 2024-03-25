package storage

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"go.uber.org/zap"
)

func InitializeS3Session(accessKey, secretKey, endpoint, region string) (*s3.S3, error) {
	s3Config := &aws.Config{
		Credentials: credentials.NewStaticCredentials(accessKey, secretKey, ""),
		Endpoint:    aws.String(endpoint),
		Region:      aws.String(region),
	}

	newSession, err := session.NewSession(s3Config)
	if err != nil {
		return nil, err
	}

	client := s3.New(newSession)
	zap.S().Infof("Connected to the DigitalOcean space")

	return client, nil
}
