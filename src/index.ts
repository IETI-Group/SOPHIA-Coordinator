import express, { type Application } from "express";
import morgan from "morgan";
import { env, validateEnvConfig } from "./config/env.js";
import { errorHandler } from "./middlewares/error-handler.js";
import router from "./routes/index.js";
import { logger } from "./utils/logger.js";

const app: Application = express();

validateEnvConfig();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.nodeEnv === "development" ? "dev" : "combined"));

// CORS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS",
	);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization",
	);

	if (req.method === "OPTIONS") {
		return res.sendStatus(200);
	}

	next();
});

// Health check
app.use("/", (_req, res) => {
	res.json({
		status: "UP",
		timestamp: new Date().toISOString(),
	});
});

// Routes
app.use("/api/v1", router);

// Health check (debe ir después de las rutas para no interferir)
app.get("/", (_req, res) => {
	res.json({
		status: "UP",
		timestamp: new Date().toISOString(),
	});
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = env.port;
app.listen(PORT, () => {
	logger.info(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║        SOPHIA Coordinator Service                         ║
║        Version: 1.0.0                                     ║
║                                                           ║
║        Server running on port: ${PORT}                    ║
║        Environment: ${env.nodeEnv}                        ║
║                                                           ║
║                                                           ║
║        Coordinator Service: http://localhost:${PORT}/     ║
║        User Service: ${env.userServiceUrl}                ║
║        Course Service: ${env.courseServiceUrl}            ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

export default app;
