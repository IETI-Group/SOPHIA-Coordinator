import { Ollama } from "ollama";
import { env } from "../config/env";
import type { ChatRequestDto, CourseAssistantDto } from "../dtos/ai";

class AIService {
	private ollama: Ollama;

	constructor() {
		this.ollama = new Ollama({ host: env.ollamaHost });
	}

	async chat(data: ChatRequestDto) {
		try {
			const messages = data.history ? [...data.history] : [];
			messages.push({ role: "user", content: data.message });

			const response = await this.ollama.chat({
				model: env.ollamaModel,
				messages: messages,
			});
			return { response: response.message.content };
		} catch (error) {
			throw new Error(
				`AI Service Error: ${error instanceof Error ? error.message : "Unknown error"}`,
			);
		}
	}

	async generateCourseStructure(data: CourseAssistantDto) {
		const prompt = `
      Act as a Senior Curriculum Developer and Instructional Designer. Your goal is to create a professional, high-quality course outline optimized for student learning and engagement.

      Course Concept: "${data.idea}"
      Structural Guidelines: "${data.guide}"

      Please design a detailed syllabus that:
      1. Organizes content into logical Sections and Lessons.
      2. Ensures a progressive learning path suitable for the target audience.
      3. Maximizes pedagogical effectiveness.

      Return ONLY the structured course outline, ready for implementation.
    `;

		try {
			const response = await this.ollama.chat({
				model: env.ollamaModel,
				messages: [{ role: "user", content: prompt }],
			});
			return { response: response.message.content };
		} catch (error) {
			throw new Error(
				`AI Service Error: ${error instanceof Error ? error.message : "Unknown error"}`,
			);
		}
	}
}

export const aiService = new AIService();
