import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

const PRIVATE_KEY = env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n');
const PUBLIC_KEY = env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n');

export interface AccessTokenPayload {
  sub: string;
  email: string;
  role: string;
  type: 'access';
  iat?: number;
  exp?: number;
}

export function signAccessToken(payload: Omit<AccessTokenPayload, 'type' | 'iat' | 'exp'>): string {
  return jwt.sign({ ...payload, type: 'access' }, PRIVATE_KEY, {
    algorithm: 'RS256',
    expiresIn: env.JWT_ACCESS_TOKEN_EXPIRY,
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  const decoded = jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] });
  if (typeof decoded === 'string' || decoded.type !== 'access') {
    throw new Error('Invalid token type');
  }
  return decoded as AccessTokenPayload;
}

export function signRefreshToken(): string {
  // Refresh tokens are random UUIDs stored as hashes in DB — not JWT
  return crypto.randomUUID();
}
