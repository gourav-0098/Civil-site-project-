import { User } from '../models/User.js';
import { AuditLog } from '../models/AuditLog.js';

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        error: 'This account has been deactivated. Please contact an administrator.'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    // Regenerate session to prevent session fixation attacks
    req.session.regenerate(async (err) => {
      if (err) {
        return next(err);
      }

      req.session.userId = user._id.toString();
      req.session.userRole = user.role;

      user.lastLoginAt = new Date();
      await user.save();

      await AuditLog.create({
        action: 'AUTH_LOGIN',
        userId: user._id,
        userEmail: user.email,
        userRole: user.role,
        resourceType: 'User',
        resourceId: user._id.toString(),
        ip: req.ip,
        userAgent: req.headers['user-agent']
      });

      res.json({
        success: true,
        message: 'Logged in successfully',
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    });
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res, next) {
  try {
    const userId = req.session?.userId;
    const userEmail = req.user?.email || '';

    if (userId) {
      await AuditLog.create({
        action: 'AUTH_LOGOUT',
        userId,
        userEmail,
        resourceType: 'User',
        resourceId: userId,
        ip: req.ip,
        userAgent: req.headers['user-agent']
      });
    }

    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid', { path: '/' });
      res.json({
        success: true,
        message: 'Logged out successfully'
      });
    });
  } catch (err) {
    next(err);
  }
}

export async function getCurrentUser(req, res) {
  res.json({
    success: true,
    data: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      lastLoginAt: req.user.lastLoginAt
    }
  });
}

export async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Current password is incorrect'
      });
    }

    user.passwordHash = await User.hashPassword(newPassword);
    await user.save();

    await AuditLog.create({
      action: 'AUTH_PASSWORD_CHANGE',
      userId: user._id,
      userEmail: user.email,
      userRole: user.role,
      resourceType: 'User',
      resourceId: user._id.toString(),
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (err) {
    next(err);
  }
}
