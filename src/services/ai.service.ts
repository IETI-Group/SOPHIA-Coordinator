import { env } from "../config/env.js";
import type { ChatRequestDto, CourseAssistantDto } from "../dtos/ai/index.js";
import { HttpClientService } from "./http-client.service.js";

class AIService {
	private readonly httpClient: HttpClientService;

	constructor() {
		this.httpClient = new HttpClientService(env.aiServiceUrl);
	}

	async chat(data: ChatRequestDto, token: string) {
		return this.httpClient.post("/ai/chat", data, {
			headers: { Authorization: `Bearer ${token}` },
		});
	}

	async generateCourseStructure(data: CourseAssistantDto, token: string) {
		return this.httpClient.post("/ai/course-assistant", data, {
			headers: { Authorization: `Bearer ${token}` },
		});
	}

	async listChats(token: string, queryParams?: unknown) {
		return this.httpClient.get("/chats", {
			params: queryParams,
			headers: { Authorization: `Bearer ${token}` },
		});
	}

	async getChatHistory(chatId: string, token: string) {
		return this.httpClient.get(`/chats/${chatId}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
	}

	async deleteChat(chatId: string, token: string) {
		return this.httpClient.delete(`/chats/${chatId}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
	}
}

export const aiService = new AIService();
