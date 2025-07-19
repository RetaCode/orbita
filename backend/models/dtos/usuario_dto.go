package dtos

// UpdatePerfilRequest representa una solicitud de actualización de perfil
type UpdatePerfilRequest struct {
	Nombre            *string `json:"nombre,omitempty" binding:"omitempty,min=2,max=100"`
	Preferencias      *string `json:"preferencias,omitempty"`
	EstadoAnimoActual *string `json:"estado_animo_actual,omitempty"`
}

// PerfilResponse representa la respuesta con información de perfil
type PerfilResponse struct {
	IDUsuario         int    `json:"id_usuario"`
	Correo            string `json:"correo"`
	Nombre            string `json:"nombre"`
	Preferencias      string `json:"preferencias"`
	EstadoAnimoActual string `json:"estado_animo_actual"`
	Avatar            string `json:"avatar,omitempty"`
	FechaCreacion     string `json:"fecha_creacion,omitempty"`
	HasGoogleAuth     bool   `json:"has_google_auth"`

	// Estadísticas del usuario
	TotalTareas        int `json:"total_tareas"`
	TareasCompletadas  int `json:"tareas_completadas"`
	GruposActivos      int `json:"grupos_activos"`
	EstadosRegistrados int `json:"estados_registrados"`
}

// ConfiguracionPrivacidad representa la configuración de privacidad del usuario
type ConfiguracionPrivacidad struct {
	PerfilPublico        bool `json:"perfil_publico"`
	MostrarEstadoAnimo   bool `json:"mostrar_estado_animo"`
	PermitirInvitaciones bool `json:"permitir_invitaciones"`
	NotificacionesEmail  bool `json:"notificaciones_email"`
}

// ConfiguracionNotificaciones representa las preferencias de notificaciones
type ConfiguracionNotificaciones struct {
	TareasVencidas         bool `json:"tareas_vencidas"`
	EventosProximos        bool `json:"eventos_proximos"`
	InvitacionesGrupo      bool `json:"invitaciones_grupo"`
	SolicitudesAmistad     bool `json:"solicitudes_amistad"`
	RecordatoriosBienestar bool `json:"recordatorios_bienestar"`
}

// PreferenciasUsuario representa todas las preferencias del usuario
type PreferenciasUsuario struct {
	Tema                 string                      `json:"tema"` // light, dark, auto
	Idioma               string                      `json:"idioma"`
	ZonaHoraria          string                      `json:"zona_horaria"`
	Privacidad           ConfiguracionPrivacidad     `json:"privacidad"`
	Notificaciones       ConfiguracionNotificaciones `json:"notificaciones"`
	PlantillasPreferidas []int                       `json:"plantillas_preferidas"`
}
