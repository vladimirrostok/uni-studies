package profile

import (
	domain_errors "backend/marketplace/domain/errors"
	"backend/marketplace/domain/models"
	"errors"
	"fmt"
	validation "github.com/go-ozzo/ozzo-validation"
	"github.com/go-ozzo/ozzo-validation/is"
	"gorm.io/gorm"
)

// Create a new Model.
func Create(db gorm.DB, pendingProfile PendingProfile) (*ProfileCreatedEvent, error) {
	if err := validation.ValidateStruct(
		&pendingProfile,
		validation.Field(&pendingProfile.ID, validation.Required, is.UUIDv4),
		validation.Field(&pendingProfile.ProfileWalletAddress, validation.Required),
	); err != nil {
		return nil, err
	}

	if err := IsWalletAddressUnique(db, pendingProfile.ProfileWalletAddress); err != nil {
		return nil, err
	}

	newProfile := ActiveProfile{
		Base: models.Base{
			ID:      pendingProfile.ID,
			Version: 1,
		},
		ProfileWalletAddress: pendingProfile.ProfileWalletAddress,
	}

	if err := db.Create(&Model{
		Base: models.Base{
			ID:      newProfile.ID,
			Version: newProfile.Version,
		},
		ProfileWalletAddress: newProfile.ProfileWalletAddress,
		IsActive:             true,
		IsVerified:           false,
	}).Error; err != nil {
		return nil, err
	}

	return &ProfileCreatedEvent{
		ProfileID:     newProfile.ID.String(),
		WalletAddress: newProfile.ProfileWalletAddress,
		Version:       newProfile.Version,
	}, nil
}

func UpdateActiveProfile(db gorm.DB, activeProfile ActiveProfile) (*ProfileUpdatedEvent, error) {
	// Update active profile with only active profile passed, enforce domain constraint.
	existingActiveProfile, err := GetActiveByWalletAddress(db, activeProfile.ProfileWalletAddress, nil)
	if err != nil {
		return nil, err
	}

	//// Update required data
	// Update version to +1
	existingActiveProfile.Version++

	// If no new picture passed, keep old pictures.
	if activeProfile.ProfileBanner == "" {
		activeProfile.ProfileBanner = existingActiveProfile.ProfileBanner
	}

	if activeProfile.ProfileImage == "" {
		activeProfile.ProfileImage = existingActiveProfile.ProfileImage
	}

	// Update attributes with `struct`, will only update non-zero fields.
	// Update attributes with `map` instead.
	// https://gorm.io/docs/update.html#Updates-multiple-columns
	result := db.Model(&Model{}).
		Where("profile_wallet_address = ?",
			existingActiveProfile.ProfileWalletAddress,
		).Updates(map[string]interface{}{
		"profile_name":      activeProfile.ProfileName,
		"profile_bio":       activeProfile.ProfileBio,
		"profile_banner":    activeProfile.ProfileBanner,
		"profile_image":     activeProfile.ProfileImage,
		"profile_website":   activeProfile.ProfileWebsite,
		"profile_twitter":   activeProfile.ProfileTwitter,
		"profile_discord":   activeProfile.ProfileDiscord,
		"profile_telegram":  activeProfile.ProfileTelegram,
		"profile_facebook":  activeProfile.ProfileFacebook,
		"profile_instagram": activeProfile.ProfileInstagram,
		"version":           existingActiveProfile.Version + 1,
	})
	if result.Error != nil {
		return nil, fmt.Errorf("error updating profile: %w", result.Error)
	} else if result.RowsAffected != 1 {
		// In case if version has changed in process of updating it.
		return nil, fmt.Errorf("state conflict: %w", domain_errors.StateConflict{})
	}

	return &ProfileUpdatedEvent{
		ProfileID:     existingActiveProfile.ID.String(),
		WalletAddress: existingActiveProfile.ProfileWalletAddress,
		Version:       existingActiveProfile.Version,
	}, nil
}

func IsWalletAddressUnique(db gorm.DB, walletAddress string) error {
	var profile Model

	if err := db.Model(&profile).Where(
		"profile_wallet_address = ?",
		walletAddress,
	).First(&profile).Error; err != nil {
		if errors.As(err, &gorm.ErrRecordNotFound) {
			return nil
		}
		return fmt.Errorf("error checking wallet address uniqueness :%w ", err)
	}

	return AlreadyExists{}
}
