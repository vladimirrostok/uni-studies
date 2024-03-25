package controllers

import (
	"backend/marketplace/responses"
	"backend/marketplace/server"
	"net/http"
)

// AddTestController handles the new test request.
func AddLifeCheckController(server *server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		responses.JSON(w, http.StatusOK, "Lifecheck OK")
	}
}
