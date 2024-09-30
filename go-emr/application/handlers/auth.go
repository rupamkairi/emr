package handlers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"rupamkairi/emr/application/services"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type LoginCredentials struct {
	Email    string `json:email`
	Password string `json:password`
}

func Login(w http.ResponseWriter, r *http.Request) {

	var lc LoginCredentials
	err := json.NewDecoder(r.Body).Decode(&lc)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	// log.Printf("%s %s", lc.Email, lc.Password)
	if lc.Email == "" || lc.Password == "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var result bson.M
	err = services.EMRDB.Collection("users").FindOne(context.TODO(), bson.D{
		{"email", lc.Email},
		{"password", lc.Password},
	}, options.FindOne().SetProjection(bson.D{
		{"password", 0},
	})).Decode(&result)
	if err == mongo.ErrNoDocuments {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		panic(err)
	}

	body := services.DecodeDocument(result)

	log.Println("Login Route")
	w.WriteHeader(http.StatusOK)
	w.Write(body)
}
