package entities

import "time"

// Tarea representa una tarea o proyecto del sistema
type Tarea struct {
	IDTarea          int        `json:"id_tarea" db:"id_tarea"`
	Titulo           string     `json:"titulo" db:"titulo"`
	Descripcion      string     `json:"descripcion" db:"descripcion"`
	FechaVencimiento *time.Time `json:"fecha_vencimiento" db:"fecha_vencimiento"`
	Prioridad        string     `json:"prioridad" db:"prioridad"`
	Estado           string     `json:"estado" db:"estado"`
	IDUsuarioCreador int        `json:"id_usuario_creador" db:"id_usuario_creador"`
	IDGrupo          *int       `json:"id_grupo" db:"id_grupo"`
	IDPlantilla      *int       `json:"id_plantilla" db:"id_plantilla"`
	FechaCreacion    *time.Time `json:"fecha_creacion" db:"fecha_creacion"`
}

// TableName devuelve el nombre de la tabla en la base de datos
func (Tarea) TableName() string {
	return "tarea"
}

// Estados de tarea
const (
	EstadoTareaPendiente  = "pendiente"
	EstadoTareaEnProgreso = "en_progreso"
	EstadoTareaCompletada = "completada"
	EstadoTareaCancelada  = "cancelada"
	EstadoTareaSuspendida = "suspendida"
)

// Prioridades de tarea
const (
	PrioridadBaja    = "baja"
	PrioridadMedia   = "media"
	PrioridadAlta    = "alta"
	PrioridadCritica = "critica"
)

// IsOverdue verifica si la tarea está vencida
func (t Tarea) IsOverdue() bool {
	if t.FechaVencimiento == nil {
		return false
	}
	return time.Now().After(*t.FechaVencimiento) && !t.IsCompleted()
}

// IsCompleted verifica si la tarea está completada
func (t Tarea) IsCompleted() bool {
	return t.Estado == EstadoTareaCompletada
}

// IsPending verifica si la tarea está pendiente
func (t Tarea) IsPending() bool {
	return t.Estado == EstadoTareaPendiente
}

// IsInProgress verifica si la tarea está en progreso
func (t Tarea) IsInProgress() bool {
	return t.Estado == EstadoTareaEnProgreso
}

// IsCreatedBy verifica si la tarea fue creada por el usuario especificado
func (t Tarea) IsCreatedBy(userID int) bool {
	return t.IDUsuarioCreador == userID
}

// IsHighPriority verifica si la tarea tiene alta prioridad
func (t Tarea) IsHighPriority() bool {
	return t.Prioridad == PrioridadAlta || t.Prioridad == PrioridadCritica
}

// BelongsToGroup verifica si la tarea pertenece a un grupo
func (t Tarea) BelongsToGroup() bool {
	return t.IDGrupo != nil
}

// HasTemplate verifica si la tarea usa una plantilla
func (t Tarea) HasTemplate() bool {
	return t.IDPlantilla != nil
}
