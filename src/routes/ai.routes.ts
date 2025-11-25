import { Router } from "express";
import { aiController } from "../controllers/ai.controller";

const router: Router = Router();

router.post("/chat", aiController.chat);
router.post("/course-assistant", aiController.generateCourseStructure);

// Chat history management
router.get("/chats", aiController.listChats);
router.get("/chats/:id", aiController.getChatHistory);
router.delete("/chats/:id", aiController.deleteChat);

export default router;
