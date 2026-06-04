import type { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { modulesService } from '../services/modules.service.js';
import { ValidationError } from '../errors/errors.js';
import { watermarkContent, generateSessionId, logWatermarkSession } from '../lib/watermark.js';
import { encryptPayload } from '../lib/encrypt.js';

const paramsSchema = z.object({
  topicId: z.string().regex(/^[a-z0-9-]+$/, 'Invalid topic ID format'),
  moduleId: z.string().regex(/^[a-z0-9-]+$/, 'Invalid module ID format'),
});

const querySchema = z.object({
  level: z.coerce.number().int().min(1).max(3),
});

export const modulesController = {
  async getById(req: FastifyRequest, reply: FastifyReply) {
    const params = paramsSchema.safeParse(req.params);
    const query = querySchema.safeParse(req.query);

    if (!params.success) {
      throw new ValidationError(
        'Invalid path parameters',
        params.error.flatten().fieldErrors as Record<string, unknown>,
      );
    }
    if (!query.success) {
      throw new ValidationError("Query parameter 'level' is required and must be 1, 2, or 3");
    }

    const module = await modulesService.getById({
      topicId: params.data.topicId,
      moduleId: params.data.moduleId,
      level: query.data.level,
    });

    // Watermark content so each session's copy is uniquely traceable
    const sessionId = generateSessionId(req);
    const watermarked = watermarkContent(module, sessionId);
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
