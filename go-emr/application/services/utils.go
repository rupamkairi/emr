package services

import (
	"math/rand"
	"time"
)

func RandomPassword() string {

	const (
		lowerChars     = "abcdefghijklmnopqrstuvwxyz"
		upperChars     = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
		numberChars    = "0123456789"
		symbolChars    = "!@#$%^&*-_=+?/"
		allChars       = lowerChars + upperChars + numberChars + symbolChars
		passwordLength = 12
	)

	rand.Seed(time.Now().UnixNano())

	password := make([]byte, passwordLength)
	for i := range password {
		password[i] = allChars[rand.Intn(len(allChars))]
	}
	return string(password)

}
