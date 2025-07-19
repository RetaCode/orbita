# Orbita Backend

Sistema de gestión de tareas y bienestar personal con autenticación Google OAuth2.

## Características

- **Autenticación completa**: Login tradicional y Google OAuth2
- **Gestión de usuarios**: Perfiles, preferencias y estado de ánimo
- **Grupos y colaboración**: Creación y gestión de grupos de trabajo
- **Gestión de tareas**: Creación, asignación y seguimiento de tareas
- **Calendario**: Eventos y recordatorios personales
- **Plantillas técnicas**: Metodologías como Pomodoro, GTD, Kanban
- **Seguimiento de bienestar**: Registro de estados de ánimo
- **Documentación**: Recursos y recomendaciones de bienestar

## Estructura de la Base de Datos

### Tablas Principales

1. **usuario** - Información básica de usuarios
2. **grupo** - Grupos de trabajo/estudio
3. **miembro_grupo** - Relación usuarios-grupos
4. **amistad** - Conexiones entre usuarios
5. **tarea** - Tareas y proyectos
6. **asignacion_tarea** - Asignación de tareas a usuarios
7. **calendario_evento** - Eventos en calendario personal
8. **estado_animo** - Historial de estados de ánimo
9. **plantilla_tecnica** - Metodologías de productividad
10. **documentacion** - Recursos y recomendaciones

## Configuración

### Variables de Entorno

Crea un archivo `.env` con las siguientes variables:

```env
# Base de datos
DB_URL=postgres://user:password@localhost:5434/orbita_db?sslmode=disable

# JWT
JWT_SECRET=tu_jwt_secret_super_seguro_aqui

# Google OAuth2
GOOGLE_CLIENT_ID=tu_google_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_google_client_secret_aqui
GOOGLE_REDIRECT_URL=http://localhost:8080/auth/google/callback

# Email (para recuperación de contraseñas)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=tu_email@gmail.com
SMTP_PASSWORD=tu_app_password_aqui

# Servidor
PORT=8080
```

### Configuración de Google OAuth2

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google+
4. Crea credenciales OAuth 2.0:
   - Tipo: Aplicación web
   - Orígenes autorizados: `http://localhost:8080`
   - URI de redirección: `http://localhost:8080/auth/google/callback`
5. Copia el Client ID y Client Secret al archivo `.env`

## Instalación y Ejecución

### 1. Instalar dependencias

```bash
go mod tidy
```

### 2. Ejecutar migraciones

```bash
# Asegúrate de que PostgreSQL esté ejecutándose
./migrate.sh
```

### 3. Ejecutar el servidor

```bash
go run main.go
```

El servidor estará disponible en `http://localhost:8080`

## API Endpoints

### Autenticación

- `POST /auth/register` - Registro tradicional
- `POST /auth/login` - Login tradicional
- `GET /auth/google` - Iniciar login con Google
- `POST /auth/google/callback` - Callback de Google OAuth
- `POST /auth/enviar-recuperacion` - Enviar email de recuperación
- `POST /auth/restablecer` - Restablecer contraseña

### Perfil de Usuario

- `GET /api/perfil` - Obtener perfil del usuario
- `PUT /api/perfil` - Actualizar perfil del usuario

### Grupos

- `POST /api/grupos` - Crear nuevo grupo
- `GET /api/grupos` - Obtener grupos del usuario
- `POST /api/grupos/:id/join` - Unirse a un grupo

### Tareas

- `POST /api/tareas` - Crear nueva tarea
- `GET /api/tareas` - Obtener tareas del usuario
- `PUT /api/tareas/:id` - Actualizar tarea
- `POST /api/tareas/:id/asignar` - Asignar tarea a usuario

### Calendario

- `POST /api/eventos` - Crear evento
- `GET /api/eventos` - Obtener eventos del usuario

### Estado de Ánimo

- `POST /api/estado-animo` - Registrar estado de ánimo
- `GET /api/estado-animo` - Obtener historial de estados

### Plantillas Técnicas

- `GET /api/plantillas` - Obtener plantillas disponibles
- `GET /api/mis-plantillas` - Obtener plantillas del usuario
- `POST /api/plantillas/:id/seleccionar` - Seleccionar plantilla

### Documentación

- `GET /api/documentacion` - Obtener documentación disponible

## Ejemplos de Uso

### Registro de Usuario

```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "correo": "usuario@ejemplo.com",
    "nombre": "Juan Pérez",
    "contrasena": "password123"
  }'
```

### Login con Google

```bash
# 1. Obtener URL de Google
curl http://localhost:8080/auth/google

# 2. Redirigir usuario a la URL devuelta
# 3. Después del callback, usar el código para obtener token
curl -X POST http://localhost:8080/auth/google/callback \
  -H "Content-Type: application/json" \
  -d '{
    "code": "codigo_obtenido_de_google",
    "state": "estado_de_verificacion"
  }'
```

### Crear Tarea

```bash
curl -X POST http://localhost:8080/api/tareas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer tu_jwt_token" \
  -d '{
    "titulo": "Completar proyecto",
    "descripcion": "Finalizar el desarrollo del backend",
    "fecha_vencimiento": "2024-02-01",
    "prioridad": "alta",
    "estado": "pendiente"
  }'
```

### Registrar Estado de Ánimo

```bash
curl -X POST http://localhost:8080/api/estado-animo \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer tu_jwt_token" \
  -d '{
    "estado": "feliz"
  }'
```

## Desarrollo

### Estructura del Proyecto

```
backend/
├── config/          # Configuración de base de datos
├── controllers/     # Controladores de API
├── middleware/      # Middlewares de autenticación
├── models/         # Modelos de datos
├── routes/         # Definición de rutas
├── utils/          # Utilidades (JWT, email, etc.)
├── migrations/     # Scripts de migración de BD
├── main.go         # Punto de entrada
└── .env           # Variables de entorno
```

### Tecnologías Utilizadas

- **Go 1.24.5** - Lenguaje de programación
- **Gin** - Framework web
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **Google OAuth2** - Autenticación social
- **Docker** - Contenedores (opcional)

## Próximas Características

- [ ] Notificaciones push
- [ ] Integración con calendarios externos
- [ ] Análisis de productividad
- [ ] Recomendaciones de IA
- [ ] Aplicación móvil
- [ ] Sincronización offline

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crear un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
