import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { env } from './config/env.js';
import projectRoutes from './routes/projectRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import { generalLimiter } from './middleware/rateLimiter.js';

export function createApp(sessionStoreOverride = null) {
  const app = express();

  // Trust proxy for secure cookies behind reverse proxies (like Next.js route proxy or load balancers)
  app.set('trust proxy', 1);

  // Security Headers
  app.use(
    helmet({
      contentSecurityPolicy: false, // Next.js handles CSP for frontend
      crossOriginResourcePolicy: { policy: 'cross-origin' }
    })
  );

  // CORS configuration
  const allowedOrigins = [
    env.ALLOWED_ORIGIN,
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, server-side fetch, postman)
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('CORS blocked: Origin not allowed'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'x-internal-proxy-key']
    })
  );

  if (env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }

  // Request limits
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());

  // General rate limiter
  app.use('/api/', generalLimiter);

  // Session Store configuration
  const sessionConfig = {
    name: 'nivara.sid',
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }
  };

  if (sessionStoreOverride) {
    sessionConfig.store = sessionStoreOverride;
  } else if (env.NODE_ENV !== 'test') {
    sessionConfig.store = MongoStore.create({
      clientPromise: mongoose.connection.asPromise().then(() => mongoose.connection.getClient()),
      collectionName: 'sessions',
      ttl: 7 * 24 * 60 * 60,
      autoRemove: 'native'
    });
  }

  app.use(session(sessionConfig));

  // Health check endpoint
  app.get('/health', (req, res) => {
    const isDbConnected = mongoose.connection.readyState === 1;
    res.status(isDbConnected ? 200 : 503).json({
      status: isDbConnected ? 'healthy' : 'degraded',
      service: 'Nivara Infrastructure API',
      timestamp: new Date().toISOString(),
      uptime: Math.round(process.uptime()),
      database: isDbConnected ? 'connected' : 'disconnected'
    });
  });

  // REST API v1 routes
  app.use('/api/v1/projects', projectRoutes);
  app.use('/api/v1/categories', categoryRoutes);
  app.use('/api/v1/inquiries', inquiryRoutes);
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/admin', adminRoutes);

  // 404 & Centralized Error Handlers
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
