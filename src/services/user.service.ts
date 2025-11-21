import { env } from '../config/env';
import { HttpClientService } from './http-client.service';

class UserService {
  private httpClient: HttpClientService;

  constructor() {
    this.httpClient = new HttpClientService(env.userServiceUrl);
  }

  // Users endpoints
  async getUsers(queryParams: any) {
    return this.httpClient.get('/users', { params: queryParams });
  }

  async getUserById(id: string, queryParams?: any) {
    return this.httpClient.get(`/users/id/${id}`, { params: queryParams });
  }

  async getUserByEmail(email: string, queryParams?: any) {
    return this.httpClient.get(`/users/email/${email}`, { params: queryParams });
  }

  async getUsersBatch(body: any, queryParams?: any) {
    return this.httpClient.post('/users/batch', body, { params: queryParams });
  }

  async createUser(body: any) {
    return this.httpClient.post('/users', body);
  }

  async updateUser(id: string, body: any) {
    return this.httpClient.put(`/users/${id}`, body);
  }

  async deleteUser(id: string) {
    return this.httpClient.delete(`/users/${id}`);
  }

  // Learning Path endpoints
  async getLearningPath(userId: string) {
    return this.httpClient.get(`/users/${userId}/learning-path`);
  }

  async createLearningPath(userId: string, body: any) {
    return this.httpClient.post(`/users/${userId}/learning-path`, body);
  }

  async updateLearningPath(userId: string, body: any) {
    return this.httpClient.put(`/users/${userId}/learning-path`, body);
  }

  // Reviews endpoints
  async getUserReviews(userId: string, queryParams?: any) {
    return this.httpClient.get(`/users/${userId}/reviews`, { params: queryParams });
  }

  async getInstructorReviews(instructorId: string, queryParams?: any) {
    return this.httpClient.get(`/users/instructors/${instructorId}/reviews`, { params: queryParams });
  }

  async getCourseReviews(courseId: string, queryParams?: any) {
    return this.httpClient.get(`/users/courses/${courseId}/reviews`, { params: queryParams });
  }

  async createReview(userId: string, body: any) {
    return this.httpClient.post(`/users/${userId}/reviews`, body);
  }

  async updateReview(userId: string, reviewId: string, body: any) {
    return this.httpClient.put(`/users/${userId}/reviews/${reviewId}`, body);
  }

  async deleteReview(userId: string, reviewId: string) {
    return this.httpClient.delete(`/users/${userId}/reviews/${reviewId}`);
  }

  // Linked Accounts endpoints
  async getLinkedAccounts(userId: string, queryParams?: any) {
    return this.httpClient.get(`/users/${userId}/linked-accounts`, { params: queryParams });
  }

  async getLinkedAccount(userId: string, accountId: string) {
    return this.httpClient.get(`/users/${userId}/linked-accounts/${accountId}`);
  }

  async createLinkedAccount(userId: string, body: any) {
    return this.httpClient.post(`/users/${userId}/linked-accounts`, body);
  }

  async updateLinkedAccount(userId: string, accountId: string, body: any) {
    return this.httpClient.put(`/users/${userId}/linked-accounts/${accountId}`, body);
  }

  async deleteLinkedAccount(userId: string, accountId: string) {
    return this.httpClient.delete(`/users/${userId}/linked-accounts/${accountId}`);
  }

  // Admin - Roles endpoints
  async getRoles(queryParams?: any) {
    return this.httpClient.get('/admin/roles', { params: queryParams });
  }

  async getRoleByName(name: string) {
    return this.httpClient.get(`/admin/roles/${name}`);
  }

  async createRole(body: any) {
    return this.httpClient.post('/admin/roles', body);
  }

  async updateRole(name: string, body: any) {
    return this.httpClient.put(`/admin/roles/${name}`, body);
  }

  async deleteRole(name: string) {
    return this.httpClient.delete(`/admin/roles/${name}`);
  }

  // Admin - Role Assignations endpoints
  async getAssignations(queryParams?: any) {
    return this.httpClient.get('/admin/assignations', { params: queryParams });
  }

  async createAssignation(body: any) {
    return this.httpClient.post('/admin/assignations', body);
  }

  async updateAssignationByUserRole(userId: string, role: string, body: any) {
    return this.httpClient.put(`/admin/assignations/user/${userId}/role/${role}`, body);
  }

  async updateAssignationById(assignationId: string, body: any) {
    return this.httpClient.put(`/admin/assignations/${assignationId}`, body);
  }

  async deleteAssignationByUserRole(userId: string, role: string) {
    return this.httpClient.delete(`/admin/assignations/user/${userId}/role/${role}`);
  }

  async deleteAssignationById(assignationId: string) {
    return this.httpClient.delete(`/admin/assignations/${assignationId}`);
  }

  // Admin - Instructors endpoints
  async getInstructors(queryParams?: any) {
    return this.httpClient.get('/admin/instructors', { params: queryParams });
  }

  async createInstructor(body: any) {
    return this.httpClient.post('/admin/instructors', body);
  }

  async updateInstructor(instructorId: string, body: any) {
    return this.httpClient.put(`/admin/instructors/${instructorId}`, body);
  }

  async deleteInstructor(instructorId: string) {
    return this.httpClient.delete(`/admin/instructors/${instructorId}`);
  }

  // Public Instructors endpoints
  async getInstructorById(instructorId: string) {
    return this.httpClient.get(`/instructors/${instructorId}`);
  }

  async registerInstructor(body: any) {
    return this.httpClient.post('/instructors', body);
  }

  async updateInstructorPublic(instructorId: string, body: any) {
    return this.httpClient.put(`/instructors/${instructorId}`, body);
  }

  async deleteInstructorPublic(instructorId: string) {
    return this.httpClient.delete(`/instructors/${instructorId}`);
  }
}

export const userService = new UserService();
