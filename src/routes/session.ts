import type { FastifyInstance, FastifyRequest } from 'fastify';
import crypto from 'crypto';
import { env } from '../config/env.js';
import { isRedisConnected, redis } from '../config/redis.js';
import { createHash, createHmac } from 'crypto';

/**
 * Generate a lightweight browser fingerprint hash
 */
export function generateFingerprintHash(req: FastifyRequest): string {
  // Only use headers that are guaranteed to be sent on all cross-origin fetch() calls.
  // Sec-CH-UA-* Client Hints are NOT reliably forwarded cross-origin, which causes
  // fingerprint mismatches between /init and subsequent API calls.
  const ua = req.headers['user-agent'] || '';
  const lang = req.headers['accept-language'] || '';
  const rawFingerprint = `${ua}|${lang}`;
  return createHash('sha256').update(rawFingerprint).digest('hex');
}

// In-memory fallback for sessions (useful for tests or if Redis is down)
export const sessionMemoryStore = new Map<string, { fingerprintHash: string; expiresAt: number }>();

export async function sessionRoutes(app: FastifyInstance) {
  app.get('/init', async (req, reply) => {
    const sessionId = crypto.randomUUID();
    const issuedAt = Date.now();
    const expiresAt = issuedAt + 60000; // 60 seconds

    // 1. Generate lightweight fingerprint hash
    const fingerprintHash = generateFingerprintHash(req);

    // 2. Generate the session-specific secret (signature)
    // The frontend will use this signature as the key for HMAC signing its requests.
    const signature = createHmac('sha256', env.SESSION_SECRET).update(sessionId).digest('hex');

    // 3. Store session state in Redis (or fallback to memory if not connected, though in prod we expect redis)
    const sessionData = {
      fingerprintHash,
      expiresAt,
    };

    if (isRedisConnected && redis) {
      await redis.set(`session:${sessionId}`, JSON.stringify(sessionData), 'EX', 60);
    } else {
      sessionMemoryStore.set(sessionId, sessionData);
      // Clean up after 60s
      setTimeout(() => sessionMemoryStore.delete(sessionId), 60000);
    }

    return reply.send({
      sessionId,
      expiresAt,
      signature,
    });
  });
}
