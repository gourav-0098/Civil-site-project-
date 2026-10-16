import { connectDB, disconnectDB } from './config/db.js';
import { env } from './config/env.js';
import { createApp } from './app.js';

async function startServer() {
  try {
    console.log('🚀 Starting Nivara Infrastructure API server...');
    await connectDB();

    const app = createApp();

    const server = app.listen(env.PORT, () => {
      console.log(`📡 Nivara API listening on http://localhost:${env.PORT} in [${env.NODE_ENV}] mode`);
      console.log(`🔒 Admin CORS allowed origin: ${env.ALLOWED_ORIGIN}`);
    });

    const shutdown = async (signal) => {
      console.log(`\n🛑 Received ${signal}. Gracefully shutting down...`);
      server.close(async () => {
        console.log('🚪 HTTP server closed.');
        await disconnectDB();
        console.log('📦 Database connections closed.');
        process.exit(0);
      });

      // Force exit after 10s if graceful shutdown hangs
      setTimeout(() => {
        console.error('⚠️ Forcing process exit after timeout.');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    console.error('❌ Server startup error:', error);
    process.exit(1);
  }
}

startServer();
