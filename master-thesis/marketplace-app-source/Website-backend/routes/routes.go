package routes

import (
	"backend/marketplace/controllers"
	profile_controller "backend/marketplace/controllers/profile"
	"backend/marketplace/middleware"
	"backend/marketplace/server"
)

func InitializeRoutes(s *server.Server) {
	s.Router.HandleFunc("/api/lifecheck", middleware.SetMiddlewareJSON(controllers.AddLifeCheckController(s))).Methods("GET", "OPTIONS")
	//s.Router.HandleFunc("/api/collections/new", middleware.SetMiddlewareJSON(collection_controller.AddCollectionForWalletAddressProfile(s))).Methods("POST", "OPTIONS")
	//s.Router.HandleFunc("/api/collections", middleware.SetMiddlewareJSON(collection_controller.FetchCollectionsForProfile(s))).Methods("GET", "OPTIONS")
	s.Router.HandleFunc("/api/auth", middleware.SetMiddlewareJSON(profile_controller.Authenticate(s))).Methods("POST", "OPTIONS")
	s.Router.HandleFunc("/api/profile/update", middleware.SetMiddlewareJSON(profile_controller.UpdateProfileSettings(s))).Methods("POST", "OPTIONS")
	s.Router.HandleFunc("/api/profile", middleware.SetMiddlewareJSON(profile_controller.FetchProfile(s))).Methods("GET", "OPTIONS")
}
