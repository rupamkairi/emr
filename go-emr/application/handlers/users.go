package handlers

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func FindUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	log.Print(vars["userId"])
	w.WriteHeader(http.StatusOK)
}
