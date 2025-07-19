// Package models proporciona todas las estructuras de datos del sistema
// Organizadas siguiendo principios de Clean Architecture
package models

// Re-exportar entidades para mantener compatibilidad
import (
	"backend/models/entities"
)

// Entidades principales del dominio
type Usuario = entities.Usuario
type Grupo = entities.Grupo
type MiembroGrupo = entities.MiembroGrupo
type Amistad = entities.Amistad
type Tarea = entities.Tarea
type AsignacionTarea = entities.AsignacionTarea
type CalendarioEvento = entities.CalendarioEvento
type EstadoAnimo = entities.EstadoAnimo
type PlantillaTecnica = entities.PlantillaTecnica
type UsuarioPlantilla = entities.UsuarioPlantilla
type Alerta = entities.Alerta
type Documentacion = entities.Documentacion
type UsuarioDocumentacion = entities.UsuarioDocumentacion

// Constantes de entidades (re-exportadas para compatibilidad)
const (
	// Estados de tarea
	EstadoTareaPendiente  = entities.EstadoTareaPendiente
	EstadoTareaEnProgreso = entities.EstadoTareaEnProgreso
	EstadoTareaCompletada = entities.EstadoTareaCompletada
	EstadoTareaCancelada  = entities.EstadoTareaCancelada
	EstadoTareaSuspendida = entities.EstadoTareaSuspendida

	// Prioridades de tarea
	PrioridadBaja    = entities.PrioridadBaja
	PrioridadMedia   = entities.PrioridadMedia
	PrioridadAlta    = entities.PrioridadAlta
	PrioridadCritica = entities.PrioridadCritica

	// Roles de grupo
	RolAdmin     = entities.RolAdmin
	RolModerador = entities.RolModerador
	RolMiembro   = entities.RolMiembro

	// Estados de amistad
	EstadoAmistadActiva    = entities.EstadoAmistadActiva
	EstadoAmistadPendiente = entities.EstadoAmistadPendiente
	EstadoAmistadBloqueada = entities.EstadoAmistadBloqueada

	// Estados de ánimo
	EstadoMuyFeliz    = entities.EstadoMuyFeliz
	EstadoFeliz       = entities.EstadoFeliz
	EstadoNeutral     = entities.EstadoNeutral
	EstadoTriste      = entities.EstadoTriste
	EstadoMuyTriste   = entities.EstadoMuyTriste
	EstadoAnsioso     = entities.EstadoAnsioso
	EstadoEstresado   = entities.EstadoEstresado
	EstadoRelajado    = entities.EstadoRelajado
	EstadoEnergico    = entities.EstadoEnergico
	EstadoCansado     = entities.EstadoCansado
	EstadoMotivado    = entities.EstadoMotivado
	EstadoDesmotivado = entities.EstadoDesmotivado

	// Tipos de evento
	TipoEventoPersonal     = entities.TipoEventoPersonal
	TipoEventoTrabajo      = entities.TipoEventoTrabajo
	TipoEventoReunion      = entities.TipoEventoReunion
	TipoEventoCita         = entities.TipoEventoCita
	TipoEventoRecordatorio = entities.TipoEventoRecordatorio
	TipoEventoTarea        = entities.TipoEventoTarea

	// Tipos de plantilla técnica
	TipoProductividad = entities.TipoProductividad
	TipoOrganizacion  = entities.TipoOrganizacion
	TipoPlanificacion = entities.TipoPlanificacion
	TipoPriorizacion  = entities.TipoPriorizacion
	TipoGestionTiempo = entities.TipoGestionTiempo
	TipoEnfoque       = entities.TipoEnfoque
	TipoBienestar     = entities.TipoBienestar

	// Tipos de alerta
	TipoAlertaTarea        = entities.TipoAlertaTarea
	TipoAlertaEvento       = entities.TipoAlertaEvento
	TipoAlertaGrupo        = entities.TipoAlertaGrupo
	TipoAlertaAmistad      = entities.TipoAlertaAmistad
	TipoAlertaSistema      = entities.TipoAlertaSistema
	TipoAlertaBienestar    = entities.TipoAlertaBienestar
	TipoAlertaRecordatorio = entities.TipoAlertaRecordatorio

	// Categorías de documentación
	CategoriaProductividad = entities.CategoriaProductividad
	CategoriaBienestar     = entities.CategoriaBienestar
	CategoriaOrganizacion  = entities.CategoriaOrganizacion
	CategoriaMotivacion    = entities.CategoriaMotivacion
	CategoriaSalud         = entities.CategoriaSalud
	CategoriaGestionTiempo = entities.CategoriaGestionTiempo
	CategoriaEstres        = entities.CategoriaEstres
	CategoriaMeditacion    = entities.CategoriaMeditacion

	// Estados de asignación
	EstadoAsignacionPendiente  = entities.EstadoAsignacionPendiente
	EstadoAsignacionAceptada   = entities.EstadoAsignacionAceptada
	EstadoAsignacionRechazada  = entities.EstadoAsignacionRechazada
	EstadoAsignacionEnProgreso = entities.EstadoAsignacionEnProgreso
	EstadoAsignacionCompletada = entities.EstadoAsignacionCompletada
)
