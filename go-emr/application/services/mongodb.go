package services

import (
	"context"
	"encoding/json"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var MongoClient *mongo.Client
var EMRDB *mongo.Database

func InitDatabase() {
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	dbUri := os.Getenv("MONGODB_URI")
	opts := options.Client().ApplyURI(dbUri).SetServerAPIOptions(serverAPI)

	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		panic(err)
	}

	// defer func() {
	// 	if err = client.Disconnect(context.TODO()); err != nil {
	// 		panic(err)
	// 	}
	// }()

	if err := client.Database("admin").RunCommand(context.TODO(), bson.D{{"ping", 1}}).Err(); err != nil {
		panic(err)
	}
	log.Println("Connected to MongoDB")
	MongoClient = client

	db := client.Database("emr-development")
	if err != nil {
		log.Println("Connect Error", err)
	}
	EMRDB = db

	// var result bson.M
	// err = emrDB.Collection("users").FindOne(context.TODO(), bson.D{{"name", "John"}}).Decode(&result)
	// if err == mongo.ErrNoDocuments {
	// 	fmt.Println("No document was found with filter")
	// 	return
	// }
	// if err != nil {
	// 	panic(err)
	// }

	// fmt.Printf("%s\n", decodeJSON(&result))
}

func HandleMongodbQueryError(err error) {
	if err == mongo.ErrNoDocuments {
		log.Println("No document was found with filter")
		return
	}
	if err != nil {
		panic(err)
	}
}

func DecodeDocument(result primitive.M) []byte {
	jsonData, err := json.Marshal(result)
	if err != nil {
		panic(err)
	}
	log.Printf("%s\n", jsonData)
	return jsonData
}
func DecodeDocuments(result []primitive.M) []byte {
	jsonData, err := json.Marshal(result)
	if err != nil {
		panic(err)
	}
	log.Printf("%s\n", jsonData)
	return jsonData
}
