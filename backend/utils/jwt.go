package utils

import (
	"github.com/golang-jwt/jwt/v5"
	"time"
)

var jwtKey = []byte("clave_secreta_orbita") // ⚠️ En producción movelo al .env

func GenerateJWT(userID int, correo string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userID,
		"correo":  correo,
		"exp":     time.Now().Add(time.Hour * 24).Unix(), // 24h válido
	})

	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
