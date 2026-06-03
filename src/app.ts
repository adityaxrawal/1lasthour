import Fastify, { type FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyRateLimit from '@fastify/rate-limit';
import fastifyCookie from '@fastify/cookie';
import fastifyCompress from '@fastify/compress';
import { env } from './config/env.js';
import { logger as pinoLogger } from './utils/logger.js';
import { isRedisConnected, redis } from './config/redis.js';
import { registerRoutes } from './routes/index.js';
import { globalErrorHandler } from './errors/errorHandler.js';
import crypto from 'crypto';

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    loggerInstance: pinoLogger,
    requestIdHeader: 'x-request-id',
    genReqId: () => crypto.randomUUID(),
    trustProxy: env.NODE_ENV === 'production',
  }) as unknown as FastifyInstance;

  // Security headers via Helmet
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
      },
    },
    frameguard: { action: 'deny' },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    noSniff: true,
    xssFilter: true,
  });

  // CORS — strict origin whitelist
  await app.register(fastifyCors, {
    origin: (origin, cb) => {
      // In development or if origin is explicitly allowed
      if (!origin || env.CORS_ORIGINS.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error('Not allowed by CORS'), false);
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID', 'X-Request-Token'],
    credentials: true,
    maxAge: 86400,
  });

  // Rate limiting
  await app.register(fastifyRateLimit, {
    max: env.RATE_LIMIT_GLOBAL,
    timeWindow: '1 minute',
    redis: env.NODE_ENV === 'test' || !isRedisConnected ? undefined : redis,
    keyGenerator: (req) => req.ip,
    errorResponseBuilder: () => ({
      statusCode: 429,
      error: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests. Please slow down.',
      timestamp: new Date().toISOString(),
    }),
  });

  // Cookies
  await app.register(fastifyCookie);

  // Response compression
  await app.register(fastifyCompress, { global: true });

  // Body parser limit (100KB)
  app.addContentTypeParser(
    'application/json',
    { parseAs: 'string', bodyLimit: 100 * 1024 },
    app.getDefaultJsonParser('ignore', 'ignore'),
  );

  // Register all routes
  await registerRoutes(app);

  // Global error handler
  app.setErrorHandler(globalErrorHandler);

  return app;
}
