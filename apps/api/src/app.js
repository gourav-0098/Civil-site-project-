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
    'https://web-mu-nine-46.vercel.app',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, server-side fetch, postman, curl)
        if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
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
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }
  };

  if (sessionStoreOverride) {
    sessionConfig.store = sessionStoreOverride;
  } else if (env.NODE_ENV !== 'test') {
    const hasRemoteMongo = env.MONGODB_URI && env.MONGODB_URI.startsWith('mongodb') && !env.MONGODB_URI.includes('127.0.0.1');
    if (hasRemoteMongo) {
      sessionConfig.store = MongoStore.create({
        mongoUrl: env.MONGODB_URI,
        collectionName: 'sessions',
        ttl: 7 * 24 * 60 * 60,
        autoRemove: 'native',
        touchAfter: 24 * 3600
      });
    } else if (!process.env.VERCEL) {
      sessionConfig.store = MongoStore.create({
        clientPromise: mongoose.connection.asPromise().then(() => mongoose.connection.getClient()),
        collectionName: 'sessions',
        ttl: 7 * 24 * 60 * 60,
        autoRemove: 'native'
      });
    }
  }


  app.use(session(sessionConfig));

  // Root status endpoint
  app.get('/', (req, res) => {
    const isDbConnected = mongoose.connection.readyState === 1;
    res.status(200).json({
      service: 'Nivara Infrastructure API',
      status: 'operational',
      database: isDbConnected ? 'connected' : 'connecting',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    });
  });

  // Health check endpoint
  app.get('/health', (req, res) => {
    const isDbConnected = mongoose.connection.readyState === 1;
    res.status(200).json({
      status: isDbConnected ? 'healthy' : 'connecting',
      service: 'Nivara Infrastructure API',
      timestamp: new Date().toISOString(),
      uptime: Math.round(process.uptime()),
      database: isDbConnected ? 'connected' : 'connecting'
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

const defaultApp = createApp();
export default defaultApp;

