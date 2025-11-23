# Documentación de la API del Servicio de IA

Esta documentación detalla cómo configurar, ejecutar y utilizar los servicios de Inteligencia Artificial integrados en SOPHIA Coordinator.

---

## 📡 Endpoints de la API

URL Base: `/api/v1/ai`

### 1. Chat con IA

Interactúa con el asistente de IA. Soporta historial de conversación para respuestas conscientes del contexto (memoria).

**Endpoint:** `POST /chat`

#### Cuerpo de la Petición (Request Body)

| Campo | Tipo | Requerido | Descripción |
|-------|------|----------|-------------|
| `message` | string | Sí | El mensaje actual que se envía a la IA. |
| `history` | array | No | Lista de mensajes previos para dar contexto. |

**Estructura del Objeto Historial:**
```json
{
  "role": "user" | "assistant" | "system",
  "content": "string"
}
```

#### ¿Qué es el `role`?
El campo `role` indica quién dijo el mensaje en el historial, permitiendo a la IA entender el flujo de la conversación:
*   **`user`**: Eres tú (el usuario). Representa las preguntas o entradas que has hecho anteriormente.
*   **`assistant`**: Es la IA. Representa las respuestas que la IA te ha dado antes.
*   **`system`**: (Opcional) Define el comportamiento general o personalidad de la IA.

#### Ejemplo de Petición

**Mensaje Simple (Sin memoria):**
```json
{
  "message": "¿Cuál es la capital de Francia?"
}
```

**Mensaje con Historial (Con memoria):**
```json
{
  "message": "Cuéntame más sobre su cultura.",
  "history": [
    {
      "role": "user",
      "content": "¿Cuál es la capital de Francia?"
    },
    {
      "role": "assistant",
      "content": "La capital de Francia es París."
    }
  ]
}
```
*Nota: Al enviar el historial, la IA sabe que "su cultura" se refiere a la cultura de París.*

#### Respuesta Exitosa

**Código:** `200 OK`

```json
{
  "response": "La cultura parisina es famosa por su arte, moda, gastronomía y arquitectura..."
}
```

#### Respuesta de Error

**Código:** `400 Bad Request`
```json
{
  "success": false,
  "error": "Missing required field: message",
  "timestamp": "2023-10-27T10:00:00.000Z"
}
```

---

### 2. Asistente de Cursos

Genera un esquema de curso estructurado y profesional basado en una idea y pautas de estilo.

**Endpoint:** `POST /course-assistant`

#### Cuerpo de la Petición

| Campo | Tipo | Requerido | Descripción |
|-------|------|----------|-------------|
| `idea` | string | Sí | El concepto central o tema del curso. |
| `guide` | string | Sí | Pautas estructurales, audiencia objetivo o requisitos específicos. |

#### Ejemplo de Petición

```json
{
  "idea": "Introducción a la Programación en Python para Ciencia de Datos",
  "guide": "La audiencia objetivo son principiantes. Incluir 4 módulos principales. Enfocarse en ejemplos prácticos."
}
```

#### Respuesta Exitosa

**Código:** `200 OK`

```json
{
  "response": "Título del Curso: Python para Ciencia de Datos\n\nMódulo 1: Fundamentos de Python\n- Lección 1.1: Instalación y Configuración\n- Lección 1.2: Variables y Tipos de Datos..."
}
```

#### Respuesta de Error

**Código:** `400 Bad Request`
```json
{
  "success": false,
  "error": "Missing required field: idea",
  "timestamp": "2023-10-27T10:00:00.000Z"
}
```


## 🛠️ Prerrequisitos y Configuración

Para que el servicio de IA funcione correctamente, es necesario tener **Ollama** instalado y ejecutándose localmente (o en un servidor accesible).

### 1. Instalar Ollama
Ollama es la herramienta que nos permite ejecutar modelos de lenguaje (LLMs) localmente.
- **Descargar:** Visita [ollama.com](https://ollama.com) y descarga la versión para tu sistema operativo.
- **Instalar:** Sigue las instrucciones del instalador.

### 2. Descargar el Modelo
El proyecto está configurado para usar un modelo específico (definido en el archivo `.env`). Debes asegurarte de tener ese modelo descargado en Ollama.

Por defecto, si tu `.env` dice `OLLAMA_MODEL=llama3.2`, ejecuta en tu terminal:
```bash
ollama pull llama3.2
```
*Nota: Verifica la variable `OLLAMA_MODEL` en tu archivo `.env` para saber qué modelo descargar.*

### 3. Configuración de Variables de Entorno (.env)
Asegúrate de que tu archivo `.env` tenga las siguientes variables configuradas correctamente:

```dotenv
# Configuración de IA
OLLAMA_HOST=http://127.0.0.1:11434  # URL donde corre Ollama (por defecto es esta)
OLLAMA_MODEL=llama3.2               # El modelo a utilizar (ej: llama3.2, llama2, mistral)
```

### 4. Verificar que Ollama está corriendo
Antes de iniciar el servidor, asegúrate de que Ollama esté activo. Puedes verificarlo entrando a `http://127.0.0.1:11434` en tu navegador (debería decir "Ollama is running").

### 5. verificar que este corriendo el servicio ejecutando
```bash
pnpm dev
```

