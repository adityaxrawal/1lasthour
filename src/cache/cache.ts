import { isRedisConnected, redis } from '../config/redis.js';
import { logger } from '../utils/logger.js';

// ── Process-level in-memory LRU cache ─────────────────────────────────────────
// Used as the primary cache in development (when Redis is unavailable) and as
// a fallback layer in production. Serves cached data in <1ms vs 700ms+ for a
// remote DB round-trip.

interface MemEntry<T> {
  value: T;
  expiresAt: number; // epoch ms
  insertedAt: number; // for LRU eviction ordering
}

const MAX_ENTRIES = 500;
const memCache = new Map<string, MemEntry<unknown>>();

function memGet<T>(key: string): T | null {
  const entry = memCache.get(key) as MemEntry<T> | undefined;
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    memCache.delete(key);
    return null;
  }
  return entry.value;
}

function memSet<T>(key: string, value: T, ttlSeconds: number): void {
  // LRU eviction: delete the oldest entry when full
  if (memCache.size >= MAX_ENTRIES) {
    let oldestKey: string | null = null;
    let oldestTime = Infinity;
    for (const [k, v] of memCache) {
      if (v.insertedAt < oldestTime) {
        oldestTime = v.insertedAt;
        oldestKey = k;
      }
    }
    if (oldestKey) memCache.delete(oldestKey);
  }
  memCache.set(key, {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000,
    insertedAt: Date.now(),
  });
}

// ── Cache API ─────────────────────────────────────────────────────────────────

export const cache = {
  async get<T>(key: string): Promise<T | null> {
    // 1. Check in-memory first (always fast)
    const inMem = memGet<T>(key);
    if (inMem !== null) return inMem;

    // 2. Fall back to Redis if connected
    if (!isRedisConnected) return null;
    try {
      const raw = await redis.get(key);
      if (raw) {
        const parsed = JSON.parse(raw) as T;
        // Populate memory cache for next request
        const ttl = await redis.ttl(key);
        if (ttl > 0) memSet(key, parsed, ttl);
        return parsed;
      }
      return null;
    } catch (err) {
      logger.warn({ err, key }, 'Cache get failed — bypassing cache');
      return null;
    }
  },

  async set(key: string, value: unknown, ttlSeconds: number): Promise<void> {
    // Always write to in-memory cache
    memSet(key, value, ttlSeconds);

    // Also write to Redis if connected
    if (!isRedisConnected) return;
    try {
      await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    } catch (err) {
      logger.warn({ err, key }, 'Cache set failed — continuing without Redis caching');
    }
  },

  async del(key: string): Promise<void> {
    memCache.delete(key);
    if (!isRedisConnected) return;
    try {
      await redis.del(key);
    } catch (err) {
      logger.warn({ err, key }, 'Cache del failed');
    }
  },

  /**
   * Cache-aside pattern: returns cached value if present, otherwise fetches,
   * caches, and returns the result.
   *
   * Both the in-memory and Redis layers are checked in order (mem → Redis → DB).
   * After the first DB fetch, subsequent calls for the same key return from
   * memory in <1ms even when Redis is unavailable.
   */
  async getOrSet<T>(key: string, fetcher: () => Promise<T>, ttlSeconds: number): Promise<T> {
    const cached = await cache.get<T>(key);
    if (cached !== null) return cached;

    // Acquire distributed lock only when Redis is available (prevents stampede)
    if (isRedisConnected) {
      const lockKey = `lock:${key}`;
      const acquired = await redis.set(lockKey, '1', 'EX', 5, 'NX').catch(() => null);
      if (!acquired) {
        // Another request is fetching — wait briefly then retry
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
    }

    // Redis unavailable — fetch and store in memory only
    const value = await fetcher();
    memSet(key, value, ttlSeconds);
    return value;
  },
};
