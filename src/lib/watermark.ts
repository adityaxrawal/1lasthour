import { createHash } from 'crypto';
import { FastifyRequest } from 'fastify';

const ZERO_WIDTH_CHARS = [
  '\u200B', // Zero Width Space
  '\u200C', // Zero Width Non-Joiner
  '\u200D', // Zero Width Joiner
  '\uFEFF', // Zero Width No-Break Space
];

const bitCache = new Map<string, number[]>();

function sessionIdToBits(sessionId: string): number[] {
  const key = sessionId.slice(0, 8);
  let bits = bitCache.get(key);
  if (!bits) {
    bits = Array.from(key).flatMap((c) =>
      c.charCodeAt(0).toString(2).padStart(8, '0').split('').map(Number),
    );
    if (bitCache.size > 1000) bitCache.clear(); // simple eviction
    bitCache.set(key, bits);
  }
  return bits;
}

/**
 * Inserts invisible zero-width Unicode characters between words.
 * Each copy of the text is uniquely tagged — survives copy-paste
 * and allows forensic attribution if content is leaked.
 */
export function watermarkText(text: string, sessionId: string): string {
  const bits = sessionIdToBits(sessionId.slice(0, 8));
  const words = text.split(' ');

  return words
    .map((word, i) => {
      if (i >= bits.length) return word;
      return word + ZERO_WIDTH_CHARS[bits[i] % 2];
    })
    .join(' ');
}

/**
 * Keys whose values must NOT be watermarked.
 * ID fields are used as URL path segments — watermarking them with invisible
 * Unicode chars corrupts routing and breaks Zod regex validation.
 */
const SKIP_WATERMARK_KEYS = new Set([
  'id',
  'topicId',
  'moduleId',
  'slug',
  'level',
  'sortOrder',
  'studyHours',
  'weight',
]);

/**
 * Recursively watermarks all string values in a content object.
 * Safe to call on deeply-nested JSON (topics, modules, notes).
 * ID / routing keys are skipped to preserve URL-safe values.
 */
export function watermarkContent<T>(content: T, sessionId: string, _parentKey?: string): T {
  if (typeof content === 'string') {
    return watermarkText(content, sessionId) as unknown as T;
  }
  if (Array.isArray(content)) {
    return content.map((item) => watermarkContent(item, sessionId)) as unknown as T;
  }
  if (content && typeof content === 'object') {
    return Object.fromEntries(
      Object.entries(content as Record<string, unknown>).map(([k, v]) => [
        k,
        // Skip watermarking identity/routing fields
        SKIP_WATERMARK_KEYS.has(k) ? v : watermarkContent(v, sessionId, k),
      ]),
    ) as unknown as T;
  }
  return content;
}

/**
 * Derives a stable session ID for this request from IP + UA + timestamp.
 * The hash is used as the watermark seed so each session produces unique text.
 */
export function generateSessionId(req: FastifyRequest): string {
  const ip = req.headers['x-forwarded-for']?.toString() ?? req.socket.remoteAddress ?? '';
  const ua = req.headers['user-agent'] ?? '';
  const timestamp = Date.now().toString();
  return createHash('sha256').update(`${ip}:${ua}:${timestamp}`).digest('hex').slice(0, 16);
}

/**
 * Structured log entry for every watermarked response.
 * In production, persist to a database (Postgres/Redis) for forensic lookup.
 */
export async function logWatermarkSession(sessionId: string, req: FastifyRequest): Promise<void> {
  req.log.info({
    event: 'WATERMARK_SESSION',
    sessionId,
    ip: req.headers['x-forwarded-for'] ?? req.socket.remoteAddress,
    userAgent: req.headers['user-agent'],
    path: req.url,
    timestamp: new Date().toISOString(),
  });
}
