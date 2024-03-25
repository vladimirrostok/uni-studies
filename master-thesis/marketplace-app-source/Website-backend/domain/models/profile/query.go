package profile

import (
	"backend/marketplace/domain/models"
	"errors"
	"fmt"

	domain_errors "backend/marketplace/domain/errors"

	"gorm.io/gorm"
)

// GetActiveByWalletAddress fetches an active profile with address specified.
func GetActiveByWalletAddress(db gorm.DB, walletAddress string, version *uint32) (*ActiveProfile, error) {
	var profile Model

	err := db.Model(&profile).Where("profile_wallet_address = ?", walletAddress).First(&profile).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, fmt.Errorf("profile not found: %w", NotFound{})
	} else if !profile.IsActive {
		return nil, fmt.Errorf("invariant failed: %w", IsInactive{})
	} else if version != nil && profile.Version != *version {
		return nil, fmt.Errorf("invalid version tag: %w", domain_errors.InvalidVersion{})
	} else if err != nil {
		return nil, fmt.Errorf("error loading active profile: %w", err)
	}

	return &ActiveProfile{
		Base: models.Base{
			ID:        profile.ID,
			CreatedAt: profile.CreatedAt,
			Version:   profile.Version,
		},
		ProfileWalletAddress: profile.ProfileWalletAddress,
		ProfileName:          profile.ProfileName,
		ProfileBio:           profile.ProfileBio,
		ProfileBanner:        profile.ProfileBanner,
		ProfileImage:         profile.ProfileImage,
		ProfileWebsite:       profile.ProfileWebsite,
		ProfileTwitter:       profile.ProfileTwitter,
		ProfileDiscord:       profile.ProfileDiscord,
		ProfileTelegram:      profile.ProfileTelegram,
		ProfileFacebook:      profile.ProfileFacebook,
		ProfileInstagram:     profile.ProfileInstagram,
	}, nil
}

// GetByWalletAddress fetches an profile with address specified.
func GetByWalletAddress(db gorm.DB, walletAddress string, version *uint32) (*Model, error) {
	var profile Model

	err := db.Model(&profile).Where("profile_wallet_address = ?", walletAddress).First(&profile).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, fmt.Errorf("profile not found: %w", NotFound{})
	} else if version != nil && profile.Version != *version {
		return nil, fmt.Errorf("invalid version tag: %w", domain_errors.InvalidVersion{})
	} else if err != nil {
		return nil, fmt.Errorf("error loading active profile: %w", err)
	}

	return &Model{
		Base: models.Base{
			ID:        profile.ID,
			CreatedAt: profile.CreatedAt,
			Version:   profile.Version,
		},
		ProfileWalletAddress: profile.ProfileWalletAddress,
		ProfileName:          profile.ProfileName,
		ProfileBio:           profile.ProfileBio,
		ProfileBanner:        profile.ProfileBanner,
		ProfileImage:         profile.ProfileImage,
		ProfileWebsite:       profile.ProfileWebsite,
		ProfileTwitter:       profile.ProfileTwitter,
		ProfileDiscord:       profile.ProfileDiscord,
		ProfileTelegram:      profile.ProfileTelegram,
		ProfileFacebook:      profile.ProfileFacebook,
		ProfileInstagram:     profile.ProfileInstagram,
	}, nil
}
