package dtos

import "time"

// CreateGrupoRequest representa una solicitud de creación de grupo
type CreateGrupoRequest struct {
	Nombre      string `json:"nombre" binding:"required,min=3,max=100"`
	Descripcion string `json:"descripcion" binding:"max=500"`
}

// UpdateGrupoRequest representa una solicitud de actualización de grupo
type UpdateGrupoRequest struct {
	Nombre      *string `json:"nombre,omitempty" binding:"omitempty,min=3,max=100"`
	Descripcion *string `json:"descripcion,omitempty" binding:"omitempty,max=500"`
}

// JoinGrupoRequest representa una solicitud para unirse a un grupo
type JoinGrupoRequest struct {
	RolEnGrupo string `json:"rol_en_grupo" binding:"oneof=miembro moderador"`
	Mensaje    string `json:"mensaje,omitempty"`
}

// InvitarMiembroRequest representa una solicitud de invitación a grupo
type InvitarMiembroRequest struct {
	IDUsuario  int    `json:"id_usuario" binding:"required"`
	RolEnGrupo string `json:"rol_en_grupo" binding:"oneof=miembro moderador"`
	Mensaje    string `json:"mensaje,omitempty"`
}

// GrupoResponse representa la respuesta con información de grupo
type GrupoResponse struct {
	IDGrupo       int       `json:"id_grupo"`
	Nombre        string    `json:"nombre"`
	Descripcion   string    `json:"descripcion"`
	IDCreador     int       `json:"id_creador"`
	FechaCreacion time.Time `json:"fecha_creacion"`

	// Información adicional
	NombreCreador    string `json:"nombre_creador"`
	TotalMiembros    int    `json:"total_miembros"`
	TotalTareas      int    `json:"total_tareas"`
	RolUsuario       string `json:"rol_usuario,omitempty"` // rol del usuario que consulta
	PuedeAdministrar bool   `json:"puede_administrar"`
}

// MiembroGrupoResponse representa la información de un miembro de grupo
type MiembroGrupoResponse struct {
	IDUsuario     int       `json:"id_usuario"`
	NombreUsuario string    `json:"nombre_usuario"`
	Correo        string    `json:"correo,omitempty"`
	Avatar        string    `json:"avatar,omitempty"`
	RolEnGrupo    string    `json:"rol_en_grupo"`
	FechaUnion    time.Time `json:"fecha_union"`
	EsCreador     bool      `json:"es_creador"`
	EstaActivo    bool      `json:"esta_activo"`
}

// GrupoDetalleResponse representa información detallada de un grupo
type GrupoDetalleResponse struct {
	GrupoResponse
	Miembros        []MiembroGrupoResponse `json:"miembros"`
	TareasRecientes []interface{}          `json:"tareas_recientes"` // Se puede tipar más específicamente
	Estadisticas    GrupoStatsResponse     `json:"estadisticas"`
}

// GrupoStatsResponse representa estadísticas de un grupo
type GrupoStatsResponse struct {
	TotalMiembros     int `json:"total_miembros"`
	MiembrosActivos   int `json:"miembros_activos"`
	TotalTareas       int `json:"total_tareas"`
	TareasCompletadas int `json:"tareas_completadas"`
	TareasPendientes  int `json:"tareas_pendientes"`
}

// GrupoListResponse representa una lista paginada de grupos
type GrupoListResponse struct {
	Grupos     []GrupoResponse `json:"grupos"`
	Total      int             `json:"total"`
	Pagina     int             `json:"pagina"`
	TotalPages int             `json:"total_pages"`
}
