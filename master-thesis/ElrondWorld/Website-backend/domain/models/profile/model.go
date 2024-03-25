package profile

import (
	"backend/marketplace/domain/models"
)

//TODO- Gorm dirty hack, TableName overrides the table name used to `profiles`.
func (Model) TableName() string {
	return "profiles"
}

// Model represents a persistence model for the profile entity.
type Model struct {
	models.Base
	ProfileWalletAddress string `gorm:"not null" json:"profile_wallet_address"`

	ProfileName      string `json:"profile_name"`
	ProfileBio       string `json:"profile_bio"`
	ProfileBanner    string `json:"profile_banner"`
	ProfileImage     string `json:"profile_image"`
	ProfileWebsite   string `json:"profile_website"`
	ProfileTwitter   string `json:"profile_twitter"`
	ProfileDiscord   string `json:"profile_discord"`
	ProfileTelegram  string `json:"profile_telegram"`
	ProfileFacebook  string `json:"profile_facebook"`
	ProfileInstagram string `json:"profile_instagram"`

	IsActive   bool `gorm:"not null" json:"is_active"`
	IsVerified bool `gorm:"not null" json:"is_verified"`
}

// PendingProfile represents a profile about to be created.
type PendingProfile struct {
	models.Base
	ProfileWalletAddress string `json:"profile_wallet_address"`
}

// ActiveProfile represents an active profile in the system.
type ActiveProfile struct {
	models.Base
	ProfileWalletAddress string `json:"profile_wallet_address"`
	ProfileName          string `json:"profile_name"`
	ProfileBio           string `json:"profile_bio"`
	ProfileBanner        string `json:"profile_banner"`
	ProfileImage         string `json:"profile_image"`
	ProfileWebsite       string `json:"profile_website"`
	ProfileTwitter       string `json:"profile_twitter"`
	ProfileDiscord       string `json:"profile_discord"`
	ProfileTelegram      string `json:"profile_telegram"`
	ProfileFacebook      string `json:"profile_facebook"`
	ProfileInstagram     string `json:"profile_instagram"`
}
