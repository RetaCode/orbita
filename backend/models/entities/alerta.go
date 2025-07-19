package entities

import "time"

// Alerta representa una notificación o alerta del sistema
type Alerta struct {
	IDAlerta      int        `json:"id_alerta" db:"id_alerta"`
	Tipo          string     `json:"tipo" db:"tipo"`
	Mensaje       string     `json:"mensaje" db:"mensaje"`
	FechaCreacion *time.Time `json:"fecha_creacion" db:"fecha_creacion"`
	IDUsuario     int        `json:"id_usuario" db:"id_usuario"`
	Leida         bool       `json:"leida" db:"leida"`
}

// TableName devuelve el nombre de la tabla en la base de datos
func (Alerta) TableName() string {
	return "alerta"
}

// Tipos de alerta
const (
	TipoAlertaTarea        = "tarea"
	TipoAlertaEvento       = "evento"
	TipoAlertaGrupo        = "grupo"
	TipoAlertaAmistad      = "amistad"
	TipoAlertaSistema      = "sistema"
	TipoAlertaBienestar    = "bienestar"
	TipoAlertaRecordatorio = "recordatorio"
)

// Prioridades de alerta
const (
	PrioridadAlertaBaja    = "baja"
	PrioridadAlertaMedia   = "media"
	PrioridadAlertaAlta    = "alta"
	PrioridadAlertaUrgente = "urgente"
)

// IsRead verifica si la alerta ha sido leída
func (a Alerta) IsRead() bool {
	return a.Leida
}

// IsUnread verifica si la alerta no ha sido leída
func (a Alerta) IsUnread() bool {
	return !a.Leida
}

// BelongsToUser verifica si la alerta pertenece al usuario especificado
func (a Alerta) BelongsToUser(userID int) bool {
	return a.IDUsuario == userID
}

// IsRecent verifica si la alerta es reciente (últimas 24 horas)
func (a Alerta) IsRecent() bool {
	if a.FechaCreacion == nil {
		return false
	}
	return time.Since(*a.FechaCreacion) <= 24*time.Hour
}

// IsTaskAlert verifica si es una alerta de tarea
func (a Alerta) IsTaskAlert() bool {
	return a.Tipo == TipoAlertaTarea
}

// IsEventAlert verifica si es una alerta de evento
func (a Alerta) IsEventAlert() bool {
	return a.Tipo == TipoAlertaEvento
}

// IsSystemAlert verifica si es una alerta del sistema
func (a Alerta) IsSystemAlert() bool {
	return a.Tipo == TipoAlertaSistema
}

// IsWellnessAlert verifica si es una alerta de bienestar
func (a Alerta) IsWellnessAlert() bool {
	return a.Tipo == TipoAlertaBienestar
}
