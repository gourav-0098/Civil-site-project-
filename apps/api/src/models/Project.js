import mongoose from 'mongoose';

const specificationSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true }
  },
  { _id: false }
);

const galleryItemSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, default: '' },
    alt: { type: String, default: '' },
    caption: { type: String, default: '' },
    order: { type: Number, default: 0 }
  },
  { _id: true }
);

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    clientName: {
      type: String,
      trim: true,
      default: ''
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    constructionStatus: {
      type: String,
      required: true,
      enum: ['Planned', 'Ongoing', 'Completed', 'On Hold'],
      default: 'Ongoing'
    },
    publicationStatus: {
      type: String,
      required: true,
      enum: ['Draft', 'Published'],
      default: 'Draft',
      index: true
    },
    archiveStatus: {
      type: String,
      required: true,
      enum: ['Active', 'Archived'],
      default: 'Active',
      index: true
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true
    },
    timeline: {
      startDate: { type: Date },
      estimatedCompletionDate: { type: Date },
      completionDate: { type: Date }
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: [400, 'Short description cannot exceed 400 characters'],
      trim: true
    },
    fullDescription: {
      type: String,
      required: [true, 'Full project description is required'],
      trim: true
    },
    scopeOfWork: [{ type: String, trim: true }],
    specifications: [specificationSchema],
    coverImage: {
      url: { type: String, required: [true, 'Cover image URL is required'] },
      publicId: { type: String, default: '' },
      alt: { type: String, default: '' },
      caption: { type: String, default: '' }
    },
    gallery: [galleryItemSchema],
    video: {
      provider: {
        type: String,
        enum: ['youtube', 'vimeo', 'cloudinary', 'none'],
        default: 'none'
      },
      url: { type: String, default: '' },
      embedUrl: { type: String, default: '' },
      publicId: { type: String, default: '' }
    },
    seo: {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
      keywords: [{ type: String, trim: true }]
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

// Compound indexes for optimal query performance
projectSchema.index({ publicationStatus: 1, archiveStatus: 1, isFeatured: -1, createdAt: -1 });
projectSchema.index({ category: 1, publicationStatus: 1, archiveStatus: 1 });
projectSchema.index({ constructionStatus: 1, publicationStatus: 1, archiveStatus: 1 });
projectSchema.index({ title: 'text', shortDescription: 'text', location: 'text' });

export const Project = mongoose.model('Project', projectSchema);
