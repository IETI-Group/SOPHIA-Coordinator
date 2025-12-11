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

**Autenticación:**
Todos los endpoints, excepto los listados en la sección de **Authentication**, requieren el header:
`Authorization: Bearer <token>`

---

## Authentication

Endpoints para autenticación mediante AWS Cognito. El sistema soporta dos flujos de autenticación:
1. **Flujo principal:** Login con email y contraseña (`POST /auth/login`)
2. **Flujo alternativo:** OAuth2 con Cognito Hosted UI (`GET /auth/login/url` + `/auth/callback`)

### POST /auth/signup
Registra un nuevo usuario en la base de datos y en AWS Cognito.

**Acceso:** Público

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "birthDate": "1990-01-01",
  "profilePicture": "https://example.com/photo.jpg",
  "bio": "Estudiante apasionado por la tecnología",
  "learningStyle": "visual"
}
```

**Validaciones:**
- `firstName`: String requerido, no vacío
- `lastName`: String requerido, no vacío
- `email`: Email válido, requerido
- `password`: String requerido (mínimo 8 caracteres, mayúsculas, minúsculas, números y caracteres especiales)
- `birthDate`: Fecha ISO 8601 requerida
- `profilePicture`: URL válida (opcional)
- `bio`: String (opcional)
- `learningStyle`: Enum: visual, auditory, kinesthetic (opcional)

**Respuesta (201):**
```json
{
  "success": true,
  "message": "User registered successfully. Please check your email to confirm your account.",
  "data": {
    "userId": "uuid",
    "cognitoSub": "cognito-uuid"
  }
}
```

**Errores:**
| Código | Error | Descripción |
|--------|-------|-------------|
| 400 | VALIDATION_ERROR | Datos de entrada inválidos |
| 409 | USER_ALREADY_EXISTS | Email ya registrado |
| 500 | INTERNAL_SERVER_ERROR | Error en el registro |

---

### POST /auth/confirm-email
Confirma el email de un usuario usando el código de verificación enviado por email.

**Acceso:** Público

**Request Body:**
```json
{
  "email": "john@example.com",
  "confirmationCode": "123456"
}
```

**Validaciones:**
- `email`: Email válido, requerido
- `confirmationCode`: String requerido (código de 6 dígitos)

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Email confirmed successfully. You can now login."
}
```

**Errores:**
| Código | Error | Descripción |
|--------|-------|-------------|
| 400 | VALIDATION_ERROR | Email o código inválido |
| 400 | INVALID_CODE | Código de verificación incorrecto |
| 404 | USER_NOT_FOUND | Usuario no encontrado |
| 500 | INTERNAL_SERVER_ERROR | Error al confirmar email |

---

### POST /auth/resend-confirmation
Reenvía el código de confirmación al email del usuario.

**Acceso:** Público

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Validaciones:**
- `email`: Email válido, requerido

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Confirmation code resent successfully. Please check your email."
}
```

**Errores:**
| Código | Error | Descripción |
|--------|-------|-------------|
| 400 | VALIDATION_ERROR | Email inválido |
| 404 | USER_NOT_FOUND | Usuario no encontrado |
| 400 | ALREADY_CONFIRMED | Email ya confirmado |
| 500 | INTERNAL_SERVER_ERROR | Error al reenviar código |

---

### POST /auth/login
Login con email y contraseña (flujo principal de autenticación).

**Acceso:** Público

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Validaciones:**
- `email`: Email válido, requerido
- `password`: String requerido

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJraWQiOiJ...",
    "idToken": "eyJraWQiOiJ...",
    "refreshToken": "eyJjdHkiOiJ...",
    "expiresIn": 3600,
    "tokenType": "Bearer",
    "user": {
      "sub": "uuid-cognito",
      "email": "john@example.com",
      "email_verified": true,
      "name": "John Doe"
    }
  }
}
```

**Errores:**
| Código | Error | Descripción |
|--------|-------|-------------|
| 400 | VALIDATION_ERROR | Email o contraseña no proporcionados |
| 401 | INVALID_CREDENTIALS | Email o contraseña incorrectos |
| 403 | EMAIL_NOT_CONFIRMED | Email no confirmado |
| 500 | INTERNAL_SERVER_ERROR | Error en el login |

---

### GET /auth/login/url
Obtiene la URL de login OAuth2 de AWS Cognito (flujo alternativo con Hosted UI).

**Acceso:** Público

**Respuesta (200):**
```json
{
  "success": true,
  "data": {
    "loginUrl": "https://your-domain.auth.us-east-1.amazoncognito.com/login?client_id=xxx&response_type=code&scope=openid+profile+email&redirect_uri=xxx&state=xxx",
    "state": "abc123"
  },
  "message": "Redirect to this URL to login with Cognito"
}
```

**Errores:**
| Código | Error | Descripción |
|--------|-------|-------------|
| 500 | INTERNAL_SERVER_ERROR | Error al generar la URL de login |

---

### GET /auth/callback
Callback de AWS Cognito después del login OAuth2. Intercambia el código de autorización por tokens.

**Acceso:** Público

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| code | string | Sí | Código de autorización de Cognito |

**Respuesta (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJraWQiOiJ...",
    "idToken": "eyJraWQiOiJ...",
    "refreshToken": "eyJjdHkiOiJ...",
    "expiresIn": 3600,
    "tokenType": "Bearer",
    "user": {
      "sub": "uuid-cognito",
      "email": "user@example.com",
      "email_verified": true,
      "name": "John Doe"
    }
  },
  "message": "Authentication successful"
}
```

**Errores:**
| Código | Error | Descripción |
|--------|-------|-------------|
| 400 | BAD_REQUEST | Código de autorización no proporcionado |
| 500 | AUTHENTICATION_FAILED | Fallo en la autenticación |

---

### GET /auth/logout
Obtiene la URL de logout de AWS Cognito.

**Acceso:** Público

**Respuesta (200):**
```json
{
  "success": true,
  "data": {
    "logoutUrl": "https://your-domain.auth.us-east-1.amazoncognito.com/logout?client_id=xxx&logout_uri=xxx"
  },
  "message": "Redirect to this URL to logout"
}
```

**Errores:**
| Código | Error | Descripción |
|--------|-------|-------------|
| 500 | INTERNAL_SERVER_ERROR | Error al generar la URL de logout |

---

### GET /auth/me
Obtiene la información del usuario autenticado.

**Acceso:** Privado (requiere token en header Authorization)

**Headers:**
| Header | Tipo | Requerido | Descripción |
|--------|------|-----------|-------------|
| Authorization | string | Sí | Bearer token (ej: `Bearer eyJraWQiOiJ...`) |

**Respuesta (200):**
```json
{
  "success": true,
  "data": {
    "sub": "uuid-cognito",
    "email": "user@example.com",
    "email_verified": true,
    "name": "John Doe"
  },
  "message": "User information retrieved successfully"
}
```

**Errores:**
| Código | Error | Descripción |
|--------|-------|-------------|
| 401 | UNAUTHORIZED | No autenticado o token inválido |
| 500 | INTERNAL_SERVER_ERROR | Error al obtener información del usuario |

---

### POST /auth/verify
Verifica si un token JWT es válido.

**Acceso:** Público

**Request Body:**
```json
{
  "token": "eyJraWQiOiJ..."
}
```

**Validaciones:**
- `token`: String requerido (JWT token)

**Respuesta (200) - Token válido:**
```json
{
  "success": true,
  "data": {
    "valid": true,
    "user": {
      "sub": "uuid-cognito",
      "email": "user@example.com",
      "email_verified": true,
      "name": "John Doe"
    }
  },
  "message": "Token is valid"
}
```

**Errores:**
| Código | Error | Descripción |
|--------|-------|-------------|
| 400 | BAD_REQUEST | Token no proporcionado |
| 401 | INVALID_TOKEN | Token inválido o expirado |

**Respuesta (401) - Token inválido:**
```json
{
  "success": false,
  "data": {
    "valid": false
  },
  "message": "Invalid or expired token",
  "error": "INVALID_TOKEN"
}
```

---

## Servicio de Usuarios
**Base Path:** `/api/v1`
**Requiere Autenticación:** Sí (Header `Authorization: Bearer <token>`)

### Usuarios
- `GET /users`: Obtener lista de usuarios.
- `GET /users/id/:id`: Obtener usuario por ID.
- `GET /users/email/:email`: Obtener usuario por email.
- `POST /users`: Crear un nuevo usuario.
- `POST /users/batch`: Obtener usuarios por lote.
- `PUT /users/:id`: Actualizar usuario.
- `DELETE /users/:id`: Eliminar usuario.

### Learning Path
- `GET /users/:id/learning-path`: Obtener ruta de aprendizaje.
- `POST /users/:id/learning-path`: Crear ruta de aprendizaje.
- `PUT /users/:id/learning-path`: Actualizar ruta de aprendizaje.

### Reseñas (Reviews)
- `GET /users/:id/reviews`: Obtener reseñas de un usuario.
- `GET /users/instructors/:instructorId/reviews`: Obtener reseñas de un instructor.
- `GET /users/courses/:courseId/reviews`: Obtener reseñas de un curso.
- `POST /users/:id/reviews`: Crear reseña.
- `PUT /users/:id/reviews/:reviewId`: Actualizar reseña.
- `DELETE /users/:id/reviews/:reviewId`: Eliminar reseña.

### Cuentas Vinculadas
- `GET /users/:id/linked-accounts`: Listar cuentas vinculadas.
- `GET /users/:id/linked-accounts/:accountId`: Obtener cuenta vinculada.
- `POST /users/:id/linked-accounts`: Vincular cuenta.
- `PUT /users/:id/linked-accounts/:accountId`: Actualizar cuenta vinculada.
- `DELETE /users/:id/linked-accounts/:accountId`: Desvincular cuenta.

### Admin (Roles)
- `GET /admin/roles`: Listar roles.
- `GET /admin/roles/:name`: Obtener rol por nombre.
- `POST /admin/roles`: Crear rol.
- `PUT /admin/roles/:name`: Actualizar rol.
- `DELETE /admin/roles/:name`: Eliminar rol.
- `GET /admin/assignations`: Ver asignaciones de roles.

---

## Servicio de Cursos
**Base Path:** `/api/v1`
**Requiere Autenticación:** Sí (Header `Authorization: Bearer <token>`)

### Cursos
- `GET /courses`: Listar cursos.
- `GET /courses/:id`: Obtener curso.
- `POST /courses`: Crear curso.
- `PUT /courses/:id`: Actualizar curso.
- `DELETE /courses/:id`: Eliminar curso.

### Secciones
- `GET /courses/:courseId/sections`: Listar secciones de un curso.
- `POST /courses/:courseId/sections`: Crear sección.
- `PUT /courses/:courseId/sections/:sectionId`: Actualizar sección.
- `DELETE /courses/:courseId/sections/:sectionId`: Eliminar sección.

### Lecciones
- `GET /sections/:sectionId/lessons`: Listar lecciones de una sección.
- `GET /lessons/:id`: Obtener lección.
- `POST /sections/:sectionId/lessons`: Crear lección.
- `PUT /lessons/:id`: Actualizar lección.
- `DELETE /lessons/:id`: Eliminar lección.

### Contenido de Lecciones
- `GET /lessons/:lessonId/contents`: Listar contenidos.
- `GET /contents/:id`: Obtener contenido.
- `POST /lessons/:lessonId/contents`: Crear contenido.
- `PUT /contents/:id`: Actualizar contenido.
- `DELETE /contents/:id`: Eliminar contenido.

### Cuestionarios (Quizzes)
- `GET /sections/:sectionId/quizzes`: Listar cuestionarios.
- `GET /quizzes/:id`: Obtener cuestionario.
- `POST /sections/:sectionId/quizzes`: Crear cuestionario.
- `PUT /quizzes/:id`: Actualizar cuestionario.
- `DELETE /quizzes/:id`: Eliminar cuestionario.

### Asignaciones (Assignments)
- `GET /lessons/:lessonId/assignments`: Listar asignaciones.
- `GET /lessons/:lessonId/assignments/:assignmentId`: Obtener asignación.
- `POST /lessons/:lessonId/assignments`: Crear asignación.
- `PUT /lessons/:lessonId/assignments/:assignmentId`: Actualizar asignación.
- `DELETE /lessons/:lessonId/assignments/:assignmentId`: Eliminar asignación.

### Recursos
- `GET /resources`: Listar recursos.
- `GET /resources/:resourceId`: Obtener recurso.
- `POST /resources`: Crear recurso.
- `PUT /resources/:resourceId`: Actualizar recurso.
- `DELETE /resources/:resourceId`: Eliminar recurso.

### Categorías y Etiquetas
- `GET /categories`: Listar categorías.
- `GET /categories/:categoryId`: Obtener categoría.
- `POST /categories`: Crear categoría.
- `PUT /categories/:categoryId`: Actualizar categoría.
- `DELETE /categories/:categoryId`: Eliminar categoría.
- `GET /tags`: Listar etiquetas.
- `POST /tags`: Crear etiqueta.
- `DELETE /tags/:categoryId/:courseId`: Eliminar etiqueta.

### Foros
- `GET /forums`: Listar foros.
- `GET /forums/:id`: Obtener foro.
- `GET /courses/:courseId/forum`: Obtener foro de un curso.
- `POST /forums`: Crear foro.
- `PUT /forums/:id`: Actualizar foro.
- `DELETE /forums/:id`: Eliminar foro.

### Mensajes de Foro
- `GET /forum-messages`: Listar mensajes.
- `GET /forum-messages/:id`: Obtener mensaje.
- `GET /forums/:forumId/messages`: Mensajes de un foro.
- `GET /forum-messages/:parentMessageId/replies`: Respuestas a un mensaje.
- `POST /forum-messages`: Publicar mensaje.
- `PUT /forum-messages/:id`: Actualizar mensaje.
- `DELETE /forum-messages/:id`: Eliminar mensaje.

### Especificaciones de IA (AI Specs)
- `GET /lessons/:lessonId/ai-specs`: Listar specs.
- `GET /ai-specs/:id`: Obtener spec.
- `POST /lessons/:lessonId/ai-specs`: Crear spec.
- `PUT /ai-specs/:id`: Actualizar spec.
- `DELETE /ai-specs/:id`: Eliminar spec.

---

## Servicio de IA
**Base Path:** `/api/v1/ai`
**Requiere Autenticación:** Sí (Header `Authorization: Bearer <token>`)

### Chat
- `POST /chat`: Enviar mensaje al chat de IA.
  - **Body:** `{ "message": "Hola", "model": "gemini-2.0-flash" }`
  - **Response:** `{ "response": "..." }`

### Asistente de Curso
- `POST /course-assistant`: Generar estructura de curso.
  - **Body:** `{ "idea": "Curso de Python", "guide": "..." }`

### Historial de Chat
- `GET /chats`: Listar historiales de chat.
- `GET /chats/:id`: Obtener un historial específico.
- `DELETE /chats/:id`: Eliminar un historial.

---

## 📞 Contacto y Soporte

Para reportar problemas o solicitar nuevas funcionalidades:
- **Repositorio**: [SOPHIA-Coordinator](https://github.com/IETI-Group/SOPHIA-Coordinator)
- **Branch**: feat/ia
