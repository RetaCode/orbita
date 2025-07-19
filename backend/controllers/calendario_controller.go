package controllers

import (
	"backend/config"
	"backend/models/entities"
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

// CreateEvento crea un nuevo evento en el calendario
func CreateEvento(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No autorizado"})
		return
	}

	var evento entities.CalendarioEvento
	if err := c.ShouldBindJSON(&evento); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	evento.IDUsuario = userID.(int)

	err := config.DB.QueryRow(context.Background(),
		"INSERT INTO calendario_evento (titulo, descripcion, fecha_hora_inicio, fecha_hora_fin, id_usuario, tipo_evento) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_evento",
		evento.Titulo, evento.Descripcion, evento.FechaHoraInicio, evento.FechaHoraFin, evento.IDUsuario, evento.TipoEvento).Scan(&evento.IDEvento)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creando evento"})
		return
	}

	c.JSON(http.StatusCreated, evento)
}

// GetEventos obtiene todos los eventos del usuario
func GetEventos(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No autorizado"})
		return
	}

	rows, err := config.DB.Query(context.Background(),
		"SELECT id_evento, titulo, descripcion, fecha_hora_inicio, fecha_hora_fin, id_usuario, tipo_evento FROM calendario_evento WHERE id_usuario = $1",
		userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error obteniendo eventos"})
		return
	}
	defer rows.Close()

	var eventos []entities.CalendarioEvento
	for rows.Next() {
		var evento entities.CalendarioEvento
		if err := rows.Scan(&evento.IDEvento, &evento.Titulo, &evento.Descripcion, &evento.FechaHoraInicio, &evento.FechaHoraFin, &evento.IDUsuario, &evento.TipoEvento); err != nil {
			continue
		}
		eventos = append(eventos, evento)
	}

	c.JSON(http.StatusOK, eventos)
}

// RegistrarEstadoAnimo registra el estado de ánimo del usuario
func RegistrarEstadoAnimo(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No autorizado"})
		return
	}

	var data struct {
		Estado string `json:"estado" binding:"required"`
	}
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	now := time.Now()
	var estadoID int
	err := config.DB.QueryRow(context.Background(),
		"INSERT INTO estado_animo (id_usuario, estado, fecha_registro) VALUES ($1, $2, $3) RETURNING id_estado",
		userID, data.Estado, now).Scan(&estadoID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error registrando estado de ánimo"})
		return
	}

	// Actualizar estado actual en usuario
	_, err = config.DB.Exec(context.Background(),
		"UPDATE usuario SET estado_animo_actual = $1 WHERE id_usuario = $2",
		data.Estado, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error actualizando estado actual"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"id_estado": estadoID,
		"message":   "Estado de ánimo registrado exitosamente",
	})
}

// GetEstadosAnimo obtiene el historial de estados de ánimo del usuario
func GetEstadosAnimo(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No autorizado"})
		return
	}

	rows, err := config.DB.Query(context.Background(),
		"SELECT id_estado, estado, fecha_registro FROM estado_animo WHERE id_usuario = $1 ORDER BY fecha_registro DESC",
		userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error obteniendo estados de ánimo"})
		return
	}
	defer rows.Close()

	var estados []entities.EstadoAnimo
	for rows.Next() {
		var estado entities.EstadoAnimo
		estado.IDUsuario = userID.(int)
		if err := rows.Scan(&estado.IDEstado, &estado.Estado, &estado.FechaRegistro); err != nil {
			continue
		}
		estados = append(estados, estado)
	}

	c.JSON(http.StatusOK, estados)
}
