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
		Nombre            string `json:"nombre"`
		Preferencias      string `json:"preferencias"`
		EstadoAnimoActual string `json:"estado_animo_actual"`
	}

	if err := c.ShouldBindJSON(&datos); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos JSON inválidos"})
		return
	}

	query := `
		UPDATE usuario
		SET nombre = $1, preferencias = $2, estado_animo_actual = $3
		WHERE id_usuario = $4
	`

	_, err = config.DB.Exec(context.Background(), query,
		datos.Nombre, datos.Preferencias, datos.EstadoAnimoActual, userID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al actualizar el perfil"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Perfil actualizado exitosamente"})
}
