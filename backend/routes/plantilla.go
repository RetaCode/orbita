package routes

import (
	"backend/controllers"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

func PlantillaRoutes(r *gin.Engine) {
	plantillas := r.Group("/plantillas")
	plantillas.Use(middleware.AuthMiddleware()) // Todas las rutas requieren autenticación
	{
		plantillas.GET("/", controllers.GetPlantillas)
		plantillas.POST("/:id/seleccionar", controllers.SeleccionarPlantilla)
		plantillas.GET("/mis-plantillas", controllers.GetMisPlantillas)
	}
}
