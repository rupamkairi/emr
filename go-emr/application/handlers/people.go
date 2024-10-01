package handlers

import (
	"context"
	"log"
	"net/http"
	"rupamkairi/emr/application/services"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetPeople(w http.ResponseWriter, r *http.Request) {
	facilityId, err := primitive.ObjectIDFromHex(r.URL.Query().Get("facility_id"))
	if err != nil {
		panic(err)
	}

	log.Println(facilityId)

	cursor, err := services.EMRDB.Collection("users").Aggregate(context.TODO(), bson.A{
		bson.M{"$match": bson.M{"facilities": bson.M{"$in": []primitive.ObjectID{facilityId}}}},
		bson.M{"$lookup": bson.M{
			"from":         "profiles",
			"localField":   "profile_id",
			"foreignField": "_id",
			"as":           "profile",
		}},
		bson.M{"$unwind": bson.M{"path": "$profile"}},
		bson.M{"$project": bson.M{"password": 0, "facilities": 0, "profile_id": 0}},
	})
	if err != nil {
		panic(err)
	}

	var result []bson.M
	if err = cursor.All(context.TODO(), &result); err != nil {
		panic(err)
	}

	body := services.DecodeDocuments(result)
	w.WriteHeader(http.StatusOK)
	w.Write(body)
}
