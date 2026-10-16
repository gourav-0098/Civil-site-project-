import { Router } from 'express';
import { login, logout, getCurrentUser, changePassword } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';
import { loginLimiter } from '../middleware/rateLimiter.js';
import { validate } from '../middleware/validate.js';
import { verifyOriginOrSameSite } from '../middleware/csrf.js';
import { loginSchema, changePasswordSchema } from '../validations/schemas.js';

const router = Router();

router.post('/login', loginLimiter, verifyOriginOrSameSite, validate(loginSchema), login);
router.post('/logout', verifyOriginOrSameSite, logout);
router.get('/me', requireAuth, getCurrentUser);
router.post('/change-password', requireAuth, verifyOriginOrSameSite, validate(changePasswordSchema), changePassword);

export default router;
