# Documentación de Uso de Rutas - SOPHIA Coordinator

Este documento detalla las rutas disponibles en el servicio SOPHIA Coordinator. Este servicio actúa como una puerta de enlace (API Gateway) y orquestador para los microservicios de Usuario, Cursos e Inteligencia Artificial.

**URL Base:** `/api/v1` (Configurado en `src/index.ts`, asumiendo prefijo estándar)

## 🤖 Rutas de Inteligencia Artificial (AI)

El coordinador redirige estas peticiones al microservicio de IA.

### 1. Chat con el Asistente
Permite interactuar con el modelo de IA. Todos los mensajes se guardan automáticamente en la base de datos.

*   **Endpoint:** `POST /ai/chat`
*   **Parámetros del Cuerpo:**
    *   `message` (string, **requerido**): El mensaje actual que se envía a la IA.
    *   `model` (string, opcional): El modelo de IA a utilizar (ej: `gpt-3.5-turbo`, `gemini-2.0-flash`, `Llama2:7b-chat`).
    *   `context` (number[], opcional): Array de números (tokens) que representa el historial de la conversación (solo para Ollama).
    *   `chatId` (string, opcional): ID de un chat existente para continuar la conversación. Si no se envía, se crea un nuevo chat.

*   **Cuerpo de la Petición (JSON) - Nuevo Chat:**
    ```json
    {
      "message": "Hola, ¿cómo puedo estructurar un curso de Python?",
      "model": "gpt-3.5-turbo"
    }
    ```

*   **Cuerpo de la Petición (JSON) - Continuar Chat:**
    ```json
    {
      "message": "¿Y qué temas debería incluir?",
      "chatId": "6924ee716f476c51e6fc51df"
    }
    ```

*   **Respuesta Exitosa:**
    ```json
    {
      "success": true,
      "chatId": "6924ee716f476c51e6fc51df",
      "response": "Texto de la respuesta...",
      "context": [1, 2, 3]
    }
    ```

*   **Notas Importantes:**
    *   Cuando envías el primer mensaje sin `chatId`, el sistema crea un nuevo chat y devuelve un `chatId`.
    *   Guarda este `chatId` para continuar la conversación en futuras peticiones.
    *   Todos los mensajes (usuario y asistente) se guardan automáticamente en la base de datos.
    *   El campo `context` solo es relevante para modelos de Ollama.

### 2. Generador de Estructura de Cursos
Genera un esquema detallado para un nuevo curso basado en una idea y guías. Todos los cursos generados se guardan automáticamente en la base de datos con el tipo `course`.

*   **Endpoint:** `POST /ai/course-assistant`
*   **Parámetros del Cuerpo:**
    *   `idea` (string, **requerido**): El concepto central o tema del curso.
    *   `guide` (string, **requerido**): Pautas estructurales, audiencia objetivo o requisitos específicos.
    *   `model` (string, opcional): El modelo de IA a utilizar (ej: `Llama2:7b-chat`, `deepseek-r1:7b`, `gemini-2.0-flash`).
    *   `chatId` (string, opcional): ID de un chat de curso existente para continuar refinando el curso.

*   **Cuerpo de la Petición (JSON) - Nuevo Curso:**
    ```json
    {
      "idea": "Introducción a la Programación en Python para Ciencia de Datos",
      "guide": "La audiencia objetivo son principiantes. Incluir 4 módulos principales. Enfocarse en ejemplos prácticos.",
      "model": "Llama2:7b-chat"
    }
    ```

*   **Cuerpo de la Petición (JSON) - Refinar Curso Existente:**
    ```json
    {
      "idea": "Agregar más ejercicios prácticos al módulo 2",
      "guide": "Ejercicios hands-on con datasets reales",
      "chatId": "6924ee716f476c51e6fc51e0"
    }
    ```

*   **Respuesta Exitosa:**
    ```json
    {
      "success": true,
      "chatId": "6924ee716f476c51e6fc51e0",
      "response": "Título del Curso: Python para Ciencia de Datos\n\nMódulo 1: Fundamentos de Python\n- Lección 1.1: Instalación y Configuración..."
    }
    ```

*   **Notas Importantes:**
    *   Los cursos generados se guardan con `chatType: "course"` para distinguirlos de chats regulares.
    *   Puedes continuar refinando un curso existente usando el `chatId` devuelto.
    *   Para ver todos los cursos generados: `GET /ai/chats?type=course`
    *   Para ver el historial completo de un curso: `GET /ai/chats/:chatId`

### 3. Gestión de Historial de Chats

#### 3.1 Listar Todos los Chats
Obtiene una lista de todos los chats guardados. Soporta filtrado por tipo.

*   **Endpoint:** `GET /ai/chats`
*   **Query Parameters (opcionales):**
    *   `type` (string): Filtrar por tipo de chat (`chat` o `course`).
    *   Ejemplo: `/ai/chats?type=course` para listar solo cursos generados.
*   **Respuesta:**
    ```json
    {
      "success": true,
      "count": 1,
      "data": [
        {
          "chatId": "6924ee716f476c51e6fc51df",
          "createdAt": "2025-11-24T23:47:04.596Z",
          "updatedAt": "2025-11-24T23:47:23.002Z",
          "messageCount": 4,
          "lastMessage": "La capital de Francia es París."
        }
      ]
    }
    ```

#### 3.2 Obtener Historial de un Chat
Obtiene el historial completo de mensajes de un chat específico.

*   **Endpoint:** `GET /ai/chats/:id`
*   **Parámetros de URL:**
    *   `id` (string, **requerido**): ID del chat a consultar.
*   **Respuesta:**
    ```json
    {
      "success": true,
      "data": {
        "chatId": "6924ee716f476c51e6fc51df",
        "messages": [
          {
            "role": "user",
            "content": "Hola, ¿cómo estás?",
            "timestamp": "2025-11-24T23:46:57.017Z"
          },
          {
            "role": "assistant",
            "content": "Hola! Estoy bien, gracias por preguntar.",
            "context": [123, 456],
            "timestamp": "2025-11-24T23:47:04.592Z"
          }
        ],
        "createdAt": "2025-11-24T23:47:04.596Z",
        "updatedAt": "2025-11-24T23:47:23.002Z"
      }
    }
    ```

#### 3.3 Eliminar un Chat
Elimina permanentemente un chat y todo su historial.

*   **Endpoint:** `DELETE /ai/chats/:id`
*   **Parámetros de URL:**
    *   `id` (string, **requerido**): ID del chat a eliminar.
*   **Respuesta:**
    ```json
    {
      "success": true,
      "message": "Chat deleted successfully"
    }
    ```

---

## 📚 Rutas de Cursos (Course Service)

Gestiona todo lo relacionado con el contenido educativo.

### Cursos
*   `GET /courses`: Listar todos los cursos (soporta query params para filtros).
*   `GET /courses/:id`: Obtener detalles de un curso específico.
*   `POST /courses`: Crear un nuevo curso.
*   `PUT /courses/:id`: Actualizar un curso existente.
*   `DELETE /courses/:id`: Eliminar un curso.

### Secciones (Módulos del curso)
*   `GET /courses/:courseId/sections`: Listar secciones de un curso.
*   `POST /courses/:courseId/sections`: Crear una nueva sección.
*   `PUT /courses/:courseId/sections/:sectionId`: Actualizar una sección.
*   `DELETE /courses/:courseId/sections/:sectionId`: Eliminar una sección.

### Lecciones
*   `GET /sections/:sectionId/lessons`: Listar lecciones de una sección.
*   `GET /sections/:sectionId/lessons/:lessonId`: Obtener detalles de una lección.
*   `POST /sections/:sectionId/lessons`: Crear una lección.
*   `PUT /sections/:sectionId/lessons/:lessonId`: Actualizar una lección.
*   `DELETE /sections/:sectionId/lessons/:lessonId`: Eliminar una lección.

### Evaluaciones (Quizzes)
*   `GET /sections/:sectionId/quizzes`: Listar quizzes de una sección.
*   `GET /sections/:sectionId/quizzes/:quizId`: Obtener un quiz.
*   `POST /sections/:sectionId/quizzes`: Crear un quiz.
*   `PUT /sections/:sectionId/quizzes/:quizId`: Actualizar un quiz.
*   `DELETE /sections/:sectionId/quizzes/:quizId`: Eliminar un quiz.

### Tareas (Assignments)
*   `GET /lessons/:lessonId/assignments`: Listar tareas de una lección.
*   `GET /lessons/:lessonId/assignments/:assignmentId`: Obtener una tarea.
*   `POST /lessons/:lessonId/assignments`: Crear una tarea.
*   `PUT /lessons/:lessonId/assignments/:assignmentId`: Actualizar una tarea.
*   `DELETE /lessons/:lessonId/assignments/:assignmentId`: Eliminar una tarea.

### Recursos y Otros
*   **Recursos:** `/resources` (CRUD completo).
*   **Categorías:** `/categories` (CRUD completo).
*   **Etiquetas (Tags):** `/tags` (GET, POST, DELETE).
*   **Especificaciones IA:** `/lessons/:lessonId/ai-specs` (Configuraciones de IA específicas por lección).

---

## 👤 Rutas de Usuarios (User Service)

Gestiona usuarios, roles y perfiles.

### Usuarios
*   `GET /users`: Listar usuarios.
*   `GET /users/id/:id`: Obtener usuario por ID.
*   `GET /users/email/:email`: Obtener usuario por Email.
*   `POST /users`: Registrar un usuario.
*   `POST /users/batch`: Obtener múltiples usuarios por ID (batch).
*   `PUT /users/:id`: Actualizar información de usuario.
*   `DELETE /users/:id`: Eliminar usuario.

### Instructores
*   `GET /instructors/:instructorId`: Perfil público de instructor.
*   `POST /instructors`: Registrarse como instructor.
*   `PUT /instructors/:instructorId`: Actualizar perfil público.
*   `DELETE /instructors/:instructorId`: Eliminar perfil de instructor.

### Administración (Roles y Permisos)
*   `GET /admin/roles`: Listar roles.
*   `POST /admin/roles`: Crear rol.
*   `POST /admin/assignations`: Asignar rol a usuario.
*   `PUT /admin/assignations/...`: Modificar asignaciones.
*   `DELETE /admin/assignations/...`: Revocar roles.

### Reseñas (Reviews)
*   `GET /users/courses/:courseId/reviews`: Ver reseñas de un curso.
*   `POST /users/:id/reviews`: Publicar una reseña.
*   `PUT /users/:id/reviews/:reviewId`: Editar reseña.
*   `DELETE /users/:id/reviews/:reviewId`: Eliminar reseña.

### Rutas de Aprendizaje (Learning Path)
*   `GET /users/:id/learning-path`: Ver ruta de aprendizaje.
*   `POST /users/:id/learning-path`: Crear/Iniciar ruta.
*   `PUT /users/:id/learning-path`: Actualizar progreso.

### Cuentas Vinculadas
*   `GET /users/:id/linked-accounts`: Ver cuentas sociales vinculadas.
*   `POST /users/:id/linked-accounts`: Vincular cuenta.
*   `DELETE /users/:id/linked-accounts/:accountId`: Desvincular cuenta.
