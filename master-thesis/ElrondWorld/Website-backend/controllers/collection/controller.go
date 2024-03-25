package collection_controller

import (
	"backend/marketplace/domain/models"
	"backend/marketplace/domain/models/collection"
	"backend/marketplace/responses"
	"backend/marketplace/server"
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/google/uuid"

	validation "github.com/go-ozzo/ozzo-validation"
)

// AddCollectionForWalletAddressProfile handles the new collection request for specified wallet address.
func AddCollectionForWalletAddressProfile(server *server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			responses.ERROR(w, http.StatusUnprocessableEntity, err)
			return
		}

		req := NewCollectionRequest{}
		err = json.Unmarshal(body, &req)
		if err != nil {
			responses.ERROR(w, http.StatusUnprocessableEntity, err)
			return
		}

		err = validation.ValidateStruct(&req,
			validation.Field(&req.ProfileWalletAddress, validation.Required),
			validation.Field(&req.CollectionName, validation.Required),
			validation.Field(&req.Collection, validation.Required),

			// Skip boolean checks for required (works for TRUE only).
			validation.Field(&req.IsNFT),
			validation.Field(&req.IsSFT),
			validation.Field(&req.IsFreezable),
			validation.Field(&req.IsWipeable),
			validation.Field(&req.IsPauseable),
			validation.Field(&req.IsTransferableCreateRole),
		)
		if err != nil {
			responses.ERROR(w, http.StatusUnprocessableEntity, err)
			return
		}

		pendingCollection := collection.PendingCollection{
			Base: models.Base{
				ID: uuid.New(),
			},
			CollectionName:           req.CollectionName,
			Collection:               req.Collection,
			IsNFT:                    req.IsNFT,
			IsSFT:                    req.IsSFT,
			IsFreezable:              req.IsFreezable,
			IsWipeable:               req.IsWipeable,
			IsPauseable:              req.IsWipeable,
			IsTransferableCreateRole: req.IsTransferableCreateRole,
		}

		collectionCreatedEvent, err := collection.CreateForWalletAddress(*server.DB, pendingCollection, req.ProfileWalletAddress)
		if err != nil {
			responses.ERROR(w, http.StatusInternalServerError, err)
			return
		}

		responses.JSON(w, http.StatusOK, CreatedResponse{ID: collectionCreatedEvent.CollectionID})
	}
}

// FetchCollectionsForProfile handles the get profile collections request.
func FetchCollectionsForProfile(server *server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		url := r.URL
		addr := url.Query().Get("profile_wallet_address")
		err := validation.Validate(addr,
			validation.Required,
			validation.Length(62, 62),
		)
		if err != nil {
			responses.ERROR(w, http.StatusUnprocessableEntity, err)
			return
		}

		collectionsFetched, err := collection.GetAllByWalletAddress(*server.DB, addr)
		if err != nil {
			responses.ERROR(w, http.StatusUnprocessableEntity, err)
			return
		}

		responses.JSON(w, http.StatusOK, GetCollectionsForProfileResponse{
			Collections: *collectionsFetched,
		})
	}
}
