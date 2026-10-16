import { Router } from 'express';
import { submitInquiry } from '../controllers/inquiryController.js';
import { inquiryLimiter } from '../middleware/rateLimiter.js';
import { validate } from '../middleware/validate.js';
import { inquirySchema } from '../validations/schemas.js';

const router = Router();

router.post('/', inquiryLimiter, validate(inquirySchema), submitInquiry);

export default router;
