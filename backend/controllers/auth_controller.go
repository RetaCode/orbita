package controllers

import (
	"backend/config"
	"backend/models/entities"
	"context"
	"crypto/rand"
	"encoding/base64"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

// GoogleLogin genera la URL para iniciar sesión con Google
func GoogleLogin(c *gin.Context) {
	// TODO: Implementar cuando se configure Google OAuth2
	c.JSON(http.StatusNotImplemented, gin.H{
		"error": "Google OAuth2 no configurado aún. Configura GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET",
	})
}

// GoogleCallback maneja el callback de Google OAuth
func GoogleCallback(c *gin.Context) {
	// TODO: Implementar cuando se configure Google OAuth2
	c.JSON(http.StatusNotImplemented, gin.H{
		"error": "Google OAuth2 no configurado aún",
	})
}

func findOrCreateGoogleUser(googleID, email, name, picture string) (*entities.Usuario, error) {
	var usuario entities.Usuario

	// Buscar usuario existente por Google ID
	err := config.DB.QueryRow(context.Background(),
		"SELECT id_usuario, correo, nombre, google_id, avatar FROM usuario WHERE google_id = $1", googleID).
		Scan(&usuario.IDUsuario, &usuario.Correo, &usuario.Nombre, &usuario.GoogleID, &usuario.Avatar)

	if err == nil {
		// Usuario existente encontrado
		return &usuario, nil
	}

	// Buscar usuario existente por email
	err = config.DB.QueryRow(context.Background(),
		"SELECT id_usuario, correo, nombre FROM usuario WHERE correo = $1", email).
		Scan(&usuario.IDUsuario, &usuario.Correo, &usuario.Nombre)

	if err == nil {
		// Usuario existe, actualizar con Google ID
		_, err = config.DB.Exec(context.Background(),
			"UPDATE usuario SET google_id = $1, avatar = $2 WHERE id_usuario = $3",
			googleID, picture, usuario.IDUsuario)
		if err != nil {
			return nil, err
		}
		usuario.GoogleID = googleID
		usuario.Avatar = picture
		return &usuario, nil
	}

	// Crear nuevo usuario
	now := time.Now()
	err = config.DB.QueryRow(context.Background(),
		"INSERT INTO usuario (correo, nombre, google_id, avatar, fecha_creacion) VALUES ($1, $2, $3, $4, $5) RETURNING id_usuario",
		email, name, googleID, picture, now).Scan(&usuario.IDUsuario)
	if err != nil {
		return nil, err
	}

	usuario.Correo = email
	usuario.Nombre = name
	usuario.GoogleID = googleID
	usuario.Avatar = picture
	usuario.FechaCreacion = &now

	return &usuario, nil
}

func generateRandomState() string {
	b := make([]byte, 32)
	rand.Read(b)
	return base64.URLEncoding.EncodeToString(b)
}
