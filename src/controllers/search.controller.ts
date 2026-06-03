import type { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { searchService } from '../services/search.service.js';
import { ValidationError } from '../errors/errors.js';

const searchSchema = z.object({
  q: z.string().min(1).max(200),
  level: z.coerce.number().int().min(1).max(3).default(1),
  type: z.enum(['concept', 'formula', 'all']).default('all'),
  limit: z.coerce.number().int().min(1).max(50).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

export const searchController = {
  async search(req: FastifyRequest, reply: FastifyReply) {
    const parsed = searchSchema.safeParse(req.query);

    if (!parsed.success) {
      throw new ValidationError(
        'Invalid search parameters',
        parsed.error.flatten().fieldErrors as Record<string, unknown>,
      );
    }

    const { q, level, type, limit, offset } = parsed.data;

    const results = await searchService.search({
      q,
      level,
      type,
      limit,
      offset,
    });

    return reply
      .code(200)
      .header('Cache-Control', 'public, max-age=600') // 10 mins cache for search
      .send({
        data: results,
        meta: { total: results.length, limit, offset, query: q },
      });
  },
};
