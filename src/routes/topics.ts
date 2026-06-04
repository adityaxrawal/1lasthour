import type { FastifyInstance } from 'fastify';
import { topicsController } from '../controllers/topics.controller.js';
import { rejectBots } from '../middleware/rejectBots.js';
import { verifyBrowserSession } from '../middleware/verifyBrowserSession.js';

export async function topicsRoutes(app: FastifyInstance) {
  app.get('/topics', { preHandler: [rejectBots, verifyBrowserSession] }, topicsController.list);

  app.get(
    '/topics/:topicId',
    { preHandler: [rejectBots, verifyBrowserSession] },
    topicsController.getById,
  );
}
