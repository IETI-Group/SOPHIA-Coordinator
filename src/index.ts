import express, { type Application } from "express";
import morgan from "morgan";
import { env } from "./config/env";
import { errorHandler } from "./middlewares/error-handler";
import router from "./routes";

const app: Application = express();

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
app.use('/', (_req, res) => {
  res.json({
    status: 'UP',
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/v1", router);

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = env.port;
app.listen(PORT, () => {
	console.log(`
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
