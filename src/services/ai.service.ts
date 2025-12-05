import { env } from "../config/env.js";
import type { ChatRequestDto, CourseAssistantDto } from "../dtos/ai/index.js";
import { HttpClientService } from "./http-client.service.js";

class AIService {
	private readonly httpClient: HttpClientService;

	constructor() {
		this.httpClient = new HttpClientService(env.aiServiceUrl);
	}

	async chat(data: ChatRequestDto) {
		return this.httpClient.post("/ai/chat", data);
	}

	async generateCourseStructure(data: CourseAssistantDto) {
		return this.httpClient.post("/ai/course-assistant", data);
	}

	async listChats(queryParams?: unknown) {
		return this.httpClient.get("/chats", { params: queryParams });
	}

	async getChatHistory(chatId: string) {
		return this.httpClient.get(`/chats/${chatId}`);
	}

	async deleteChat(chatId: string) {
		return this.httpClient.delete(`/chats/${chatId}`);
	}
}

export const aiService = new AIService();
