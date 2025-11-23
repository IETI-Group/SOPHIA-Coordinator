# Documentación Completa de SOPHIA Coordinator

SOPHIA Coordinator es el servicio central que orquesta la comunicación entre el frontend y los microservicios de Usuario y Cursos, además de proveer capacidades de Inteligencia Artificial.

## 🚀 Configuración y Puesta en Marcha

### Prerrequisitos
- **Node.js**: v18 o superior.
- **pnpm**: Gestor de paquetes recomendado.
- **Ollama**: Para los servicios de IA local.

### Variables de Entorno (.env)
Crea un archivo `.env` en la raíz con la siguiente configuración:

```dotenv
# Configuración del Servidor
PORT=3000
NODE_ENV=development

# URLs de Microservicios
USER_SERVICE_URL=http://localhost:3001/api/v1
COURSE_SERVICE_URL=http://localhost:3002/api/v1

# Configuración de IA (Ollama)
OLLAMA_HOST=http://127.0.0.1:11434
OLLAMA_MODEL=llama3.2
```

### Scripts Disponibles
| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia el servidor en modo desarrollo con recarga automática (nodemon). |
| `pnpm build` | Compila el proyecto TypeScript a JavaScript. |
| `pnpm start` | Inicia el servidor compilado (producción). |
| `pnpm lint` | Ejecuta el linter (Biome) para verificar estilo de código. |
| `pnpm format` | Formatea el código automáticamente. |
| `pnpm test` | Ejecuta las pruebas unitarias con Vitest. |

---

## 📡 API Reference

**URL Base Global:** `/api/v1`

### 1. Servicio de Usuarios (`/api/v1`)

Gestiona usuarios, roles, instructores y cuentas vinculadas.

#### Usuarios
- `GET /users`: Obtener lista de usuarios.
- `GET /users/id/:id`: Obtener usuario por ID.
- `GET /users/email/:email`: Obtener usuario por email.
- `POST /users`: Crear un nuevo usuario.
  - **Body:** `{ email, firstName, lastName, birthDate }`
- `PUT /users/:id`: Actualizar usuario.
- `DELETE /users/:id`: Eliminar usuario.

#### Roles y Permisos (Admin)
- `GET /admin/roles`: Listar roles disponibles.
- `POST /admin/roles`: Crear un nuevo rol.
- `POST /admin/assignations`: Asignar un rol a un usuario.
  - **Body:** `{ userId, roleName }`

#### Instructores
- `GET /instructors/:instructorId`: Ver perfil público de instructor.
- `POST /instructors`: Registrarse como instructor.

#### Reseñas (Reviews)
- `GET /users/courses/:courseId/reviews`: Ver reseñas de un curso.
- `POST /users/:id/reviews`: Crear una reseña.

---

### 2. Servicio de Cursos (`/api/v1`)

Gestiona el contenido educativo: cursos, lecciones, exámenes y recursos.

#### Cursos
- `GET /courses`: Listar cursos (con filtros).
- `GET /courses/:id`: Obtener detalles de un curso.
- `POST /courses`: Crear un curso.
  - **Body:** `{ title, description, price, level, instructorId }`
- `PUT /courses/:id`: Actualizar curso.
- `DELETE /courses/:id`: Eliminar curso (lógico).

#### Estructura del Curso
- **Secciones**:
  - `GET /courses/:courseId/sections`: Listar secciones.
  - `POST /courses/:courseId/sections`: Añadir sección.
- **Lecciones**:
  - `GET /sections/:sectionId/lessons`: Listar lecciones de una sección.
  - `POST /sections/:sectionId/lessons`: Crear lección.

#### Evaluaciones y Tareas
- `POST /sections/:sectionId/quizzes`: Crear un examen (Quiz).
- `POST /lessons/:lessonId/assignments`: Crear una tarea.

#### Categorías y Etiquetas
- `GET /categories`: Listar categorías de cursos.
- `GET /tags`: Listar etiquetas disponibles.

---

### 3. Servicio de Inteligencia Artificial (`/api/v1/ai`)

Potenciado por Ollama (Llama 3.2).

#### Chat con Memoria
**Endpoint:** `POST /ai/chat`

Permite conversar con el asistente. Envía el historial para mantener el contexto.

**Body:**
```json
{
  "message": "¿Qué es una variable?",
  "history": [
    { "role": "user", "content": "Hola" },
    { "role": "assistant", "content": "¡Hola! ¿En qué puedo ayudarte?" }
  ]
}
```

#### Asistente de Creación de Cursos
**Endpoint:** `POST /ai/course-assistant`

Genera la estructura completa de un curso (módulos y lecciones) a partir de una idea.

**Body:**
```json
{
  "idea": "Curso de Fotografía para Principiantes",
  "guide": "Enfocado en uso de cámaras DSLR y composición básica."
}
```

---

## 📦 Modelos de Datos Principales

### Usuario (User)
```typescript
interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
  createdAt: Date;
}
```

### Curso (Course)
```typescript
interface Course {
  idCourse: string;
  title: string;
  description: string;
  price: number;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  instructorId: string;
  active: boolean; // Si está visible o no
  aiGenerated: boolean; // Si fue creado con ayuda de IA
}
```

### Mensaje de Chat (ChatMessage)
```typescript
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}
```
