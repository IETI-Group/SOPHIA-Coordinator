import { env } from "../config/env.js";
import { HttpClientService } from "./http-client.service.js";

class CourseService {
	private readonly httpClient: HttpClientService;
	private extractAllowedHeaders(headers?: Record<string, string>) {
		if (!headers) return {};

		const allowed = ["authorization"];

		const filtered: Record<string, string> = {};
		for (const key of allowed) {
			const value = headers[key] ?? headers[key.toLowerCase()];
			if (value) filtered[key] = value;
		}
		return filtered;
	}

	constructor() {
		this.httpClient = new HttpClientService(env.courseServiceUrl);
	}
	async getCourses(queryParams?: unknown, headers?: Record<string, string>) {
		return this.httpClient.get("/courses", {
			params: queryParams,
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async getCourseById(
		id: string,
		queryParams?: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.get(`/courses/${id}`, {
			params: queryParams,
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async createCourse(body: unknown, headers?: Record<string, string>) {
		return this.httpClient.post("/courses", body, {
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async updateCourse(
		id: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.put(`/courses/${id}`, body, {
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async deleteCourse(id: string, headers?: Record<string, string>) {
		return this.httpClient.delete(`/courses/${id}`, {
			headers: this.extractAllowedHeaders(headers),
		});
	}

	// Sections

	async getSections(
		courseId: string,
		queryParams?: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.get(`/courses/${courseId}/sections`, {
			params: queryParams,
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async createSection(
		courseId: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.post(`/courses/${courseId}/sections`, body, {
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async updateSection(
		courseId: string,
		sectionId: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.put(
			`/courses/${courseId}/sections/${sectionId}`,
			body,
			{ headers: this.extractAllowedHeaders(headers) },
		);
	}

	async deleteSection(
		courseId: string,
		sectionId: string,
		headers?: Record<string, string>,
	) {
		return this.httpClient.delete(
			`/courses/${courseId}/sections/${sectionId}`,
			{
				headers: this.extractAllowedHeaders(headers),
			},
		);
	}

	// Lessons

	async getLessons(
		sectionId: string,
		queryParams?: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.get(`/sections/${sectionId}/lessons`, {
			params: queryParams,
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async getLessonById(
		sectionId: string,
		lessonId: string,
		queryParams?: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.get(`/sections/${sectionId}/lessons/${lessonId}`, {
			params: queryParams,
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async createLesson(
		sectionId: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.post(`/sections/${sectionId}/lessons`, body, {
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async updateLesson(
		sectionId: string,
		lessonId: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.put(
			`/sections/${sectionId}/lessons/${lessonId}`,
			body,
			{ headers: this.extractAllowedHeaders(headers) },
		);
	}

	async deleteLesson(
		sectionId: string,
		lessonId: string,
		headers?: Record<string, string>,
	) {
		return this.httpClient.delete(
			`/sections/${sectionId}/lessons/${lessonId}`,
			{
				headers: this.extractAllowedHeaders(headers),
			},
		);
	}

	// Lesson Contents

	async getLessonContents(
		lessonId: string,
		queryParams?: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.get(`/lessons/${lessonId}/contents`, {
			params: queryParams,
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async getContentById(
		contentId: string,
		queryParams?: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.get(`/contents/${contentId}`, {
			params: queryParams,
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async createLessonContent(
		lessonId: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.post(`/lessons/${lessonId}/contents`, body, {
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async updateContent(
		contentId: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.put(`/contents/${contentId}`, body, {
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async deleteContent(contentId: string, headers?: Record<string, string>) {
		return this.httpClient.delete(`/contents/${contentId}`, {
			headers: this.extractAllowedHeaders(headers),
		});
	}

	// Quizzes

	async getQuizzes(
		sectionId: string,
		queryParams?: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.get(`/sections/${sectionId}/quizzes`, {
			params: queryParams,
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async getQuizById(
		sectionId: string,
		quizId: string,
		queryParams?: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.get(`/sections/${sectionId}/quizzes/${quizId}`, {
			params: queryParams,
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async createQuiz(
		sectionId: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.post(`/sections/${sectionId}/quizzes`, body, {
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async updateQuiz(
		sectionId: string,
		quizId: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.put(
			`/sections/${sectionId}/quizzes/${quizId}`,
			body,
			{ headers: this.extractAllowedHeaders(headers) },
		);
	}

	async deleteQuiz(
		sectionId: string,
		quizId: string,
		headers?: Record<string, string>,
	) {
		return this.httpClient.delete(`/sections/${sectionId}/quizzes/${quizId}`, {
			headers: this.extractAllowedHeaders(headers),
		});
	}

	// Assignments

	async getAssignments(
		lessonId: string,
		queryParams?: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.get(`/lessons/${lessonId}/assignments`, {
			params: queryParams,
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async getAssignmentById(
		lessonId: string,
		assignmentId: string,
		queryParams?: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.get(
			`/lessons/${lessonId}/assignments/${assignmentId}`,
			{
				params: queryParams,
				headers: this.extractAllowedHeaders(headers),
			},
		);
	}

	async createAssignment(
		lessonId: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.post(`/lessons/${lessonId}/assignments`, body, {
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async updateAssignment(
		lessonId: string,
		assignmentId: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.put(
			`/lessons/${lessonId}/assignments/${assignmentId}`,
			body,
			{ headers: this.extractAllowedHeaders(headers) },
		);
	}

	async deleteAssignment(
		lessonId: string,
		assignmentId: string,
		headers?: Record<string, string>,
	) {
		return this.httpClient.delete(
			`/lessons/${lessonId}/assignments/${assignmentId}`,
			{
				headers: this.extractAllowedHeaders(headers),
			},
		);
	}

	// Resources

	async getResources(queryParams?: unknown, headers?: Record<string, string>) {
		return this.httpClient.get("/resources", {
			params: queryParams,
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async getResourceById(
		resourceId: string,
		queryParams?: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.get(`/resources/${resourceId}`, {
			params: queryParams,
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async createResource(body: unknown, headers?: Record<string, string>) {
		return this.httpClient.post("/resources", body, {
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async updateResource(
		resourceId: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.put(`/resources/${resourceId}`, body, {
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async deleteResource(resourceId: string, headers?: Record<string, string>) {
		return this.httpClient.delete(`/resources/${resourceId}`, {
			headers: this.extractAllowedHeaders(headers),
		});
	}

	// Tags

	async getTags(queryParams?: unknown, headers?: Record<string, string>) {
		return this.httpClient.get("/tags", {
			params: queryParams,
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async createTag(body: unknown, headers?: Record<string, string>) {
		return this.httpClient.post("/tags", body, {
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async deleteTag(
		categoryId: string,
		courseId: string,
		headers?: Record<string, string>,
	) {
		return this.httpClient.delete(`/tags/${categoryId}/${courseId}`, {
			headers: this.extractAllowedHeaders(headers),
		});
	}

	// Categories

	async getCategories(queryParams?: unknown, headers?: Record<string, string>) {
		return this.httpClient.get("/categories", {
			params: queryParams,
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async getCategoryById(
		categoryId: string,
		queryParams?: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.get(`/categories/${categoryId}`, {
			params: queryParams,
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async createCategory(body: unknown, headers?: Record<string, string>) {
		return this.httpClient.post("/categories", body, {
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async updateCategory(
		categoryId: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.put(`/categories/${categoryId}`, body, {
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async deleteCategory(categoryId: string, headers?: Record<string, string>) {
		return this.httpClient.delete(`/categories/${categoryId}`, {
			headers: this.extractAllowedHeaders(headers),
		});
	}

	// AI Specs

	async getAISpecs(
		lessonId: string,
		queryParams?: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.get(`/lessons/${lessonId}/ai-specs`, {
			params: queryParams,
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async getAISpecById(
		lessonId: string,
		specId: string,
		queryParams?: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.get(`/lessons/${lessonId}/ai-specs/${specId}`, {
			params: queryParams,
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async createAISpec(
		lessonId: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.post(`/lessons/${lessonId}/ai-specs`, body, {
			headers: this.extractAllowedHeaders(headers),
		});
	}

	async updateAISpec(
		lessonId: string,
		specId: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.put(
			`/lessons/${lessonId}/ai-specs/${specId}`,
			body,
			{
				headers: this.extractAllowedHeaders(headers),
			},
		);
	}

	async deleteAISpec(
		lessonId: string,
		specId: string,
		headers?: Record<string, string>,
	) {
		return this.httpClient.delete(`/lessons/${lessonId}/ai-specs/${specId}`, {
			headers: this.extractAllowedHeaders(headers),
		});
	}
}

export const courseService = new CourseService();
