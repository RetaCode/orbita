// frontend/lib/mock-data.ts

// =================================================================
// 1. DEFINICIÓN DE TIPOS (INTERFACES)
// =================================================================

// --- Tipos para Tareas ---
export interface TaskData {
  id_tarea: number;
  titulo: string;
  fecha_vencimiento: string | null;
  prioridad: 'baja' | 'media' | 'alta' | 'critica';
  estado: 'pendiente' | 'en_progreso' | 'completada';
  nombre_grupo: string | null;
}

export interface MatrixTask {
  id: number;
  title: string;
  isUrgent: boolean | null;
  isImportant: boolean | null;
}

// --- Tipos para Grupos ---
export interface GroupMember {
  id: number;
  name: string;
  avatarUrl: string;
  rolEnGrupo: 'Creador' | 'Moderador' | 'Miembro';
}

export interface SubTask {
  id: number;
  title: string;
  isCompleted: boolean;
  assignedTo: number; // ID del miembro asignado
}

export interface MainTask {
  id: number;
  title: string;
  subTasks: SubTask[];
}

export interface GroupData {
  id_grupo: number;
  nombre: string;
  total_miembros: number;
  total_tareas: number;
  members: GroupMember[];
}

export interface GroupDetailData extends GroupData {
  descripcion: string;
  mainTasks: MainTask[];
  puedeAdministrar?: boolean; // Para la pestaña de configuración
}

// --- Tipos para Perfil de Usuario ---
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


// =================================================================
// 2. DATOS DE EJEMPLO (CONSTANTES)
// =================================================================

export const userProfileData: PerfilData = {
  id_usuario: 1, correo: 'ricardo@ejemplo.com', nombre: 'Ricardo', avatar: 'https://github.com/shadcn.png', has_google_auth: true, total_tareas: 125, tareas_completadas: 87, grupos_activos: 3,
  preferencias: {
    tema: 'dark', idioma: 'es', zona_horaria: 'America/Costa_Rica',
    privacidad: { perfil_publico: false, mostrar_estado_animo: true },
    notificaciones: { tareas_vencidas: true, recordatorios_bienestar: false },
  },
};

export const matrixTasksData: MatrixTask[] = [
  { id: 1, title: 'Revisar la documentación de la nueva API', isUrgent: null, isImportant: null },
  { id: 2, title: 'Comprar un nuevo mouse', isUrgent: null, isImportant: null },
  { id: 3, title: 'Llamar al contador', isUrgent: null, isImportant: null },
  { id: 4, title: 'Terminar reporte para mañana', isUrgent: true, isImportant: true },
  { id: 5, title: 'Planificar el próximo sprint', isUrgent: false, isImportant: true },
];

export const tasksData: TaskData[] = [
  { id_tarea: 1, titulo: 'Diseñar la base de datos para el proyecto', fecha_vencimiento: '2025-08-10T23:59:59Z', prioridad: 'critica', estado: 'completada', nombre_grupo: 'Proyecto Final' },
  { id_tarea: 2, titulo: 'Crear los componentes de autenticación', fecha_vencimiento: '2025-08-12T23:59:59Z', prioridad: 'alta', estado: 'en_progreso', nombre_grupo: 'Proyecto Final' },
  { id_tarea: 3, titulo: 'Investigar librerías de gráficos', fecha_vencimiento: '2025-08-15T23:59:59Z', prioridad: 'media', estado: 'pendiente', nombre_grupo: null },
];

export const userGroupsData: GroupData[] = [
  { 
    id_grupo: 1, 
    nombre: 'Proyecto Final - Desarrollo Web', 
    total_miembros: 4,
    total_tareas: 18,
    members: [
      { id: 1, name: 'Ricardo', avatarUrl: 'https://github.com/shadcn.png', rolEnGrupo: 'Creador' },
      { id: 2, name: 'Ana', avatarUrl: 'https://github.com/anacode.png', rolEnGrupo: 'Moderador' },
      { id: 3, name: 'Carlos', avatarUrl: 'https://github.com/carlosdev.png', rolEnGrupo: 'Miembro' },
      { id: 4, name: 'Maria', avatarUrl: 'https://github.com/maria-ux.png', rolEnGrupo: 'Miembro' },
    ]
  },
  { 
    id_grupo: 2, 
    nombre: 'Investigación de IA', 
    total_miembros: 3,
    total_tareas: 12,
    members: [
      { id: 1, name: 'Ricardo', avatarUrl: 'https://github.com/shadcn.png', rolEnGrupo: 'Creador' },
      { id: 5, name: 'Luis', avatarUrl: 'https://github.com/luis-data.png', rolEnGrupo: 'Miembro' },
      { id: 6, name: 'Sofia', avatarUrl: 'https://github.com/sofia-ml.png', rolEnGrupo: 'Miembro' },
    ]
  },
];

export const groupDetailData: GroupDetailData = {
  id_grupo: 1, 
  nombre: 'Proyecto Final - Desarrollo Web', 
  descripcion: 'Grupo dedicado al desarrollo del proyecto final de la materia de Desarrollo de Aplicaciones Web.',
  total_miembros: 4,
  total_tareas: 18,
  puedeAdministrar: true,
  members: [
    { id: 1, name: 'Ricardo', avatarUrl: 'https://github.com/shadcn.png', rolEnGrupo: 'Creador' },
    { id: 2, name: 'Ana', avatarUrl: 'https://github.com/anacode.png', rolEnGrupo: 'Moderador' },
    { id: 3, name: 'Carlos', avatarUrl: 'https://github.com/carlosdev.png', rolEnGrupo: 'Miembro' },
    { id: 4, name: 'Maria', avatarUrl: 'https://github.com/maria-ux.png', rolEnGrupo: 'Miembro' },
  ],
  mainTasks: [
    {
      id: 101,
      title: 'Fase 1: Diseño y Planificación de la UI/UX',
      subTasks: [
        { id: 201, title: 'Crear wireframes de todas las páginas', isCompleted: true, assignedTo: 4 },
        { id: 202, title: 'Diseñar el prototipo en alta fidelidad', isCompleted: true, assignedTo: 4 },
        { id: 203, title: 'Definir la paleta de colores y tipografía', isCompleted: false, assignedTo: 1 },
      ]
    },
    {
      id: 102,
      title: 'Fase 2: Desarrollo del Backend',
      subTasks: [
        { id: 204, title: 'Modelado de la base de datos PostgreSQL', isCompleted: true, assignedTo: 3 },
        { id: 205, title: 'Implementar endpoints de autenticación', isCompleted: false, assignedTo: 3 },
        { id: 206, title: 'Crear CRUD para tareas y grupos', isCompleted: false, assignedTo: 2 },
      ]
    }
  ]
};