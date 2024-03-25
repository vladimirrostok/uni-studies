package responses

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// JSON writes given data to the response.
func JSON(w http.ResponseWriter, statusCode int, data interface{}) {
	w.WriteHeader(statusCode)
	err := json.NewEncoder(w).Encode(data)
	if err != nil {
		// Write error into Encoder's writer via fmt (1 parameter is io.Writer).
		fmt.Fprintf(w, "%s", err.Error())
	}
}

// ERROR writes given error details to the response.
func ERROR(w http.ResponseWriter, statusCode int, err error) {
	if err != nil {
		JSON(w, statusCode, struct {
			Error string `json:"error"`
		}{
			Error: err.Error(),
		})
		return
	}
	JSON(w, http.StatusBadRequest, nil)
}