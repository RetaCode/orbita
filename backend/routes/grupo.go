package routes

import (
	"backend/controllers"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

func GrupoRoutes(r *gin.Engine) {
	grupos := r.Group("/grupos")
	grupos.Use(middleware.AuthMiddleware()) // Todas las rutas de grupo requieren autenticación
	{
		grupos.POST("/", controllers.CreateGrupo)
		grupos.GET("/", controllers.GetGrupos)
		grupos.POST("/:id/join", controllers.JoinGrupo)
	}
}
