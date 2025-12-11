import { Router } from "express";
import { aiController } from "../controllers/ai.controller.js";
import { authenticate } from "../middlewares/auth.js";

const router: Router = Router();

router.post("/chat", authenticate, aiController.chat);
router.post("/course-assistant", authenticate, aiController.generateCourseStructure);

// Chat history management
router.get("/chats", authenticate, aiController.listChats);
router.get("/chats/:id", authenticate, aiController.getChatHistory);
router.delete("/chats/:id", authenticate, aiController.deleteChat);

export default router;
