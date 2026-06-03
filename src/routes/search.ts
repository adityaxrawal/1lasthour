import type { FastifyInstance } from 'fastify';
import { searchController } from '../controllers/search.controller.js';
import { env } from '../config/env.js';

export async function searchRoutes(app: FastifyInstance) {
  app.get(
    '/search',
    {
      config: {
        rateLimit: { max: env.RATE_LIMIT_SEARCH, timeWindow: '1 minute' },
      },
    },
    searchController.search,
  );
}
