package controllers

import (
	"backend/config"
	"backend/models/dtos"
	"backend/models/entities"
	"backend/utils"
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Register permite crear un nuevo usuario
func Register(c *gin.Context) {
	var data struct {
		Correo     string `json:"correo"`
		Nombre     string `json:"nombre"`
		Contrasena string `json:"contrasena"`
	}

	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	hashed, err := utils.HashPassword(data.Contrasena)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al hashear la contraseña"})
		return
	}

	var userID int
	err = config.DB.QueryRow(context.Background(),
		"INSERT INTO usuario (correo, nombre, contraseña) VALUES ($1, $2, $3) RETURNING id_usuario",
		data.Correo, data.Nombre, hashed).Scan(&userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo registrar el usuario"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Usuario registrado correctamente",
		"user_id": userID,
	})
}

// Login autentica a un usuario y genera un token JWT
func Login(c *gin.Context) {
	var data struct {
		Correo     string `json:"correo"`
		Contrasena string `json:"contrasena"`
	}

	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	var usuario entities.Usuario
	err := config.DB.QueryRow(context.Background(),
		"SELECT id_usuario, correo, nombre, contraseña FROM usuario WHERE correo = $1", data.Correo).
		Scan(&usuario.IDUsuario, &usuario.Correo, &usuario.Nombre, &usuario.Contrasena)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Credenciales inválidas"})
		return
	}

	if !utils.CheckPasswordHash(data.Contrasena, usuario.Contrasena) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Contraseña incorrecta"})
		return
	}

	token, err := utils.GenerateToken(usuario.IDUsuario, usuario.Correo)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error generando token"})
		return
	}

	// Limpiar contraseña antes de enviar
	usuario.Contrasena = ""

	c.JSON(http.StatusOK, dtos.AuthResponse{
		Token:   token,
		Usuario: usuario,
	})
}

// GetUsuarios devuelve todos los usuarios (demo)
func GetUsuarios(c *gin.Context) {
	rows, err := config.DB.Query(context.Background(), "SELECT id_usuario, correo, nombre FROM usuario")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al obtener usuarios"})
		return
	}
	defer rows.Close()

	var usuarios []entities.Usuario
	for rows.Next() {
		var usuario entities.Usuario
		if err := rows.Scan(&usuario.IDUsuario, &usuario.Correo, &usuario.Nombre); err != nil {
			continue
		}
		usuarios = append(usuarios, usuario)
	}

	c.JSON(http.StatusOK, usuarios)
}

// GetPerfil devuelve el perfil del usuario autenticado
func GetPerfil(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token inválido o expirado"})
		return
	}

	var usuario entities.Usuario
	err := config.DB.QueryRow(context.Background(),
		"SELECT id_usuario, correo, nombre, preferencias, estado_animo_actual FROM usuario WHERE id_usuario = $1", userID).
		Scan(&usuario.IDUsuario, &usuario.Correo, &usuario.Nombre, &usuario.Preferencias, &usuario.EstadoAnimoActual)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error obteniendo perfil"})
		return
	}

	c.JSON(http.StatusOK, usuario)
}
