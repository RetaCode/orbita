package entities

import "time"

// Usuario representa la entidad usuario del sistema
type Usuario struct {
	IDUsuario         int        `json:"id_usuario" db:"id_usuario"`
	Correo            string     `json:"correo" db:"correo"`
	Nombre            string     `json:"nombre" db:"nombre"`
	Contrasena        string     `json:"contrasena,omitempty" db:"contraseña"`
	Preferencias      string     `json:"preferencias" db:"preferencias"`
	EstadoAnimoActual string     `json:"estado_animo_actual" db:"estado_animo_actual"`
	GoogleID          string     `json:"google_id,omitempty" db:"google_id"`
	Avatar            string     `json:"avatar,omitempty" db:"avatar"`
	FechaCreacion     *time.Time `json:"fecha_creacion,omitempty" db:"fecha_creacion"`
}

// TableName devuelve el nombre de la tabla en la base de datos
func (Usuario) TableName() string {
	return "usuario"
}

// IsEmpty verifica si el usuario está vacío
func (u Usuario) IsEmpty() bool {
	return u.IDUsuario == 0 && u.Correo == ""
}

// HasGoogleAuth verifica si el usuario tiene autenticación de Google
func (u Usuario) HasGoogleAuth() bool {
	return u.GoogleID != ""
}
