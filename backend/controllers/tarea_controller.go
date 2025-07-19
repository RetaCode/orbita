package controllers

import (
	"backend/config"
	"backend/models/entities"
	"context"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// CreateTarea crea una nueva tarea
func CreateTarea(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No autorizado"})
		return
	}

	var tarea entities.Tarea
	if err := c.ShouldBindJSON(&tarea); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	tarea.IDUsuarioCreador = userID.(int)

	err := config.DB.QueryRow(context.Background(),
		"INSERT INTO tarea (titulo, descripcion, fecha_vencimiento, prioridad, estado, id_usuario_creador, id_grupo, id_plantilla) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id_tarea",
		tarea.Titulo, tarea.Descripcion, tarea.FechaVencimiento, tarea.Prioridad, tarea.Estado, tarea.IDUsuarioCreador, tarea.IDGrupo, tarea.IDPlantilla).Scan(&tarea.IDTarea)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creando tarea"})
		return
	}

	c.JSON(http.StatusCreated, tarea)
}

// GetTareas obtiene todas las tareas del usuario
func GetTareas(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No autorizado"})
		return
	}

	rows, err := config.DB.Query(context.Background(),
		`SELECT t.id_tarea, t.titulo, t.descripcion, t.fecha_vencimiento, t.prioridad, t.estado, t.id_usuario_creador, t.id_grupo, t.id_plantilla
		 FROM tarea t 
		 LEFT JOIN asignacion_tarea at ON t.id_tarea = at.id_tarea 
		 WHERE t.id_usuario_creador = $1 OR at.id_usuario = $1`, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error obteniendo tareas"})
		return
	}
	defer rows.Close()

	var tareas []entities.Tarea
	for rows.Next() {
		var tarea entities.Tarea
		if err := rows.Scan(&tarea.IDTarea, &tarea.Titulo, &tarea.Descripcion, &tarea.FechaVencimiento, &tarea.Prioridad, &tarea.Estado, &tarea.IDUsuarioCreador, &tarea.IDGrupo, &tarea.IDPlantilla); err != nil {
			continue
		}
		tareas = append(tareas, tarea)
	}

	c.JSON(http.StatusOK, tareas)
}

// UpdateTarea actualiza una tarea
func UpdateTarea(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No autorizado"})
		return
	}

	tareaID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID de tarea inválido"})
		return
	}

	var tarea entities.Tarea
	if err := c.ShouldBindJSON(&tarea); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	_, err = config.DB.Exec(context.Background(),
		`UPDATE tarea SET titulo = $1, descripcion = $2, fecha_vencimiento = $3, prioridad = $4, estado = $5 
		 WHERE id_tarea = $6 AND id_usuario_creador = $7`,
		tarea.Titulo, tarea.Descripcion, tarea.FechaVencimiento, tarea.Prioridad, tarea.Estado, tareaID, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error actualizando tarea"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Tarea actualizada exitosamente"})
}

// AsignarTarea asigna una tarea a un usuario
func AsignarTarea(c *gin.Context) {
	_, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No autorizado"})
		return
	}

	tareaID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID de tarea inválido"})
		return
	}

	var data struct {
		IDUsuarioAsignado int `json:"id_usuario_asignado"`
	}
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	now := time.Now()
	_, err = config.DB.Exec(context.Background(),
		"INSERT INTO asignacion_tarea (id_tarea, id_usuario, fecha_asignacion, estado_asignacion) VALUES ($1, $2, $3, $4)",
		tareaID, data.IDUsuarioAsignado, now, "pendiente")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error asignando tarea"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Tarea asignada exitosamente"})
}
