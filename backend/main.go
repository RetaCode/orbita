package main

import (
	"backend/config"
	"backend/controllers"
	"backend/middleware"
	"context"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error cargando archivo .env")
	}

	config.ConnectDB()
	r := gin.Default()

	// Ruta de prueba
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Orbita backend funcionando 🚀"})
	})

	// Rutas públicas
	public := r.Group("/")
	{
		public.POST("/register", controllers.Register)
		public.POST("/login", controllers.Login)
		public.POST("/enviar-recuperacion", controllers.EnviarRecuperacion)
		public.POST("/restablecer", controllers.RestablecerContrasena)
	}

	// Rutas protegidas con JWT
	protected := r.Group("/")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.POST("/perfil", controllers.ActualizarPerfil)
		protected.GET("/perfil", func(c *gin.Context) {
			userID := c.GetInt("user_id")
			correo := c.GetString("correo")

			c.JSON(200, gin.H{
				"message": "Acceso permitido al perfil",
				"user_id": userID,
				"correo":  correo,
			})
		})
	}

	// Ruta extra (usuarios demo)
	r.GET("/usuarios", func(c *gin.Context) {
		rows, err := config.DB.Query(context.Background(), "SELECT id, correo, nombre FROM usuarios")
		if err != nil {
			c.JSON(500, gin.H{"error": "Error al consultar usuarios"})
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

		c.JSON(200, usuarios)
	})

	// Puerto del servidor
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Println("Servidor iniciado en http://localhost:" + port)
	r.Run(":" + port)
}
