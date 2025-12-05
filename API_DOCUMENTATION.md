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

---

## Cursos

### GET /courses
Obtiene todos los cursos con paginación y filtros.

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción | Valores |
|-----------|------|-----------|-------------|---------|
| page | number | No | Número de página | Default: 1 |
| size | number | No | Cantidad por página | Default: 10, Max: 100 |
| sort | string | No | Campo para ordenar | title, price, level, createdAt, etc. |
| order | string | No | Orden de clasificación | asc, desc |
| lightDTO | boolean | No | Usar DTO ligero | true, false (default) |
| title | string | No | Filtrar por título | |
| level | string | No | Filtrar por nivel | BEGINNER, INTERMEDIATE, ADVANCED, EXPERT |
| active | boolean | No | Filtrar por estado activo | |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Courses retrieved successfully",
  "data": [
    {
      "idCourse": "uuid",
      "title": "Introduction to AI",
      "description": "Learn the basics of AI...",
      "price": 49.99,
      "level": "BEGINNER",
      "active": true,
      "averageReviews": 4.5,
      "totalLessons": 10,
      "status": "PUBLISHED",
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

### GET /courses/:id
Obtiene un curso por su ID.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del curso (UUID) |

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| lightDTO | boolean | No | Usar DTO ligero (default: true) |

**Respuesta (200) - lightDTO=true:**
```json
{
  "success": true,
  "message": "Course retrieved successfully",
  "data": {
    "idCourse": "uuid",
    "instructorId": "uuid-instructor",
    "title": "Introduction to AI",
    "description": "Full description...",
    "price": 49.99,
    "level": "BEGINNER",
    "active": true,
    "status": "PUBLISHED",
    "averageReviews": 4.5,
    "durationHours": 10,
    "totalLessons": 20,
    "totalReviews": 100,
    "totalEnrollments": 500,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-02T00:00:00.000Z",
    "publishedAt": "2025-01-03T00:00:00.000Z"
  },
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### POST /courses
Crea un nuevo curso.

**Request Body:**
```json
{
  "instructorId": "uuid-instructor",
  "title": "Advanced TypeScript",
  "description": "Deep dive into TS features",
  "price": 99.99,
  "level": "ADVANCED",
  "aiGenerated": false,
  "generationMetadata": {},
  "generationTaskId": null,
  "lastAIUpdateAt": null
}
```

**Validaciones:**
- `title`: String requerido, max 100 chars
- `description`: String requerido
- `price`: Number requerido
- `level`: Enum requerido (BEGINNER, INTERMEDIATE, ADVANCED, EXPERT)

**Respuesta (201):**
```json
{
  "success": true,
  "message": "Course created successfully",
  "data": "uuid-del-nuevo-curso",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### PUT /courses/:id
Actualiza un curso existente.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del curso |

**Request Body:** (Todos los campos opcionales)
```json
{
  "title": "Updated Title",
  "price": 79.99,
  "active": true
}
```

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Course updated successfully",
  "data": null,
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### DELETE /courses/:id
Elimina un curso.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del curso |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Course deleted successfully",
  "data": null,
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

## Secciones

### GET /courses/:courseId/sections
Obtiene todas las secciones de un curso.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| courseId | string | ID del curso |

**Query Parameters:** lightDTO, filters, sorting

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Sections retrieved successfully",
  "data": [
    {
      "idSection": "uuid",
      "title": "Module 1: Basics",
      "order": 1,
      "durationHours": 2,
      "active": true
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### POST /courses/:courseId/sections
Crea una nueva sección en un curso.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| courseId | string | ID del curso |

**Request Body:**
```json
{
  "courseId": "uuid-del-curso",
  "title": "Module 1",
  "description": "Introduction",
  "order": 1,
  "aiGenerated": false,
  "generationTaskId": null,
  "suggestedByAi": false
}
```

**Respuesta (201):**
```json
{
  "success": true,
  "message": "Section created successfully",
  "data": "uuid-de-la-seccion",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

## Lecciones

### GET /sections/:sectionId/lessons
Obtiene todas las lecciones de una sección.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| sectionId | string | ID de la sección |

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| lightDTO | boolean | No | Usar DTO ligero (default: true) |

**Respuesta (200) - lightDTO=true:**
```json
{
  "success": true,
  "message": "Lessons retrieved successfully",
  "data": [
    {
      "idLesson": "uuid",
      "title": "Lesson 1",
      "description": "Intro to topic",
      "lessonType": "THEORY",
      "durationMinutes": 15,
      "order": 1,
      "active": true,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "sectionId": "uuid-section"
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### POST /sections/:sectionId/lessons
Crea una nueva lección.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| sectionId | string | ID de la sección |

**Request Body:**
```json
{
  "sectionId": "uuid-de-la-seccion",
  "title": "Lesson 1",
  "description": "Intro to topic",
  "order": 1,
  "durationMinutes": 15,
  "lessonType": "THEORY",
  "estimatedDifficulty": 1.0,
  "aiGenerated": false,
  "generationTaskId": null
}
```

**Respuesta (201):**
```json
{
  "success": true,
  "message": "Lesson created successfully",
  "data": "uuid-de-la-leccion",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### GET /lessons/:id
Obtiene una lección por ID.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID de la lección |

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| lightDTO | boolean | No | Usar DTO ligero (default: true) |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Lesson retrieved successfully",
  "data": {
    "idLesson": "uuid",
    "title": "Lesson 1",
    "description": "Intro to topic",
    "lessonType": "THEORY",
    "durationMinutes": 15,
    "order": 1,
    "active": true
  },
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### PUT /lessons/:id
Actualiza una lección.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID de la lección |

**Request Body:** (Todos los campos opcionales)
```json
{
  "title": "Updated Lesson Title",
  "durationMinutes": 20
}
```

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Lesson updated successfully",
  "data": null,
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### DELETE /lessons/:id
Elimina una lección.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID de la lección |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Lesson deleted successfully",
  "data": null,
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

## Contenido de Lecciones

### GET /lessons/:lessonId/contents
Obtiene el contenido de una lección.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| lessonId | string | ID de la lección |

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| lightDTO | boolean | No | Usar DTO ligero (default: true) |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Lesson contents retrieved successfully",
  "data": [
    {
      "idLessonContent": "uuid",
      "version": 1,
      "lessonId": "uuid-lesson",
      "active": true,
      "isCurrentVersion": true,
      "difficultyLevel": "BEGINNER",
      "learningTechnique": "VISUAL",
      "orderPreference": 1,
      "metadata": {}
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### POST /lessons/:lessonId/contents
Crea nuevo contenido para una lección.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| lessonId | string | ID de la lección |

**Request Body:**
```json
{
  "lessonId": "uuid-lesson",
  "metadata": {},
  "difficultyLevel": "BEGINNER",
  "learningTechnique": "VISUAL",
  "orderPreference": 1,
  "contentType": "TEXT"
}
```

**Respuesta (201):**
```json
{
  "success": true,
  "message": "Content created successfully",
  "data": "uuid-del-contenido",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### GET /contents/:id
Obtiene un contenido específico por ID.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del contenido |

---

### PUT /contents/:id
Actualiza un contenido.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del contenido |

**Request Body:** (Todos los campos opcionales)
```json
{
  "metadata": { "text": "Updated content..." },
  "active": true
}
```

---

### DELETE /contents/:id
Elimina un contenido.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del contenido |

---

## Cuestionarios (Quizzes)

### GET /sections/:sectionId/quizzes
Obtiene los cuestionarios de una sección.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| sectionId | string | ID de la sección |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Quizzes retrieved successfully",
  "data": [
    {
      "idQuiz": "uuid",
      "title": "Final Exam",
      "durationMinutes": 60,
      "active": true
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### POST /sections/:sectionId/quizzes
Crea un nuevo cuestionario.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| sectionId | string | ID de la sección |

**Request Body:**
```json
{
  "sectionId": "uuid-de-la-seccion",
  "title": "Quiz 1",
  "description": "Test your knowledge",
  "aiGenerated": false,
  "difficultyDistribution": {},
  "adaptativeLogic": {}
}
```

**Respuesta (201):**
```json
{
  "success": true,
  "message": "Quiz created successfully",
  "data": "uuid-del-quiz",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### GET /quizzes/:id
Obtiene un cuestionario por ID.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del cuestionario |

---

### PUT /quizzes/:id
Actualiza un cuestionario.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del cuestionario |

---

### DELETE /quizzes/:id
Elimina un cuestionario.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del cuestionario |

---

## Tareas (Assignments)

### GET /lessons/:lessonId/assignments
Obtiene las tareas de una lección.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| lessonId | string | ID de la lección |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Assignments retrieved successfully",
  "data": [
    {
      "idAssignment": "uuid",
      "title": "Homework 1",
      "dueDate": "2025-12-31T23:59:59.000Z",
      "maxScore": 100
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### POST /lessons/:lessonId/assignments
Crea una nueva tarea.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| lessonId | string | ID de la lección |

**Request Body:**
```json
{
  "lessonId": "uuid-de-la-leccion",
  "title": "Project Submission",
  "instructions": "Upload your code...",
  "maxFileSizeMb": 10,
  "allowedTypes": "PDF",
  "dueDate": "2025-12-31T23:59:59.000Z",
  "maxScore": 100
}
```

**Respuesta (201):**
```json
{
  "success": true,
  "message": "Assignment created successfully",
  "data": "uuid-de-la-tarea",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

## Recursos

### GET /resources
Obtiene todos los recursos.

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| lightDTO | boolean | No | Usar DTO ligero (default: true) |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Resources retrieved successfully",
  "data": [
    {
      "idResource": "uuid",
      "name": "Course Syllabus",
      "type": "PDF",
      "url": "https://storage...",
      "fileSizeMb": 2.5
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### POST /resources
Crea un nuevo recurso.

**Request Body:**
```json
{
  "entityReference": "uuid-referencia",
  "discriminant": "COURSE",
  "name": "Intro Video",
  "type": "VIDEO",
  "url": "https://video...",
  "fileSizeMb": 50
}
```

**Respuesta (201):**
```json
{
  "success": true,
  "message": "Resource created successfully",
  "data": "uuid-del-recurso",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### GET /resources/:id
Obtiene un recurso por ID.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del recurso |

---

## Especificaciones de IA

### GET /lessons/:lessonId/ai-specs
Obtiene especificaciones de IA para una lección.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| lessonId | string | ID de la lección |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "AI Specs retrieved successfully",
  "data": [
    {
      "idLessonSpec": "uuid",
      "generationPromptSummary": "Create a lesson about...",
      "contentStructure": {}
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### POST /lessons/:lessonId/ai-specs
Crea una nueva especificación de IA.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| lessonId | string | ID de la lección |

**Request Body:**
```json
{
  "lessonContentId": "uuid-contenido",
  "generationPromptSummary": "Prompt used...",
  "contentStructure": {},
  "estimatedVideoDuration": 300
}
```

**Respuesta (201):**
```json
{
  "success": true,
  "message": "AI Spec created successfully",
  "data": "uuid-de-la-spec",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### GET /ai-specs/:id
Obtiene una especificación de IA por ID.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID de la especificación |

---

### PUT /ai-specs/:id
Actualiza una especificación de IA.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID de la especificación |

---

### DELETE /ai-specs/:id
Elimina una especificación de IA.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID de la especificación |

---

## Categorías y Etiquetas

### GET /categories
Obtiene todas las categorías.

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Categories retrieved successfully",
  "data": [
    {
      "idCategory": "uuid",
      "name": "Programming",
      "description": "Software development courses",
      "active": true
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### GET /tags
Obtiene todos los tags.

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Tags retrieved successfully",
  "data": [
    {
      "categoryId": "uuid",
      "courseId": "uuid",
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### 3. Servicio de Inteligencia Artificial (`/api/v1/ai`)

Potenciado por Ollama (Llama 3.2).

---

## Chat con IA

### POST /ai/chat
Interactúa con el asistente de IA. Soporta historial de conversación mediante tokens de contexto.

**Request Body:**
| Campo | Tipo | Requerido | Descripción |
|-------|------|----------|-------------|
| `message` | string | Sí | El mensaje actual que se envía a la IA. |
| `context` | number[] | No | Array de números (tokens) que representa el historial de la conversación. |
| `model` | string | No | El modelo de IA a utilizar (ej: `llama3.2`, `mistral`). Si no se envía, usa el configurado por defecto. |

**Ejemplo:**
```json
{
  "message": "¿Qué es una variable?",
  "context": [123, 456] // Opcional
}
```

**Respuesta (200):**
```json
{
  "response": "Una variable es un contenedor para almacenar datos...",
  "context": [123, 456, 789] // Guardar para la siguiente petición
}
```

**Nota sobre el contexto:** El campo `context` es un array de números que el modelo genera después de cada respuesta. Este array codifica toda la conversación previa. Para mantener la memoria del chat, debes guardar este array y enviarlo de vuelta en la siguiente petición.

---

### GET /ai/chats
Lista los historiales de chat guardados.

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Chats retrieved successfully",
  "data": [
    {
      "id": "chat-uuid-1",
      "title": "Conversación sobre Python",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "lastMessageAt": "2025-01-01T12:00:00.000Z"
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### GET /ai/chats/:id
Obtiene el historial completo de un chat específico.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del chat |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Chat history retrieved successfully",
  "data": {
    "id": "chat-uuid-1",
    "title": "Conversación sobre Python",
    "messages": [
      { "role": "user", "content": "¿Qué es Python?" },
      { "role": "assistant", "content": "Python es un lenguaje de programación..." }
    ],
    "createdAt": "2025-01-01T00:00:00.000Z"
  },
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### DELETE /ai/chats/:id
Elimina un historial de chat.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del chat |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Chat deleted successfully",
  "data": null,
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

## Asistente de Creación de Cursos

### POST /ai/course-assistant
Genera la estructura completa de un curso (módulos y lecciones) a partir de una idea.

**Request Body:**
| Campo | Tipo | Requerido | Descripción |
|-------|------|----------|-------------|
| `idea` | string | Sí | El concepto central o tema del curso. |
| `guide` | string | Sí | Pautas estructurales, audiencia objetivo o requisitos específicos. |
| `model` | string | No | El modelo de IA a utilizar. Si no se envía, usa el configurado por defecto. |

**Ejemplo:**
```json
{
  "idea": "Curso de Fotografía para Principiantes",
  "guide": "Enfocado en uso de cámaras DSLR y composición básica. 4 módulos principales."
}
```

**Respuesta (200):**
```json
{
  "response": "Título del Curso: Fotografía Digital para Principiantes\n\nMódulo 1: Fundamentos de la Fotografía\n- Lección 1.1: Introducción a las cámaras DSLR\n- Lección 1.2: Tipos de lentes y sus usos...",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

## 🛠️ Configuración del Servicio de IA

### Prerequisitos
Para que el servicio de IA funcione correctamente:

1. **Instalar Ollama**: Visita [ollama.com](https://ollama.com) y descarga la versión para tu sistema operativo.

2. **Descargar el Modelo**: Si tu `.env` dice `OLLAMA_MODEL=llama3.2`, ejecuta:
```bash
ollama pull llama3.2
```

3. **Verificar que Ollama está corriendo**: Asegúrate de que Ollama esté activo visitando `http://127.0.0.1:11434`.

4. **Iniciar el servidor**:
```bash
pnpm dev
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
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  instructorId: string;
  active: boolean;
  status: 'DRAFT' | 'UNDER_REVIEW' | 'PUBLISHED' | 'ARCHIVED';
  aiGenerated: boolean;
  averageReviews: number;
  totalLessons: number;
  durationHours: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Lección (Lesson)
```typescript
interface Lesson {
  idLesson: string;
  sectionId: string;
  title: string;
  description: string;
  lessonType: 'THEORY' | 'PRACTICE' | 'MIXED' | 'PROJECT' | 'CASE_STUDY' | 'DISCUSSION';
  durationMinutes: number;
  order: number;
  active: boolean;
  aiGenerated: boolean;
  estimatedDifficulty: number;
  createdAt: Date;
}
```

### Contenido de Lección (LessonContent)
```typescript
interface LessonContent {
  idLessonContent: string;
  lessonId: string;
  version: number;
  metadata: Json;
  difficultyLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  learningTechnique: 'VISUAL' | 'AUDITORY' | 'KINESTHETIC' | 'READING_WRITING';
  contentType: 'TEXT' | 'VIDEO' | 'AUDIO' | 'INTERACTIVE' | 'QUIZ' | 'EXERCISE';
  active: boolean;
  isCurrentVersion: boolean;
  aiGenerated: boolean;
  createdAt: Date;
}
```

### Cuestionario (Quiz)
```typescript
interface Quiz {
  idQuiz: string;
  sectionId: string;
  title: string;
  description: string;
  durationMinutes: number;
  active: boolean;
  aiGenerated: boolean;
  difficultyDistribution: Json;
  adaptativeLogic: Json;
  createdAt: Date;
}
```

### Recurso (Resource)
```typescript
interface Resource {
  idResource: string;
  entityReference: string;
  discriminant: 'SUBMISSION' | 'QUIZ_QUESTION' | 'QUIZ_OPTION' | 'LESSON' | 'COURSE';
  name: string;
  type: 'PDF' | 'PICTURE' | 'CODE' | 'LINK' | 'TEXT' | 'VIDEO' | 'AUDIO' | 'INTERACTIVE';
  url: string;
  fileSizeMb: number;
  mimeType: string;
  metadata: Json;
}
```

### Reseña (Review)
```typescript
interface Review {
  idReview: string;
  userId: string;
  courseId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🔧 Enums y Tipos

### Course Level
```typescript
enum CourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT'
}
```

### Course Status
```typescript
enum CourseStatus {
  DRAFT = 'DRAFT',
  UNDER_REVIEW = 'UNDER_REVIEW',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}
```

### Lesson Type
```typescript
enum LessonType {
  THEORY = 'THEORY',
  PRACTICE = 'PRACTICE',
  MIXED = 'MIXED',
  PROJECT = 'PROJECT',
  CASE_STUDY = 'CASE_STUDY',
  DISCUSSION = 'DISCUSSION'
}
```

### Resource Type
```typescript
enum ResourceType {
  PDF = 'PDF',
  PICTURE = 'PICTURE',
  CODE = 'CODE',
  LINK = 'LINK',
  TEXT = 'TEXT',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  INTERACTIVE = 'INTERACTIVE',
  DIAGRAM = 'DIAGRAM',
  SIMULATION = 'SIMULATION',
  NOTEBOOK = 'NOTEBOOK',
  DATASET = 'DATASET'
}
```

### Learning Technique
```typescript
enum LearningTechnique {
  VISUAL = 'VISUAL',
  AUDITORY = 'AUDITORY',
  KINESTHETIC = 'KINESTHETIC',
  READING_WRITING = 'READING_WRITING'
}
```

### Content Type
```typescript
enum ContentType {
  TEXT = 'TEXT',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  INTERACTIVE = 'INTERACTIVE',
  QUIZ = 'QUIZ',
  EXERCISE = 'EXERCISE',
  SIMULATION = 'SIMULATION'
}
```

---

## ⚠️ Códigos de Error

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error: Invalid input data",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

## 📝 Notas de Desarrollo

1. **Paginación**: Por defecto, todas las consultas paginadas retornan 10 elementos por página con un máximo de 100.

2. **Ordenamiento**: Los campos válidos para ordenar dependen del recurso (ej. `title`, `createdAt`, `price`).

3. **DTO Ligero vs Pesado**: El parámetro `lightDTO` permite obtener versiones simplificadas de los objetos para optimizar el rendimiento.

4. **Fechas**: Todas las fechas deben estar en formato ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ).

5. **IDs**: Todos los IDs son UUID v4.

6. **Validaciones**: Todas las rutas implementan validación de datos usando Zod.

7. **Proxy**: Este servicio actúa como API Gateway, redirigiendo las peticiones a los microservicios correspondientes.

---

## 🚀 Ejemplo de Flujo Completo

### Crear un Curso Completo

1. **Crear el Curso:**
```bash
POST /api/v1/courses
{
  "instructorId": "instructor-uuid",
  "title": "Introduction to React",
  "description": "Learn React from scratch",
  "price": 49.99,
  "level": "BEGINNER"
}
```

2. **Crear una Sección:**
```bash
POST /api/v1/courses/{courseId}/sections
{
  "title": "Getting Started",
  "order": 1
}
```

3. **Crear una Lección:**
```bash
POST /api/v1/sections/{sectionId}/lessons
{
  "title": "What is React?",
  "lessonType": "THEORY",
  "durationMinutes": 15
}
```

4. **Agregar Contenido:**
```bash
POST /api/v1/lessons/{lessonId}/contents
{
  "contentType": "TEXT",
  "metadata": { "text": "React is a JavaScript library..." },
  "difficultyLevel": "BEGINNER"
}
```

5. **Crear un Cuestionario:**
```bash
POST /api/v1/sections/{sectionId}/quizzes
{
  "title": "React Basics Quiz",
  "durationMinutes": 10
}
```

---

## 📞 Contacto y Soporte

Para reportar problemas o solicitar nuevas funcionalidades:
- **Repositorio**: [SOPHIA-Coordinator](https://github.com/IETI-Group/SOPHIA-Coordinator)
- **Branch**: feat/ia
