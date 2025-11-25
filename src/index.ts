import express, { type Application } from "express";
import morgan from "morgan";
import { env } from "./config/env";
import { errorHandler } from "./middlewares/error-handler";
import router from "./routes";
import os from "os";

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

// Routes
app.use("/api/v1", router);

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = env.port;
app.listen(PORT, () => {
	const nets = os.networkInterfaces();
	const addresses: string[] = [];

	Object.values(nets).forEach((netList) => {
		if (!netList) return;
		netList.forEach((net) => {
			// prefer IPv4, skip internal (loopback)
			if ((net as any).family === 'IPv4' && !(net as any).internal) {
				addresses.push((net as any).address);
			}
		});
	});

	const examples = addresses.length
		? addresses.map((ip) => `  - http://${ip}:${PORT}/api/v1/ai`).join('\n')
		: `  - http://127.0.0.1:${PORT}/api/v1/ai`;

	console.log(`SOPHIA Coordinator Service\nVersion: 1.0.0\n\nServer running on port: ${PORT}\nEnvironment: ${env.nodeEnv}\n\nAvailable API (examples):\n${examples}\n\nImportant notes:\n  - If you are testing on an Android Emulator (Android Studio), use: http://10.0.2.2:${PORT}/api/v1/ai\n  - If you are testing on a physical device, make sure your device and this computer are on the same Wi-Fi network.\n  - If no local network IP is listed above, use http://127.0.0.1:${PORT}/api/v1/ai or verify your network settings.\n\nUser Service: ${env.userServiceUrl}\nCourse Service: ${env.courseServiceUrl}\nAI Service: ${env.aiServiceUrl}\n`);
});

export default app;
