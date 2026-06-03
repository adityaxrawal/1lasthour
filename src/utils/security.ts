import crypto from 'crypto';
import { env } from '../config/env.js';
import { logger } from './logger.js';

/**
 * Hash an IP address with a salt for privacy-preserving logging.
 * IPs are PII in most jurisdictions — never log raw IPs.
 */
export function hashIp(ip: string): string {
  return crypto
    .createHash('sha256')
    .update(ip + env.IP_SALT)
    .digest('hex')
    .slice(0, 16);
}

/**
 * Log a security event without including any sensitive data.
 */
export function securityLog(event: string, meta: Record<string, unknown> = {}) {
  logger.warn({
    event,
    timestamp: new Date().toISOString(),
    ip: meta.ip ? hashIp(meta.ip as string) : undefined,
    fingerprint: meta.fingerprint,
    ...meta,
    rawIp: undefined, // Ensure raw IP is never logged
  });
}

/**
 * Strip sensitive fields before sending any user record to the client.
 */
export function sanitiseForClient<T extends Record<string, unknown>>(
  record: T,
): Omit<T, 'passwordHash' | 'tokenHash' | 'revokedAt'> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, tokenHash, revokedAt, ...safe } = record as any;
  return safe;
}
