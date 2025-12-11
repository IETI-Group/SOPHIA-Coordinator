import { env } from "../config/env.js";
import { HttpClientService } from "./http-client.service.js";

class UserService {
	private readonly httpClient: HttpClientService;

	constructor() {
		this.httpClient = new HttpClientService(env.userServiceUrl);
	}

	// Helper para extraer solo Authorization
	private extractAuth(headers?: Record<string, string>) {
		const { authorization } = headers ?? {};
		return authorization ? { authorization } : {};
	}

	// Users endpoints
	async getUsers(queryParams?: unknown, headers?: Record<string, string>) {
		return this.httpClient.get("/users", {
			params: queryParams,
			headers: this.extractAuth(headers),
		});
	}

	async getUserById(
		id: string,
		queryParams?: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.get(`/users/id/${id}`, {
			params: queryParams,
			headers: this.extractAuth(headers),
		});
	}

	async getUserByEmail(
		email: string,
		queryParams?: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.get(`/users/email/${email}`, {
			params: queryParams,
			headers: this.extractAuth(headers),
		});
	}

	async getUsersBatch(
		body: unknown,
		queryParams?: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.post("/users/batch", body, {
			params: queryParams,
			headers: this.extractAuth(headers),
		});
	}

	async createUser(body: unknown, headers?: Record<string, string>) {
		return this.httpClient.post("/users", body, {
			headers: this.extractAuth(headers),
		});
	}

	async updateUser(
		id: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.put(`/users/${id}`, body, {
			headers: this.extractAuth(headers),
		});
	}

	async deleteUser(id: string, headers?: Record<string, string>) {
		return this.httpClient.delete(`/users/${id}`, {
			headers: this.extractAuth(headers),
		});
	}

	// Learning Path endpoints
	async getLearningPath(userId: string, headers?: Record<string, string>) {
		return this.httpClient.get(`/users/${userId}/learning-path`, {
			headers: this.extractAuth(headers),
		});
	}

	async createLearningPath(
		userId: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.post(`/users/${userId}/learning-path`, body, {
			headers: this.extractAuth(headers),
		});
	}

	async updateLearningPath(
		userId: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.put(`/users/${userId}/learning-path`, body, {
			headers: this.extractAuth(headers),
		});
	}

	// Reviews endpoints
	async getUserReviews(
		userId: string,
		queryParams?: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.get(`/users/${userId}/reviews`, {
			params: queryParams,
			headers: this.extractAuth(headers),
		});
	}

	async getInstructorReviews(
		instructorId: string,
		queryParams?: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.get(`/users/instructors/${instructorId}/reviews`, {
			params: queryParams,
			headers: this.extractAuth(headers),
		});
	}

	async getCourseReviews(
		courseId: string,
		queryParams?: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.get(`/users/courses/${courseId}/reviews`, {
			params: queryParams,
			headers: this.extractAuth(headers),
		});
	}

	async createReview(
		userId: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.post(`/users/${userId}/reviews`, body, {
			headers: this.extractAuth(headers),
		});
	}

	async updateReview(
		userId: string,
		reviewId: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.put(`/users/${userId}/reviews/${reviewId}`, body, {
			headers: this.extractAuth(headers),
		});
	}

	async deleteReview(
		userId: string,
		reviewId: string,
		headers?: Record<string, string>,
	) {
		return this.httpClient.delete(`/users/${userId}/reviews/${reviewId}`, {
			headers: this.extractAuth(headers),
		});
	}

	// Linked Accounts endpoints
	async getLinkedAccounts(
		userId: string,
		queryParams?: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.get(`/users/${userId}/linked-accounts`, {
			params: queryParams,
			headers: this.extractAuth(headers),
		});
	}

	async getLinkedAccount(
		userId: string,
		accountId: string,
		headers?: Record<string, string>,
	) {
		return this.httpClient.get(
			`/users/${userId}/linked-accounts/${accountId}`,
			{
				headers: this.extractAuth(headers),
			},
		);
	}

	async createLinkedAccount(
		userId: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.post(`/users/${userId}/linked-accounts`, body, {
			headers: this.extractAuth(headers),
		});
	}

	async updateLinkedAccount(
		userId: string,
		accountId: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.put(
			`/users/${userId}/linked-accounts/${accountId}`,
			body,
			{
				headers: this.extractAuth(headers),
			},
		);
	}

	async deleteLinkedAccount(
		userId: string,
		accountId: string,
		headers?: Record<string, string>,
	) {
		return this.httpClient.delete(
			`/users/${userId}/linked-accounts/${accountId}`,
			{
				headers: this.extractAuth(headers),
			},
		);
	}

	// Admin - Roles endpoints
	async getRoles(queryParams?: unknown, headers?: Record<string, string>) {
		return this.httpClient.get("/admin/roles", {
			params: queryParams,
			headers: this.extractAuth(headers),
		});
	}

	async getRoleByName(name: string, headers?: Record<string, string>) {
		return this.httpClient.get(`/admin/roles/${name}`, {
			headers: this.extractAuth(headers),
		});
	}

	async createRole(body: unknown, headers?: Record<string, string>) {
		return this.httpClient.post("/admin/roles", body, {
			headers: this.extractAuth(headers),
		});
	}

	async updateRole(
		name: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.put(`/admin/roles/${name}`, body, {
			headers: this.extractAuth(headers),
		});
	}

	async deleteRole(name: string, headers?: Record<string, string>) {
		return this.httpClient.delete(`/admin/roles/${name}`, {
			headers: this.extractAuth(headers),
		});
	}

	// Admin - Assignations
	async getAssignations(
		queryParams?: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.get("/admin/assignations", {
			params: queryParams,
			headers: this.extractAuth(headers),
		});
	}

	async createAssignation(body: unknown, headers?: Record<string, string>) {
		return this.httpClient.post("/admin/assignations", body, {
			headers: this.extractAuth(headers),
		});
	}

	async updateAssignationByUserRole(
		userId: string,
		role: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.put(
			`/admin/assignations/user/${userId}/role/${role}`,
			body,
			{
				headers: this.extractAuth(headers),
			},
		);
	}

	async updateAssignationById(
		assignationId: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.put(`/admin/assignations/${assignationId}`, body, {
			headers: this.extractAuth(headers),
		});
	}

	async deleteAssignationByUserRole(
		userId: string,
		role: string,
		headers?: Record<string, string>,
	) {
		return this.httpClient.delete(
			`/admin/assignations/user/${userId}/role/${role}`,
			{
				headers: this.extractAuth(headers),
			},
		);
	}

	async deleteAssignationById(
		assignationId: string,
		headers?: Record<string, string>,
	) {
		return this.httpClient.delete(`/admin/assignations/${assignationId}`, {
			headers: this.extractAuth(headers),
		});
	}

	// Admin - Instructors

	async createInstructor(body: unknown, headers?: Record<string, string>) {
		return this.httpClient.post("/admin/instructors", body, {
			headers: this.extractAuth(headers),
		});
	}

	async updateInstructor(
		instructorId: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.put(`/admin/instructors/${instructorId}`, body, {
			headers: this.extractAuth(headers),
		});
	}

	async deleteInstructor(
		instructorId: string,
		headers?: Record<string, string>,
	) {
		return this.httpClient.delete(`/admin/instructors/${instructorId}`, {
			headers: this.extractAuth(headers),
		});
	}

	// Public Instructors
	async getInstructors(
		queryParams?: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.get("/instructors", {
			params: queryParams,
			headers: this.extractAuth(headers),
		});
	}

	async getInstructorById(
		instructorId: string,
		headers?: Record<string, string>,
	) {
		return this.httpClient.get(`/instructors/${instructorId}`, {
			headers: this.extractAuth(headers),
		});
	}

	async registerInstructor(body: unknown, headers?: Record<string, string>) {
		return this.httpClient.post("/instructors", body, {
			headers: this.extractAuth(headers),
		});
	}

	async updateInstructorPublic(
		instructorId: string,
		body: unknown,
		headers?: Record<string, string>,
	) {
		return this.httpClient.put(`/instructors/${instructorId}`, body, {
			headers: this.extractAuth(headers),
		});
	}

	async deleteInstructorPublic(
		instructorId: string,
		headers?: Record<string, string>,
	) {
		return this.httpClient.delete(`/instructors/${instructorId}`, {
			headers: this.extractAuth(headers),
		});
	}
}

export const userService = new UserService();
