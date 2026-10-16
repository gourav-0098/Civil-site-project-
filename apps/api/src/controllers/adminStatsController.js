import { Project } from '../models/Project.js';
import { Inquiry } from '../models/Inquiry.js';
import { AuditLog } from '../models/AuditLog.js';

export async function getDashboardStats(req, res, next) {
  try {
    const [
      totalProjects,
      publishedProjects,
      draftProjects,
      archivedProjects,
      ongoingProjects,
      completedProjects,
      totalInquiries,
      newInquiries,
      recentProjects,
      recentInquiries,
      recentAuditLogs
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ publicationStatus: 'Published', archiveStatus: 'Active' }),
      Project.countDocuments({ publicationStatus: 'Draft', archiveStatus: 'Active' }),
      Project.countDocuments({ archiveStatus: 'Archived' }),
      Project.countDocuments({ constructionStatus: 'Ongoing', archiveStatus: 'Active' }),
      Project.countDocuments({ constructionStatus: 'Completed', archiveStatus: 'Active' }),
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ isRead: false }),
      Project.find().sort({ updatedAt: -1 }).limit(5).select('title slug category publicationStatus archiveStatus constructionStatus updatedAt').lean(),
      Inquiry.find().sort({ createdAt: -1 }).limit(5).select('name email subject status isRead createdAt').lean(),
      AuditLog.find().sort({ createdAt: -1 }).limit(8).lean()
    ]);

    res.json({
      success: true,
      data: {
        metrics: {
          totalProjects,
          publishedProjects,
          draftProjects,
          archivedProjects,
          ongoingProjects,
          completedProjects,
          totalInquiries,
          newInquiries
        },
        recentProjects,
        recentInquiries,
        recentAuditLogs
      }
    });
  } catch (err) {
    next(err);
  }
}
