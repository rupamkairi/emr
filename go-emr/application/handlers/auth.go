package handlers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"rupamkairi/emr/application/services"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

	// log.Printf("%s	 %s", lc.Email, lc.Password)
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

func Me(w http.ResponseWriter, r *http.Request) {
	userId, err := primitive.ObjectIDFromHex(r.Header.Values("user_id")[0])
	if err != nil {
		panic(err)
	}

	cursor, err := services.EMRDB.Collection("users").Aggregate(context.TODO(), bson.A{
		bson.D{{"$match", bson.D{{"_id", userId}}}},
		bson.D{{"$lookup", bson.D{
			{"from", "facilities"},
			{"localField", "_id"},
			{"foreignField", "owners"},
			{"as", "ownersOf"},
		}}},
		bson.D{{"$lookup", bson.D{{
			"from", "facilities"},
			{"localField", "_id"},
			{"foreignField", "people"},
			{"as", "peopleOf"},
		}}},
		bson.D{{"$limit", 1}},
		bson.D{{"$project", bson.D{{"password", 0}}}},
	})
	if err != nil {
		panic(err)
	}

	var result []bson.M
	if err = cursor.All(context.TODO(), &result); err != nil {
		panic(err)
	}

	data := services.DecodeDocument(result[0])

	resp := services.Response{
		Message: "Success",
		Error:   "",
		Data:    data,
	}
	body, err := services.FormatResponse(resp)
	if err != nil {
		panic(err)
	}

	log.Println("Me Route")
	w.WriteHeader(http.StatusOK)
	w.Write(body)
}
