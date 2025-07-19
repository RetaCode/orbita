package entities

import "time"

// Grupo representa un grupo de trabajo/colaboración
type Grupo struct {
	IDGrupo       int        `json:"id_grupo" db:"id_grupo"`
	Nombre        string     `json:"nombre" db:"nombre"`
	Descripcion   string     `json:"descripcion" db:"descripcion"`
	IDCreador     int        `json:"id_creador" db:"id_creador"`
	FechaCreacion *time.Time `json:"fecha_creacion" db:"fecha_creacion"`
}

// TableName devuelve el nombre de la tabla en la base de datos
func (Grupo) TableName() string {
	return "grupo"
}

// IsCreatedBy verifica si el grupo fue creado por el usuario especificado
func (g Grupo) IsCreatedBy(userID int) bool {
	return g.IDCreador == userID
}
