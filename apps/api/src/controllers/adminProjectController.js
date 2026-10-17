import { Project } from '../models/Project.js';
import { AuditLog } from '../models/AuditLog.js';
import { MediaCleanupQueue } from '../models/MediaCleanupQueue.js';
import { triggerRevalidation } from '../services/revalidate.js';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function generateUniqueSlug(title, existingId = null) {
  let baseSlug = slugify(title) || 'project';
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await Project.findOne({ slug });
    if (!existing || (existingId && existing._id.toString() === existingId.toString())) {
      return slug;
    }
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

/**
 * Admin: List all projects with administrative filters
 */
export async function listAdminProjects(req, res, next) {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const skip = (page - 1) * limit;

    const { category, publicationStatus, archiveStatus, constructionStatus, search } = req.query;
    const query = {};

    if (category && category !== 'All') query.category = category;
    if (publicationStatus && publicationStatus !== 'All') query.publicationStatus = publicationStatus;
    if (archiveStatus && archiveStatus !== 'All') query.archiveStatus = archiveStatus;
    if (constructionStatus && constructionStatus !== 'All') query.constructionStatus = constructionStatus;

    if (search && search.trim()) {
      const term = search.trim();
      query.$or = [
        { title: { $regex: term, $options: 'i' } },
        { location: { $regex: term, $options: 'i' } },
        { developerName: { $regex: term, $options: 'i' } },
        { slug: { $regex: term, $options: 'i' } }
      ];
    }

    const [projects, total] = await Promise.all([
      Project.find(query)
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('createdBy', 'name email')
        .populate('updatedBy', 'name email')
        .lean(),
      Project.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: projects,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1
      }
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Admin: Get project by ID for editing
 */
export async function getAdminProjectById(req, res, next) {
  try {
    const project = await Project.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Admin: Create new project
 */
export async function createProject(req, res, next) {
  try {
    const data = req.body;
    if (data.publicationStatus === 'Published' && (!data.coverImage?.url || !data.coverImage.url.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Cannot publish property without a valid cover image'
      });
    }

    const slug = await generateUniqueSlug(data.slug || data.title);

    const project = new Project({
      ...data,
      slug,
      createdBy: req.user._id,
      updatedBy: req.user._id
    });

    await project.save();

    await AuditLog.create({
      action: 'PROJECT_CREATE',
      userId: req.user._id,
      userEmail: req.user.email,
      userRole: req.user.role,
      resourceType: 'Project',
      resourceId: project._id.toString(),
      details: { title: project.title, slug: project.slug, publicationStatus: project.publicationStatus },
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });

    // Revalidate paths if created as Published
    if (project.publicationStatus === 'Published') {
      await triggerRevalidation(['/', '/projects', `/projects/${project.slug}`, '/sitemap.xml']);
    }

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Admin: Update existing project
 */
export async function updateProject(req, res, next) {
  try {
    const { id } = req.params;
    const existing = await Project.findById(id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    const data = req.body;
    const targetStatus = data.publicationStatus || existing.publicationStatus;
    const targetCoverUrl = data.coverImage?.url !== undefined ? data.coverImage.url : existing.coverImage?.url;
    if (targetStatus === 'Published' && (!targetCoverUrl || !targetCoverUrl.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Cannot publish property without a valid cover image'
      });
    }

    const oldSlug = existing.slug;
    let newSlug = oldSlug;

    if (data.title && (!data.slug || data.slug !== oldSlug)) {
      newSlug = await generateUniqueSlug(data.slug || data.title, id);
    }

    Object.assign(existing, data);
    existing.slug = newSlug;
    existing.updatedBy = req.user._id;

    await existing.save();

    await AuditLog.create({
      action: 'PROJECT_UPDATE',
      userId: req.user._id,
      userEmail: req.user.email,
      userRole: req.user.role,
      resourceType: 'Project',
      resourceId: existing._id.toString(),
      details: { title: existing.title, slug: existing.slug, publicationStatus: existing.publicationStatus },
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });

    // Revalidate affected routes (both old and new slugs if slug changed)
    const revalidatePaths = ['/', '/projects', `/projects/${newSlug}`, '/sitemap.xml'];
    if (oldSlug !== newSlug) {
      revalidatePaths.push(`/projects/${oldSlug}`);
    }
    await triggerRevalidation(revalidatePaths);

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: existing
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Admin: Toggle or set publication status
 */
export async function setPublicationStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'Draft' or 'Published'

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    const newStatus = status || (project.publicationStatus === 'Published' ? 'Draft' : 'Published');
    if (newStatus === 'Published' && (!project.coverImage?.url || !project.coverImage.url.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Cannot publish property without a valid cover image'
      });
    }

    project.publicationStatus = newStatus;
    project.updatedBy = req.user._id;
    await project.save();

    await AuditLog.create({
      action: newStatus === 'Published' ? 'PROJECT_PUBLISH' : 'PROJECT_UNPUBLISH',
      userId: req.user._id,
      userEmail: req.user.email,
      userRole: req.user.role,
      resourceType: 'Project',
      resourceId: project._id.toString(),
      details: { title: project.title, newStatus },
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });

    await triggerRevalidation(['/', '/projects', `/projects/${project.slug}`, '/sitemap.xml']);

    res.json({
      success: true,
      message: `Project ${newStatus.toLowerCase()} successfully`,
      data: project
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Admin: Toggle or set archive status
 */
export async function setArchiveStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'Active' or 'Archived'

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    const newStatus = status || (project.archiveStatus === 'Archived' ? 'Active' : 'Archived');
    project.archiveStatus = newStatus;
    project.updatedBy = req.user._id;
    await project.save();

    await AuditLog.create({
      action: newStatus === 'Archived' ? 'PROJECT_ARCHIVE' : 'PROJECT_RESTORE',
      userId: req.user._id,
      userEmail: req.user.email,
      userRole: req.user.role,
      resourceType: 'Project',
      resourceId: project._id.toString(),
      details: { title: project.title, newStatus },
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });

    await triggerRevalidation(['/', '/projects', `/projects/${project.slug}`, '/sitemap.xml']);

    res.json({
      success: true,
      message: `Project ${newStatus === 'Archived' ? 'archived' : 'restored'} successfully`,
      data: project
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Admin: Permanently delete project (Superadmin only)
 */
export async function deleteProject(req, res, next) {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    // Queue Cloudinary media assets for cleanup if publicId exists
    const publicIdsToClean = [];
    if (project.coverImage?.publicId) publicIdsToClean.push(project.coverImage.publicId);
    if (Array.isArray(project.gallery)) {
      project.gallery.forEach(item => {
        if (item.publicId) publicIdsToClean.push(item.publicId);
      });
    }

    for (const pid of publicIdsToClean) {
      // Check if another project references this asset before queuing deletion
      const otherRef = await Project.findOne({
        _id: { $ne: project._id },
        $or: [
          { 'coverImage.publicId': pid },
          { 'gallery.publicId': pid }
        ]
      });

      if (!otherRef) {
        await MediaCleanupQueue.create({
          publicId: pid,
          resourceType: 'image'
        });
      }
    }

    const deletedTitle = project.title;
    const deletedSlug = project.slug;

    await project.deleteOne();

    await AuditLog.create({
      action: 'PROJECT_DELETE',
      userId: req.user._id,
      userEmail: req.user.email,
      userRole: req.user.role,
      resourceType: 'Project',
      resourceId: id,
      details: { title: deletedTitle, slug: deletedSlug },
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });

    await triggerRevalidation(['/', '/projects', `/projects/${deletedSlug}`, '/sitemap.xml']);

    res.json({
      success: true,
      message: 'Project permanently deleted'
    });
  } catch (err) {
    next(err);
  }
}
