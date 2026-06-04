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
import { rateLimitErrorBuilder } from './utils/rateLimit.js';
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
        defaultSrc: ["'none'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
      },
    },
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    frameguard: { action: 'deny' },
    referrerPolicy: { policy: 'no-referrer' },
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    noSniff: true,
    xssFilter: true,
  });

  // Block archiving / caching on every response
  app.addHook('onSend', async (_req, reply) => {
    reply.header('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
    reply.header('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    reply.header('Pragma', 'no-cache');
  });

  // CORS — strict origin whitelist
  await app.register(fastifyCors, {
    origin: (origin, cb) => {
      // In development or if origin is explicitly allowed
      if (!origin || env.CORS_ORIGINS.includes(origin)) {
        cb(null, true);
      } else {
        const err: any = new Error('Not allowed by CORS');
        err.statusCode = 403;
        cb(err, false);
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'X-Session-Id',
      'X-Nonce',
      'X-Timestamp',
      'X-Request-Signature',
      'X-Session-Key',
      'X-Requested-With',
    ],
    credentials: true,
    maxAge: 86400,
  });

  // Rate limiting
  await app.register(fastifyRateLimit, {
    max: env.RATE_LIMIT_GLOBAL,
    timeWindow: '1 minute',
    redis: env.NODE_ENV === 'test' || !isRedisConnected ? undefined : redis,
    keyGenerator: (req) => req.ip,
    allowList: (req) => req.method === 'OPTIONS',
    errorResponseBuilder: rateLimitErrorBuilder,
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
