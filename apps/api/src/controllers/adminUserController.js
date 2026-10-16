import { User } from '../models/User.js';
import { AuditLog } from '../models/AuditLog.js';

export async function listUsers(req, res, next) {
  try {
    const users = await User.find().select('-passwordHash').sort({ createdAt: -1 }).lean();
    res.json({
      success: true,
      data: users
    });
  } catch (err) {
    next(err);
  }
}

export async function createUser(req, res, next) {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({
        success: false,
        error: 'A user with this email address already exists'
      });
    }

    const passwordHash = await User.hashPassword(password);
    const user = new User({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: role || 'editor'
    });

    await user.save();

    await AuditLog.create({
      action: 'USER_CREATE',
      userId: req.user._id,
      userEmail: req.user.email,
      userRole: req.user.role,
      resourceType: 'User',
      resourceId: user._id.toString(),
      details: { email: user.email, role: user.role },
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });

    res.status(201).json({
      success: true,
      message: 'Administrator account created successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function toggleUserStatus(req, res, next) {
  try {
    const { id } = req.params;

    if (id === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        error: 'You cannot deactivate your own administrative account'
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    user.isActive = !user.isActive;
    await user.save();

    await AuditLog.create({
      action: 'USER_STATUS_UPDATE',
      userId: req.user._id,
      userEmail: req.user.email,
      userRole: req.user.role,
      resourceType: 'User',
      resourceId: id,
      details: { isActive: user.isActive },
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });

    res.json({
      success: true,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      data: {
        id: user._id,
        isActive: user.isActive
      }
    });
  } catch (err) {
    next(err);
  }
}
