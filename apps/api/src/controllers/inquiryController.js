import { Inquiry } from '../models/Inquiry.js';
import { AuditLog } from '../models/AuditLog.js';

/**
 * Public: Submit corporate inquiry or project tender inquiry
 */
export async function submitInquiry(req, res, next) {
  try {
    const data = req.body;

    // Honeypot anti-spam check
    if (data.honeypot && data.honeypot.trim().length > 0) {
      // Silently accept bot submission without storing to prevent bot adaptation
      return res.status(200).json({
        success: true,
        message: 'Inquiry received successfully.'
      });
    }

    const inquiry = new Inquiry({
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      organization: data.organization || '',
      propertyId: data.propertyId || null,
      propertyTitle: data.propertyTitle || '',
      inquiryType: data.inquiryType || 'General Property Inquiry',
      projectLocation: data.projectLocation || '',
      subject: data.subject,
      message: data.message,
      ipAddress: req.ip
    });

    await inquiry.save();

    res.status(201).json({
      success: true,
      message: 'Thank you. Your inquiry has been transmitted to the Nivara Infrastructure property advisory team.',
      data: {
        id: inquiry._id,
        createdAt: inquiry.createdAt
      }
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Admin: List all inquiries with filtering and pagination
 */
export async function listInquiries(req, res, next) {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const skip = (page - 1) * limit;

    const { status, isRead, search } = req.query;
    const query = {};

    if (status && status !== 'All') query.status = status;
    if (isRead !== undefined && isRead !== 'All') query.isRead = isRead === 'true';

    if (search && search.trim()) {
      const term = search.trim();
      query.$or = [
        { name: { $regex: term, $options: 'i' } },
        { email: { $regex: term, $options: 'i' } },
        { organization: { $regex: term, $options: 'i' } },
        { subject: { $regex: term, $options: 'i' } }
      ];
    }

    const [inquiries, total] = await Promise.all([
      Inquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Inquiry.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: inquiries,
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
 * Admin: View single inquiry detail and automatically mark read
 */
export async function getInquiryById(req, res, next) {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        error: 'Inquiry record not found'
      });
    }

    if (!inquiry.isRead) {
      inquiry.isRead = true;
      await inquiry.save();
    }

    res.json({
      success: true,
      data: inquiry
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Admin: Update inquiry status and internal notes
 */
export async function updateInquiry(req, res, next) {
  try {
    const { id } = req.params;
    const { status, internalNotes, isRead } = req.body;

    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        error: 'Inquiry record not found'
      });
    }

    if (status) inquiry.status = status;
    if (internalNotes !== undefined) inquiry.internalNotes = internalNotes;
    if (isRead !== undefined) inquiry.isRead = isRead;

    await inquiry.save();

    await AuditLog.create({
      action: 'INQUIRY_STATUS_UPDATE',
      userId: req.user._id,
      userEmail: req.user.email,
      userRole: req.user.role,
      resourceType: 'Inquiry',
      resourceId: id,
      details: { status: inquiry.status, isRead: inquiry.isRead },
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });

    res.json({
      success: true,
      message: 'Inquiry updated successfully',
      data: inquiry
    });
  } catch (err) {
    next(err);
  }
}
