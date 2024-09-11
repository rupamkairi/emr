package main

import (
	"context"
	"log"
	"rupamkairi/emr/application"

	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	app := application.New()
	err = app.Start(context.TODO())
	if err != nil {
		log.Println("Failed to start", err)
	}

}
