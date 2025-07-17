package utils

import (
	"errors"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"crypto/rand"
	"encoding/hex"
)

type Claims struct {
	UserID int    `json:"user_id"`
	Correo string `json:"correo"`
	jwt.RegisteredClaims
}

// Hashea una contraseña usando bcrypt
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// Compara una contraseña con su hash
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// Genera un token JWT con el ID y correo del usuario
func GenerateToken(userID int, correo string) (string, error) {
	claims := Claims{
		UserID: userID,
		Correo: correo,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtKey)
}

func GenerarTokenRecuperacion() string {
	bytes := make([]byte, 16)
	rand.Read(bytes)
	return hex.EncodeToString(bytes)
}

// Valida un token y devuelve los claims si es válido
func ValidateToken(tokenStr string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenStr, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil || !token.Valid {
		return nil, errors.New("token inválido o expirado")
	}

	claims, ok := token.Claims.(*Claims)
	if !ok {
		return nil, errors.New("no se pudieron obtener los claims")
	}

	return claims, nil
}


