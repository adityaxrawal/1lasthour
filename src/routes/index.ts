import type { FastifyInstance } from 'fastify';
import { healthRoutes } from './health.js';
import { topicsRoutes } from './topics.js';
import { modulesRoutes } from './modules.js';
import { searchRoutes } from './search.js';
import { authRoutes } from './auth.js';

export async function registerRoutes(app: FastifyInstance) {
  // All routes are prefixed with /api/v1
  app.register(
    async (v1) => {
      await v1.register(healthRoutes);
      await v1.register(topicsRoutes);
      await v1.register(modulesRoutes);
      await v1.register(searchRoutes);
      await v1.register(authRoutes);
    },
    { prefix: '/api/v1' },
  );
}
