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
		AllowedHeaders:   []string{"Content-Type", "Authorization", "X-Requested-With", "user_id"},
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
				w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, user_id")
				w.Header().Set("Access-Control-Allow-Credentials", "true")
				w.WriteHeader(http.StatusOK)
				return
			}

			w.Header().Set("Content-Type", "application/json")
			c.Handler(h).ServeHTTP(w, r)

		})
	})

	router.HandleFunc("/auth/login", handlers.Login).Methods(http.MethodOptions, http.MethodPost)
	router.HandleFunc("/auth/me", handlers.Me).Methods(http.MethodOptions, http.MethodGet)

	router.HandleFunc("/facilities/{facilityId}/sub-facilities", handlers.GetSubFacilities).Methods(http.MethodOptions, http.MethodGet)
	router.HandleFunc("/facilities/{facilityId}/sub-facilities", handlers.CreateSubFacility).Methods(http.MethodOptions, http.MethodPost)

	router.HandleFunc("/people", handlers.GetPeople).Methods(http.MethodOptions, http.MethodGet)
	router.HandleFunc("/people/doctors", handlers.CreateDoctor).Methods(http.MethodOptions, http.MethodPost)
	router.HandleFunc("/people/medical-staffs", handlers.CreateMedicalStaff).Methods(http.MethodOptions, http.MethodPost)
	// router.HandleFunc("/people/staffs", handlers.).Methods(http.MethodOptions, http.MethodPost)

	router.HandleFunc("/users/{userId}", handlers.FindUser).Methods("GET")

	return router
}
