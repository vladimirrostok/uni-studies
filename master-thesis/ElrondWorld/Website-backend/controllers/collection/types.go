package collection_controller

import "backend/marketplace/domain/models/collection"

type NewCollectionRequest struct {
	ProfileWalletAddress     string `json:"profile_wallet_address"`
	CollectionName           string `json:"collection_name"`
	Collection               string `json:"collection"`
	IsNFT                    bool   `json:"is_NFT"`
	IsSFT                    bool   `json:"is_SFT"`
	IsFreezable              bool   `json:"is_freezable"`
	IsWipeable               bool   `json:"is_wipeable"`
	IsPauseable              bool   `json:"is_pauseable"`
	IsTransferableCreateRole bool   `json:"is_transferable_create_role"`
}

type GetCollectionsForProfileResponse struct {
	Collections []collection.Collection `json:"collections"`
}

type CreatedResponse struct {
	ID string `json:"id"`
}
