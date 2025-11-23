import express from 'express';
import { userController } from '../controllers/user.controller.js';

const router: express.Router = express.Router();

// Users routes
router.get('/users', userController.getUsers.bind(userController));
router.get('/users/id/:id', userController.getUserById.bind(userController));
router.get('/users/email/:email', userController.getUserByEmail.bind(userController));
router.post('/users/batch', userController.getUsersBatch.bind(userController));
router.post('/users', userController.createUser.bind(userController));
router.put('/users/:id', userController.updateUser.bind(userController));
router.delete('/users/:id', userController.deleteUser.bind(userController));

// Learning Path routes
router.get('/users/:id/learning-path', userController.getLearningPath.bind(userController));
router.post('/users/:id/learning-path', userController.createLearningPath.bind(userController));
router.put('/users/:id/learning-path', userController.updateLearningPath.bind(userController));

// Reviews routes
router.get('/users/:id/reviews', userController.getUserReviews.bind(userController));
router.get('/users/instructors/:instructorId/reviews', userController.getInstructorReviews.bind(userController));
router.get('/users/courses/:courseId/reviews', userController.getCourseReviews.bind(userController));
router.post('/users/:id/reviews', userController.createReview.bind(userController));
router.put('/users/:id/reviews/:reviewId', userController.updateReview.bind(userController));
router.delete('/users/:id/reviews/:reviewId', userController.deleteReview.bind(userController));

// Linked Accounts routes
router.get('/users/:id/linked-accounts', userController.getLinkedAccounts.bind(userController));
router.get('/users/:id/linked-accounts/:accountId', userController.getLinkedAccount.bind(userController));
router.post('/users/:id/linked-accounts', userController.createLinkedAccount.bind(userController));
router.put('/users/:id/linked-accounts/:accountId', userController.updateLinkedAccount.bind(userController));
router.delete('/users/:id/linked-accounts/:accountId', userController.deleteLinkedAccount.bind(userController));

// Admin - Roles routes
router.get('/admin/roles', userController.getRoles.bind(userController));
router.get('/admin/roles/:name', userController.getRoleByName.bind(userController));
router.post('/admin/roles', userController.createRole.bind(userController));
router.put('/admin/roles/:name', userController.updateRole.bind(userController));
router.delete('/admin/roles/:name', userController.deleteRole.bind(userController));

// Admin - Role Assignations routes
router.get('/admin/assignations', userController.getAssignations.bind(userController));
router.post('/admin/assignations', userController.createAssignation.bind(userController));
router.put('/admin/assignations/user/:userId/role/:role', userController.updateAssignationByUserRole.bind(userController));
router.put('/admin/assignations/:assignationId', userController.updateAssignationById.bind(userController));
router.delete('/admin/assignations/user/:userId/role/:role', userController.deleteAssignationByUserRole.bind(userController));
router.delete('/admin/assignations/:assignationId', userController.deleteAssignationById.bind(userController));

// Admin - Instructors routes
router.get('/admin/instructors', userController.getInstructors.bind(userController));
router.post('/admin/instructors', userController.createInstructor.bind(userController));
router.put('/admin/instructors/:instructorId', userController.updateInstructor.bind(userController));
router.delete('/admin/instructors/:instructorId', userController.deleteInstructor.bind(userController));

// Public Instructors routes
router.get('/instructors/:instructorId', userController.getInstructorById.bind(userController));
router.post('/instructors', userController.registerInstructor.bind(userController));
router.put('/instructors/:instructorId', userController.updateInstructorPublic.bind(userController));
router.delete('/instructors/:instructorId', userController.deleteInstructorPublic.bind(userController));

export default router;
