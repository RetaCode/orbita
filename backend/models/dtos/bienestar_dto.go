package dtos

import "time"

// RegistrarEstadoAnimoRequest representa una solicitud de registro de estado de ánimo
type RegistrarEstadoAnimoRequest struct {
	Estado string `json:"estado" binding:"required,oneof=muy_feliz feliz neutral triste muy_triste ansioso estresado relajado energico cansado motivado desmotivado"`
	Notas  string `json:"notas,omitempty" binding:"max=500"`
}

// EstadoAnimoResponse representa la respuesta con información de estado de ánimo
type EstadoAnimoResponse struct {
	IDEstado      int       `json:"id_estado"`
	Estado        string    `json:"estado"`
	FechaRegistro time.Time `json:"fecha_registro"`
	Notas         string    `json:"notas,omitempty"`
	IsPositive    bool      `json:"is_positive"`
	IsNegative    bool      `json:"is_negative"`
	IsNeutral     bool      `json:"is_neutral"`
	IsRecent      bool      `json:"is_recent"`
}

// EstadoAnimoListResponse representa una lista de estados de ánimo
type EstadoAnimoListResponse struct {
	Estados    []EstadoAnimoResponse `json:"estados"`
	Total      int                   `json:"total"`
	Pagina     int                   `json:"pagina"`
	TotalPages int                   `json:"total_pages"`
}

// EstadoAnimoStatsResponse representa estadísticas de estados de ánimo
type EstadoAnimoStatsResponse struct {
	TotalRegistros     int     `json:"total_registros"`
	EstadosPositivos   int     `json:"estados_positivos"`
	EstadosNegativos   int     `json:"estados_negativos"`
	EstadosNeutrales   int     `json:"estados_neutrales"`
	PorcentajePositivo float64 `json:"porcentaje_positivo"`
	EstadoActual       string  `json:"estado_actual"`
	TendenciaSemanal   string  `json:"tendencia_semanal"` // mejorando, empeorando, estable
}

// EstadoAnimoTrendResponse representa la tendencia de estados de ánimo
type EstadoAnimoTrendResponse struct {
	Fecha      time.Time `json:"fecha"`
	Estado     string    `json:"estado"`
	Puntuacion int       `json:"puntuacion"` // Valor numérico para análisis de tendencia
}

// CreateEventoRequest representa una solicitud de creación de evento
type CreateEventoRequest struct {
	Titulo          string     `json:"titulo" binding:"required,min=3,max=100"`
	Descripcion     string     `json:"descripcion" binding:"max=500"`
	FechaHoraInicio *time.Time `json:"fecha_hora_inicio" binding:"required"`
	FechaHoraFin    *time.Time `json:"fecha_hora_fin"`
	TipoEvento      string     `json:"tipo_evento" binding:"oneof=personal trabajo reunion cita recordatorio tarea"`
}

// UpdateEventoRequest representa una solicitud de actualización de evento
type UpdateEventoRequest struct {
	Titulo          *string    `json:"titulo,omitempty" binding:"omitempty,min=3,max=100"`
	Descripcion     *string    `json:"descripcion,omitempty" binding:"omitempty,max=500"`
	FechaHoraInicio *time.Time `json:"fecha_hora_inicio,omitempty"`
	FechaHoraFin    *time.Time `json:"fecha_hora_fin,omitempty"`
	TipoEvento      *string    `json:"tipo_evento,omitempty" binding:"omitempty,oneof=personal trabajo reunion cita recordatorio tarea"`
}

// EventoResponse representa la respuesta con información de evento
type EventoResponse struct {
	IDEvento        int        `json:"id_evento"`
	Titulo          string     `json:"titulo"`
	Descripcion     string     `json:"descripcion"`
	FechaHoraInicio time.Time  `json:"fecha_hora_inicio"`
	FechaHoraFin    *time.Time `json:"fecha_hora_fin"`
	TipoEvento      string     `json:"tipo_evento"`
	FechaCreacion   time.Time  `json:"fecha_creacion"`

	// Estados calculados
	IsUpcoming bool          `json:"is_upcoming"`
	IsActive   bool          `json:"is_active"`
	HasEnded   bool          `json:"has_ended"`
	Duration   time.Duration `json:"duration"`
}
