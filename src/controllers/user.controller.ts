import type { NextFunction, Request, Response } from "express";
import { userService } from "../services/user.service";
import { validateParams } from "../utils/validation";

export class UserController {
	// Users
	async getUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await userService.getUsers(req.query);
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
			const response = await userService.getUserById(id, req.query);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getUserByEmail(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ email: req.params.email }, res)) return;
			const response = await userService.getUserByEmail(
				req.params.email!,
				req.query,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getUsersBatch(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await userService.getUsersBatch(req.body, req.query);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createUser(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await userService.createUser(req.body);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateUser(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res)) return;
			const response = await userService.updateUser(req.params.id!, req.body);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteUser(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res)) return;
			const response = await userService.deleteUser(req.params.id!);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// Learning Path
	async getLearningPath(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res)) return;
			const response = await userService.getLearningPath(req.params.id!);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createLearningPath(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res)) return;
			const response = await userService.createLearningPath(
				req.params.id!,
				req.body,
			);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateLearningPath(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res)) return;
			const response = await userService.updateLearningPath(
				req.params.id!,
				req.body,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// Reviews
	async getUserReviews(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res)) return;
			const response = await userService.getUserReviews(
				req.params.id!,
				req.query,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getInstructorReviews(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ instructorId: req.params.instructorId }, res))
				return;
			const response = await userService.getInstructorReviews(
				req.params.instructorId!,
				req.query,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getCourseReviews(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ courseId: req.params.courseId }, res)) return;
			const response = await userService.getCourseReviews(
				req.params.courseId!,
				req.query,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createReview(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res)) return;
			const response = await userService.createReview(req.params.id!, req.body);
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
				)
			)
				return;
			const response = await userService.updateReview(
				req.params.id!,
				req.params.reviewId!,
				req.body,
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
				)
			)
				return;
			const response = await userService.deleteReview(
				req.params.id!,
				req.params.reviewId!,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// Linked Accounts
	async getLinkedAccounts(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res)) return;
			const response = await userService.getLinkedAccounts(
				req.params.id!,
				req.query,
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
				)
			)
				return;
			const response = await userService.getLinkedAccount(
				req.params.id!,
				req.params.accountId!,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createLinkedAccount(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res)) return;
			const response = await userService.createLinkedAccount(
				req.params.id!,
				req.body,
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
				)
			)
				return;
			const response = await userService.updateLinkedAccount(
				req.params.id!,
				req.params.accountId!,
				req.body,
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
				)
			)
				return;
			const response = await userService.deleteLinkedAccount(
				req.params.id!,
				req.params.accountId!,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// Admin - Roles
	async getRoles(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await userService.getRoles(req.query);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getRoleByName(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ name: req.params.name }, res)) return;
			const response = await userService.getRoleByName(req.params.name!);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createRole(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await userService.createRole(req.body);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateRole(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ name: req.params.name }, res)) return;
			const response = await userService.updateRole(req.params.name!, req.body);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteRole(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ name: req.params.name }, res)) return;
			const response = await userService.deleteRole(req.params.name!);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// Admin - Role Assignations
	async getAssignations(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await userService.getAssignations(req.query);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createAssignation(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await userService.createAssignation(req.body);
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
				)
			)
				return;
			const response = await userService.updateAssignationByUserRole(
				req.params.userId!,
				req.params.role!,
				req.body,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateAssignationById(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ assignationId: req.params.assignationId }, res))
				return;
			const response = await userService.updateAssignationById(
				req.params.assignationId!,
				req.body,
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
				)
			)
				return;
			const response = await userService.deleteAssignationByUserRole(
				req.params.userId!,
				req.params.role!,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteAssignationById(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ assignationId: req.params.assignationId }, res))
				return;
			const response = await userService.deleteAssignationById(
				req.params.assignationId!,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// Admin - Instructors
	async getInstructors(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await userService.getInstructors(req.query);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createInstructor(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await userService.createInstructor(req.body);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateInstructor(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ instructorId: req.params.instructorId }, res))
				return;
			const response = await userService.updateInstructor(
				req.params.instructorId!,
				req.body,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteInstructor(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ instructorId: req.params.instructorId }, res))
				return;
			const response = await userService.deleteInstructor(
				req.params.instructorId!,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// Public Instructors
	async getInstructorById(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ instructorId: req.params.instructorId }, res))
				return;
			const response = await userService.getInstructorById(
				req.params.instructorId!,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async registerInstructor(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await userService.registerInstructor(req.body);
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
			if (!validateParams({ instructorId: req.params.instructorId }, res))
				return;
			const response = await userService.updateInstructorPublic(
				req.params.instructorId!,
				req.body,
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
			if (!validateParams({ instructorId: req.params.instructorId }, res))
				return;
			const response = await userService.deleteInstructorPublic(
				req.params.instructorId!,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}
}

export const userController = new UserController();
