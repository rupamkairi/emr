package services

import (
	"encoding/json"
	"math/rand"
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

	password := make([]byte, passwordLength)
	for i := range password {
		password[i] = allChars[rand.Intn(len(allChars))]
	}
	return string(password)

}

type Response struct {
	Message string          `json:"message"`
	Error   string          `json:"error"`
	Data    json.RawMessage `json:"data"`
}

func FormatResponse(resp Response) ([]byte, error) {
	jsonData, err := json.Marshal(resp)

	if err != nil {
		return nil, err
	}
	return jsonData, nil
}
