import { Router } from "express";
import { courseController } from "../controllers/course.controller.js";

const router: Router = Router();

// Courses routes
router.get("/courses", courseController.getCourses.bind(courseController));
router.get(
	"/courses/:id",
	courseController.getCourseById.bind(courseController),
);
router.post("/courses", courseController.createCourse.bind(courseController));
router.put(
	"/courses/:id",
	courseController.updateCourse.bind(courseController),
);
router.delete(
	"/courses/:id",
	courseController.deleteCourse.bind(courseController),
);

// Sections routes
router.get(
	"/courses/:courseId/sections",
	courseController.getSections.bind(courseController),
);
router.post(
	"/courses/:courseId/sections",
	courseController.createSection.bind(courseController),
);
router.put(
	"/courses/:courseId/sections/:sectionId",
	courseController.updateSection.bind(courseController),
);
router.delete(
	"/courses/:courseId/sections/:sectionId",
	courseController.deleteSection.bind(courseController),
);

// Lessons routes
router.get(
	"/sections/:sectionId/lessons",
	courseController.getLessons.bind(courseController),
);
router.get(
	"/lessons/:id",
	courseController.getLessonById.bind(courseController),
);
router.post(
	"/sections/:sectionId/lessons",
	courseController.createLesson.bind(courseController),
);
router.put(
	"/lessons/:id",
	courseController.updateLesson.bind(courseController),
);
router.delete(
	"/lessons/:id",
	courseController.deleteLesson.bind(courseController),
);

// Lesson Contents routes
router.get(
	"/lessons/:lessonId/contents",
	courseController.getLessonContents.bind(courseController),
);
router.get(
	"/contents/:id",
	courseController.getContentById.bind(courseController),
);
router.post(
	"/lessons/:lessonId/contents",
	courseController.createLessonContent.bind(courseController),
);
router.put(
	"/contents/:id",
	courseController.updateContent.bind(courseController),
);
router.delete(
	"/contents/:id",
	courseController.deleteContent.bind(courseController),
);

// Quizzes routes
router.get(
	"/sections/:sectionId/quizzes",
	courseController.getQuizzes.bind(courseController),
);
router.get("/quizzes/:id", courseController.getQuizById.bind(courseController));
router.post(
	"/sections/:sectionId/quizzes",
	courseController.createQuiz.bind(courseController),
);
router.put("/quizzes/:id", courseController.updateQuiz.bind(courseController));
router.delete(
	"/quizzes/:id",
	courseController.deleteQuiz.bind(courseController),
);

// Assignments routes
router.get(
	"/lessons/:lessonId/assignments",
	courseController.getAssignments.bind(courseController),
);
router.get(
	"/lessons/:lessonId/assignments/:assignmentId",
	courseController.getAssignmentById.bind(courseController),
);
router.post(
	"/lessons/:lessonId/assignments",
	courseController.createAssignment.bind(courseController),
);
router.put(
	"/lessons/:lessonId/assignments/:assignmentId",
	courseController.updateAssignment.bind(courseController),
);
router.delete(
	"/lessons/:lessonId/assignments/:assignmentId",
	courseController.deleteAssignment.bind(courseController),
);

// Resources routes
router.get("/resources", courseController.getResources.bind(courseController));
router.get(
	"/resources/:resourceId",
	courseController.getResourceById.bind(courseController),
);
router.post(
	"/resources",
	courseController.createResource.bind(courseController),
);
router.put(
	"/resources/:resourceId",
	courseController.updateResource.bind(courseController),
);
router.delete(
	"/resources/:resourceId",
	courseController.deleteResource.bind(courseController),
);

// Tags routes
router.get("/tags", courseController.getTags.bind(courseController));
router.post("/tags", courseController.createTag.bind(courseController));
router.delete(
	"/tags/:categoryId/:courseId",
	courseController.deleteTag.bind(courseController),
);

// Categories routes
router.get(
	"/categories",
	courseController.getCategories.bind(courseController),
);
router.get(
	"/categories/:categoryId",
	courseController.getCategoryById.bind(courseController),
);
router.post(
	"/categories",
	courseController.createCategory.bind(courseController),
);
router.put(
	"/categories/:categoryId",
	courseController.updateCategory.bind(courseController),
);
router.delete(
	"/categories/:categoryId",
	courseController.deleteCategory.bind(courseController),
);

// AI Specs routes
router.get(
	"/lessons/:lessonId/ai-specs",
	courseController.getAISpecs.bind(courseController),
);
router.get(
	"/ai-specs/:id",
	courseController.getAISpecById.bind(courseController),
);
router.post(
	"/lessons/:lessonId/ai-specs",
	courseController.createAISpec.bind(courseController),
);
router.put(
	"/ai-specs/:id",
	courseController.updateAISpec.bind(courseController),
);
router.delete(
	"/ai-specs/:id",
	courseController.deleteAISpec.bind(courseController),
);

// Forums routes
router.get("/forums", courseController.getForums.bind(courseController));
router.get("/forums/:id", courseController.getForumById.bind(courseController));
router.get(
	"/courses/:courseId/forum",
	courseController.getForumByCourseId.bind(courseController),
);
router.post("/forums", courseController.createForum.bind(courseController));
router.put("/forums/:id", courseController.updateForum.bind(courseController));
router.delete(
	"/forums/:id",
	courseController.deleteForum.bind(courseController),
);

// Forum Messages routes
router.get(
	"/forum-messages",
	courseController.getForumMessages.bind(courseController),
);
router.get(
	"/forum-messages/:id",
	courseController.getForumMessageById.bind(courseController),
);
router.get(
	"/forums/:forumId/messages",
	courseController.getForumMessagesByForumId.bind(courseController),
);
router.get(
	"/forum-messages/:parentMessageId/replies",
	courseController.getForumMessageReplies.bind(courseController),
);
router.post(
	"/forum-messages",
	courseController.createForumMessage.bind(courseController),
);
router.put(
	"/forum-messages/:id",
	courseController.updateForumMessage.bind(courseController),
);
router.delete(
	"/forum-messages/:id",
	courseController.deleteForumMessage.bind(courseController),
);

export default router;
