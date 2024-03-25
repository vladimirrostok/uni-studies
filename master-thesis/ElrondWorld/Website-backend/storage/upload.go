package storage

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/s3"
	"strings"
)

func PutNewProfileImage(s3Client *s3.S3, space, walletAddress, fileName, contents string) (string, error) {
	object := s3.PutObjectInput{
		Bucket: aws.String(space),
		Key:    aws.String("profile_pictures/" + fileName),
		Body:   strings.NewReader(contents),
		ACL:    aws.String("public-read"),
		Metadata: map[string]*string{
			"wallet-address": aws.String(walletAddress),
		},
	}

	_, err := s3Client.PutObject(&object)
	if err != nil {
		return "", err
	}

	assetURL := "https://" + space + ".fra1.digitaloceanspaces.com/profile_pictures/" + fileName

	return assetURL, nil
}

func PutNewProfileBanner(s3Client *s3.S3, space, walletAddress, fileName, contents string) (string, error) {
	object := s3.PutObjectInput{
		Bucket: aws.String(space),
		Key:    aws.String("profile_banners/" + fileName),
		Body:   strings.NewReader(contents),
		ACL:    aws.String("public-read"),
		Metadata: map[string]*string{
			"wallet-address": aws.String(walletAddress),
		},
	}

	_, err := s3Client.PutObject(&object)
	if err != nil {
		return "", err
	}

	assetURL := "https://" + space + ".fra1.digitaloceanspaces.com/profile_banners/" + fileName

	return assetURL, nil
}
