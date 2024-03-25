package profile_controller

import (
	"backend/marketplace/domain/models"
	"backend/marketplace/domain/models/profile"
	"backend/marketplace/responses"
	"backend/marketplace/server"
	"backend/marketplace/storage"
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	validation "github.com/go-ozzo/ozzo-validation"
	"github.com/google/uuid"
	"io"
	"io/ioutil"
	"net/http"
	"strings"
)

// Authenticate handles the auth request and creates new user if there is no user exist.
// Use fetched wallet's details to quietly add a new profile entity and pass user in.
func Authenticate(server *server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			responses.ERROR(w, http.StatusUnprocessableEntity, err)
			return
		}

		req := AuthRequest{}
		err = json.Unmarshal(body, &req)
		if err != nil {
			responses.ERROR(w, http.StatusUnprocessableEntity, err)
			return
		}

		err = validation.ValidateStruct(&req,
			validation.Field(&req.ProfileWalletAddress, validation.Required),
		)
		if err != nil {
			responses.ERROR(w, http.StatusUnprocessableEntity, err)
			return
		}

		pendingProfile := profile.PendingProfile{
			Base: models.Base{
				ID: uuid.New(),
			},
			ProfileWalletAddress: req.ProfileWalletAddress,
		}

		// If user already exists, skip registration process.
		// Return user profile details instead.
		profileFound, err := profile.GetByWalletAddress(*server.DB, pendingProfile.ProfileWalletAddress, nil)
		if err != nil && !errors.Is(err, profile.NotFound{}) {
			responses.JSON(w, http.StatusOK, "")
			return
		} else if profileFound != nil {
			responses.JSON(w, http.StatusOK, AuthResponse{
				ProfileImageFile: profileFound.ProfileImage,
				ProfileName:      profileFound.ProfileName,
			})
			return
		}

		// If user does not exist, create user.
		_, err = profile.Create(*server.DB, pendingProfile)
		if err != nil {
			responses.ERROR(w, http.StatusInternalServerError, err)
			return
		}

		// User does not have profile image, return nothing.
		responses.JSON(w, http.StatusOK, AuthResponse{
			ProfileImageFile: "",
			ProfileName:      "",
		})
	}
}

// FetchProfile handles the get profile settings request..
func FetchProfile(server *server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		url := r.URL
		addr := url.Query().Get("profile_wallet_address")
		err := validation.Validate(addr,
			validation.Required, // not empty
			validation.Length(62, 62),
		)
		if err != nil {
			responses.ERROR(w, http.StatusUnprocessableEntity, err)
			return
		}

		profileFetched, err := profile.GetActiveByWalletAddress(*server.DB, addr, nil)
		if err != nil {
			responses.ERROR(w, http.StatusUnprocessableEntity, err)
			return
		}

		year, month, _ := profileFetched.CreatedAt.Date()

		joinedDate := fmt.Sprintf("%v %v", month, year)

		responses.JSON(w, http.StatusOK, ProfileSettingsRequest{
			ProfileWalletAddress: profileFetched.ProfileWalletAddress,
			ProfileName:          profileFetched.ProfileName,
			ProfileBio:           profileFetched.ProfileBio,
			ProfileBanner:        profileFetched.ProfileBanner,
			ProfileImage:         profileFetched.ProfileImage,
			ProfileWebsite:       profileFetched.ProfileWebsite,
			ProfileTwitter:       profileFetched.ProfileTwitter,
			ProfileDiscord:       profileFetched.ProfileDiscord,
			ProfileTelegram:      profileFetched.ProfileTelegram,
			ProfileFacebook:      profileFetched.ProfileFacebook,
			ProfileInstagram:     profileFetched.ProfileInstagram,
			CreatedAt:            joinedDate,
		})
	}
}

// Handle form-data values passed from front-end.
// Form-data is a better format to send files, so it's used in front-end.
// Read more: https://medium.com/@edwardpie/processing-form-request-data-in-golang-2dff4c2441be
// UpdateProfileSettings handles the profile settings request.
func UpdateProfileSettings(server *server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		//r.ParseForm()
		// ParseMultipartForm parses a request body as multipart/form-data
		r.ParseMultipartForm(8 << 20) // Limit max size by 4 MB.

		req := ProfileSettingsRequest{}

		req.ProfileWalletAddress = r.FormValue("profile_wallet_address")
		req.ProfileName = r.FormValue("username")
		req.ProfileBio = r.FormValue("bio")
		req.ProfileWebsite = r.FormValue("website")
		req.ProfileTwitter = r.FormValue("twitter")
		req.ProfileDiscord = r.FormValue("discord")
		req.ProfileTelegram = r.FormValue("telegram")
		req.ProfileFacebook = r.FormValue("facebook")
		req.ProfileInstagram = r.FormValue("instagram")

		var err error

		banner, err := extractFileAndWriteAsset(*server, r, w, "profile_banner_file", req.ProfileWalletAddress, "banner")
		if err != nil {
			return
		}

		if banner != "" {
			req.ProfileBanner = banner
		}

		image, err := extractFileAndWriteAsset(*server, r, w, "profile_image_file", req.ProfileWalletAddress, "image")
		if err != nil {
			return
		}

		if image != "" {
			req.ProfileImage = image
		}

		err = validation.ValidateStruct(&req,
			validation.Field(&req.ProfileWalletAddress, validation.Required),
			validation.Field(&req.ProfileName, validation.Required),
			validation.Field(&req.ProfileBio, validation.Required),
			validation.Field(&req.ProfileWebsite),
			validation.Field(&req.ProfileTwitter),
			validation.Field(&req.ProfileDiscord),
			validation.Field(&req.ProfileTelegram),
			validation.Field(&req.ProfileFacebook),
			validation.Field(&req.ProfileInstagram),
		)
		if err != nil {
			responses.ERROR(w, http.StatusUnprocessableEntity, err)
			return
		}

		activeProfile := profile.ActiveProfile{
			ProfileWalletAddress: req.ProfileWalletAddress,
			ProfileName:          req.ProfileName,
			ProfileBio:           req.ProfileBio,
			ProfileBanner:        req.ProfileBanner,
			ProfileImage:         req.ProfileImage,
			ProfileWebsite:       req.ProfileWebsite,
			ProfileTwitter:       req.ProfileTwitter,
			ProfileDiscord:       req.ProfileDiscord,
			ProfileTelegram:      req.ProfileTelegram,
			ProfileFacebook:      req.ProfileFacebook,
			ProfileInstagram:     req.ProfileInstagram,
		}

		_, err = profile.UpdateActiveProfile(*server.DB, activeProfile)
		if err != nil {
			responses.ERROR(w, http.StatusInternalServerError, err)
			return
		}

		responses.JSON(w, http.StatusOK, "")
	}
}

func extractFileAndWriteAsset(srv server.Server, r *http.Request, w http.ResponseWriter, key, address, mode string) (string, error) {
	var buf bytes.Buffer
	var assetURL string

	file, header, err := r.FormFile(key) // Retrieve the file from form data
	if err != nil {
		if err.Error() == "http: no such file" {
			return "", nil
		}
		responses.ERROR(w, http.StatusInternalServerError, err)
		return "", err
	}

	defer file.Close()

	// Use Wallet Address hash instead
	fileExtension := strings.Split(header.Filename, ".")

	io.Copy(&buf, file)
	contents := buf.String()

	fileName := address + "." + fileExtension[1]

	if mode == "image" {
		assetURL, err = storage.PutNewProfileImage(srv.S3Client, srv.Configuration.SpaceName, address, fileName, contents)
		if err != nil {
			responses.ERROR(w, http.StatusInternalServerError, err)
			return "", err
		}
		return assetURL, nil

	} else if mode == "banner" {
		assetURL, err = storage.PutNewProfileBanner(srv.S3Client, srv.Configuration.SpaceName, address, fileName, contents)
		if err != nil {
			responses.ERROR(w, http.StatusInternalServerError, err)
			return "", err
		}
		return assetURL, nil
	}

	return "", errors.New("mode not chosen")
}
