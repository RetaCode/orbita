package entities

import "time"

// Documentacion representa recursos y documentación del sistema
type Documentacion struct {
	IDDocumento   int        `json:"id_documento" db:"id_documento"`
	Titulo        string     `json:"titulo" db:"titulo"`
	Contenido     string     `json:"contenido" db:"contenido"`
	Recomendacion string     `json:"recomendacion" db:"recomendacion"`
	Categoria     string     `json:"categoria" db:"categoria"`
	FechaCreacion *time.Time `json:"fecha_creacion" db:"fecha_creacion"`
}

// TableName devuelve el nombre de la tabla en la base de datos
func (Documentacion) TableName() string {
	return "documentacion"
}

// Categorías de documentación
const (
	CategoriaProductividad = "productividad"
	CategoriaBienestar     = "bienestar"
	CategoriaOrganizacion  = "organizacion"
	CategoriaMotivacion    = "motivacion"
	CategoriaSalud         = "salud"
	CategoriaGestionTiempo = "gestion_tiempo"
	CategoriaEstres        = "estres"
	CategoriaMeditacion    = "meditacion"
)

// IsProductivityDoc verifica si es documentación de productividad
func (d Documentacion) IsProductivityDoc() bool {
	return d.Categoria == CategoriaProductividad
}

// IsWellnessDoc verifica si es documentación de bienestar
func (d Documentacion) IsWellnessDoc() bool {
	return d.Categoria == CategoriaBienestar
}

// IsOrganizationDoc verifica si es documentación de organización
func (d Documentacion) IsOrganizationDoc() bool {
	return d.Categoria == CategoriaOrganizacion
}

// HasRecommendation verifica si tiene recomendación
func (d Documentacion) HasRecommendation() bool {
	return d.Recomendacion != ""
}

// IsRecent verifica si es documentación reciente (últimos 30 días)
func (d Documentacion) IsRecent() bool {
	if d.FechaCreacion == nil {
		return false
	}
	return time.Since(*d.FechaCreacion) <= 30*24*time.Hour
}
