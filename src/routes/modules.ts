import type { FastifyInstance } from 'fastify';
import { modulesController } from '../controllers/modules.controller.js';
import { rejectBots } from '../middleware/rejectBots.js';
import { verifyBrowserSession } from '../middleware/verifyBrowserSession.js';

export async function modulesRoutes(app: FastifyInstance) {
  app.get(
    '/topics/:topicId/modules/:moduleId',
    { preHandler: [rejectBots, verifyBrowserSession] },
    modulesController.getById,
  );
}
