package handlers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"rupamkairi/emr/application/services"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetSubFacilities(w http.ResponseWriter, r *http.Request) {
	log.Println("GetSubFacilities Route")

	vars := mux.Vars(r)
	facilityId, err := primitive.ObjectIDFromHex(vars["facilityId"])
	if err != nil {
		panic(err)
	}

	cursor, err := services.EMRDB.Collection("facilities").Find(context.TODO(), bson.M{"parent_facility": facilityId})
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

type CreateSubFacilityBody struct {
	Name            string               `json:name`
	Parent_Facility primitive.ObjectID   `json:parent_facility`
	Owners          []primitive.ObjectID `json:owners`
}

func CreateSubFacility(w http.ResponseWriter, r *http.Request) {
	log.Println("CreateSubFacility Route")

	userId, err := primitive.ObjectIDFromHex(r.Header.Values("user_id")[0])
	if err != nil {
		panic(err)
	}

	vars := mux.Vars(r)
	facilityId, err := primitive.ObjectIDFromHex(vars["facilityId"])
	if err != nil {
		panic(err)
	}

	var b CreateSubFacilityBody
	err = json.NewDecoder(r.Body).Decode(&b)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	b.Parent_Facility = facilityId
	b.Owners = []primitive.ObjectID{userId}

	_, err = services.EMRDB.Collection("facilities").InsertOne(context.TODO(), b)
	if err != nil {
		panic(err)
	}

	log.Println("CreateSubFacility Route")
	w.WriteHeader(http.StatusCreated)
}
