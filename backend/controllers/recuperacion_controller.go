package controllers

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"net/http"

	"backend/config"
	"backend/utils"
	"github.com/gin-gonic/gin"
)

func EnviarRecuperacion(c *gin.Context) {
	var datos struct {
		Correo string `json:"correo"`
	}

	if err := c.ShouldBindJSON(&datos); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	// Verificar si existe el usuario
	var existe bool
	err := config.DB.QueryRow(context.Background(),
		"SELECT EXISTS(SELECT 1 FROM usuarios WHERE correo = $1)", datos.Correo).Scan(&existe)

	if err != nil || !existe {
		c.JSON(http.StatusNotFound, gin.H{"error": "Correo no registrado"})
		return
	}

	// Generar un token aleatorio
	tokenBytes := make([]byte, 32)
	if _, err := rand.Read(tokenBytes); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo generar el token"})
		return
	}
	token := hex.EncodeToString(tokenBytes)

	// Guardar el token en la base de datos
	_, err = config.DB.Exec(context.Background(),
		"INSERT INTO tokens_recuperacion (correo, token) VALUES ($1, $2)",
		datos.Correo, token)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al guardar el token"})
		return
	}

	// Enviar correo real
	asunto := "Recuperación de contraseña - Órbita"
	enlace := "http://localhost:8080/restablecer?token=" + token + "&correo=" + datos.Correo
	cuerpo := "Hola,\n\nHaz clic en el siguiente enlace para restablecer tu contraseña:\n\n" + enlace

	if err := utils.EnviarCorreo(datos.Correo, asunto, cuerpo); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo enviar el correo"})
		return
	}

	// Respuesta única
	c.JSON(http.StatusOK, gin.H{"message": "Correo de recuperación enviado correctamente"})
}

func RestablecerContrasena(c *gin.Context) {
	var datos struct {
		Correo         string `json:"correo"`
		Token          string `json:"token"`
		NuevaContrasena string `json:"nueva_contrasena"`
	}

	if err := c.ShouldBindJSON(&datos); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	// Verificar que el token exista para ese correo
	var tokenValido bool
	err := config.DB.QueryRow(context.Background(),
		"SELECT EXISTS(SELECT 1 FROM tokens_recuperacion WHERE correo = $1 AND token = $2)",
		datos.Correo, datos.Token).Scan(&tokenValido)

	if err != nil || !tokenValido {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token inválido o expirado"})
		return
	}

	// Hashear nueva contraseña
	hashed, err := utils.HashPassword(datos.NuevaContrasena)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo hashear la contraseña"})
		return
	}

	// Actualizar contraseña en usuarios
	_, err = config.DB.Exec(context.Background(),
		"UPDATE usuarios SET contrasena = $1 WHERE correo = $2", hashed, datos.Correo)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al actualizar la contraseña"})
		return
	}

	// Eliminar token de recuperación (opcional pero recomendable)
	_, _ = config.DB.Exec(context.Background(),
		"DELETE FROM tokens_recuperacion WHERE correo = $1", datos.Correo)

	c.JSON(http.StatusOK, gin.H{"message": "Contraseña actualizada correctamente ✅"})
}

