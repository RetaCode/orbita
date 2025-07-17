package controllers

import (
	"context"
	"net/http"

	"backend/config"
	"backend/middleware"
	"github.com/gin-gonic/gin"
)

// ActualizarPerfil actualiza los datos del usuario autenticado
func ActualizarPerfil(c *gin.Context) {
	userID, err := middleware.ExtraerIDDesdeToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token inválido o no autorizado"})
		return
	}
	
	var datos struct {
		Nombre       string `json:"nombre"`
		Apodo1       string `json:"apodo1"`
		Apodo2       string `json:"apodo2"`
		Preferencias string `json:"preferencias"`
		EstadoAnimo  string `json:"estado_animo"`
	}

	if err := c.ShouldBindJSON(&datos); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos JSON inválidos"})
		return
	}

	query := `
		UPDATE usuarios
		SET nombre = $1, apodo1 = $2, apodo2 = $3, preferencias = $4, estado_animo = $5
		WHERE id = $6
	`

	_, err = config.DB.Exec(context.Background(), query,
		datos.Nombre, datos.Apodo1, datos.Apodo2, datos.Preferencias, datos.EstadoAnimo, userID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al actualizar el perfil"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Perfil actualizado exitosamente"})
}
