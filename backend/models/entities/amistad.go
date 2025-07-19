package entities

import "time"

// Amistad representa la relación de amistad entre dos usuarios
type Amistad struct {
	IDUsuario1   int        `json:"id_usuario1" db:"id_usuario1"`
	IDUsuario2   int        `json:"id_usuario2" db:"id_usuario2"`
	FechaAmistad *time.Time `json:"fecha_amistad" db:"fecha_amistad"`
	Estado       string     `json:"estado" db:"estado"`
}

// TableName devuelve el nombre de la tabla en la base de datos
func (Amistad) TableName() string {
	return "amistad"
}

// Estados de amistad
const (
	EstadoAmistadActiva    = "activa"
	EstadoAmistadPendiente = "pendiente"
	EstadoAmistadBloqueada = "bloqueada"
)

// IsActive verifica si la amistad está activa
func (a Amistad) IsActive() bool {
	return a.Estado == EstadoAmistadActiva
}

// IsPending verifica si la amistad está pendiente
func (a Amistad) IsPending() bool {
	return a.Estado == EstadoAmistadPendiente
}

// IsBlocked verifica si la amistad está bloqueada
func (a Amistad) IsBlocked() bool {
	return a.Estado == EstadoAmistadBloqueada
}

// InvolvesUser verifica si el usuario especificado está involucrado en la amistad
func (a Amistad) InvolvesUser(userID int) bool {
	return a.IDUsuario1 == userID || a.IDUsuario2 == userID
}
