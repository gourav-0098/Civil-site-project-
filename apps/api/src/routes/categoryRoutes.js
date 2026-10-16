import { Router } from 'express';
import { getCategories } from '../controllers/projectController.js';

const router = Router();

router.get('/', getCategories);

export default router;
