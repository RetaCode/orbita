package entities

import "time"

// AsignacionTarea representa la asignación de una tarea a un usuario
type AsignacionTarea struct {
	IDTarea          int        `json:"id_tarea" db:"id_tarea"`
	IDUsuario        int        `json:"id_usuario" db:"id_usuario"`
	FechaAsignacion  *time.Time `json:"fecha_asignacion" db:"fecha_asignacion"`
	EstadoAsignacion string     `json:"estado_asignacion" db:"estado_asignacion"`
}

// TableName devuelve el nombre de la tabla en la base de datos
func (AsignacionTarea) TableName() string {
	return "asignacion_tarea"
}

// Estados de asignación
const (
	EstadoAsignacionPendiente  = "pendiente"
	EstadoAsignacionAceptada   = "aceptada"
	EstadoAsignacionRechazada  = "rechazada"
	EstadoAsignacionEnProgreso = "en_progreso"
	EstadoAsignacionCompletada = "completada"
)

// IsPending verifica si la asignación está pendiente
func (a AsignacionTarea) IsPending() bool {
	return a.EstadoAsignacion == EstadoAsignacionPendiente
}

// IsAccepted verifica si la asignación fue aceptada
func (a AsignacionTarea) IsAccepted() bool {
	return a.EstadoAsignacion == EstadoAsignacionAceptada
}

// IsRejected verifica si la asignación fue rechazada
func (a AsignacionTarea) IsRejected() bool {
	return a.EstadoAsignacion == EstadoAsignacionRechazada
}

// IsCompleted verifica si la asignación está completada
func (a AsignacionTarea) IsCompleted() bool {
	return a.EstadoAsignacion == EstadoAsignacionCompletada
}

// IsInProgress verifica si la asignación está en progreso
func (a AsignacionTarea) IsInProgress() bool {
	return a.EstadoAsignacion == EstadoAsignacionEnProgreso
}
