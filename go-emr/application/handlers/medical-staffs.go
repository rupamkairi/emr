package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"rupamkairi/emr/application/services"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type MedicalStaffUser struct {
	Name       string             `json:name`
	Email      string             `json:email`
	Password   string             `json:password`
	Profile_Id primitive.ObjectID `json:profile_id`

	Facilities []primitive.ObjectID `json:facilities`
}

type MedicalStaffProfile struct {
	Qualification string `json:qualification`
}

type CreateMedicalStaffBody struct {
	Name          string `json:name`
	Email         string `json:email`
	Qualification string `json:qualification`

	Associated_Facility string `json:associated_facility`
}

func CreateMedicalStaff(w http.ResponseWriter, r *http.Request) {

	var b CreateMedicalStaffBody
	err := json.NewDecoder(r.Body).Decode(&b)
	if err != nil {
		panic(err)
	}

	facilityId, err := primitive.ObjectIDFromHex(b.Associated_Facility)
	if err != nil {
		panic(err)
	}

	var u MedicalStaffUser
	u.Name = b.Name
	u.Email = b.Email
	u.Password = services.RandomPassword()
	u.Facilities = append(u.Facilities, facilityId)

	var p MedicalStaffProfile
	p.Qualification = b.Qualification

	newProfile, err := services.EMRDB.Collection("profiles").InsertOne(context.TODO(), p)
	if err != nil {
		panic(err)
	}

	u.Profile_Id = newProfile.InsertedID.(primitive.ObjectID)
	newUser, err := services.EMRDB.Collection("users").InsertOne(context.TODO(), u)
	if err != nil {
		panic(err)
	}

	_, err = services.EMRDB.Collection("facilities").UpdateOne(context.TODO(),
		bson.M{"_id": facilityId},
		bson.M{"$push": bson.M{"people": newUser.InsertedID}},
	)
	if err != nil {
		panic(err)
	}

	w.WriteHeader(http.StatusCreated)
}
