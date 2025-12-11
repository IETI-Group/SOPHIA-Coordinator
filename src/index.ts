import express, { type Application } from "express";
import morgan from "morgan";
import { networkInterfaces } from "os";
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
app.get("/", (_req, res) => {
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
const PORT = Number(env.port) || 3000;

const getLocalIp = () => {
	const nets = networkInterfaces();
	for (const name of Object.keys(nets)) {
		const interfaces = nets[name];
		if (interfaces) {
			for (const net of interfaces) {
				// Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
				if (net.family === "IPv4" && !net.internal) {
					return net.address;
				}
			}
		}
	}
	return "localhost";
};

app.listen(PORT, "0.0.0.0", () => {
	const ip = getLocalIp();
	logger.info(`
═════════════════════════════════════════════════════════════
                                                           
        SOPHIA Coordinator Service                         
        Version: 1.0.0                                     
                                                           
        Server running on port: ${PORT}                    
        Environment: ${env.nodeEnv}                        
                                                           
                                                           
        Coordinator Service: http://localhost:${PORT}/api/v1
        Network Access:      http://${ip}:${PORT}/api/v1
        User Service: ${env.userServiceUrl}                
        Course Service: ${env.courseServiceUrl}
	Ai Service: ${env.aiServiceUrl}
	Auth Service: ${env.authServiceUrl}
				            
                                                           
═════════════════════════════════════════════════════════════
  `);
});

export default app;
