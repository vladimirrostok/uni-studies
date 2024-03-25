package collection

import (
	"backend/marketplace/domain/models"
	"backend/marketplace/domain/models/profile"
	"github.com/google/uuid"
)

//TODO- Gorm dirty hack, TableName overrides the table name used to `collections`.
func (Model) TableName() string {
	return "collections"
}

// Model represents a persistence model for the collection entity.
type Model struct {
	models.Base
	ProfileID                uuid.UUID
	Profile                  profile.Model
	CollectionName           string `gorm:"not null" json:"collection_name"`
	Collection               string `gorm:"not null" json:"collection"`
	IsNFT                    bool   `gorm:"not null" json:"is_NFT"`
	IsSFT                    bool   `gorm:"not null" json:"is_SFT"`
	IsFreezable              bool   `gorm:"not null" json:"is_freezable"`
	IsWipeable               bool   `gorm:"not null" json:"is_wipeable"`
	IsPauseable              bool   `gorm:"not null" json:"is_pauseable"`
	IsTransferableCreateRole bool   `gorm:"not null" json:"is_transferable_create_role"`

	IsActive   bool `gorm:"not null" json:"is_active"`
	IsVerified bool `gorm:"not null" json:"is_verified"`
}

// PendingCollection represents a collection about to be created.
type PendingCollection struct {
	models.Base
	CollectionName           string `json:"collection_name"`
	Collection               string `json:"collection"`
	IsNFT                    bool   `json:"is_NFT"`
	IsSFT                    bool   `json:"is_SFT"`
	IsFreezable              bool   `json:"is_freezable"`
	IsWipeable               bool   `json:"is_wipeable"`
	IsPauseable              bool   `json:"is_pauseable"`
	IsTransferableCreateRole bool   `json:"is_transferable_create_role"`
}

//// ActiveCollection represents an active collection in the system.
//type ActiveCollection struct {
//	models.Base
//	CollectionName string `json:"name"`
//}

// Collection represents a collection in the system.
type Collection struct {
	models.Base
	CollectionName           string `json:"collection_name"`
	Collection               string `json:"collection"`
	IsNFT                    bool   `json:"is_NFT"`
	IsSFT                    bool   `json:"is_SFT"`
	IsFreezable              bool   `json:"is_freezable"`
	IsWipeable               bool   `json:"is_wipeable"`
	IsPauseable              bool   `json:"is_pauseable"`
	IsTransferableCreateRole bool   `json:"is_transferable_create_role"`
}
