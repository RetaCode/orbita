package routes

import (
	"backend/controllers"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

func UsuarioRoutes(r *gin.Engine) {
	usuarios := r.Group("/usuarios")
	{
		usuarios.GET("/", controllers.GetUsuarios)
		usuarios.GET("/perfil", middleware.AuthMiddleware(), controllers.GetPerfil)
		usuarios.PUT("/perfil", middleware.AuthMiddleware(), controllers.ActualizarPerfil)
	}
}
