import type { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { topicsService } from '../services/topics.service.js';
import { ValidationError } from '../errors/errors.js';
import { watermarkContent, generateSessionId, logWatermarkSession } from '../lib/watermark.js';
import { encryptPayload } from '../lib/encrypt.js';

const levelSchema = z.object({
  level: z.coerce.number().int().min(1).max(3),
});

const topicIdSchema = z.object({
  topicId: z.string().regex(/^[a-z0-9-]+$/, 'Invalid topic ID format'),
});

export const topicsController = {
  async list(req: FastifyRequest, reply: FastifyReply) {
    const parsed = levelSchema.safeParse(req.query);
    if (!parsed.success) {
      throw new ValidationError(
        "Query parameter 'level' is required and must be 1, 2, or 3",
        parsed.error.flatten().fieldErrors as Record<string, unknown>,
      );
    }

    const topics = await topicsService.list(parsed.data);

    // Watermark content so each session's copy is uniquely traceable
    const sessionId = generateSessionId(req);
    const watermarked = watermarkContent(topics, sessionId);
    await logWatermarkSession(sessionId, req);

    const responseBody = {
      data: watermarked,
      meta: { total: topics.length, level: parsed.data.level },
    };

    // Encrypt if session key header is present
    const sessionKey = req.headers['x-session-key'] as string | undefined;
    if (sessionKey) {
      const encrypted = await encryptPayload(responseBody, sessionKey);
      return reply.code(200).send(encrypted);
    }

    return reply.code(200).send(responseBody);
  },

  async getById(req: FastifyRequest, reply: FastifyReply) {
    const params = topicIdSchema.safeParse(req.params);
    const query = levelSchema.safeParse(req.query);

    if (!params.success) {
      throw new ValidationError('Invalid topic ID in path');
    }
    if (!query.success) {
      throw new ValidationError("Query parameter 'level' is required and must be 1, 2, or 3");
    }

    const topic = await topicsService.getById({
      topicId: params.data.topicId,
      level: query.data.level,
    });

    // Watermark content so each session's copy is uniquely traceable
    const sessionId = generateSessionId(req);
    const watermarked = watermarkContent(topic, sessionId);
    await logWatermarkSession(sessionId, req);

    const responseBody = { data: watermarked };

    // Encrypt if session key header is present
    const sessionKey = req.headers['x-session-key'] as string | undefined;
    if (sessionKey) {
      const encrypted = await encryptPayload(responseBody, sessionKey);
      return reply.code(200).send(encrypted);
    }

    return reply.code(200).send(responseBody);
  },
};
