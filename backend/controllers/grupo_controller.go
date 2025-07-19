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

// CreateGrupo crea un nuevo grupo
func CreateGrupo(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No autorizado"})
		return
	}

	var grupo entities.Grupo
	if err := c.ShouldBindJSON(&grupo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	err := config.DB.QueryRow(context.Background(),
		"INSERT INTO grupo (nombre, descripcion, id_creador) VALUES ($1, $2, $3) RETURNING id_grupo",
		grupo.Nombre, grupo.Descripcion, userID).Scan(&grupo.IDGrupo)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creando grupo"})
		return
	}

	c.JSON(http.StatusCreated, grupo)
}

// GetGrupos obtiene todos los grupos del usuario
func GetGrupos(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No autorizado"})
		return
	}

	rows, err := config.DB.Query(context.Background(),
		`SELECT g.id_grupo, g.nombre, g.descripcion, g.id_creador 
		 FROM grupo g 
		 JOIN miembro_grupo mg ON g.id_grupo = mg.id_grupo 
		 WHERE mg.id_usuario = $1 OR g.id_creador = $1`, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error obteniendo grupos"})
		return
	}
	defer rows.Close()

	var grupos []entities.Grupo
	for rows.Next() {
		var grupo entities.Grupo
		if err := rows.Scan(&grupo.IDGrupo, &grupo.Nombre, &grupo.Descripcion, &grupo.IDCreador); err != nil {
			continue
		}
		grupos = append(grupos, grupo)
	}

	c.JSON(http.StatusOK, grupos)
}

// JoinGrupo permite a un usuario unirse a un grupo
func JoinGrupo(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No autorizado"})
		return
	}

	grupoID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID de grupo inválido"})
		return
	}

	var data struct {
		RolEnGrupo string `json:"rol_en_grupo"`
	}
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	now := time.Now()
	_, err = config.DB.Exec(context.Background(),
		"INSERT INTO miembro_grupo (id_usuario, id_grupo, rol_en_grupo, fecha_union) VALUES ($1, $2, $3, $4)",
		userID, grupoID, data.RolEnGrupo, now)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error uniéndose al grupo"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Unido al grupo exitosamente"})
}
