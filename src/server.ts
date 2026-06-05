import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { buildApp } from './app.js';
import { env } from './config/env.js';
import { connectRedis, disconnectRedis } from './config/redis.js';
import { pool } from './config/database.js';
import { logger } from './utils/logger.js';

async function start() {
  let app: Awaited<ReturnType<typeof buildApp>>;

  try {
    // 1. Verify Database
    await pool.query('SELECT 1');
    logger.info('Database connection verified');

    // 2. Connect Redis (non-fatal if it fails)
    await connectRedis();

    // 3. Build & start Fastify
    app = await buildApp();
    await app.listen({ port: env.PORT, host: env.HOST });
    logger.info(`Server listening on http://${env.HOST}:${env.PORT}`);
  } catch (err) {
    logger.fatal({ err }, 'Failed to start server');
    process.exit(1);
  }

  // Graceful shutdown handler
  const shutdown = async (signal: string) => {
    logger.info(`${signal} received — shutting down gracefully`);

    // Stop accepting new requests
    await app.close().catch((err) => logger.error({ err }, 'Error closing app'));

    // Disconnect services
    await pool.end().catch((err) => logger.error({ err }, 'Error closing database pool'));
    await disconnectRedis().catch((err) => logger.error({ err }, 'Error closing redis'));

    logger.info('Shutdown complete');
    process.exit(0);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  process.on('uncaughtException', (err) => {
    logger.fatal({ err }, 'Uncaught exception');
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    logger.fatal({ reason }, 'Unhandled rejection');
    process.exit(1);
  });
}

import { fileURLToPath } from 'url';

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  start().catch((err) => {
    logger.fatal({ err }, 'Startup failed');
    process.exit(1);
  });
}
