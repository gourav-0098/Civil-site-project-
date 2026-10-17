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
  propertyId: z.string().optional().default(''),
  propertyTitle: z.string().max(200).optional().default(''),
  inquiryType: z.enum([
    'Schedule a Site Visit',
    'Price & Brochure Request',
    'Booking / Purchase Inquiry',
    'General Property Inquiry',
    'Commercial Property Inquiry',
    'Project Tender / RFP',
    'General Construction Inquiry',
    'Partnership / Joint Venture',
    'Vendor / Subcontractor',
    'Careers',
    'Other'
  ]).default('General Property Inquiry'),
  projectLocation: z.string().max(150).optional().default(''),
  subject: z.string().trim().min(3, 'Subject must be at least 3 characters').max(200),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(5000),
  honeypot: z.string().max(0, 'Spam detected').optional().default('')
});

export const projectSchema = z.object({
  title: z.string().trim().min(1, 'Property name is required').max(200),
  slug: z.string().trim().optional(),
  clientName: z.string().trim().max(150).optional().default(''),
  developerName: z.string().trim().max(150).optional().default(''),
  category: z.string().trim().min(1, 'Category is required'),
  location: z.string().trim().min(1, 'Location is required'),
  price: z.string().trim().optional().default(''),
  priceNumeric: z.number().optional().default(0),
  configuration: z.string().trim().optional().default(''),
  area: z.string().trim().optional().default(''),
  amenities: z.array(z.string().trim()).default([]).transform(items => items.filter(Boolean)),
  reraId: z.string().trim().optional().default(''),
  possessionDate: z.string().trim().optional().default(''),
  constructionStatus: z.enum([
    'Ready to Move',
    'Under Construction',
    'Upcoming / Pre-Launch',
    'Ongoing',
    'Completed',
    'Planned',
    'On Hold'
  ]).default('Under Construction'),
  publicationStatus: z.enum(['Draft', 'Published']).default('Draft'),
  archiveStatus: z.enum(['Active', 'Archived']).default('Active'),
  isFeatured: z.boolean().default(false),
  isDemo: z.boolean().default(false),
  timeline: z.object({
    startDate: z.union([z.string(), z.date(), z.null()]).optional(),
    estimatedCompletionDate: z.union([z.string(), z.date(), z.null()]).optional(),
    completionDate: z.union([z.string(), z.date(), z.null()]).optional()
  }).optional().default({}),
  shortDescription: z.string().trim().optional().default(''),
  fullDescription: z.string().trim().optional().default(''),
  scopeOfWork: z.array(z.string().trim()).default([]).transform(items => items.filter(Boolean)),
  specifications: z.array(z.object({
    label: z.string().trim(),
    value: z.string().trim()
  })).default([]).transform(items => items.filter(item => item && item.label && item.value)),
  coverImage: z.object({
    url: z.string().trim().optional().default(''),
    publicId: z.string().optional().default(''),
    alt: z.string().optional().default(''),
    caption: z.string().optional().default('')
  }).default({
    url: '',
    alt: ''
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
