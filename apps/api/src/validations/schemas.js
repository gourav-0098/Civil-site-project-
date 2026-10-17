import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Valid work email is required'),
  password: z.string().min(1, 'Password is required')
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters long')
});

export const inquirySchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(120),
  email: z.string().email('Please provide a valid email address').max(150),
  phone: z.string().max(30).optional().default(''),
  organization: z.string().max(150).optional().default(''),
  inquiryType: z.enum([
    'Project Tender / RFP',
    'General Construction Inquiry',
    'Partnership / Joint Venture',
    'Vendor / Subcontractor',
    'Careers',
    'Other'
  ]).default('General Construction Inquiry'),
  projectLocation: z.string().max(150).optional().default(''),
  subject: z.string().trim().min(3, 'Subject must be at least 3 characters').max(200),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(5000),
  honeypot: z.string().max(0, 'Spam detected').optional().default('')
});

export const projectSchema = z.object({
  title: z.string().trim().min(1, 'Project title is required').max(200),
  slug: z.string().trim().optional(),
  clientName: z.string().trim().max(150).optional().default(''),
  category: z.string().trim().min(1, 'Category is required').default('Highways & Bridges'),
  location: z.string().trim().min(1, 'Location is required').default('Regional Infrastructure Corridor'),
  constructionStatus: z.enum(['Planned', 'Ongoing', 'Completed', 'On Hold']).default('Ongoing'),
  publicationStatus: z.enum(['Draft', 'Published']).default('Draft'),
  archiveStatus: z.enum(['Active', 'Archived']).default('Active'),
  isFeatured: z.boolean().default(false),
  timeline: z.object({
    startDate: z.union([z.string(), z.date(), z.null()]).optional(),
    estimatedCompletionDate: z.union([z.string(), z.date(), z.null()]).optional(),
    completionDate: z.union([z.string(), z.date(), z.null()]).optional()
  }).optional().default({}),
  shortDescription: z.string().trim().optional().default('').transform(val => {
    return (val && val.trim().length >= 5)
      ? val.trim()
      : 'Comprehensive heavy civil infrastructure engineering and construction project delivered to global standards.';
  }),
  fullDescription: z.string().trim().optional().default('').transform(val => {
    return (val && val.trim().length >= 10)
      ? val.trim()
      : 'Detailed technical documentation and engineering execution specifications for this heavy civil infrastructure asset.';
  }),
  scopeOfWork: z.array(z.string().trim()).default([]).transform(items => items.filter(Boolean)),
  specifications: z.array(z.object({
    label: z.string().trim(),
    value: z.string().trim()
  })).default([]).transform(items => items.filter(item => item && item.label && item.value)),
  coverImage: z.object({
    url: z.string().trim().optional().default('').transform(val => {
      return (val && val.trim().length > 0)
        ? val.trim()
        : 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1600&q=80';
    }),
    publicId: z.string().optional().default(''),
    alt: z.string().optional().default('Civil infrastructure engineering project'),
    caption: z.string().optional().default('')
  }).default({
    url: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1600&q=80',
    alt: 'Civil infrastructure engineering project'
  }),
  gallery: z.array(z.object({
    url: z.string().trim().optional().default(''),
    publicId: z.string().optional().default(''),
    alt: z.string().optional().default(''),
    caption: z.string().optional().default(''),
    order: z.number().optional().default(0)
  })).default([]).transform(items => items.filter(item => item && item.url && item.url.trim().length > 0)),
  video: z.object({
    provider: z.string().optional().default('none').transform(val => {
      const lower = (val || 'none').toLowerCase().trim();
      return ['youtube', 'vimeo', 'cloudinary'].includes(lower) ? lower : 'none';
    }),
    url: z.string().optional().default(''),
    embedUrl: z.string().optional().default(''),
    publicId: z.string().optional().default('')
  }).optional().default({ provider: 'none' }),
  seo: z.object({
    title: z.string().optional().default(''),
    description: z.string().optional().default(''),
    keywords: z.array(z.string()).default([])
  }).optional().default({})
});

export const updateInquirySchema = z.object({
  status: z.enum(['New', 'In Progress', 'Responded', 'Closed']).optional(),
  internalNotes: z.string().optional(),
  isRead: z.boolean().optional()
});

export const createUserSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['superadmin', 'editor']).default('editor')
});
