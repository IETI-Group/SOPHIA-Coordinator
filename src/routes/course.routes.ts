import { Router } from 'express';
import { courseController } from '../controllers/course.controller.js';

const router: Router = Router();

// Courses routes
router.get('/courses', courseController.getCourses.bind(courseController));
router.get('/courses/:id', courseController.getCourseById.bind(courseController));
router.post('/courses', courseController.createCourse.bind(courseController));
router.put('/courses/:id', courseController.updateCourse.bind(courseController));
router.delete('/courses/:id', courseController.deleteCourse.bind(courseController));

// Sections routes
router.get('/courses/:courseId/sections', courseController.getSections.bind(courseController));
router.post('/courses/:courseId/sections', courseController.createSection.bind(courseController));
router.put('/courses/:courseId/sections/:sectionId', courseController.updateSection.bind(courseController));
router.delete('/courses/:courseId/sections/:sectionId', courseController.deleteSection.bind(courseController));

// Lessons routes
router.get('/sections/:sectionId/lessons', courseController.getLessons.bind(courseController));
router.get('/sections/:sectionId/lessons/:lessonId', courseController.getLessonById.bind(courseController));
router.post('/sections/:sectionId/lessons', courseController.createLesson.bind(courseController));
router.put('/sections/:sectionId/lessons/:lessonId', courseController.updateLesson.bind(courseController));
router.delete('/sections/:sectionId/lessons/:lessonId', courseController.deleteLesson.bind(courseController));

// Quizzes routes
router.get('/sections/:sectionId/quizzes', courseController.getQuizzes.bind(courseController));
router.get('/sections/:sectionId/quizzes/:quizId', courseController.getQuizById.bind(courseController));
router.post('/sections/:sectionId/quizzes', courseController.createQuiz.bind(courseController));
router.put('/sections/:sectionId/quizzes/:quizId', courseController.updateQuiz.bind(courseController));
router.delete('/sections/:sectionId/quizzes/:quizId', courseController.deleteQuiz.bind(courseController));

// Assignments routes
router.get('/lessons/:lessonId/assignments', courseController.getAssignments.bind(courseController));
router.get('/lessons/:lessonId/assignments/:assignmentId', courseController.getAssignmentById.bind(courseController));
router.post('/lessons/:lessonId/assignments', courseController.createAssignment.bind(courseController));
router.put('/lessons/:lessonId/assignments/:assignmentId', courseController.updateAssignment.bind(courseController));
router.delete('/lessons/:lessonId/assignments/:assignmentId', courseController.deleteAssignment.bind(courseController));

// Resources routes
router.get('/resources', courseController.getResources.bind(courseController));
router.get('/resources/:resourceId', courseController.getResourceById.bind(courseController));
router.post('/resources', courseController.createResource.bind(courseController));
router.put('/resources/:resourceId', courseController.updateResource.bind(courseController));
router.delete('/resources/:resourceId', courseController.deleteResource.bind(courseController));

// Tags routes
router.get('/tags', courseController.getTags.bind(courseController));
router.post('/tags', courseController.createTag.bind(courseController));
router.delete('/tags/:categoryId/:courseId', courseController.deleteTag.bind(courseController));

// Categories routes
router.get('/categories', courseController.getCategories.bind(courseController));
router.get('/categories/:categoryId', courseController.getCategoryById.bind(courseController));
router.post('/categories', courseController.createCategory.bind(courseController));
router.put('/categories/:categoryId', courseController.updateCategory.bind(courseController));
router.delete('/categories/:categoryId', courseController.deleteCategory.bind(courseController));

// AI Specs routes
router.get('/lessons/:lessonId/ai-specs', courseController.getAISpecs.bind(courseController));
router.get('/lessons/:lessonId/ai-specs/:specId', courseController.getAISpecById.bind(courseController));
router.post('/lessons/:lessonId/ai-specs', courseController.createAISpec.bind(courseController));
router.put('/lessons/:lessonId/ai-specs/:specId', courseController.updateAISpec.bind(courseController));
router.delete('/lessons/:lessonId/ai-specs/:specId', courseController.deleteAISpec.bind(courseController));

export default router;
