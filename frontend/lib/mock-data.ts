// frontend/lib/mock-data.ts

export interface PerfilData {
  id_usuario: number;
  correo: string;
  nombre: string;
  avatar: string;
  has_google_auth: boolean;
  total_tareas: number;
  tareas_completadas: number;
  grupos_activos: number;
  preferencias: {
    tema: 'light' | 'dark' | 'auto';
    idioma: 'es' | 'en';
    zona_horaria: string;
    privacidad: {
      perfil_publico: boolean;
      mostrar_estado_animo: boolean;
    };
    notificaciones: {
      tareas_vencidas: boolean;
      recordatorios_bienestar: boolean;
    };
  };
}
export const userProfileData: PerfilData = {
  id_usuario: 1, correo: 'ricardo@ejemplo.com', nombre: 'Ricardo', avatar: 'https://github.com/shadcn.png', has_google_auth: true, total_tareas: 125, tareas_completadas: 87, grupos_activos: 3,
  preferencias: {
    tema: 'dark', idioma: 'es', zona_horaria: 'America/Costa_Rica',
    privacidad: { perfil_publico: false, mostrar_estado_animo: true },
    notificaciones: { tareas_vencidas: true, recordatorios_bienestar: false },
  },
};

export interface MatrixTask {
  id: number;
  title: string;
  isUrgent: boolean | null;
  isImportant: boolean | null;
}
export const matrixTasksData: MatrixTask[] = [
  { id: 1, title: 'Revisar la documentación de la nueva API', isUrgent: null, isImportant: null },
  { id: 2, title: 'Comprar un nuevo mouse', isUrgent: null, isImportant: null },
  { id: 3, title: 'Llamar al contador', isUrgent: null, isImportant: null },
  { id: 4, title: 'Terminar reporte para mañana', isUrgent: true, isImportant: true },
  { id: 5, title: 'Planificar el próximo sprint', isUrgent: false, isImportant: true },
];

export interface TaskData {
  id_tarea: number;
  titulo: string;
  fecha_vencimiento: string | null;
  prioridad: 'baja' | 'media' | 'alta' | 'critica';
  estado: 'pendiente' | 'en_progreso' | 'completada';
  nombre_grupo: string | null;
}
export const tasksData: TaskData[] = [
  { id_tarea: 1, titulo: 'Diseñar la base de datos para el proyecto', fecha_vencimiento: '2025-08-10T23:59:59Z', prioridad: 'critica', estado: 'completada', nombre_grupo: 'Proyecto Final' },
  { id_tarea: 2, titulo: 'Crear los componentes de autenticación', fecha_vencimiento: '2025-08-12T23:59:59Z', prioridad: 'alta', estado: 'en_progreso', nombre_grupo: 'Proyecto Final' },
  { id_tarea: 3, titulo: 'Investigar librerías de gráficos', fecha_vencimiento: '2025-08-15T23:59:59Z', prioridad: 'media', estado: 'pendiente', nombre_grupo: null },
];

export interface GroupData {
  id_grupo: number;
  nombre: string;
  total_miembros: number;
}
export const userGroupsData: GroupData[] = [
  { id_grupo: 1, nombre: 'Proyecto Final - Desarrollo Web', total_miembros: 4 },
  { id_grupo: 2, nombre: 'Investigación de IA', total_miembros: 3 },
];