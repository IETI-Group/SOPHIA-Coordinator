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

	async getLessonById(sectionId: string, lessonId: string, queryParams?: any) {
		return this.httpClient.get(`/sections/${sectionId}/lessons/${lessonId}`, {
			params: queryParams,
		});
	}

	async createLesson(sectionId: string, body: any) {
		return this.httpClient.post(`/sections/${sectionId}/lessons`, body);
	}

	async updateLesson(sectionId: string, lessonId: string, body: any) {
		return this.httpClient.put(
			`/sections/${sectionId}/lessons/${lessonId}`,
			body,
		);
	}

	async deleteLesson(sectionId: string, lessonId: string) {
		return this.httpClient.delete(`/sections/${sectionId}/lessons/${lessonId}`);
	}

	// Quizzes endpoints
	async getQuizzes(sectionId: string, queryParams?: any) {
		return this.httpClient.get(`/sections/${sectionId}/quizzes`, {
			params: queryParams,
		});
	}

	async getQuizById(sectionId: string, quizId: string, queryParams?: any) {
		return this.httpClient.get(`/sections/${sectionId}/quizzes/${quizId}`, {
			params: queryParams,
		});
	}

	async createQuiz(sectionId: string, body: any) {
		return this.httpClient.post(`/sections/${sectionId}/quizzes`, body);
	}

	async updateQuiz(sectionId: string, quizId: string, body: any) {
		return this.httpClient.put(
			`/sections/${sectionId}/quizzes/${quizId}`,
			body,
		);
	}

	async deleteQuiz(sectionId: string, quizId: string) {
		return this.httpClient.delete(`/sections/${sectionId}/quizzes/${quizId}`);
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

	async getAISpecById(lessonId: string, specId: string, queryParams?: any) {
		return this.httpClient.get(`/lessons/${lessonId}/ai-specs/${specId}`, {
			params: queryParams,
		});
	}

	async createAISpec(lessonId: string, body: any) {
		return this.httpClient.post(`/lessons/${lessonId}/ai-specs`, body);
	}

	async updateAISpec(lessonId: string, specId: string, body: any) {
		return this.httpClient.put(`/lessons/${lessonId}/ai-specs/${specId}`, body);
	}

	async deleteAISpec(lessonId: string, specId: string) {
		return this.httpClient.delete(`/lessons/${lessonId}/ai-specs/${specId}`);
	}
}

export const courseService = new CourseService();
