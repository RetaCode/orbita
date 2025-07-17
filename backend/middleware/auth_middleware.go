package middleware

import (
	"errors"
	"net/http"
	"strings"

	"backend/utils"
	"github.com/gin-gonic/gin"
)

// Middleware para validar JWT
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token no proporcionado"})
			c.Abort()
			return
		}

		// Formato esperado: Bearer <token>
		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Formato de token inválido"})
			c.Abort()
			return
		}

		tokenStr := parts[1]
		claims, err := utils.ValidateToken(tokenStr)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token inválido o expirado"})
			c.Abort()
			return
		}

		// Guardar datos del usuario en contexto
		c.Set("user_id", claims.UserID) // 🟢 usamos "user_id" (igual que en el controlador)
		c.Set("correo", claims.Correo)

		c.Next()
	}
}

// ✅ Función para extraer el ID desde el contexto
func ExtraerIDDesdeToken(c *gin.Context) (int, error) {
	userID, ok := c.Get("user_id")
	if !ok {
		return 0, errors.New("no se encontró el ID en el token")
	}

	if id, ok := userID.(int); ok {
		return id, nil
	}

	return 0, errors.New("el ID no es un entero válido")
}
