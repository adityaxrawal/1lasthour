import { isRedisConnected, redis } from '../config/redis.js';
import { logger } from '../utils/logger.js';

export const cache = {
  async get<T>(key: string): Promise<T | null> {
    if (!isRedisConnected) return null;
    try {
      const raw = await redis.get(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch (err) {
      logger.warn({ err, key }, 'Cache get failed — bypassing cache');
      return null;
    }
  },

  async set(key: string, value: unknown, ttlSeconds: number): Promise<void> {
    if (!isRedisConnected) return;
    try {
      await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    } catch (err) {
      logger.warn({ err, key }, 'Cache set failed — continuing without caching');
    }
  },

  async del(key: string): Promise<void> {
    if (!isRedisConnected) return;
    try {
      await redis.del(key);
    } catch (err) {
      logger.warn({ err, key }, 'Cache del failed');
    }
  },

  /**
   * Cache-aside with stampede prevention via Redis SETNX lock.
   * Only the first concurrent requester queries the DB; others wait briefly.
   */
  async getOrSet<T>(key: string, fetcher: () => Promise<T>, ttlSeconds: number): Promise<T> {
    if (!isRedisConnected) return fetcher();
    const cached = await cache.get<T>(key);
    if (cached !== null) return cached;

    // Acquire distributed lock to prevent cache stampede
    const lockKey = `lock:${key}`;
    const acquired = await redis.set(lockKey, '1', 'EX', 5, 'NX').catch(() => null);

    if (!acquired) {
      // Another request is fetching — wait briefly and try cache again
      await new Promise((r) => setTimeout(r, 200));
      const retried = await cache.get<T>(key);
      if (retried !== null) return retried;
    }

    try {
      const value = await fetcher();
      await cache.set(key, value, ttlSeconds);
      return value;
    } finally {
      await redis.del(lockKey).catch(() => null);
    }
  },
};
