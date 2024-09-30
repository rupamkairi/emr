package application

import (
	"net/http"
	"rupamkairi/emr/application/handlers"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func InitRouter() *mux.Router {
	router := mux.NewRouter()

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization", "X-Requested-With"},
		ExposedHeaders:   []string{"Content-Length"},
		AllowCredentials: true,
		// Debug:            true,
	})

	router.Use(mux.CORSMethodMiddleware(router))
	router.Use(func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

			if r.Method == "OPTIONS" {
				w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
				w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
				w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
				w.Header().Set("Access-Control-Allow-Credentials", "true")
				w.WriteHeader(http.StatusOK)
				return
			}

			w.Header().Set("Content-Type", "application/json")
			c.Handler(h).ServeHTTP(w, r)

		})
	})

	router.HandleFunc("/auth/login", handlers.Login).Methods(http.MethodPost, http.MethodOptions)
	router.HandleFunc("/users/{userId}", handlers.FindUser).Methods("GET")

	return router
}
