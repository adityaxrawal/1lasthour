import type { FastifyInstance } from 'fastify';
import { topicsController } from '../controllers/topics.controller.js';

export async function topicsRoutes(app: FastifyInstance) {
  app.get('/topics', topicsController.list);
  app.get('/topics/:topicId', topicsController.getById);
}
