import { FastifyInstance } from 'fastify';

/**
 * In-memory set of blocked IPs that hit the honeypot.
 * Exported so `routes/index.ts` can register a global preHandler check.
 *
 * In production: replace with a Redis SET for persistence across restarts
 * and horizontal scale (e.g. `redis.sadd('honeypot:blocked', ip)`).
 */
export const blockedIPs = new Set<string>();

/**
 * Honeypot route — registers a convincing-looking but dead endpoint.
 *
 * Any client that probes `/api/honeypot` is flagged as a scraper:
 *  - Their IP is added to the blocklist
 *  - Subsequent requests to CFA content routes are silently blocked
 *  - A fake empty payload is returned (so scrapers don't know they triggered it)
 */
export async function honeypotRoutes(fastify: FastifyInstance) {
  fastify.get('/api/honeypot', async (req, reply) => {
    const ip =
      (req.headers['x-forwarded-for']?.toString().split(',')[0] ?? req.socket.remoteAddress) ||
      'unknown';

    blockedIPs.add(ip);
    fastify.log.warn({ ip, event: 'HONEYPOT_HIT' }, 'Honeypot triggered — IP blocked');

    // Return convincing-looking empty payload
    return reply.code(200).header('Content-Type', 'application/json').send({ notes: [] });
  });
}
