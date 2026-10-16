import mongoose from 'mongoose';

const mediaCleanupQueueSchema = new mongoose.Schema(
  {
    publicId: {
      type: String,
      required: true,
      index: true
    },
    resourceType: {
      type: String,
      enum: ['image', 'video'],
      default: 'image'
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Completed', 'Failed'],
      default: 'Pending',
      index: true
    },
    attempts: {
      type: Number,
      default: 0
    },
    maxAttempts: {
      type: Number,
      default: 5
    },
    lastError: {
      type: String,
      default: ''
    },
    nextRetryAt: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  {
    timestamps: true
  }
);

export const MediaCleanupQueue = mongoose.model('MediaCleanupQueue', mediaCleanupQueueSchema);
