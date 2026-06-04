import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  HOST: z.string().default('0.0.0.0'),

  // Database
  DATABASE_URL: z.string().url(),
  DATABASE_POOL_MIN: z.coerce.number().int().min(1).default(2),
  DATABASE_POOL_MAX: z.coerce.number().int().min(1).max(100).default(20),
  DATABASE_TIMEOUT_MS: z.coerce.number().int().min(1000).default(5000),

  // Redis
  REDIS_URL: z.string(),
  REDIS_TTL_DEFAULT: z.coerce.number().int().min(1).default(86400),

  // CORS
  CORS_ORIGINS: z.string().transform((v) => v.split(',')),
  ALLOWED_ORIGIN: z.string().url(),

  // Rate limiting
  RATE_LIMIT_GLOBAL: z.coerce.number().int().min(1).default(100),
  RATE_LIMIT_SEARCH: z.coerce.number().int().min(1).default(30),

  // Logging
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),

  // Security
  SESSION_SECRET: z.string().min(32),
  IP_SALT: z.string().min(16),
  REQUEST_SECRET: z.string().min(32),
  SESSION_KEY_SALT: z.string().min(16),

  // Request token TTL
  TOKEN_TTL_MS: z.coerce.number().int().min(5000).default(30000),

  // CFA-specific rate limits (narrower than global)
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().min(1000).default(60000),
  RATE_LIMIT_MAX: z.coerce.number().int().min(1).default(15),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error(parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
export type Env = typeof env;
