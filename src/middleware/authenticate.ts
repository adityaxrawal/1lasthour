import type { FastifyRequest, FastifyReply } from 'fastify';
import { verifyAccessToken, type AccessTokenPayload } from '../utils/jwt.js';
import { UnauthorizedError, ForbiddenError } from '../errors/errors.js';

// Extend FastifyRequest to carry the decoded JWT payload
declare module 'fastify' {
  interface FastifyRequest {
    user?: AccessTokenPayload;
  }
}

/**
 * Middleware: extract and verify JWT Bearer token from Authorization header.
 * Attaches decoded payload to `req.user`.
 */
export async function authenticate(req: FastifyRequest, _reply: FastifyReply): Promise<void> {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    throw new UnauthorizedError('Missing or malformed Authorization header');
  }
  try {
    req.user = verifyAccessToken(auth.slice(7));
  } catch {
    throw new UnauthorizedError('Invalid or expired access token');
  }
}

/**
 * Middleware factory: require one of the specified roles.
 * Must be used after `authenticate`.
 */
export function requireRole(...roles: string[]) {
  return async (req: FastifyRequest, _reply: FastifyReply): Promise<void> => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new ForbiddenError('Insufficient permissions');
    }
  };
}
