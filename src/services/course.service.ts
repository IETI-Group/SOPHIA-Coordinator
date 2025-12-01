import { env } from "../config/env";
import { HttpClientService } from "./http-client.service";

class CourseService {
	private httpClient: HttpClientService;

	constructor() {
		this.httpClient = new HttpClientService(env.courseServiceUrl);
	}

	// Courses endpoints
	async getCourses(queryParams?: any) {
		return this.httpClient.get("/courses", { params: queryParams });
	}

	async getCourseById(id: string, queryParams?: any) {
		return this.httpClient.get(`/courses/${id}`, { params: queryParams });
	}

	async createCourse(body: any) {
		return this.httpClient.post("/courses", body);
	}

	async updateCourse(id: string, body: any) {
		return this.httpClient.put(`/courses/${id}`, body);
	}

	async deleteCourse(id: string) {
		return this.httpClient.delete(`/courses/${id}`);
	}

	// Sections endpoints
	async getSections(courseId: string, queryParams?: any) {
		return this.httpClient.get(`/courses/${courseId}/sections`, {
			params: queryParams,
		});
	}

	async createSection(courseId: string, body: any) {
		return this.httpClient.post(`/courses/${courseId}/sections`, body);
	}

	async updateSection(courseId: string, sectionId: string, body: any) {
		return this.httpClient.put(
			`/courses/${courseId}/sections/${sectionId}`,
			body,
		);
	}

	async deleteSection(courseId: string, sectionId: string) {
		return this.httpClient.delete(`/courses/${courseId}/sections/${sectionId}`);
	}

	// Lessons endpoints
	async getLessons(sectionId: string, queryParams?: any) {
		return this.httpClient.get(`/sections/${sectionId}/lessons`, {
			params: queryParams,
		});
	}

	async getLessonById(lessonId: string, queryParams?: any) {
		return this.httpClient.get(`/lessons/${lessonId}`, {
			params: queryParams,
		});
	}

	async createLesson(sectionId: string, body: any) {
		return this.httpClient.post(`/sections/${sectionId}/lessons`, body);
	}

	async updateLesson(lessonId: string, body: any) {
		return this.httpClient.put(`/lessons/${lessonId}`, body);
	}

	async deleteLesson(lessonId: string) {
		return this.httpClient.delete(`/lessons/${lessonId}`);
	}

	// Lesson Contents endpoints
	async getLessonContents(lessonId: string, queryParams?: any) {
		return this.httpClient.get(`/lessons/${lessonId}/contents`, {
			params: queryParams,
		});
	}

	async getContentById(contentId: string, queryParams?: any) {
		return this.httpClient.get(`/contents/${contentId}`, {
			params: queryParams,
		});
	}

	async createLessonContent(lessonId: string, body: any) {
		return this.httpClient.post(`/lessons/${lessonId}/contents`, body);
	}

	async updateContent(contentId: string, body: any) {
		return this.httpClient.put(`/contents/${contentId}`, body);
	}

	async deleteContent(contentId: string) {
		return this.httpClient.delete(`/contents/${contentId}`);
	}

	// Quizzes endpoints
	async getQuizzes(sectionId: string, queryParams?: any) {
		return this.httpClient.get(`/sections/${sectionId}/quizzes`, {
			params: queryParams,
		});
	}

	async getQuizById(quizId: string, queryParams?: any) {
		return this.httpClient.get(`/quizzes/${quizId}`, {
			params: queryParams,
		});
	}

	async createQuiz(sectionId: string, body: any) {
		return this.httpClient.post(`/sections/${sectionId}/quizzes`, body);
	}

	async updateQuiz(quizId: string, body: any) {
		return this.httpClient.put(`/quizzes/${quizId}`, body);
	}

	async deleteQuiz(quizId: string) {
		return this.httpClient.delete(`/quizzes/${quizId}`);
	}

	// Assignments endpoints
	async getAssignments(lessonId: string, queryParams?: any) {
		return this.httpClient.get(`/lessons/${lessonId}/assignments`, {
			params: queryParams,
		});
	}

	async getAssignmentById(
		lessonId: string,
		assignmentId: string,
		queryParams?: any,
	) {
		return this.httpClient.get(
			`/lessons/${lessonId}/assignments/${assignmentId}`,
			{ params: queryParams },
		);
	}

	async createAssignment(lessonId: string, body: any) {
		return this.httpClient.post(`/lessons/${lessonId}/assignments`, body);
	}

	async updateAssignment(lessonId: string, assignmentId: string, body: any) {
		return this.httpClient.put(
			`/lessons/${lessonId}/assignments/${assignmentId}`,
			body,
		);
	}

	async deleteAssignment(lessonId: string, assignmentId: string) {
		return this.httpClient.delete(
			`/lessons/${lessonId}/assignments/${assignmentId}`,
		);
	}

	// Resources endpoints
	async getResources(queryParams?: any) {
		return this.httpClient.get("/resources", { params: queryParams });
	}

	async getResourceById(resourceId: string, queryParams?: any) {
		return this.httpClient.get(`/resources/${resourceId}`, {
			params: queryParams,
		});
	}

	async createResource(body: any) {
		return this.httpClient.post("/resources", body);
	}

	async updateResource(resourceId: string, body: any) {
		return this.httpClient.put(`/resources/${resourceId}`, body);
	}

	async deleteResource(resourceId: string) {
		return this.httpClient.delete(`/resources/${resourceId}`);
	}

	// Tags endpoints
	async getTags(queryParams?: any) {
		return this.httpClient.get("/tags", { params: queryParams });
	}

	async createTag(body: any) {
		return this.httpClient.post("/tags", body);
	}

	async deleteTag(categoryId: string, courseId: string) {
		return this.httpClient.delete(`/tags/${categoryId}/${courseId}`);
	}

	// Categories endpoints
	async getCategories(queryParams?: any) {
		return this.httpClient.get("/categories", { params: queryParams });
	}

	async getCategoryById(categoryId: string, queryParams?: any) {
		return this.httpClient.get(`/categories/${categoryId}`, {
			params: queryParams,
		});
	}

	async createCategory(body: any) {
		return this.httpClient.post("/categories", body);
	}

	async updateCategory(categoryId: string, body: any) {
		return this.httpClient.put(`/categories/${categoryId}`, body);
	}

	async deleteCategory(categoryId: string) {
		return this.httpClient.delete(`/categories/${categoryId}`);
	}

	// AI Specs endpoints
	async getAISpecs(lessonId: string, queryParams?: any) {
		return this.httpClient.get(`/lessons/${lessonId}/ai-specs`, {
			params: queryParams,
		});
	}

	async getAISpecById(specId: string, queryParams?: any) {
		return this.httpClient.get(`/ai-specs/${specId}`, {
			params: queryParams,
		});
	}

	async createAISpec(lessonId: string, body: any) {
		return this.httpClient.post(`/lessons/${lessonId}/ai-specs`, body);
	}

	async updateAISpec(specId: string, body: any) {
		return this.httpClient.put(`/ai-specs/${specId}`, body);
	}

	async deleteAISpec(specId: string) {
		return this.httpClient.delete(`/ai-specs/${specId}`);
	}
}

export const courseService = new CourseService();
