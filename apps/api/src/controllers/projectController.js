import { Project } from '../models/Project.js';

/**
 * Public: List all published & active projects with search, filter, and pagination.
 */
export async function getPublicProjects(req, res, next) {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 9));
    const skip = (page - 1) * limit;

    const { category, status, search, sort } = req.query;

    // Strict public security boundary: published and not archived
    const query = {
      publicationStatus: 'Published',
      archiveStatus: 'Active'
    };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (status && status !== 'All') {
      query.constructionStatus = status;
    }

    if (search && search.trim()) {
      const term = search.trim();
      query.$or = [
        { title: { $regex: term, $options: 'i' } },
        { location: { $regex: term, $options: 'i' } },
        { shortDescription: { $regex: term, $options: 'i' } }
      ];
    }

    let sortOption = { isFeatured: -1, createdAt: -1 };
    if (sort === 'oldest') {
      sortOption = { createdAt: 1 };
    } else if (sort === 'title') {
      sortOption = { title: 1 };
    }

    const [projects, total] = await Promise.all([
      Project.find(query)
        .select('title slug category location constructionStatus coverImage shortDescription isFeatured timeline createdAt')
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
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
 * Public: Get featured projects for homepage
 */
export async function getFeaturedProjects(req, res, next) {
  try {
    const projects = await Project.find({
      publicationStatus: 'Published',
      archiveStatus: 'Active',
      isFeatured: true
    })
      .select('title slug category location constructionStatus coverImage shortDescription timeline')
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();

    res.json({
      success: true,
      data: projects
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Public: Get single project by slug.
 * Draft projects can only be viewed if requester is an authenticated administrator.
 */
export async function getProjectBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    const isPreview = req.query.preview === 'true';

    const query = { slug };

    // Unless this is an authorized admin previewing, strictly require published and active
    if (!isPreview || !req.user) {
      query.publicationStatus = 'Published';
      query.archiveStatus = 'Active';
    }

    const project = await Project.findOne(query).lean();

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found or not currently published'
      });
    }

    // Fetch related projects from the same category
    const relatedProjects = await Project.find({
      category: project.category,
      _id: { $ne: project._id },
      publicationStatus: 'Published',
      archiveStatus: 'Active'
    })
      .select('title slug category location constructionStatus coverImage shortDescription')
      .limit(3)
      .lean();

    res.json({
      success: true,
      data: {
        ...project,
        relatedProjects
      }
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Public: Get unique categories with published project counts
 */
export async function getCategories(req, res, next) {
  try {
    const categories = await Project.aggregate([
      {
        $match: {
          publicationStatus: 'Published',
          archiveStatus: 'Active'
        }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: 1
        }
      },
      {
        $sort: { name: 1 }
      }
    ]);

    res.json({
      success: true,
      data: categories
    });
  } catch (err) {
    next(err);
  }
}
