import type { NextFunction, Request, Response } from "express";
import { courseService } from "../services/course.service";
import { validateParams } from "../utils/validation";

export class CourseController {
	// Courses
	async getCourses(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await courseService.getCourses(req.query);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getCourseById(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res)) return;
			const response = await courseService.getCourseById(
				req.params.id!,
				req.query,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createCourse(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await courseService.createCourse(req.body);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateCourse(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res)) return;
			const response = await courseService.updateCourse(
				req.params.id!,
				req.body,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteCourse(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res)) return;
			const response = await courseService.deleteCourse(req.params.id!);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// Sections
	async getSections(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ courseId: req.params.courseId }, res)) return;
			const response = await courseService.getSections(
				req.params.courseId!,
				req.query,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createSection(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ courseId: req.params.courseId }, res)) return;
			const response = await courseService.createSection(
				req.params.courseId!,
				req.body,
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
				)
			)
				return;
			const response = await courseService.updateSection(
				req.params.courseId!,
				req.params.sectionId!,
				req.body,
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
				)
			)
				return;
			const response = await courseService.deleteSection(
				req.params.courseId!,
				req.params.sectionId!,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// Lessons
	async getLessons(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ sectionId: req.params.sectionId }, res)) return;
			const response = await courseService.getLessons(
				req.params.sectionId!,
				req.query,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getLessonById(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res)) return;
			const response = await courseService.getLessonById(
				req.params.id!,
				req.query,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createLesson(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ sectionId: req.params.sectionId }, res)) return;
			const response = await courseService.createLesson(
				req.params.sectionId!,
				req.body,
			);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateLesson(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res)) return;
			const response = await courseService.updateLesson(
				req.params.id!,
				req.body,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteLesson(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res)) return;
			const response = await courseService.deleteLesson(req.params.id!);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// Lesson Contents
	async getLessonContents(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ lessonId: req.params.lessonId }, res)) return;
			const response = await courseService.getLessonContents(
				req.params.lessonId!,
				req.query,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getContentById(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res)) return;
			const response = await courseService.getContentById(
				req.params.id!,
				req.query,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createLessonContent(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ lessonId: req.params.lessonId }, res)) return;
			const response = await courseService.createLessonContent(
				req.params.lessonId!,
				req.body,
			);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateContent(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res)) return;
			const response = await courseService.updateContent(
				req.params.id!,
				req.body,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteContent(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res)) return;
			const response = await courseService.deleteContent(req.params.id!);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// Quizzes
	async getQuizzes(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ sectionId: req.params.sectionId }, res)) return;
			const response = await courseService.getQuizzes(
				req.params.sectionId!,
				req.query,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getQuizById(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res)) return;
			const response = await courseService.getQuizById(
				req.params.id!,
				req.query,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createQuiz(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ sectionId: req.params.sectionId }, res)) return;
			const response = await courseService.createQuiz(
				req.params.sectionId!,
				req.body,
			);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateQuiz(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res)) return;
			const response = await courseService.updateQuiz(req.params.id!, req.body);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteQuiz(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res)) return;
			const response = await courseService.deleteQuiz(req.params.id!);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// Assignments
	async getAssignments(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ lessonId: req.params.lessonId }, res)) return;
			const response = await courseService.getAssignments(
				req.params.lessonId!,
				req.query,
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
				)
			)
				return;
			const response = await courseService.getAssignmentById(
				req.params.lessonId!,
				req.params.assignmentId!,
				req.query,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createAssignment(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ lessonId: req.params.lessonId }, res)) return;
			const response = await courseService.createAssignment(
				req.params.lessonId!,
				req.body,
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
				)
			)
				return;
			const response = await courseService.updateAssignment(
				req.params.lessonId!,
				req.params.assignmentId!,
				req.body,
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
				)
			)
				return;
			const response = await courseService.deleteAssignment(
				req.params.lessonId!,
				req.params.assignmentId!,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// Resources
	async getResources(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await courseService.getResources(req.query);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getResourceById(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ resourceId: req.params.resourceId }, res)) return;
			const response = await courseService.getResourceById(
				req.params.resourceId!,
				req.query,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createResource(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await courseService.createResource(req.body);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateResource(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ resourceId: req.params.resourceId }, res)) return;
			const response = await courseService.updateResource(
				req.params.resourceId!,
				req.body,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteResource(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ resourceId: req.params.resourceId }, res)) return;
			const response = await courseService.deleteResource(
				req.params.resourceId!,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// Tags
	async getTags(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await courseService.getTags(req.query);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createTag(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await courseService.createTag(req.body);
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
				)
			)
				return;
			const response = await courseService.deleteTag(
				req.params.categoryId!,
				req.params.courseId!,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// Categories
	async getCategories(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await courseService.getCategories(req.query);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getCategoryById(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ categoryId: req.params.categoryId }, res)) return;
			const response = await courseService.getCategoryById(
				req.params.categoryId!,
				req.query,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createCategory(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await courseService.createCategory(req.body);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateCategory(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ categoryId: req.params.categoryId }, res)) return;
			const response = await courseService.updateCategory(
				req.params.categoryId!,
				req.body,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteCategory(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ categoryId: req.params.categoryId }, res)) return;
			const response = await courseService.deleteCategory(
				req.params.categoryId!,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	// AI Specs
	async getAISpecs(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ lessonId: req.params.lessonId }, res)) return;
			const response = await courseService.getAISpecs(
				req.params.lessonId!,
				req.query,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async getAISpecById(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res)) return;
			const response = await courseService.getAISpecById(
				req.params.id!,
				req.query,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async createAISpec(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ lessonId: req.params.lessonId }, res)) return;
			const response = await courseService.createAISpec(
				req.params.lessonId!,
				req.body,
			);
			res.status(201).json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async updateAISpec(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res)) return;
			const response = await courseService.updateAISpec(
				req.params.id!,
				req.body,
			);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}

	async deleteAISpec(req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateParams({ id: req.params.id }, res)) return;
			const response = await courseService.deleteAISpec(req.params.id!);
			res.json(response.data);
		} catch (error) {
			next(error);
		}
	}
}

export const courseController = new CourseController();
