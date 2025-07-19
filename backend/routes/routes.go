package routes

import (
	"backend/controllers"
	"backend/middleware"
	"context"

	"backend/config"

	"github.com/gin-gonic/gin"
)

// SetupRoutes configura todas las rutas de la aplicación
func SetupRoutes(r *gin.Engine) {
	// Ruta de prueba
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Orbita backend funcionando 🚀"})
	})

	// Configurar todas las rutas por módulo
	AuthRoutes(r)

	// Rutas públicas adicionales
	public := r.Group("/api")
	{
		public.GET("/usuarios", controllers.GetUsuarios)
		public.GET("/plantillas", controllers.GetPlantillas)
		public.GET("/documentacion", func(c *gin.Context) {
			rows, err := config.DB.Query(context.Background(), "SELECT id_documento, titulo, contenido, recomendacion, categoria FROM documentacion")
			if err != nil {
				c.JSON(500, gin.H{"error": "Error al consultar documentación"})
				return
			}
			defer rows.Close()

			var documentos []map[string]interface{}
			for rows.Next() {
				var id int
				var titulo, contenido, recomendacion, categoria string
				if err := rows.Scan(&id, &titulo, &contenido, &recomendacion, &categoria); err != nil {
					continue
				}
				documentos = append(documentos, map[string]interface{}{
					"id_documento":  id,
					"titulo":        titulo,
					"contenido":     contenido,
					"recomendacion": recomendacion,
					"categoria":     categoria,
				})
			}

			c.JSON(200, documentos)
		})
	}

	// Rutas protegidas con JWT
	protected := r.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	{
		// Rutas de perfil de usuario
		protected.GET("/perfil", controllers.GetPerfil)
		protected.PUT("/perfil", controllers.ActualizarPerfil)

		// Rutas de grupos
		protected.POST("/grupos", controllers.CreateGrupo)
		protected.GET("/grupos", controllers.GetGrupos)
		protected.POST("/grupos/:id/join", controllers.JoinGrupo)

		// Rutas de tareas
		protected.POST("/tareas", controllers.CreateTarea)
		protected.GET("/tareas", controllers.GetTareas)
		protected.PUT("/tareas/:id", controllers.UpdateTarea)
		protected.POST("/tareas/:id/asignar", controllers.AsignarTarea)

		// Rutas de calendario y eventos
		protected.POST("/eventos", controllers.CreateEvento)
		protected.GET("/eventos", controllers.GetEventos)

		// Rutas de estado de ánimo y bienestar
		protected.POST("/estado-animo", controllers.RegistrarEstadoAnimo)
		protected.GET("/estado-animo", controllers.GetEstadosAnimo)

		// Rutas de plantillas técnicas
		protected.GET("/mis-plantillas", controllers.GetMisPlantillas)
		protected.POST("/plantillas/:id/seleccionar", controllers.SeleccionarPlantilla)
	}
}
