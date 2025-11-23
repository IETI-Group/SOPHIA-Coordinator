import { Router } from "express";
import aiRoutes from "./ai.routes";
import courseRoutes from "./course.routes";
import userRoutes from "./user.routes";

const router: Router = Router();

// Health check
router.get("/health", (req, res) => {
	res.json({
		status: "UP",
		timestamp: new Date().toISOString(),
	});
});

// Mount routes
router.use("/", userRoutes);
router.use("/", courseRoutes);
router.use("/ai", aiRoutes);

export default router;
