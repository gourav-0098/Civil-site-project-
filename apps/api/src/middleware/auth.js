import { User } from '../models/User.js';

export async function requireAuth(req, res, next) {
  try {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required. Please log in.'
      });
    }

    const user = await User.findById(req.session.userId).select('-passwordHash');

    if (!user || !user.isActive) {
      req.session.destroy();
      return res.status(401).json({
        success: false,
        error: 'User account is deactivated or no longer exists.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required.'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Access denied. Requires one of roles: [${allowedRoles.join(', ')}]`
      });
    }

    next();
  };
}

export async function optionalAuth(req, res, next) {
  try {
    if (req.session && req.session.userId) {
      const user = await User.findById(req.session.userId).select('-passwordHash');
      if (user && user.isActive) {
        req.user = user;
      }
    }
    next();
  } catch (err) {
    next();
  }
}
