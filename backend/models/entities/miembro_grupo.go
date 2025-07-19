package entities

import "time"

// MiembroGrupo representa la relación entre un usuario y un grupo
type MiembroGrupo struct {
	IDUsuario  int        `json:"id_usuario" db:"id_usuario"`
	IDGrupo    int        `json:"id_grupo" db:"id_grupo"`
	RolEnGrupo string     `json:"rol_en_grupo" db:"rol_en_grupo"`
	FechaUnion *time.Time `json:"fecha_union" db:"fecha_union"`
}

// TableName devuelve el nombre de la tabla en la base de datos
func (MiembroGrupo) TableName() string {
	return "miembro_grupo"
}

// Roles disponibles para miembros de grupo
const (
	RolAdmin     = "admin"
	RolModerador = "moderador"
	RolMiembro   = "miembro"
)

// IsAdmin verifica si el miembro tiene rol de administrador
func (m MiembroGrupo) IsAdmin() bool {
	return m.RolEnGrupo == RolAdmin
}

// IsModerator verifica si el miembro tiene rol de moderador
func (m MiembroGrupo) IsModerator() bool {
	return m.RolEnGrupo == RolModerador
}

// CanManageGroup verifica si el miembro puede administrar el grupo
func (m MiembroGrupo) CanManageGroup() bool {
	return m.IsAdmin() || m.IsModerator()
}
