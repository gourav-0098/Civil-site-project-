import { createApp } from './apps/api/src/app.js';
import { connectDB } from './apps/api/src/config/db.js';

let appInstance = null;

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (dbErr) {
    console.error('Database connection notice in serverless handler:', dbErr.message);
  }

  if (!appInstance) {
    appInstance = createApp();
  }

  return appInstance(req, res);
}
