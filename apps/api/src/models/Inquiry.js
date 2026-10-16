import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: 120
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      lowercase: true,
      trim: true,
      maxlength: 150
    },
    phone: {
      type: String,
      trim: true,
      default: '',
      maxlength: 30
    },
    organization: {
      type: String,
      trim: true,
      default: '',
      maxlength: 150
    },
    inquiryType: {
      type: String,
      required: true,
      enum: [
        'Project Tender / RFP',
        'General Construction Inquiry',
        'Partnership / Joint Venture',
        'Vendor / Subcontractor',
        'Careers',
        'Other'
      ],
      default: 'General Construction Inquiry'
    },
    projectLocation: {
      type: String,
      trim: true,
      default: '',
      maxlength: 150
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      maxlength: 200
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
      maxlength: 5000
    },
    status: {
      type: String,
      enum: ['New', 'In Progress', 'Responded', 'Closed'],
      default: 'New',
      index: true
    },
    internalNotes: {
      type: String,
      default: ''
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true
    },
    ipAddress: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

inquirySchema.index({ status: 1, isRead: 1, createdAt: -1 });

export const Inquiry = mongoose.model('Inquiry', inquirySchema);
