import { Router } from 'express';
import userRoutes from './user.routes';
import courseRoutes from './course.routes';

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
