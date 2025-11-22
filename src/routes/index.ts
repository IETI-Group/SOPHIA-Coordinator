import { Router } from 'express';
import userRoutes from './user.routes.js';
import courseRoutes from './course.routes.js';

const router: Router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    timestamp: new Date().toISOString(),
  });
});

// Mount routes
router.use('/', userRoutes);
router.use('/', courseRoutes);

export default router;
