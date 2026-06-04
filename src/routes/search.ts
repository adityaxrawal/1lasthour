import type { FastifyInstance } from 'fastify';
import { searchController } from '../controllers/search.controller.js';
import { env } from '../config/env.js';
import { rejectBots } from '../middleware/rejectBots.js';
import { verifyBrowserSession } from '../middleware/verifyBrowserSession.js';

export async function searchRoutes(app: FastifyInstance) {
  app.get(
    '/search',
    {
      config: {
        rateLimit: { max: env.RATE_LIMIT_SEARCH, timeWindow: '1 minute' },
      },
      preHandler: [rejectBots, verifyBrowserSession],
    },
    searchController.search,
  );
}
