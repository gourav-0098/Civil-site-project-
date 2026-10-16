import mongoose from 'mongoose';
import { env } from './env.js';

let isConnected = false;
let memServer = null;
let cachedPromise = null;

export async function connectDB(overrideUri = null) {
  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return mongoose.connection;
  }

  if (mongoose.connection.readyState === 2 && cachedPromise) {
    return cachedPromise;
  }

  const uri = overrideUri || env.MONGODB_URI;

  try {
    cachedPromise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
      autoIndex: env.NODE_ENV !== 'production'
    });

    const conn = await cachedPromise;
    isConnected = true;
    console.log(`✅ Connected to MongoDB: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`);
    return conn;
  } catch (err) {
    cachedPromise = null;
    console.warn(`⚠️ Could not connect to MongoDB at ${uri}: ${err.message}`);

    // If local MongoDB is unavailable during development or test, start in-memory MongoDB
    if (env.NODE_ENV !== 'production') {
      try {
        console.log('🔄 Starting in-memory MongoDB fallback for local development/testing...');
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        memServer = await MongoMemoryServer.create();
        const memUri = memServer.getUri();
        const conn = await mongoose.connect(memUri, {
          autoIndex: true
        });
        isConnected = true;
        console.log(`✅ Connected to In-Memory MongoDB at ${memUri}`);
        return conn;
      } catch (memErr) {
        console.error('❌ Failed to start in-memory MongoDB server:', memErr.message);
        throw err;
      }
    } else {
      throw err;
    }
  }
}

export async function disconnectDB() {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
  }
  if (memServer) {
    await memServer.stop();
    memServer = null;
  }
}

mongoose.connection.on('disconnected', () => {
  isConnected = false;
});
