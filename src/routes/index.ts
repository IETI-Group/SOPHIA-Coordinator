import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import aiRoutes from "./ai.routes.js";
import auth from "./auth.routes.js";
import courseRoutes from "./course.routes.js";
import userRoutes from "./user.routes.js";

const router: Router = Router();

// Health check
router.get("/health", (_req, res) => {
	res.json({
		status: "UP",
		timestamp: new Date().toISOString(),
		memory: process.memoryUsage(),
		cpu: process.cpuUsage(),
	});
});

// Mount routes
router.use("/auth", auth);
router.use(authenticate);
router.use("/", userRoutes);
router.use("/", courseRoutes);
router.use("/ai", aiRoutes);

export default router;
