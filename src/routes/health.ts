import type { FastifyInstance } from 'fastify';

export async function healthRoutes(app: FastifyInstance) {
  app.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  app.get('/health/ready', async () => {
    // A real readiness probe might ping DB and Redis
    return {
      status: 'ready',
      database: 'ok',
      redis: 'ok',
      timestamp: new Date().toISOString(),
    };
  });
}
