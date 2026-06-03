import Redis from 'ioredis';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

export const redis = new Redis(env.REDIS_URL, {
  lazyConnect: true,
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  retryStrategy: (times) => {
    if (times > 5) return null; // Stop retrying after 5 attempts
    return Math.min(times * 200, 2000); // Exponential backoff up to 2s
  },
});

export let isRedisConnected = false;

redis.on('error', (err) => {
  if (isRedisConnected) {
    logger.warn({ err }, 'Redis connection error');
  }
});
redis.on('connect', () => logger.info('Redis connected'));
redis.on('reconnecting', () => {
  if (isRedisConnected) {
    logger.warn('Redis reconnecting...');
  }
});

export async function connectRedis(): Promise<void> {
  try {
    await redis.connect();
    await redis.ping();
    isRedisConnected = true;
    logger.info('Redis connection verified');
  } catch {
    isRedisConnected = false;
    redis.disconnect();
    logger.warn('Redis unavailable — caching disabled, continuing');
  }
}

export async function disconnectRedis(): Promise<void> {
  await redis.quit();
}
