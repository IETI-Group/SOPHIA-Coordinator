import type { NextFunction, Request, Response } from "express";
import { userService } from "../services/user.service.js";
import { validateParams } from "../utils/validation.js";

export class UserController {
	// Función para construir la config de request con headers y query
	private buildRequestConfig(req: Request) {
		return {
			queryParams: req.query,
			headers: req.headers as Record<string, string>,
		};
	}

	// Users
	async getUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const { queryParams, headers } = this.buildRequestConfig(req);
			const response = await userService.getUsers(queryParams, headers);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getUserById(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			if (!id) {
				res.status(400).json({ error: "Missing id parameter" });
				return;
			}
			const { queryParams, headers } = this.buildRequestConfig(req);
			const response = await userService.getUserById(id, queryParams, headers);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getUserByEmail(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ email: req.params.email }, res) ||
				!req.params.email
			)
				return;
			const { queryParams, headers } = this.buildRequestConfig(req);
			const response = await userService.getUserByEmail(
				req.params.email,
				queryParams,
				headers,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getUsersBatch(req: Request, res: Response, next: NextFunction) {
		try {
			const { queryParams, headers } = this.buildRequestConfig(req);
			const response = await userService.getUsersBatch(
				req.body,
				queryParams,
				headers,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.createUser(req.body, headers);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateUser(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res) || !req.params.id) return;
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.updateUser(
				req.params.id,
				req.body,
				headers,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteUser(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res) || !req.params.id) return;
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.deleteUser(req.params.id, headers);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// Learning Path
	async getLearningPath(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res) || !req.params.id) return;
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.getLearningPath(
				req.params.id,
				headers,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createLearningPath(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res) || !req.params.id) return;
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.createLearningPath(
				req.params.id,
				req.body,
				headers,
			);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateLearningPath(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res) || !req.params.id) return;
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.updateLearningPath(
				req.params.id,
				req.body,
				headers,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// Reviews
	async getUserReviews(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res) || !req.params.id) return;
			const { queryParams, headers } = this.buildRequestConfig(req);
			const response = await userService.getUserReviews(
				req.params.id,
				queryParams,
				headers,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getInstructorReviews(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ instructorId: req.params.instructorId }, res) ||
				!req.params.instructorId
			)
				return;
			const { queryParams, headers } = this.buildRequestConfig(req);
			const response = await userService.getInstructorReviews(
				req.params.instructorId,
				queryParams,
				headers,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getCourseReviews(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ courseId: req.params.courseId }, res) ||
				!req.params.courseId
			)
				return;
			const { queryParams, headers } = this.buildRequestConfig(req);
			const response = await userService.getCourseReviews(
				req.params.courseId,
				queryParams,
				headers,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createReview(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res) || !req.params.id) return;
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.createReview(
				req.params.id,
				req.body,
				headers,
			);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateReview(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams(
					{ id: req.params.id, reviewId: req.params.reviewId },
					res,
				) ||
				!req.params.id ||
				!req.params.reviewId
			)
				return;
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.updateReview(
				req.params.id,
				req.params.reviewId,
				req.body,
				headers,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteReview(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams(
					{ id: req.params.id, reviewId: req.params.reviewId },
					res,
				) ||
				!req.params.id ||
				!req.params.reviewId
			)
				return;
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.deleteReview(
				req.params.id,
				req.params.reviewId,
				headers,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// Linked Accounts
	async getLinkedAccounts(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res) || !req.params.id) return;
			const { queryParams, headers } = this.buildRequestConfig(req);
			const response = await userService.getLinkedAccounts(
				req.params.id,
				queryParams,
				headers,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getLinkedAccount(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams(
					{ id: req.params.id, accountId: req.params.accountId },
					res,
				) ||
				!req.params.id ||
				!req.params.accountId
			)
				return;
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.getLinkedAccount(
				req.params.id,
				req.params.accountId,
				headers,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createLinkedAccount(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res) || !req.params.id) return;
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.createLinkedAccount(
				req.params.id,
				req.body,
				headers,
			);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateLinkedAccount(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams(
					{ id: req.params.id, accountId: req.params.accountId },
					res,
				) ||
				!req.params.id ||
				!req.params.accountId
			)
				return;
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.updateLinkedAccount(
				req.params.id,
				req.params.accountId,
				req.body,
				headers,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteLinkedAccount(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams(
					{ id: req.params.id, accountId: req.params.accountId },
					res,
				) ||
				!req.params.id ||
				!req.params.accountId
			)
				return;
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.deleteLinkedAccount(
				req.params.id,
				req.params.accountId,
				headers,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// Admin - Roles
	async getRoles(req: Request, res: Response, next: NextFunction) {
		try {
			const { queryParams, headers } = this.buildRequestConfig(req);
			const response = await userService.getRoles(queryParams, headers);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getRoleByName(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ name: req.params.name }, res) || !req.params.name)
				return;
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.getRoleByName(
				req.params.name,
				headers,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createRole(req: Request, res: Response, next: NextFunction) {
		try {
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.createRole(req.body, headers);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateRole(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ name: req.params.name }, res) || !req.params.name)
				return;
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.updateRole(
				req.params.name,
				req.body,
				headers,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteRole(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ name: req.params.name }, res) || !req.params.name)
				return;
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.deleteRole(req.params.name, headers);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// Admin - Role Assignations
	async getAssignations(req: Request, res: Response, next: NextFunction) {
		try {
			const { queryParams, headers } = this.buildRequestConfig(req);
			const response = await userService.getAssignations(queryParams, headers);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createAssignation(req: Request, res: Response, next: NextFunction) {
		try {
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.createAssignation(req.body, headers);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateAssignationByUserRole(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			if (
				!validateParams(
					{ userId: req.params.userId, role: req.params.role },
					res,
				) ||
				!req.params.userId ||
				!req.params.role
			)
				return;
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.updateAssignationByUserRole(
				req.params.userId,
				req.params.role,
				req.body,
				headers,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateAssignationById(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ assignationId: req.params.assignationId }, res) ||
				!req.params.assignationId
			)
				return;
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.updateAssignationById(
				req.params.assignationId,
				req.body,
				headers,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteAssignationByUserRole(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			if (
				!validateParams(
					{ userId: req.params.userId, role: req.params.role },
					res,
				) ||
				!req.params.userId ||
				!req.params.role
			)
				return;
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.deleteAssignationByUserRole(
				req.params.userId,
				req.params.role,
				headers,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteAssignationById(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ assignationId: req.params.assignationId }, res) ||
				!req.params.assignationId
			)
				return;
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.deleteAssignationById(
				req.params.assignationId,
				headers,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// Admin - Instructors
	async getInstructors(req: Request, res: Response, next: NextFunction) {
		try {
			const { queryParams, headers } = this.buildRequestConfig(req);
			const response = await userService.getInstructors(queryParams, headers);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createInstructor(req: Request, res: Response, next: NextFunction) {
		try {
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.createInstructor(req.body, headers);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateInstructor(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ instructorId: req.params.instructorId }, res) ||
				!req.params.instructorId
			)
				return;
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.updateInstructor(
				req.params.instructorId,
				req.body,
				headers,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteInstructor(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ instructorId: req.params.instructorId }, res) ||
				!req.params.instructorId
			)
				return;
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.deleteInstructor(
				req.params.instructorId,
				headers,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// Public Instructors
	async getInstructorById(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ instructorId: req.params.instructorId }, res) ||
				!req.params.instructorId
			)
				return;
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.getInstructorById(
				req.params.instructorId,
				headers,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async registerInstructor(req: Request, res: Response, next: NextFunction) {
		try {
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.registerInstructor(req.body, headers);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateInstructorPublic(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			if (
				!validateParams({ instructorId: req.params.instructorId }, res) ||
				!req.params.instructorId
			)
				return;
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.updateInstructorPublic(
				req.params.instructorId,
				req.body,
				headers,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteInstructorPublic(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			if (
				!validateParams({ instructorId: req.params.instructorId }, res) ||
				!req.params.instructorId
			)
				return;
			const { headers } = this.buildRequestConfig(req);
			const response = await userService.deleteInstructorPublic(
				req.params.instructorId,
				headers,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}
}

export const userController = new UserController();
