package entities

import "time"

// UsuarioPlantilla representa la selección de una plantilla por un usuario
type UsuarioPlantilla struct {
	IDUsuario      int        `json:"id_usuario" db:"id_usuario"`
	IDPlantilla    int        `json:"id_plantilla" db:"id_plantilla"`
	FechaSeleccion *time.Time `json:"fecha_seleccion" db:"fecha_seleccion"`
	Configuracion  string     `json:"configuracion" db:"configuracion"`
}

// TableName devuelve el nombre de la tabla en la base de datos
func (UsuarioPlantilla) TableName() string {
	return "usuario_plantilla"
}

// BelongsToUser verifica si la plantilla seleccionada pertenece al usuario
func (up UsuarioPlantilla) BelongsToUser(userID int) bool {
	return up.IDUsuario == userID
}

// IsRecentlySelected verifica si fue seleccionada recientemente (últimos 7 días)
func (up UsuarioPlantilla) IsRecentlySelected() bool {
	if up.FechaSeleccion == nil {
		return false
	}
	return time.Since(*up.FechaSeleccion) <= 7*24*time.Hour
}

// HasConfiguration verifica si tiene configuración personalizada
func (up UsuarioPlantilla) HasConfiguration() bool {
	return up.Configuracion != ""
}
