package controllers

import (
	"context"
	"net/http"

	"backend/config"
	"backend/utils"
	"github.com/gin-gonic/gin"
)

// UpdateProfile actualiza el perfil del usuario autenticado
func UpdateProfile(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No se pudo identificar el usuario"})
		return
	}

	var data struct {
		Nombre       string `json:"nombre"`
		Apodo1       string `json:"apodo1"`
		Apodo2       string `json:"apodo2"`
		Preferencias string `json:"preferencias"`
		EstadoAnimo  string `json:"estado_animo"`
	}

	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	query := `
		UPDATE usuarios SET 
			nombre = $1,
			apodo1 = $2,
			apodo2 = $3,
			preferencias = $4,
			estado_animo = $5
		WHERE id = $6
	`

	_, err := config.DB.Exec(context.Background(), query,
		data.Nombre, data.Apodo1, data.Apodo2, data.Preferencias, data.EstadoAnimo, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al actualizar el perfil"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Perfil actualizado correctamente"})
}

// GetUsuarios devuelve todos los usuarios (demo)
func GetUsuarios(c *gin.Context) {
	rows, err := config.DB.Query(context.Background(), "SELECT id, correo, nombre FROM usuarios")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al obtener usuarios"})
		return
	}
	defer rows.Close()

	var usuarios []map[string]interface{}
	for rows.Next() {
		var id int
		var correo, nombre string

		if err := rows.Scan(&id, &correo, &nombre); err != nil {
			continue
		}

		usuarios = append(usuarios, map[string]interface{}{
			"id":     id,
			"correo": correo,
			"nombre": nombre,
		})
	}

	c.JSON(http.StatusOK, usuarios)
}

// GetPerfil devuelve el perfil del usuario autenticado
func GetPerfil(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token inválido o expirado"})
		return
	}

	correo, _ := c.Get("correo")

	c.JSON(http.StatusOK, gin.H{
		"message": "Acceso permitido al perfil 🔐",
		"user_id": userID,
		"correo":  correo,
	})
}

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

	_, err = config.DB.Exec(context.Background(),
		"INSERT INTO usuarios (correo, nombre, contrasena) VALUES ($1, $2, $3)",
		data.Correo, data.Nombre, hashed)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo registrar el usuario"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Usuario registrado correctamente"})
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

	var id int
	var hashedPassword string

	err := config.DB.QueryRow(context.Background(),
		"SELECT id, contrasena FROM usuarios WHERE correo = $1", data.Correo).
		Scan(&id, &hashedPassword)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Credenciales inválidas"})
		return
	}

	if !utils.CheckPasswordHash(data.Contrasena, hashedPassword) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Contraseña incorrecta"})
		return
	}

	token, err := utils.GenerateToken(id, data.Correo)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error generando token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}
