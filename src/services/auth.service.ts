import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { pool, query } from '../config/database.js';
import { signAccessToken, signRefreshToken } from '../utils/jwt.js';
import { sanitiseForClient } from '../utils/security.js';
import { env } from '../config/env.js';
import { ConflictError, UnauthorizedError, NotFoundError } from '../errors/errors.js';
import { PoolClient } from 'pg';

const BCRYPT_ROUNDS = 12;

export const authService = {
  async register({
    email,
    password,
    displayName,
  }: {
    email: string;
    password: string;
    displayName?: string;
  }) {
    // Check for existing user
    const { rows: existing } = await query(`SELECT id FROM users WHERE email = $1 LIMIT 1`, [
      email.toLowerCase(),
    ]);

    if (existing.length > 0) {
      throw new ConflictError('Email address is already registered');
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const { rows: users } = await client.query(
        `
        INSERT INTO users (email, password_hash, display_name, role)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
        [email.toLowerCase(), passwordHash, displayName ?? null, 'student'],
      );

      const user = users[0];
      const { accessToken, refreshToken } = await authService._issueTokens(user, client);

      await client.query('COMMIT');
      return { user: sanitiseForClient(user), accessToken, refreshToken };
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  },

  async login({ email, password }: { email: string; password: string }) {
    const { rows: users } = await query(`SELECT * FROM users WHERE email = $1 LIMIT 1`, [
      email.toLowerCase(),
    ]);
    const user = users[0];

    if (!user || !user.password_hash) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const { accessToken, refreshToken } = await authService._issueTokens(user);
    return { user: sanitiseForClient(user), accessToken, refreshToken };
  },

  async refresh({ tokenValue }: { tokenValue: string }) {
    const tokenHash = crypto.createHash('sha256').update(tokenValue).digest('hex');

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const { rows: tokens } = await client.query(
        `
        SELECT * FROM refresh_tokens 
        WHERE token_hash = $1 AND expires_at > NOW()
        LIMIT 1
      `,
        [tokenHash],
      );

      const stored = tokens[0];

      if (!stored || stored.revoked_at) {
        throw new UnauthorizedError('Invalid or expired refresh token');
      }

      // Revoke the used token (rotation — single use)
      const { rows: updated } = await client.query(
        `
        UPDATE refresh_tokens SET revoked_at = NOW() 
        WHERE id = $1 AND revoked_at IS NULL
        RETURNING *
      `,
        [stored.id],
      );

      if (updated.length === 0) {
        throw new UnauthorizedError('Invalid or expired refresh token');
      }

      const { rows: users } = await client.query(`SELECT * FROM users WHERE id = $1 LIMIT 1`, [
        stored.user_id,
      ]);
      const user = users[0];

      if (!user) throw new NotFoundError('User not found');

      const { accessToken, refreshToken } = await authService._issueTokens(user, client);

      await client.query('COMMIT');
      return { accessToken, refreshToken };
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  },

  async logout({ tokenValue }: { tokenValue: string }) {
    const tokenHash = crypto.createHash('sha256').update(tokenValue).digest('hex');

    await query(
      `
      UPDATE refresh_tokens SET revoked_at = NOW() WHERE token_hash = $1
    `,
      [tokenHash],
    );
  },

  /** Internal helper: create access token + store refresh token in DB */
  async _issueTokens(
    user: any,
    client?: PoolClient,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = signAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = signRefreshToken();
    const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

    const expiresAt = new Date(Date.now() + env.JWT_REFRESH_TOKEN_EXPIRY * 1000);

    const queryObj = {
      text: `INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)`,
      values: [user.id, tokenHash, expiresAt],
    };

    if (client) {
      await client.query(queryObj);
    } else {
      await query(queryObj);
    }

    return { accessToken, refreshToken };
  },
};
