package controllers

import (
	"backend/config"
	"backend/models/entities"
	"context"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GetPlantillas obtiene todas las plantillas técnicas disponibles
func GetPlantillas(c *gin.Context) {
	rows, err := config.DB.Query(context.Background(),
		"SELECT id_plantilla, nombre, descripcion, tipo_metodo FROM plantilla_tecnica")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error obteniendo plantillas"})
		return
	}
	defer rows.Close()

	var plantillas []entities.PlantillaTecnica
	for rows.Next() {
		var plantilla entities.PlantillaTecnica
		if err := rows.Scan(&plantilla.IDPlantilla, &plantilla.Nombre, &plantilla.Descripcion, &plantilla.TipoMetodo); err != nil {
			continue
		}
		plantillas = append(plantillas, plantilla)
	}

	c.JSON(http.StatusOK, plantillas)
}

// SeleccionarPlantilla permite al usuario seleccionar una plantilla
func SeleccionarPlantilla(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No autorizado"})
		return
	}

	plantillaID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID de plantilla inválido"})
		return
	}

	var data struct {
		Configuracion string `json:"configuracion"`
	}
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	_, err = config.DB.Exec(context.Background(),
		"INSERT INTO usuario_plantilla (id_usuario, id_plantilla, fecha_seleccion, configuracion) VALUES ($1, $2, NOW(), $3) ON CONFLICT (id_usuario, id_plantilla) DO UPDATE SET configuracion = EXCLUDED.configuracion, fecha_seleccion = NOW()",
		userID, plantillaID, data.Configuracion)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error seleccionando plantilla"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Plantilla seleccionada exitosamente"})
}

// GetMisPlantillas obtiene las plantillas seleccionadas por el usuario
func GetMisPlantillas(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No autorizado"})
		return
	}

	rows, err := config.DB.Query(context.Background(),
		`SELECT pt.id_plantilla, pt.nombre, pt.descripcion, pt.tipo_metodo, up.fecha_seleccion, up.configuracion
		 FROM plantilla_tecnica pt 
		 JOIN usuario_plantilla up ON pt.id_plantilla = up.id_plantilla 
		 WHERE up.id_usuario = $1`, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error obteniendo plantillas del usuario"})
		return
	}
	defer rows.Close()

	var resultado []struct {
		entities.PlantillaTecnica
		FechaSeleccion string `json:"fecha_seleccion"`
		Configuracion  string `json:"configuracion"`
	}

	for rows.Next() {
		var item struct {
			entities.PlantillaTecnica
			FechaSeleccion string `json:"fecha_seleccion"`
			Configuracion  string `json:"configuracion"`
		}
		if err := rows.Scan(&item.IDPlantilla, &item.Nombre, &item.Descripcion, &item.TipoMetodo, &item.FechaSeleccion, &item.Configuracion); err != nil {
			continue
		}
		resultado = append(resultado, item)
	}

	c.JSON(http.StatusOK, resultado)
}
