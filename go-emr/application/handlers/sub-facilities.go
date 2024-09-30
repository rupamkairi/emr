package handlers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"rupamkairi/emr/application/services"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

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
