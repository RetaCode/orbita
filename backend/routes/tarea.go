package routes

import (
	"backend/controllers"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

func TareaRoutes(r *gin.Engine) {
	tareas := r.Group("/tareas")
	tareas.Use(middleware.AuthMiddleware()) // Todas las rutas de tarea requieren autenticación
	{
		tareas.POST("/", controllers.CreateTarea)
		tareas.GET("/", controllers.GetTareas)
		tareas.PUT("/:id", controllers.UpdateTarea)
		tareas.POST("/:id/asignar", controllers.AsignarTarea)
	}
}
