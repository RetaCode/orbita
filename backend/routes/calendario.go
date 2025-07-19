package routes

import (
	"backend/controllers"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

func CalendarioRoutes(r *gin.Engine) {
	calendario := r.Group("/calendario")
	calendario.Use(middleware.AuthMiddleware()) // Todas las rutas requieren autenticación
	{
		// Eventos de calendario
		calendario.POST("/eventos", controllers.CreateEvento)
		calendario.GET("/eventos", controllers.GetEventos)

		// Estados de ánimo y bienestar
		calendario.POST("/estados-animo", controllers.RegistrarEstadoAnimo)
		calendario.GET("/estados-animo", controllers.GetEstadosAnimo)
	}
}
