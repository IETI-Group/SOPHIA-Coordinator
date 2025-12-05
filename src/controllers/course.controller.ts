import type { NextFunction, Request, Response } from "express";
import { courseService } from "../services/course.service.js";
import { validateParams } from "../utils/validation.js";

export class CourseController {
	async getCourses(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await courseService.getCourses(
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getCourseById(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res) || !req.params.id) return;
			const response = await courseService.getCourseById(
				req.params.id,
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createCourse(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await courseService.createCourse(
				req.body,
				req.headers as Record<string, string>,
			);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateCourse(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res) || !req.params.id) return;
			const response = await courseService.updateCourse(
				req.params.id,
				req.body,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteCourse(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res) || !req.params.id) return;
			const response = await courseService.deleteCourse(
				req.params.id,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getSections(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ courseId: req.params.courseId }, res) ||
				!req.params.courseId
			)
				return;
			const response = await courseService.getSections(
				req.params.courseId,
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createSection(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ courseId: req.params.courseId }, res) ||
				!req.params.courseId
			)
				return;
			const response = await courseService.createSection(
				req.params.courseId,
				req.body,
				req.headers as Record<string, string>,
			);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateSection(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams(
					{ courseId: req.params.courseId, sectionId: req.params.sectionId },
					res,
				) ||
				!req.params.courseId ||
				!req.params.sectionId
			)
				return;
			const response = await courseService.updateSection(
				req.params.courseId,
				req.params.sectionId,
				req.body,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteSection(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams(
					{ courseId: req.params.courseId, sectionId: req.params.sectionId },
					res,
				) ||
				!req.params.courseId ||
				!req.params.sectionId
			)
				return;
			const response = await courseService.deleteSection(
				req.params.courseId,
				req.params.sectionId,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getLessons(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ sectionId: req.params.sectionId }, res) ||
				!req.params.sectionId
			)
				return;
			const response = await courseService.getLessons(
				req.params.sectionId,
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getLessonById(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams(
					{ sectionId: req.params.sectionId, lessonId: req.params.lessonId },
					res,
				) ||
				!req.params.sectionId ||
				!req.params.lessonId
			)
				return;
			const response = await courseService.getLessonById(
				req.params.sectionId,
				req.params.lessonId,
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createLesson(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ sectionId: req.params.sectionId }, res) ||
				!req.params.sectionId
			)
				return;
			const response = await courseService.createLesson(
				req.params.sectionId,
				req.body,
				req.headers as Record<string, string>,
			);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateLesson(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams(
					{ sectionId: req.params.sectionId, lessonId: req.params.lessonId },
					res,
				) ||
				!req.params.sectionId ||
				!req.params.lessonId
			)
				return;
			const response = await courseService.updateLesson(
				req.params.sectionId,
				req.params.lessonId,
				req.body,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteLesson(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams(
					{ sectionId: req.params.sectionId, lessonId: req.params.lessonId },
					res,
				) ||
				!req.params.sectionId ||
				!req.params.lessonId
			)
				return;
			const response = await courseService.deleteLesson(
				req.params.sectionId,
				req.params.lessonId,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// Lesson Contents
	async getLessonContents(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ lessonId: req.params.lessonId }, res) ||
				!req.params.lessonId
			)
				return;
			const response = await courseService.getLessonContents(
				req.params.lessonId,
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getContentById(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ contentId: req.params.contentId }, res) ||
				!req.params.contentId
			)
				return;
			const response = await courseService.getContentById(
				req.params.contentId,
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createLessonContent(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ lessonId: req.params.lessonId }, res) ||
				!req.params.lessonId
			)
				return;
			const response = await courseService.createLessonContent(
				req.params.lessonId,
				req.body,
				req.headers as Record<string, string>,
			);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateContent(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ contentId: req.params.contentId }, res) ||
				!req.params.contentId
			)
				return;
			const response = await courseService.updateContent(
				req.params.contentId,
				req.body,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteContent(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ contentId: req.params.contentId }, res) ||
				!req.params.contentId
			)
				return;
			await courseService.deleteContent(
				req.params.contentId,
				req.headers as Record<string, string>,
			);
			res.status(204).send();
		} catch (error) {
			next(error);
		}
	}

	async getQuizzes(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ sectionId: req.params.sectionId }, res) ||
				!req.params.sectionId
			)
				return;
			const response = await courseService.getQuizzes(
				req.params.sectionId,
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getQuizById(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams(
					{ sectionId: req.params.sectionId, quizId: req.params.quizId },
					res,
				) ||
				!req.params.sectionId ||
				!req.params.quizId
			)
				return;
			const response = await courseService.getQuizById(
				req.params.sectionId,
				req.params.quizId,
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createQuiz(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ sectionId: req.params.sectionId }, res) ||
				!req.params.sectionId
			)
				return;
			const response = await courseService.createQuiz(
				req.params.sectionId,
				req.body,
				req.headers as Record<string, string>,
			);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateQuiz(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams(
					{ sectionId: req.params.sectionId, quizId: req.params.quizId },
					res,
				) ||
				!req.params.sectionId ||
				!req.params.quizId
			)
				return;
			const response = await courseService.updateQuiz(
				req.params.sectionId,
				req.params.quizId,
				req.body,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteQuiz(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams(
					{ sectionId: req.params.sectionId, quizId: req.params.quizId },
					res,
				) ||
				!req.params.sectionId ||
				!req.params.quizId
			)
				return;
			const response = await courseService.deleteQuiz(
				req.params.sectionId,
				req.params.quizId,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getAssignments(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ lessonId: req.params.lessonId }, res) ||
				!req.params.lessonId
			)
				return;
			const response = await courseService.getAssignments(
				req.params.lessonId,
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getAssignmentById(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams(
					{
						lessonId: req.params.lessonId,
						assignmentId: req.params.assignmentId,
					},
					res,
				) ||
				!req.params.lessonId ||
				!req.params.assignmentId
			)
				return;
			const response = await courseService.getAssignmentById(
				req.params.lessonId,
				req.params.assignmentId,
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createAssignment(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ lessonId: req.params.lessonId }, res) ||
				!req.params.lessonId
			)
				return;
			const response = await courseService.createAssignment(
				req.params.lessonId,
				req.body,
				req.headers as Record<string, string>,
			);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateAssignment(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams(
					{
						lessonId: req.params.lessonId,
						assignmentId: req.params.assignmentId,
					},
					res,
				) ||
				!req.params.lessonId ||
				!req.params.assignmentId
			)
				return;
			const response = await courseService.updateAssignment(
				req.params.lessonId,
				req.params.assignmentId,
				req.body,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteAssignment(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams(
					{
						lessonId: req.params.lessonId,
						assignmentId: req.params.assignmentId,
					},
					res,
				) ||
				!req.params.lessonId ||
				!req.params.assignmentId
			)
				return;
			const response = await courseService.deleteAssignment(
				req.params.lessonId,
				req.params.assignmentId,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getResources(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await courseService.getResources(
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getResourceById(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ resourceId: req.params.resourceId }, res) ||
				!req.params.resourceId
			)
				return;
			const response = await courseService.getResourceById(
				req.params.resourceId,
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createResource(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await courseService.createResource(
				req.body,
				req.headers as Record<string, string>,
			);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateResource(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ resourceId: req.params.resourceId }, res) ||
				!req.params.resourceId
			)
				return;
			const response = await courseService.updateResource(
				req.params.resourceId,
				req.body,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteResource(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ resourceId: req.params.resourceId }, res) ||
				!req.params.resourceId
			)
				return;
			const response = await courseService.deleteResource(
				req.params.resourceId,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getTags(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await courseService.getTags(
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createTag(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await courseService.createTag(
				req.body,
				req.headers as Record<string, string>,
			);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteTag(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams(
					{ categoryId: req.params.categoryId, courseId: req.params.courseId },
					res,
				) ||
				!req.params.categoryId ||
				!req.params.courseId
			)
				return;
			const response = await courseService.deleteTag(
				req.params.categoryId,
				req.params.courseId,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getCategories(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await courseService.getCategories(
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getCategoryById(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ categoryId: req.params.categoryId }, res) ||
				!req.params.categoryId
			)
				return;
			const response = await courseService.getCategoryById(
				req.params.categoryId,
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createCategory(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await courseService.createCategory(
				req.body,
				req.headers as Record<string, string>,
			);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateCategory(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ categoryId: req.params.categoryId }, res) ||
				!req.params.categoryId
			)
				return;
			const response = await courseService.updateCategory(
				req.params.categoryId,
				req.body,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteCategory(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ categoryId: req.params.categoryId }, res) ||
				!req.params.categoryId
			)
				return;
			const response = await courseService.deleteCategory(
				req.params.categoryId,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getAISpecs(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ lessonId: req.params.lessonId }, res) ||
				!req.params.lessonId
			)
				return;
			const response = await courseService.getAISpecs(
				req.params.lessonId,
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getAISpecById(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams(
					{ lessonId: req.params.lessonId, specId: req.params.specId },
					res,
				) ||
				!req.params.lessonId ||
				!req.params.specId
			)
				return;
			const response = await courseService.getAISpecById(
				req.params.lessonId,
				req.params.specId,
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createAISpec(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ lessonId: req.params.lessonId }, res) ||
				!req.params.lessonId
			)
				return;
			const response = await courseService.createAISpec(
				req.params.lessonId,
				req.body,
				req.headers as Record<string, string>,
			);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateAISpec(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams(
					{ lessonId: req.params.lessonId, specId: req.params.specId },
					res,
				) ||
				!req.params.lessonId ||
				!req.params.specId
			)
				return;
			const response = await courseService.updateAISpec(
				req.params.lessonId,
				req.params.specId,
				req.body,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteAISpec(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams(
					{ lessonId: req.params.lessonId, specId: req.params.specId },
					res,
				) ||
				!req.params.lessonId ||
				!req.params.specId
			)
				return;
			const response = await courseService.deleteAISpec(
				req.params.lessonId,
				req.params.specId,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// ============= Forum Methods =============

	async getForums(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await courseService.getForums(
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getForumById(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res) || !req.params.id) return;
			const response = await courseService.getForumById(
				req.params.id,
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getForumByCourseId(req: Request, res: Response, next: NextFunction) {
		try {
			if (
				!validateParams({ courseId: req.params.courseId }, res) ||
				!req.params.courseId
			)
				return;
			const response = await courseService.getForumByCourseId(
				req.params.courseId,
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createForum(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await courseService.createForum(
				req.body,
				req.query,
				req.headers as Record<string, string>,
			);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateForum(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res) || !req.params.id) return;
			const response = await courseService.updateForum(
				req.params.id,
				req.body,
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteForum(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res) || !req.params.id) return;
			const response = await courseService.deleteForum(
				req.params.id,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// ============= Forum Message Methods =============

	async getForumMessages(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await courseService.getForumMessages(
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getForumMessageById(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res) || !req.params.id) return;
			const response = await courseService.getForumMessageById(
				req.params.id,
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getForumMessagesByForumId(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			if (
				!validateParams({ forumId: req.params.forumId }, res) ||
				!req.params.forumId
			)
				return;
			const response = await courseService.getForumMessagesByForumId(
				req.params.forumId,
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getForumMessageReplies(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			if (
				!validateParams({ parentMessageId: req.params.parentMessageId }, res) ||
				!req.params.parentMessageId
			)
				return;
			const response = await courseService.getForumMessageReplies(
				req.params.parentMessageId,
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createForumMessage(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await courseService.createForumMessage(
				req.body,
				req.query,
				req.headers as Record<string, string>,
			);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateForumMessage(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res) || !req.params.id) return;
			const response = await courseService.updateForumMessage(
				req.params.id,
				req.body,
				req.query,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteForumMessage(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res) || !req.params.id) return;
			const response = await courseService.deleteForumMessage(
				req.params.id,
				req.headers as Record<string, string>,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}
}

export const courseController = new CourseController();
