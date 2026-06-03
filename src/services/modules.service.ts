import { modulesRepository } from '../repositories/modules.repository.js';
import { cache } from '../cache/cache.js';
import { cacheKeys } from '../cache/keys.js';
import { NotFoundError } from '../errors/errors.js';

const TTL = 86400; // 24h

export const modulesService = {
  async getById({
    topicId,
    moduleId,
    level,
  }: {
    topicId: string;
    moduleId: string;
    level: number;
  }) {
    const module = await cache.getOrSet(
      cacheKeys.module(topicId, moduleId, level),
      () => modulesRepository.findByIdWithContent({ topicId, moduleId }),
      TTL,
    );

    if (!module) {
      throw new NotFoundError(`Module '${moduleId}' not found in topic '${topicId}'`);
    }
    return module;
  },
};
