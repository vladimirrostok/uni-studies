package collection

import (
	"backend/marketplace/domain/models/profile"
	"errors"
	"fmt"

	"gorm.io/gorm"
)

//// GetActive fetches an active collection.
//func GetActive(db gorm.DB, pk uuid.UUID, version *uint32) (*ActiveCollection, error) {
//	var collection Model
//
//	err := db.Model(&collection).Where("id = ?", pk).First(&collection).Error
//	if errors.Is(err, gorm.ErrRecordNotFound) {
//		return nil, fmt.Errorf("collection not found: %w", NotFound{})
//	} else if !collection.IsActive {
//		return nil, fmt.Errorf("invariant failed: %w", IsInactive{})
//	} else if version != nil && collection.Version != *version {
//		return nil, fmt.Errorf("invalid version tag: %w", domain_errors.InvalidVersion{})
//	} else if err != nil {
//		return nil, fmt.Errorf("error loading active collection: %w", err)
//	}
//
//	return &ActiveCollection{
//		Base: models.Base{
//			ID:      collection.ID,
//			Version: collection.Version,
//		},
//		CollectionName: collection.CollectionName,
//	}, nil
//}

// GetAllByWalletAddress fetches all collections for wallet address.
func GetAllByWalletAddress(db gorm.DB, walletAddress string) (*[]Collection, error) {
	var collections []Collection

	profileFound, err := profile.GetByWalletAddress(db, walletAddress, nil)
	if err != nil {
		return nil, err
	}

	err = db.Find(&collections, "profile_id = ?", profileFound.ID).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, fmt.Errorf("collections were not found: %w", NotFound{})
	} else if err != nil {
		return nil, fmt.Errorf("error loading collections for profile: %w", err)
	}

	//for _, collection := range collections {
	//	//if !collection.IsActive {
	//	//	return nil, fmt.Errorf("invariant failed: %w", IsInactive{})
	//	//} else if version != nil && collection.Version != *version {
	//	//	return nil, fmt.Errorf("invalid version tag: %w", domain_errors.InvalidVersion{})
	//	//} else if err != nil {
	//}

	return &collections, nil
}
