import { generateUploadSignature, deleteAsset } from '../config/cloudinary.js';
import { MediaCleanupQueue } from '../models/MediaCleanupQueue.js';
import { AuditLog } from '../models/AuditLog.js';

export async function getUploadSignature(req, res, next) {
  try {
    const requestedFolder = req.body?.folder || 'nivara/projects';
    const allowedFolders = ['nivara/projects', 'nivara/gallery', 'nivara/temp'];

    const folder = allowedFolders.includes(requestedFolder) ? requestedFolder : 'nivara/projects';
    const signatureData = generateUploadSignature(folder);

    res.json({
      success: true,
      data: signatureData
    });
  } catch (err) {
    next(err);
  }
}

export async function requestMediaCleanup(req, res, next) {
  try {
    const { publicId, resourceType = 'image' } = req.body;

    if (!publicId) {
      return res.status(400).json({
        success: false,
        error: 'publicId is required'
      });
    }

    const queued = await MediaCleanupQueue.create({
      publicId,
      resourceType,
      status: 'Pending'
    });

    await AuditLog.create({
      action: 'MEDIA_CLEANUP_QUEUED',
      userId: req.user._id,
      userEmail: req.user.email,
      resourceType: 'Media',
      resourceId: publicId,
      details: { resourceType },
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });

    res.json({
      success: true,
      message: 'Asset queued for background cleanup',
      data: queued
    });
  } catch (err) {
    next(err);
  }
}
