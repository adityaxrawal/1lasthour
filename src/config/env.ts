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

  // JWT
  JWT_PRIVATE_KEY: z.string().min(1),
  JWT_PUBLIC_KEY: z.string().min(1),
  JWT_ACCESS_TOKEN_EXPIRY: z.coerce.number().int().min(60).default(900),
  JWT_REFRESH_TOKEN_EXPIRY: z.coerce.number().int().min(3600).default(604800),

  // CORS
  CORS_ORIGINS: z.string().transform((v) => v.split(',')),
  ALLOWED_ORIGIN: z.string().url(),

  // Rate limiting
  RATE_LIMIT_GLOBAL: z.coerce.number().int().min(1).default(100),
  RATE_LIMIT_SEARCH: z.coerce.number().int().min(1).default(30),
  RATE_LIMIT_AUTH: z.coerce.number().int().min(1).default(10),

  // Logging
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),

  // Security
  SESSION_SECRET: z.string().min(32),
  IP_SALT: z.string().min(16),
  REQUEST_SECRET: z.string().min(32),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error(parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
export type Env = typeof env;
