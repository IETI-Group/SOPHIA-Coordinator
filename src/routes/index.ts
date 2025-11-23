import { Router } from 'express';
import userRoutes from './user.routes.js';
import courseRoutes from './course.routes.js';

const router: Router = Router();


// Mount routes
router.use('/', userRoutes);
router.use('/', courseRoutes);

export default router;
