package utils

import (
	"backend/marketplace/domain/models/collection"
	"backend/marketplace/domain/models/profile"
	"fmt"

	"go.uber.org/zap"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// GetDBConnection with the given configuration details.
func GetDBConnection(username, password, port, host, database, sslRequired string) (*gorm.DB, error) {
	var err error
	dsn := fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=%s password=%s", host, port, username, database, sslRequired, password)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	zap.S().Infof("Connected to the database")

	// Database migration
	db.AutoMigrate(
		&collection.Model{},
		&profile.Model{},
	)

	return db, nil
}
