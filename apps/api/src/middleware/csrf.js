import { env } from '../config/env.js';

export function verifyOriginOrSameSite(req, res, next) {
  // Safe HTTP methods do not modify state
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  // Skip origin verification in test mode
  if (env.NODE_ENV === 'test') {
    return next();
  }

  const origin = req.headers.origin || req.headers.referer;

  // Next.js Route Handler Proxy / Server-to-Server calls may send an internal authorization header or internal proxy header
  const internalProxySecret = req.headers['x-internal-proxy-key'];
  if (internalProxySecret && internalProxySecret === env.REVALIDATION_SECRET) {
    return next();
  }

  if (origin) {
    try {
      const originUrl = new URL(origin);
      const allowedUrl = new URL(env.ALLOWED_ORIGIN);
      if (originUrl.host === allowedUrl.host || originUrl.host === req.headers.host) {
        return next();
      }
    } catch {
      // Invalid URL
    }
    return res.status(403).json({
      success: false,
      error: 'Cross-site request blocked: Invalid or untrusted origin'
    });
  }

  // If no origin/referer header, ensure Content-Type is application/json to prevent standard HTML form CSRF
  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('application/json') && !contentType.includes('multipart/form-data')) {
    return res.status(403).json({
      success: false,
      error: 'State-changing requests must supply valid JSON content or verified origin'
    });
  }

  next();
}
