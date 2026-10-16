import { env } from '../config/env.js';

export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: `Endpoint not found: ${req.method} ${req.originalUrl}`
  });
}

export function errorHandler(err, req, res, next) {
  // Prevent sending headers twice
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = err.status || err.statusCode || 500;
  let message = err.message || 'Internal server error';
  let details = null;

  // Handle Mongoose duplicate key error (11000)
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyPattern || {})[0] || 'record';
    message = `A ${field} with this value already exists. Please choose a unique value.`;
  }

  // Handle Mongoose ValidationError
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    details = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message
    }));
  }

  // Handle Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ID format for parameter: ${err.path}`;
  }

  // Safe logging (omit sensitive tokens or secrets)
  if (statusCode >= 500) {
    console.error(`[Error] 500 on ${req.method} ${req.originalUrl}:`, err.stack || err);
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(details ? { details } : {}),
    ...(env.NODE_ENV !== 'production' && statusCode >= 500 ? { stack: err.stack } : {})
  });
}
