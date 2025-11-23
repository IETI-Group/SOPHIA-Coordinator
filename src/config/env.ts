import dotenv from "dotenv";

dotenv.config();

export const env = {
	port: process.env.PORT || 3000,
	nodeEnv: process.env.NODE_ENV || "development",
	userServiceUrl:
		process.env.USER_SERVICE_URL || "http://localhost:3001/api/v1",
	courseServiceUrl:
		process.env.COURSE_SERVICE_URL || "http://localhost:3002/api/v1",
	serviceTimeout: parseInt(process.env.SERVICE_TIMEOUT || "30000", 10),
	ollamaHost: process.env.OLLAMA_HOST || "http://127.0.0.1:11434",
	ollamaModel: process.env.OLLAMA_MODEL || "Llama2:7b-chat",
};
