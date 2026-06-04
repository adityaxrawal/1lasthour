import { FastifyRequest, FastifyReply } from 'fastify';
import { createHmac } from 'crypto';
import { env } from '../config/env.js';

interface TokenPayload {
  timestamp: number;
  nonce: string;
  sig: string;
}

/**
 * Middleware: Verify HMAC-signed request token.
 *
 * Protects all CFA data endpoints from direct API scraping.
 * The frontend `signedFetch` utility generates matching tokens.
 *
 * Checks (in order):
 *  1. Origin / Referer must match ALLOWED_ORIGIN
 *  2. X-Requested-With: XMLHttpRequest must be present
 *  3. X-Request-Token header must be present and parseable
 *  4. Token timestamp must be within TOKEN_TTL_MS window
 *  5. HMAC-SHA256 signature must match
 */
export async function verifyRequestToken(req: FastifyRequest, reply: FastifyReply): Promise<void> {
  // 1. Verify Origin
  const origin = req.headers.origin ?? req.headers.referer;
  if (origin && !origin.startsWith(env.ALLOWED_ORIGIN)) {
    reply.code(403).send({ error: 'Forbidden' });
    return;
  }

  // 2. Require X-Requested-With
  if (req.headers['x-requested-with'] !== 'XMLHttpRequest') {
    reply.code(401).send({ error: 'Unauthorized' });
    return;
  }

  // 3. Parse token
  const rawToken = req.headers['x-request-token'] as string | undefined;
  if (!rawToken) {
    reply.code(401).send({ error: 'Missing token' });
    return;
  }

  let payload: TokenPayload;
  try {
    payload = JSON.parse(Buffer.from(rawToken, 'base64').toString('utf8')) as TokenPayload;
  } catch {
    reply.code(401).send({ error: 'Invalid token' });
    return;
  }

  // 4. Check token age
  if (Date.now() - payload.timestamp > env.TOKEN_TTL_MS) {
    reply.code(401).send({ error: 'Token expired' });
    return;
  }

  // 5. Verify HMAC
  const message = `${req.url}:${payload.timestamp}:${payload.nonce}`;
  const expected = createHmac('sha256', env.REQUEST_SECRET).update(message).digest('hex');

  if (expected !== payload.sig) {
    reply.code(401).send({ error: 'Invalid signature' });
    return;
  }
}
