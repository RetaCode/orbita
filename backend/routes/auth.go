package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

func AuthRoutes(r *gin.Engine) {
	auth := r.Group("/auth")
	{
		// Autenticación básica
		auth.POST("/login", controllers.Login)
		auth.POST("/register", controllers.Register)

		// Recuperación de contraseña
		auth.POST("/forgot-password", controllers.EnviarRecuperacion)
		auth.POST("/reset-password", controllers.RestablecerContrasena)

		// Google OAuth
		auth.GET("/google", controllers.GoogleLogin)
		auth.GET("/google/callback", controllers.GoogleCallback)
		auth.POST("/google/complete", controllers.GoogleLoginComplete)
	}
}
