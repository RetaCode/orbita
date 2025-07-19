package entities

import "time"

// UsuarioDocumentacion representa el historial de consulta de documentación por usuario
type UsuarioDocumentacion struct {
	IDUsuario     int        `json:"id_usuario" db:"id_usuario"`
	IDDocumento   int        `json:"id_documento" db:"id_documento"`
	FechaConsulta *time.Time `json:"fecha_consulta" db:"fecha_consulta"`
}

// TableName devuelve el nombre de la tabla en la base de datos
func (UsuarioDocumentacion) TableName() string {
	return "usuario_documentacion"
}

// BelongsToUser verifica si la consulta pertenece al usuario especificado
func (ud UsuarioDocumentacion) BelongsToUser(userID int) bool {
	return ud.IDUsuario == userID
}

// IsRecentlyAccessed verifica si fue consultada recientemente (últimas 24 horas)
func (ud UsuarioDocumentacion) IsRecentlyAccessed() bool {
	if ud.FechaConsulta == nil {
		return false
	}
	return time.Since(*ud.FechaConsulta) <= 24*time.Hour
}

// WasAccessedThisWeek verifica si fue consultada esta semana
func (ud UsuarioDocumentacion) WasAccessedThisWeek() bool {
	if ud.FechaConsulta == nil {
		return false
	}
	return time.Since(*ud.FechaConsulta) <= 7*24*time.Hour
}
