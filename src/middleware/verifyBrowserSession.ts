import { FastifyRequest, FastifyReply } from 'fastify';
import { createHmac } from 'crypto';
import { env } from '../config/env.js';
import { isRedisConnected, redis } from '../config/redis.js';
import { generateFingerprintHash, sessionMemoryStore } from '../routes/session.js';

// In-memory fallback for replay protection
const replayMemoryStore = new Set<string>();

export async function verifyBrowserSession(
  req: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  if (process.env.NODE_ENV === 'test') return;
  if (process.env.NODE_ENV === 'development' && req.headers['x-request-signature'] === 'dev-bypass')
    return;

  // 1. Verify Origin and Referer
  const origin = req.headers.origin;
  const referer = req.headers.referer;

  if (origin && !origin.startsWith(env.ALLOWED_ORIGIN)) {
    reply.code(403).send({ error: 'Forbidden' });
    return;
  }
  if (referer && !referer.startsWith(env.ALLOWED_ORIGIN)) {
    reply.code(403).send({ error: 'Forbidden' });
    return;
  }

  if (req.headers['x-requested-with'] !== 'XMLHttpRequest') {
    console.error('verifyBrowserSession failed: Missing X-Requested-With');
    reply.code(401).send({ error: 'Unauthorized: Missing X-Requested-With' });
    return;
  }

  // 3. Extract required session headers
  const sessionId = req.headers['x-session-id'] as string;
  const nonce = req.headers['x-nonce'] as string;
  const timestampStr = req.headers['x-timestamp'] as string;
  const signature = req.headers['x-request-signature'] as string;

  if (!sessionId || !nonce || !timestampStr || !signature) {
    console.error('verifyBrowserSession failed: Missing session headers', {
      sessionId,
      nonce,
      timestampStr,
      signature,
    });
    reply.code(401).send({ error: 'Unauthorized: Missing session headers' });
    return;
  }

  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) {
    console.error('verifyBrowserSession failed: Invalid timestamp', timestampStr);
    reply.code(401).send({ error: 'Unauthorized: Invalid timestamp' });
    return;
  }

  // 4. Verify timestamp is within 30 seconds
  if (Math.abs(Date.now() - timestamp) > 30000) {
    console.error(
      'verifyBrowserSession failed: Request expired. Diff:',
      Math.abs(Date.now() - timestamp),
    );
    reply.code(401).send({ error: 'Unauthorized: Request expired' });
    return;
  }

  // 5. Fetch session
  let sessionData: { fingerprintHash: string; expiresAt: number } | null = null;
  if (isRedisConnected && redis) {
    const rawData = await redis.get(`session:${sessionId}`);
    if (rawData) {
      sessionData = JSON.parse(rawData);
    }
  } else {
    sessionData = sessionMemoryStore.get(sessionId) || null;
  }

  if (!sessionData) {
    console.error('verifyBrowserSession failed: Session not found', sessionId);
    reply.code(401).send({ error: 'Unauthorized: Session not found' });
    return;
  }

  // 6. Verify Session not expired
  if (Date.now() > sessionData.expiresAt) {
    console.error('verifyBrowserSession failed: Session expired', sessionData.expiresAt);
    reply.code(401).send({ error: 'Unauthorized: Session expired' });
    return;
  }

  // 7. Verify browser fingerprint binding
  const currentHash = generateFingerprintHash(req);
  if (currentHash !== sessionData.fingerprintHash) {
    console.error('verifyBrowserSession failed: Fingerprint mismatch', {
      currentHash,
      expected: sessionData.fingerprintHash,
      headers: req.headers,
    });
    reply.code(401).send({ error: 'Unauthorized: Fingerprint mismatch' });
    return;
  }

  // 8. (Nonce strict ordering removed to allow concurrent fetches)

  // 9. Replay Protection: Check duplicated signatures
  const replayKey = `${sessionId}:${timestamp}:${signature}`;
  if (isRedisConnected && redis) {
    // NX = Set if not exists. EX = Expire in 60s
    const setSuccess = await redis.set(`replay:${replayKey}`, '1', 'EX', 60, 'NX');
    if (!setSuccess) {
      reply.code(409).send({ error: 'Replay Detected' });
      return;
    }
  } else {
    if (replayMemoryStore.has(replayKey)) {
      reply.code(409).send({ error: 'Replay Detected' });
      return;
    }
    replayMemoryStore.add(replayKey);
    setTimeout(() => replayMemoryStore.delete(replayKey), 60000);
  }

  // 10. Verify Signature
  // Reconstruct session key: HMAC(sessionId, SESSION_SECRET)
  const sessionSecret = createHmac('sha256', env.SESSION_SECRET).update(sessionId).digest('hex');

  // Verify request signature: HMAC(sessionId + nonce + timestamp + requestPath, sessionSecret)
  const message = `${sessionId}${nonce}${timestamp}${req.url}`;
  const expectedSig = createHmac('sha256', sessionSecret).update(message).digest('hex');

  if (expectedSig !== signature) {
    console.error('verifyBrowserSession failed: Invalid signature', {
      expectedSig,
      signature,
      message,
    });
    reply.code(401).send({ error: 'Unauthorized: Invalid signature' });
    return;
  }
}
