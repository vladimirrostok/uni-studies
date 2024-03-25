package profile_controller

type ProfileSettingsRequest struct {
	ProfileWalletAddress string `json:"profile_wallet_address"`
	ProfileName          string `json:"profile_name"`
	ProfileBio           string `json:"profile_bio"`
	ProfileBanner        string `json:"profile_banner_file"`
	ProfileImage         string `json:"profile_image_file"`
	ProfileWebsite       string `json:"profile_website"`
	ProfileTwitter       string `json:"profile_twitter"`
	ProfileDiscord       string `json:"profile_discord"`
	ProfileTelegram      string `json:"profile_telegram"`
	ProfileFacebook      string `json:"profile_facebook"`
	ProfileInstagram     string `json:"profile_instagram"`
	CreatedAt            string `json:"created_at"`
}

type AuthRequest struct {
	ProfileWalletAddress string `json:"profile_wallet_address"`
}

type AuthResponse struct {
	ProfileName      string `json:"profile_name"`
	ProfileImageFile string `json:"profile_image_file"`
}

type FetchProfileRequest struct {
	ProfileWalletAddress string `json:"profile_wallet_address"`
}
