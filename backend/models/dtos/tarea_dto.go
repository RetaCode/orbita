package dtos

import "time"

// CreateTareaRequest representa una solicitud de creación de tarea
type CreateTareaRequest struct {
	Titulo           string     `json:"titulo" binding:"required,min=3,max=100"`
	Descripcion      string     `json:"descripcion" binding:"max=500"`
	FechaVencimiento *time.Time `json:"fecha_vencimiento"`
	Prioridad        string     `json:"prioridad" binding:"oneof=baja media alta critica"`
	IDGrupo          *int       `json:"id_grupo"`
	IDPlantilla      *int       `json:"id_plantilla"`
}

// UpdateTareaRequest representa una solicitud de actualización de tarea
type UpdateTareaRequest struct {
	Titulo           *string    `json:"titulo,omitempty" binding:"omitempty,min=3,max=100"`
	Descripcion      *string    `json:"descripcion,omitempty" binding:"omitempty,max=500"`
	FechaVencimiento *time.Time `json:"fecha_vencimiento,omitempty"`
	Prioridad        *string    `json:"prioridad,omitempty" binding:"omitempty,oneof=baja media alta critica"`
	Estado           *string    `json:"estado,omitempty" binding:"omitempty,oneof=pendiente en_progreso completada cancelada suspendida"`
}

// AsignarTareaRequest representa una solicitud de asignación de tarea
type AsignarTareaRequest struct {
	IDUsuarioAsignado int    `json:"id_usuario_asignado" binding:"required"`
	Mensaje           string `json:"mensaje,omitempty"`
}

// TareaResponse representa la respuesta con información de tarea
type TareaResponse struct {
	IDTarea          int        `json:"id_tarea"`
	Titulo           string     `json:"titulo"`
	Descripcion      string     `json:"descripcion"`
	FechaVencimiento *time.Time `json:"fecha_vencimiento"`
	Prioridad        string     `json:"prioridad"`
	Estado           string     `json:"estado"`
	IDUsuarioCreador int        `json:"id_usuario_creador"`
	IDGrupo          *int       `json:"id_grupo"`
	IDPlantilla      *int       `json:"id_plantilla"`
	FechaCreacion    *time.Time `json:"fecha_creacion"`
	IsOverdue        bool       `json:"is_overdue"`
	IsHighPriority   bool       `json:"is_high_priority"`

	// Información relacionada (opcional)
	NombreCreador   string `json:"nombre_creador,omitempty"`
	NombreGrupo     string `json:"nombre_grupo,omitempty"`
	NombrePlantilla string `json:"nombre_plantilla,omitempty"`
	Asignados       []int  `json:"asignados,omitempty"`
}

// TareaListResponse representa una lista paginada de tareas
type TareaListResponse struct {
	Tareas     []TareaResponse `json:"tareas"`
	Total      int             `json:"total"`
	Pagina     int             `json:"pagina"`
	TotalPages int             `json:"total_pages"`
}

// TareaStatsResponse representa estadísticas de tareas
type TareaStatsResponse struct {
	TotalTareas   int `json:"total_tareas"`
	Pendientes    int `json:"pendientes"`
	EnProgreso    int `json:"en_progreso"`
	Completadas   int `json:"completadas"`
	Vencidas      int `json:"vencidas"`
	AltaPrioridad int `json:"alta_prioridad"`
}
