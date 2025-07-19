package entities

import "time"

// EstadoAnimo representa el registro de estado de ánimo de un usuario
type EstadoAnimo struct {
	IDEstado      int        `json:"id_estado" db:"id_estado"`
	IDUsuario     int        `json:"id_usuario" db:"id_usuario"`
	Estado        string     `json:"estado" db:"estado"`
	FechaRegistro *time.Time `json:"fecha_registro" db:"fecha_registro"`
	Notas         string     `json:"notas" db:"notas"`
}

// TableName devuelve el nombre de la tabla en la base de datos
func (EstadoAnimo) TableName() string {
	return "estado_animo"
}

// Estados de ánimo disponibles
const (
	EstadoMuyFeliz    = "muy_feliz"
	EstadoFeliz       = "feliz"
	EstadoNeutral     = "neutral"
	EstadoTriste      = "triste"
	EstadoMuyTriste   = "muy_triste"
	EstadoAnsioso     = "ansioso"
	EstadoEstresado   = "estresado"
	EstadoRelajado    = "relajado"
	EstadoEnergico    = "energico"
	EstadoCansado     = "cansado"
	EstadoMotivado    = "motivado"
	EstadoDesmotivado = "desmotivado"
)

// IsPositive verifica si el estado de ánimo es positivo
func (e EstadoAnimo) IsPositive() bool {
	return e.Estado == EstadoMuyFeliz || e.Estado == EstadoFeliz ||
		e.Estado == EstadoRelajado || e.Estado == EstadoEnergico ||
		e.Estado == EstadoMotivado
}

// IsNegative verifica si el estado de ánimo es negativo
func (e EstadoAnimo) IsNegative() bool {
	return e.Estado == EstadoTriste || e.Estado == EstadoMuyTriste ||
		e.Estado == EstadoAnsioso || e.Estado == EstadoEstresado ||
		e.Estado == EstadoCansado || e.Estado == EstadoDesmotivado
}

// IsNeutral verifica si el estado de ánimo es neutral
func (e EstadoAnimo) IsNeutral() bool {
	return e.Estado == EstadoNeutral
}

// BelongsToUser verifica si el estado pertenece al usuario especificado
func (e EstadoAnimo) BelongsToUser(userID int) bool {
	return e.IDUsuario == userID
}

// IsRecent verifica si el registro es reciente (últimas 24 horas)
func (e EstadoAnimo) IsRecent() bool {
	if e.FechaRegistro == nil {
		return false
	}
	return time.Since(*e.FechaRegistro) <= 24*time.Hour
}

// HasNotes verifica si el estado tiene notas adicionales
func (e EstadoAnimo) HasNotes() bool {
	return e.Notas != ""
}
