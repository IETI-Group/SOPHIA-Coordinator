import dotenv from "dotenv";

dotenv.config();

export const env = {
	port: process.env.PORT || 3000,
	logLevel: process.env.LOG_LEVEL || "info",
	nodeEnv: process.env.NODE_ENV || "development",
	userServiceUrl:
		process.env.USER_SERVICE_URL || "http://localhost:3001/api/v1",
	courseServiceUrl:
		process.env.COURSE_SERVICE_URL || "http://localhost:3002/api/v1",
	authServiceUrl:
		process.env.AUTH_SERVICE_URL || "http://localhost:3003/api/v1",
	serviceTimeout: Number.parseInt(process.env.SERVICE_TIMEOUT || "30000", 10),
	aiServiceUrl: process.env.AI_SERVICE_URL || "http://localhost:3003/api/v1",
};

export const validateEnvConfig = (): void => {
	if (env.nodeEnv !== "production") {
		return;
	}
	if (!env.authServiceUrl) {
		throw new Error("AUTH_SERVICE_URL must be set in production");
	}
};
