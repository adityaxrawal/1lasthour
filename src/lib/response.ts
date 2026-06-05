import type { FastifyRequest, FastifyReply } from 'fastify';
import { watermarkContent, generateSessionId, logWatermarkSession } from './watermark.js';
import { encryptPayload } from './encrypt.js';

/**
 * Watermarks the payload for traceability, logs the session,
 * formats the response, and conditionally encrypts the payload
 * if the client provided a session key.
 */
export async function sendSecureResponse(
  req: FastifyRequest,
  reply: FastifyReply,
  data: unknown,
  meta?: unknown,
) {
  const sessionId = generateSessionId(req);
  const watermarked = watermarkContent(data, sessionId);
  await logWatermarkSession(sessionId, req);

  const responseBody: Record<string, unknown> = { data: watermarked };
  if (meta) {
    responseBody.meta = meta;
  }

  const sessionKey = req.headers['x-session-key'] as string | undefined;
  if (sessionKey) {
    const encrypted = await encryptPayload(responseBody, sessionKey);
    return reply.code(200).send(encrypted);
  }

  return reply.code(200).send(responseBody);
}
