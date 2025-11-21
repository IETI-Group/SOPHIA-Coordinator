# SOPHIA Coordinator Service

Servicio coordinador que redistribuye las peticiones HTTP entre los servicios de User y Course de SOPHIA.

## 📋 Descripción

El Coordinator Service actúa como un punto de entrada único (API Gateway) para las solicitudes dirigidas a los microservicios de User y Course. Redirecciona las peticiones de forma transparente manteniendo la misma estructura de rutas de los servicios originales.

## 🏗️ Arquitectura

```
Cliente → Coordinator Service → User Service (localhost:3001)
                             → Course Service (localhost:3002)
```

## 🚀 Instalación

```bash
# Instalar dependencias
pnpm install

# Copiar variables de entorno
cp .env.example .env

# Configurar URLs de servicios en .env
```

## 📁 Estructura del Proyecto

```
src/
├── config/
│   └── env.ts                 # Configuración de variables de entorno
├── controllers/
│   ├── user.controller.ts     # Controlador para rutas de usuarios
│   └── course.controller.ts   # Controlador para rutas de cursos
├── services/
│   ├── http-client.service.ts # Cliente HTTP con axios
│   ├── user.service.ts        # Cliente para User Service
│   └── course.service.ts      # Cliente para Course Service
├── routes/
│   ├── index.ts               # Router principal
│   ├── user.routes.ts         # Rutas de usuarios
│   └── course.routes.ts       # Rutas de cursos
├── middlewares/
│   ├── error-handler.ts       # Manejo global de errores
│   └── validation.ts          # Validación de requests
├── dtos/                      # Data Transfer Objects compartidos
└── index.ts                   # Punto de entrada
```

## 🛠️ Scripts Disponibles

```bash
# Desarrollo (con hot reload)
pnpm dev

# Build para producción
pnpm build

# Iniciar en producción
pnpm start
```

## 🌐 Endpoints

### User Service Routes
- `GET /api/v1/users` - Obtener todos los usuarios
- `POST /api/v1/users` - Crear usuario
- `GET /api/v1/users/id/:id` - Obtener usuario por ID
- `PUT /api/v1/users/:id` - Actualizar usuario
- `DELETE /api/v1/users/:id` - Eliminar usuario
- Y más... (ver documentación completa en API_DOCUMENTATION_USER.md)

### Course Service Routes
- `GET /api/v1/courses` - Obtener todos los cursos
- `POST /api/v1/courses` - Crear curso
- `GET /api/v1/courses/:id` - Obtener curso por ID
- `PUT /api/v1/courses/:id` - Actualizar curso
- `DELETE /api/v1/courses/:id` - Eliminar curso
- Y más... (ver documentación completa en API_DOCUMENTATION_CURSE.md)

### Health Check
- `GET /api/v1/health` - Verificar estado del servicio

## 🔧 Configuración

### Variables de Entorno (.env)

```env
# Server
PORT=3000
NODE_ENV=development

# Services
USER_SERVICE_URL=http://localhost:3001/api/v1
COURSE_SERVICE_URL=http://localhost:3002/api/v1

# Timeout
SERVICE_TIMEOUT=30000
```

## 📡 Manejo de Errores

El servicio maneja automáticamente los errores de los servicios downstream:

- **503 Service Unavailable**: Cuando un servicio no responde
- **4xx/5xx**: Reenvía los códigos de error originales
- Logging automático de todas las peticiones

## 🔍 Logs

El servicio utiliza Morgan para logging:
- **Desarrollo**: Formato `dev` (colorizado)
- **Producción**: Formato `combined` (Apache style)

## 🧪 Testing

```bash
# Ejecutar tests (cuando estén implementados)
pnpm test
```

## 📝 DTOs Compartidos

Los DTOs están organizados en:
- `src/dtos/common/` - DTOs comunes y enums
- `src/dtos/user/` - DTOs de usuarios
- `src/dtos/course/` - DTOs de cursos

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

ISC

## 👥 Autores

Equipo SOPHIA - IETI
