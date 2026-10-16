import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { verifyOriginOrSameSite } from '../middleware/csrf.js';
import { validate } from '../middleware/validate.js';
import { projectSchema, updateInquirySchema, createUserSchema } from '../validations/schemas.js';

import {
  listAdminProjects,
  getAdminProjectById,
  createProject,
  updateProject,
  setPublicationStatus,
  setArchiveStatus,
  deleteProject
} from '../controllers/adminProjectController.js';

import {
  listInquiries,
  getInquiryById,
  updateInquiry
} from '../controllers/inquiryController.js';

import {
  getUploadSignature,
  requestMediaCleanup
} from '../controllers/adminMediaController.js';

import {
  listUsers,
  createUser,
  toggleUserStatus
} from '../controllers/adminUserController.js';

import { getDashboardStats } from '../controllers/adminStatsController.js';

const router = Router();

// Require authenticated session and CSRF/origin verification for all admin routes
router.use(requireAuth);
router.use(verifyOriginOrSameSite);

// Dashboard overview metrics
router.get('/stats', getDashboardStats);

// Projects management
router.get('/projects', listAdminProjects);
router.post('/projects', validate(projectSchema), createProject);
router.get('/projects/:id', getAdminProjectById);
router.put('/projects/:id', validate(projectSchema.partial()), updateProject);
router.patch('/projects/:id/publish', setPublicationStatus);
router.patch('/projects/:id/archive', setArchiveStatus);
router.delete('/projects/:id', requireRole('superadmin'), deleteProject);

// Inquiries management
router.get('/inquiries', listInquiries);
router.get('/inquiries/:id', getInquiryById);
router.patch('/inquiries/:id', validate(updateInquirySchema), updateInquiry);

// Media management
router.post('/media/sign', getUploadSignature);
router.post('/media/cleanup', requestMediaCleanup);

// Users management (superadmin only)
router.get('/users', requireRole('superadmin'), listUsers);
router.post('/users', requireRole('superadmin'), validate(createUserSchema), createUser);
router.patch('/users/:id/status', requireRole('superadmin'), toggleUserStatus);

export default router;
