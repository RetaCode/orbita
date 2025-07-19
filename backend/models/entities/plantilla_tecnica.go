package entities

import "time"

// PlantillaTecnica representa una metodología o técnica de productividad
type PlantillaTecnica struct {
	IDPlantilla   int        `json:"id_plantilla" db:"id_plantilla"`
	Nombre        string     `json:"nombre" db:"nombre"`
	Descripcion   string     `json:"descripcion" db:"descripcion"`
	TipoMetodo    string     `json:"tipo_metodo" db:"tipo_metodo"`
	FechaCreacion *time.Time `json:"fecha_creacion" db:"fecha_creacion"`
}

// TableName devuelve el nombre de la tabla en la base de datos
func (PlantillaTecnica) TableName() string {
	return "plantilla_tecnica"
}

// Tipos de método disponibles
const (
	TipoProductividad = "productividad"
	TipoOrganizacion  = "organizacion"
	TipoPlanificacion = "planificacion"
	TipoPriorizacion  = "priorizacion"
	TipoGestionTiempo = "gestion_tiempo"
	TipoEnfoque       = "enfoque"
	TipoBienestar     = "bienestar"
)

// IsProductivityMethod verifica si es un método de productividad
func (p PlantillaTecnica) IsProductivityMethod() bool {
	return p.TipoMetodo == TipoProductividad
}

// IsOrganizationMethod verifica si es un método de organización
func (p PlantillaTecnica) IsOrganizationMethod() bool {
	return p.TipoMetodo == TipoOrganizacion
}

// IsPlanningMethod verifica si es un método de planificación
func (p PlantillaTecnica) IsPlanningMethod() bool {
	return p.TipoMetodo == TipoPlanificacion
}

// IsPrioritizationMethod verifica si es un método de priorización
func (p PlantillaTecnica) IsPrioritizationMethod() bool {
	return p.TipoMetodo == TipoPriorizacion
}

// IsTimeManagementMethod verifica si es un método de gestión del tiempo
func (p PlantillaTecnica) IsTimeManagementMethod() bool {
	return p.TipoMetodo == TipoGestionTiempo
}

// IsWellnessMethod verifica si es un método de bienestar
func (p PlantillaTecnica) IsWellnessMethod() bool {
	return p.TipoMetodo == TipoBienestar
}
