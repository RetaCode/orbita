package routes

import (
	"backend/controllers"
	"github.com/gin-gonic/gin"
	"backend/middleware"
)

func UsuarioRoutes(r *gin.Engine) {
	usuarios := r.Group("/usuarios")
	{
		usuarios.GET("/", controllers.GetUsuarios)
		usuarios.GET("/perfil", middleware.AuthMiddleware(), controllers.GetPerfil)
		usuarios.PUT("/perfil", middleware.AuthMiddleware(), controllers.UpdateProfile)
	}
}
