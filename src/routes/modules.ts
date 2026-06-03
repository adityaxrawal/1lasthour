import type { FastifyInstance } from 'fastify';
import { modulesController } from '../controllers/modules.controller.js';

export async function modulesRoutes(app: FastifyInstance) {
  app.get('/topics/:topicId/modules/:moduleId', modulesController.getById);
}
