-- Crear extensión para UUID si no existe
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Crear tabla USUARIO actualizada
CREATE TABLE IF NOT EXISTS usuario (
  id_usuario SERIAL PRIMARY KEY,
  correo VARCHAR(255) UNIQUE NOT NULL,
  nombre VARCHAR(100),
  contraseña TEXT,
  preferencias TEXT,
  estado_animo_actual TEXT,
  google_id VARCHAR(255) UNIQUE,
  avatar TEXT,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- GRUPO
CREATE TABLE IF NOT EXISTS grupo (
  id_grupo SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  id_creador INTEGER REFERENCES usuario(id_usuario) ON DELETE CASCADE,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- MIEMBRO_GRUPO
CREATE TABLE IF NOT EXISTS miembro_grupo (
  id_usuario INTEGER REFERENCES usuario(id_usuario) ON DELETE CASCADE,
  id_grupo INTEGER REFERENCES grupo(id_grupo) ON DELETE CASCADE,
  rol_en_grupo VARCHAR(50) DEFAULT 'miembro',
  fecha_union DATE DEFAULT CURRENT_DATE,
  PRIMARY KEY (id_usuario, id_grupo)
);
-- AMISTAD
CREATE TABLE IF NOT EXISTS amistad (
  id_usuario1 INTEGER REFERENCES usuario(id_usuario) ON DELETE CASCADE,
  id_usuario2 INTEGER REFERENCES usuario(id_usuario) ON DELETE CASCADE,
  fecha_amistad DATE DEFAULT CURRENT_DATE,
  estado VARCHAR(20) DEFAULT 'activa',
  PRIMARY KEY (id_usuario1, id_usuario2),
  CONSTRAINT no_self_friend CHECK (id_usuario1 != id_usuario2),
  CONSTRAINT order_constraint CHECK (id_usuario1 < id_usuario2)
);
-- PLANTILLA_TECNICA
CREATE TABLE IF NOT EXISTS plantilla_tecnica (
  id_plantilla SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  tipo_metodo VARCHAR(50),
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- USUARIO_PLANTILLA
CREATE TABLE IF NOT EXISTS usuario_plantilla (
  id_usuario INTEGER REFERENCES usuario(id_usuario) ON DELETE CASCADE,
  id_plantilla INTEGER REFERENCES plantilla_tecnica(id_plantilla) ON DELETE CASCADE,
  fecha_seleccion DATE DEFAULT CURRENT_DATE,
  configuracion TEXT,
  PRIMARY KEY (id_usuario, id_plantilla)
);
-- TAREA
CREATE TABLE IF NOT EXISTS tarea (
  id_tarea SERIAL PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  descripcion TEXT,
  fecha_vencimiento DATE,
  prioridad VARCHAR(50) DEFAULT 'media',
  estado VARCHAR(50) DEFAULT 'pendiente',
  id_usuario_creador INTEGER REFERENCES usuario(id_usuario) ON DELETE CASCADE,
  id_grupo INTEGER REFERENCES grupo(id_grupo) ON DELETE
  SET NULL,
    id_plantilla INTEGER REFERENCES plantilla_tecnica(id_plantilla) ON DELETE
  SET NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ASIGNACION_TAREA
CREATE TABLE IF NOT EXISTS asignacion_tarea (
  id_tarea INTEGER REFERENCES tarea(id_tarea) ON DELETE CASCADE,
  id_usuario INTEGER REFERENCES usuario(id_usuario) ON DELETE CASCADE,
  fecha_asignacion DATE DEFAULT CURRENT_DATE,
  estado_asignacion VARCHAR(50) DEFAULT 'pendiente',
  PRIMARY KEY (id_tarea, id_usuario)
);
-- CALENDARIO_EVENTO
CREATE TABLE IF NOT EXISTS calendario_evento (
  id_evento SERIAL PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  descripcion TEXT,
  fecha_hora_inicio TIMESTAMP NOT NULL,
  fecha_hora_fin TIMESTAMP,
  id_usuario INTEGER REFERENCES usuario(id_usuario) ON DELETE CASCADE,
  tipo_evento VARCHAR(50) DEFAULT 'personal',
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ALERTA
CREATE TABLE IF NOT EXISTS alerta (
  id_alerta SERIAL PRIMARY KEY,
  tipo VARCHAR(50) NOT NULL,
  mensaje TEXT NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  id_usuario INTEGER REFERENCES usuario(id_usuario) ON DELETE CASCADE,
  leida BOOLEAN DEFAULT FALSE
);
-- ESTADO_ANIMO
CREATE TABLE IF NOT EXISTS estado_animo (
  id_estado SERIAL PRIMARY KEY,
  id_usuario INTEGER REFERENCES usuario(id_usuario) ON DELETE CASCADE,
  estado VARCHAR(50) NOT NULL,
  fecha_registro DATE DEFAULT CURRENT_DATE,
  notas TEXT
);
-- DOCUMENTACION
CREATE TABLE IF NOT EXISTS documentacion (
  id_documento SERIAL PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  contenido TEXT NOT NULL,
  recomendacion TEXT,
  categoria VARCHAR(50),
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- USUARIO_DOCUMENTACION
CREATE TABLE IF NOT EXISTS usuario_documentacion (
  id_usuario INTEGER REFERENCES usuario(id_usuario) ON DELETE CASCADE,
  id_documento INTEGER REFERENCES documentacion(id_documento) ON DELETE CASCADE,
  fecha_consulta DATE DEFAULT CURRENT_DATE,
  PRIMARY KEY (id_usuario, id_documento)
);
-- Crear índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_usuario_correo ON usuario(correo);
CREATE INDEX IF NOT EXISTS idx_usuario_google_id ON usuario(google_id);
CREATE INDEX IF NOT EXISTS idx_tarea_usuario_creador ON tarea(id_usuario_creador);
CREATE INDEX IF NOT EXISTS idx_tarea_estado ON tarea(estado);
CREATE INDEX IF NOT EXISTS idx_tarea_fecha_vencimiento ON tarea(fecha_vencimiento);
CREATE INDEX IF NOT EXISTS idx_evento_usuario ON calendario_evento(id_usuario);
CREATE INDEX IF NOT EXISTS idx_evento_fecha ON calendario_evento(fecha_hora_inicio);
CREATE INDEX IF NOT EXISTS idx_estado_animo_usuario ON estado_animo(id_usuario);
CREATE INDEX IF NOT EXISTS idx_alerta_usuario ON alerta(id_usuario);
-- Insertar algunas plantillas técnicas por defecto
INSERT INTO plantilla_tecnica (nombre, descripcion, tipo_metodo)
VALUES (
    'Pomodoro',
    'Técnica de gestión del tiempo que utiliza intervalos de 25 minutos',
    'productividad'
  ),
  (
    'Getting Things Done (GTD)',
    'Sistema de organización de tareas y proyectos',
    'productividad'
  ),
  (
    'Kanban Personal',
    'Sistema visual de gestión de flujo de trabajo',
    'organizacion'
  ),
  (
    'Time Blocking',
    'Asignación de bloques de tiempo específicos para tareas',
    'planificacion'
  ),
  (
    'Matriz de Eisenhower',
    'Clasificación de tareas por urgencia e importancia',
    'priorizacion'
  ) ON CONFLICT DO NOTHING;
-- Insertar documentación inicial
INSERT INTO documentacion (titulo, contenido, recomendacion, categoria)
VALUES (
    'Gestión del Estrés',
    'Técnicas para manejar el estrés laboral y personal',
    'Practica ejercicios de respiración diarios',
    'bienestar'
  ),
  (
    'Técnicas de Meditación',
    'Guía básica para comenzar con la meditación mindfulness',
    'Dedica 10 minutos diarios a la meditación',
    'bienestar'
  ),
  (
    'Organización del Espacio de Trabajo',
    'Consejos para mantener un ambiente productivo',
    'Mantén tu escritorio limpio y organizado',
    'productividad'
  ),
  (
    'Equilibrio Trabajo-Vida',
    'Estrategias para balancear responsabilidades personales y profesionales',
    'Establece límites claros entre trabajo y tiempo personal',
    'bienestar'
  ) ON CONFLICT DO NOTHING;