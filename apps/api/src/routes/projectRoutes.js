import { Router } from 'express';
import { getPublicProjects, getFeaturedProjects, getProjectBySlug } from '../controllers/projectController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', getPublicProjects);
router.get('/featured', getFeaturedProjects);
router.get('/:slug', optionalAuth, getProjectBySlug);

export default router;
