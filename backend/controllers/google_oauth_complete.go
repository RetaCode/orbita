package controllers

import (
	"backend/models/dtos"
	"backend/utils"
	"context"
	"encoding/json"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var googleOAuthConfig *oauth2.Config

func InitGoogleOAuth() {
	googleOAuthConfig = &oauth2.Config{
		ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
		RedirectURL:  os.Getenv("GOOGLE_REDIRECT_URL"),
		Scopes:       []string{"openid", "email", "profile"},
		Endpoint:     google.Endpoint,
	}
}

// GoogleLoginComplete implementación completa de Google OAuth
func GoogleLoginComplete(c *gin.Context) {
	if googleOAuthConfig == nil || googleOAuthConfig.ClientID == "" {
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"error": "Google OAuth2 no configurado. Configura las variables GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET",
		})
		return
	}

	state := generateRandomState()
	url := googleOAuthConfig.AuthCodeURL(state)

	c.JSON(http.StatusOK, gin.H{
		"url":   url,
		"state": state,
	})
}

// GoogleCallbackComplete maneja el callback completo de Google OAuth
func GoogleCallbackComplete(c *gin.Context) {
	if googleOAuthConfig == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "Google OAuth2 no configurado"})
		return
	}

	var req dtos.GoogleAuthRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	// Intercambiar código por token
	token, err := googleOAuthConfig.Exchange(context.Background(), req.Code)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error al intercambiar código"})
		return
	}

	// Obtener información del usuario
	client := googleOAuthConfig.Client(context.Background(), token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error obteniendo información del usuario"})
		return
	}
	defer resp.Body.Close()

	var googleUser struct {
		ID      string `json:"id"`
		Email   string `json:"email"`
		Name    string `json:"name"`
		Picture string `json:"picture"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&googleUser); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error decodificando respuesta de Google"})
		return
	}

	// Buscar o crear usuario
	usuario, err := findOrCreateGoogleUser(googleUser.ID, googleUser.Email, googleUser.Name, googleUser.Picture)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creando usuario"})
		return
	}

	// Generar JWT
	jwtToken, err := utils.GenerateToken(usuario.IDUsuario, usuario.Correo)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error generando token"})
		return
	}

	c.JSON(http.StatusOK, dtos.AuthResponse{
		Token:   jwtToken,
		Usuario: *usuario,
	})
}
