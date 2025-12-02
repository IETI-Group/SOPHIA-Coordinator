import type { NextFunction, Request, Response } from "express";
import { aiService } from "../services/ai.service.js";
import { validateBody, validateParams } from "../utils/validation.js";

export class AIController {
	async chat(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateBody(req.body, ["message"], res)) return;
			const response = await aiService.chat(req.body);
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
			const response = await aiService.generateCourseStructure(req.body);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async listChats(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await aiService.listChats(req.query);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getChatHistory(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res) || !req.params.id) return;
			const response = await aiService.getChatHistory(req.params.id);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteChat(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res) || !req.params.id) return;
			const response = await aiService.deleteChat(req.params.id);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}
}

export const aiController = new AIController();
