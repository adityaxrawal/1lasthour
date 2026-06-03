import type { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { authService } from '../services/auth.service.js';
import { ValidationError, UnauthorizedError } from '../errors/errors.js';
import { env } from '../config/env.js';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  displayName: z.string().min(2).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function setRefreshCookie(reply: FastifyReply, token: string) {
  reply.setCookie('refreshToken', token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: env.JWT_REFRESH_TOKEN_EXPIRY,
    path: '/api/v1/auth',
  });
}

export const authController = {
  async register(req: FastifyRequest, reply: FastifyReply) {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ValidationError(
        'Invalid registration details',
        parsed.error.flatten().fieldErrors as Record<string, unknown>,
      );
    }

    const result = await authService.register({
      email: parsed.data.email,
      password: parsed.data.password,
      ...(parsed.data.displayName && { displayName: parsed.data.displayName }),
    });
    setRefreshCookie(reply, result.refreshToken);

    return reply.code(201).send({
      data: { user: result.user, accessToken: result.accessToken },
    });
  },

  async login(req: FastifyRequest, reply: FastifyReply) {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ValidationError(
        'Invalid login details',
        parsed.error.flatten().fieldErrors as Record<string, unknown>,
      );
    }

    const result = await authService.login(parsed.data);
    setRefreshCookie(reply, result.refreshToken);

    return reply.code(200).send({
      data: { user: result.user, accessToken: result.accessToken },
    });
  },

  async refresh(req: FastifyRequest, reply: FastifyReply) {
    const tokenValue = req.cookies.refreshToken;
    if (!tokenValue) {
      throw new UnauthorizedError('No refresh token provided');
    }

    const result = await authService.refresh({ tokenValue });
    setRefreshCookie(reply, result.refreshToken);

    return reply.code(200).send({
      data: { accessToken: result.accessToken },
    });
  },

  async logout(req: FastifyRequest, reply: FastifyReply) {
    const tokenValue = req.cookies.refreshToken;
    if (tokenValue) {
      await authService.logout({ tokenValue });
    }

    reply.clearCookie('refreshToken', { path: '/api/v1/auth' });
    return reply.code(204).send();
  },
};
