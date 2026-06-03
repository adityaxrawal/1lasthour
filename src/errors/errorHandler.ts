import type { FastifyError, FastifyRequest, FastifyReply } from 'fastify';
import { AppError } from './errors.js';
import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';

interface PostgresError {
  code?: string;
}

export async function globalErrorHandler(
  error: FastifyError | AppError | Error,
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const requestId = req.id;
  const timestamp = new Date().toISOString();

  // ── Operational AppError (expected, user-facing) ───────────────────────────
  if (error instanceof AppError) {
    logger.warn({
      requestId,
      statusCode: error.statusCode,
      errorCode: error.errorCode,
      message: error.message,
    });
    return reply.code(error.statusCode).send({
      error: error.errorCode,
      message: error.message,
      requestId,
      timestamp,
      ...(error.fields ? { fields: error.fields } : {}),
    });
  }

  const pgError = error as PostgresError;

  // ── PostgreSQL unique violation → 409 ─────────────────────────────────────
  if (pgError.code === '23505') {
    return reply.code(409).send({
      error: 'CONFLICT',
      message: 'Resource already exists',
      requestId,
      timestamp,
    });
  }

  // ── PostgreSQL statement timeout → 503 ────────────────────────────────────
  if (pgError.code === '57014') {
    return reply.code(503).send({
      error: 'DATABASE_TIMEOUT',
      message: 'Query timed out — please try again',
      requestId,
      timestamp,
    });
  }

  // ── Fastify validation error → 400 ────────────────────────────────────────
  const fastifyError = error as FastifyError;
  if (fastifyError.statusCode === 400) {
    return reply.code(400).send({
      error: 'VALIDATION_ERROR',
      message: fastifyError.message,
      requestId,
      timestamp,
    });
  }

  // ── Unexpected / programming error → 500 ──────────────────────────────────
  logger.error({ requestId, err: error }, 'Unexpected server error');

  return reply.code(500).send({
    error: 'INTERNAL_ERROR',
    message: env.NODE_ENV === 'production' ? 'An unexpected error occurred' : error.message,
    requestId,
    timestamp,
  });
}
