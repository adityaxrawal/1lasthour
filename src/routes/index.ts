import type { FastifyInstance } from 'fastify';
import { healthRoutes } from './health.js';
import { topicsRoutes } from './topics.js';
import { modulesRoutes } from './modules.js';
import { searchRoutes } from './search.js';
import { sessionRoutes } from './session.js';
import { honeypotRoutes, blockedIPs } from './honeypot.js';

import fastifyRateLimit from '@fastify/rate-limit';
import { rateLimitErrorBuilder } from '../utils/rateLimit.js';

const ROBOTS_TXT = `User-agent: *
Disallow: /api/
Disallow: /data/

User-agent: GPTBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: ia_archiver
Disallow: /

User-agent: Googlebot
Crawl-delay: 10
`;

export async function registerRoutes(app: FastifyInstance) {
  // Serve robots.txt at root level
  app.get('/robots.txt', async (_req, reply) => {
    reply.header('Content-Type', 'text/plain; charset=utf-8');
    return reply.send(ROBOTS_TXT);
  });

  // Honeypot — must be registered BEFORE the /api/v1 prefix block
  await app.register(honeypotRoutes);

  // Block IPs that previously hit the honeypot across all /api/v1/* routes
  app.register(
    async (v1) => {
      // Blocked-IP gate — runs before every route in this scope
      v1.addHook('preHandler', async (req, reply) => {
        const ip =
          (req.headers['x-forwarded-for']?.toString().split(',')[0] ?? req.socket.remoteAddress) ||
          'unknown';
        if (blockedIPs.has(ip)) {
          req.log.warn({ ip, event: 'BLOCKED_IP_REJECTED' }, 'Blocked IP attempted access');
          reply.code(403).send({ error: 'Forbidden' });
        }
      });

      await v1.register(healthRoutes);
      await v1.register(searchRoutes);
      await v1.register(sessionRoutes, { prefix: '/session' });

      // CFA specific rate limiting (max 30 per minute)
      v1.register(async (cfaScope) => {
        cfaScope.register(fastifyRateLimit, {
          max: parseInt(process.env.RATE_LIMIT_MAX || '30'),
          timeWindow: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'),
          keyGenerator: (req) => req.ip,
          allowList: (req) => req.method === 'OPTIONS',
          errorResponseBuilder: rateLimitErrorBuilder,
        });

        await cfaScope.register(topicsRoutes);
        await cfaScope.register(modulesRoutes);
      });
    },
    { prefix: '/api/v1' },
  );
}
