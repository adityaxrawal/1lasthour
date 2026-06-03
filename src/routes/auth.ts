import type { FastifyInstance } from 'fastify';
import { authController } from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/authenticate.js';
import { env } from '../config/env.js';

export async function authRoutes(app: FastifyInstance) {
  // Rate limit for auth routes
  const rateLimitConfig = {
    config: {
      rateLimit: { max: env.RATE_LIMIT_AUTH, timeWindow: '1 minute' },
    },
  };

  app.post('/auth/register', rateLimitConfig, authController.register);
  app.post('/auth/login', rateLimitConfig, authController.login);
  app.post('/auth/refresh', rateLimitConfig, authController.refresh);

  app.post(
    '/auth/logout',
    { ...rateLimitConfig, preHandler: [authenticate] },
    authController.logout,
  );
}
