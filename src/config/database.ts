import pg from 'pg';
import type { QueryConfig, QueryResult, QueryResultRow } from 'pg';

const { Pool } = pg;
import { env } from './env.js';
import { logger } from '../utils/logger.js';

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: env.DATABASE_POOL_MAX,
  connectionTimeoutMillis: env.DATABASE_TIMEOUT_MS,
  idleTimeoutMillis: 10_000,
  statement_timeout: env.DATABASE_TIMEOUT_MS,
});

pool.on('error', (err) => logger.error({ err }, 'PostgreSQL pool error'));

export async function query<T extends QueryResultRow = any>(
  queryTextOrConfig: string | QueryConfig<any[]>,
  values?: any[],
): Promise<QueryResult<T>> {
  return pool.query(queryTextOrConfig, values);
}
