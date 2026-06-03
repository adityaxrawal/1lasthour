import { topicsRepository } from '../repositories/topics.repository.js';
import { cache } from '../cache/cache.js';
import { cacheKeys } from '../cache/keys.js';
import { NotFoundError } from '../errors/errors.js';

const TTL = 86400; // 24h

export const topicsService = {
  async list({ level }: { level: number }) {
    return cache.getOrSet(
      cacheKeys.topicList(level),
      () => topicsRepository.findByLevel({ level, published: true }),
      TTL,
    );
  },

  async getById({ topicId, level }: { topicId: string; level: number }) {
    const topic = await cache.getOrSet(
      cacheKeys.topic(topicId, level),
      () => topicsRepository.findByIdWithModules({ topicId, level }),
      TTL,
    );

    if (!topic) {
      throw new NotFoundError(`Topic '${topicId}' not found for level ${level}`);
    }
    return topic;
  },
};
