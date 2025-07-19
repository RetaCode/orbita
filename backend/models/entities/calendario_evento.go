package entities

import "time"

// CalendarioEvento representa un evento en el calendario del usuario
type CalendarioEvento struct {
	IDEvento        int        `json:"id_evento" db:"id_evento"`
	Titulo          string     `json:"titulo" db:"titulo"`
	Descripcion     string     `json:"descripcion" db:"descripcion"`
	FechaHoraInicio *time.Time `json:"fecha_hora_inicio" db:"fecha_hora_inicio"`
	FechaHoraFin    *time.Time `json:"fecha_hora_fin" db:"fecha_hora_fin"`
	IDUsuario       int        `json:"id_usuario" db:"id_usuario"`
	TipoEvento      string     `json:"tipo_evento" db:"tipo_evento"`
	FechaCreacion   *time.Time `json:"fecha_creacion" db:"fecha_creacion"`
}

// TableName devuelve el nombre de la tabla en la base de datos
func (CalendarioEvento) TableName() string {
	return "calendario_evento"
}

// Tipos de evento
const (
	TipoEventoPersonal     = "personal"
	TipoEventoTrabajo      = "trabajo"
	TipoEventoReunion      = "reunion"
	TipoEventoCita         = "cita"
	TipoEventoRecordatorio = "recordatorio"
	TipoEventoTarea        = "tarea"
)

// IsUpcoming verifica si el evento está próximo a ocurrir
func (e CalendarioEvento) IsUpcoming() bool {
	if e.FechaHoraInicio == nil {
		return false
	}
	return time.Now().Before(*e.FechaHoraInicio)
}

// IsActive verifica si el evento está ocurriendo actualmente
func (e CalendarioEvento) IsActive() bool {
	now := time.Now()
	if e.FechaHoraInicio == nil {
		return false
	}
	if e.FechaHoraFin == nil {
		return false
	}
	return now.After(*e.FechaHoraInicio) && now.Before(*e.FechaHoraFin)
}

// HasEnded verifica si el evento ya terminó
func (e CalendarioEvento) HasEnded() bool {
	if e.FechaHoraFin == nil {
		return false
	}
	return time.Now().After(*e.FechaHoraFin)
}

// Duration devuelve la duración del evento
func (e CalendarioEvento) Duration() time.Duration {
	if e.FechaHoraInicio == nil || e.FechaHoraFin == nil {
		return 0
	}
	return e.FechaHoraFin.Sub(*e.FechaHoraInicio)
}

// BelongsToUser verifica si el evento pertenece al usuario especificado
func (e CalendarioEvento) BelongsToUser(userID int) bool {
	return e.IDUsuario == userID
}
