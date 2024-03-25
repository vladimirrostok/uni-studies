package collection

import (
	"backend/marketplace/domain/models"
	"backend/marketplace/domain/models/profile"
	"errors"

	validation "github.com/go-ozzo/ozzo-validation"
	"github.com/go-ozzo/ozzo-validation/is"
	"gorm.io/gorm"
)

// Create a new collection.
func CreateForWalletAddress(db gorm.DB, pendingCollection PendingCollection, walletAddress string) (*CollectionCreatedEvent, error) {
	if err := validation.ValidateStruct(
		&pendingCollection,
		validation.Field(&pendingCollection.ID, validation.Required, is.UUIDv4),
		validation.Field(&pendingCollection.CollectionName, validation.Required),
		validation.Field(&pendingCollection.Collection, validation.Required),

		// Skip boolean checks for required (works for TRUE only).
		validation.Field(&pendingCollection.IsNFT),
		validation.Field(&pendingCollection.IsSFT),
		validation.Field(&pendingCollection.IsFreezable),
		validation.Field(&pendingCollection.IsWipeable),
		validation.Field(&pendingCollection.IsPauseable),
		validation.Field(&pendingCollection.IsTransferableCreateRole),
	); err != nil {
		return nil, err
	}

	if pendingCollection.IsNFT && pendingCollection.IsSFT {
		return nil, errors.New("cannot be both NFT and SFT simultaneously")
	}

	if !pendingCollection.IsNFT && !pendingCollection.IsSFT {
		return nil, errors.New("cannot be both not NFT and SFT simultaneously")
	}

	if err := validation.Validate(
		&walletAddress, validation.Required,
	); err != nil {
		return nil, err
	}

	exists, err := isNameUnique(db, pendingCollection.CollectionName)
	if err != nil {
		return nil, err
	} else if exists != true {
		return nil, AlreadyExists{}
	}

	newCollection := Model{
		Base: models.Base{
			ID:      pendingCollection.ID,
			Version: 1,
		},
		CollectionName:           pendingCollection.CollectionName,
		Collection:               pendingCollection.Collection,
		IsNFT:                    pendingCollection.IsNFT,
		IsSFT:                    pendingCollection.IsSFT,
		IsFreezable:              pendingCollection.IsFreezable,
		IsWipeable:               pendingCollection.IsWipeable,
		IsPauseable:              pendingCollection.IsPauseable,
		IsTransferableCreateRole: pendingCollection.IsTransferableCreateRole,
	}

	profileFound, err := profile.GetByWalletAddress(db, walletAddress, nil)
	if err != nil {
		return nil, err
	}

	if err := db.Create(&Model{
		Base: models.Base{
			ID:      newCollection.ID,
			Version: newCollection.Version,
		},
		ProfileID: profileFound.ID,

		CollectionName:           newCollection.CollectionName,
		Collection:               newCollection.Collection,
		IsNFT:                    newCollection.IsNFT,
		IsSFT:                    newCollection.IsSFT,
		IsFreezable:              newCollection.IsFreezable,
		IsWipeable:               newCollection.IsWipeable,
		IsPauseable:              newCollection.IsPauseable,
		IsTransferableCreateRole: newCollection.IsTransferableCreateRole,
	}).Error; err != nil {
		return nil, err
	}

	return &CollectionCreatedEvent{
		CollectionID: newCollection.ID.String(),
		Name:         newCollection.CollectionName,
		Version:      newCollection.Version,
	}, nil
}

func isNameUnique(db gorm.DB, name string) (bool, error) {
	var collection Model

	if err := db.Model(&collection).Where(
		"name = ?",
		name,
	).First(&collection).Error; err != nil {
		if errors.As(err, &gorm.ErrRecordNotFound) {
			return true, nil
		}
		return false, err
	}

	return false, nil
}
