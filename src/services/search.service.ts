import { searchRepository, type SearchType } from '../repositories/search.repository.js';
import { cache } from '../cache/cache.js';
import { cacheKeys } from '../cache/keys.js';

const TTL = 600; // 10 minutes for search results

export const searchService = {
  async search({
    q,
    level,
    type,
    limit,
    offset,
  }: {
    q: string;
    level: number;
    type: SearchType;
    limit: number;
    offset: number;
  }) {
    const key = cacheKeys.search(level, type, q, limit, offset);
    return cache.getOrSet(
      key,
      () => searchRepository.search({ q, level, type, limit, offset }),
      TTL,
    );
  },
};
