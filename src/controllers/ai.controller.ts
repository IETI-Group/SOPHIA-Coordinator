import type { NextFunction, Request, Response } from "express";
import { aiService } from "../services/ai.service.js";
import { validateBody, validateParams } from "../utils/validation.js";

export class AIController {
	async chat(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateBody(req.body, ["message"], res)) return;
			const token = req.headers.authorization?.replace("Bearer ", "") || "";
			const response = await aiService.chat(req.body, token);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async generateCourseStructure(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			if (!validateBody(req.body, ["idea", "guide"], res)) return;
			const token = req.headers.authorization?.replace("Bearer ", "") || "";
			const response = await aiService.generateCourseStructure(req.body, token);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async listChats(req: Request, res: Response, next: NextFunction) {
		try {
			const token = req.headers.authorization?.replace("Bearer ", "") || "";
			const response = await aiService.listChats(token, req.query);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getChatHistory(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res) || !req.params.id) return;
			const token = req.headers.authorization?.replace("Bearer ", "") || "";
			const response = await aiService.getChatHistory(req.params.id, token);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteChat(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res) || !req.params.id) return;
			const token = req.headers.authorization?.replace("Bearer ", "") || "";
			const response = await aiService.deleteChat(req.params.id, token);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}
}

export const aiController = new AIController();
