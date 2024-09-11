package services

import (
	"rupamkairi/emr/application/handlers"

	"github.com/gorilla/mux"
)

func InitRouter() *mux.Router {
	router := mux.NewRouter()

	router.HandleFunc("/users/{userId}", handlers.FindUser).Methods("GET")

	return router
}
