import { FastifyRequest, FastifyReply } from 'fastify';

const SUSPICIOUS_UA_PATTERNS = [
  /postman/i,
  /curl/i,
  /wget/i,
  /python-requests/i,
  /axios/i,
  /headlesschrome/i,
  /phantomjs/i,
  /selenium/i,
  /playwright/i,
  /scrapy/i,
  /mechanize/i,
  /go-http-client/i,
  /^$/, // empty UA
];

/**
 * Middleware: Reject known bot / automation tool User-Agents.
 *
 * Also enforces presence of browser-like headers that automated
 * tools typically omit (Accept, Accept-Language, Accept-Encoding).
 */
export async function rejectBots(req: FastifyRequest, reply: FastifyReply): Promise<void> {
  if (process.env.NODE_ENV === 'test') return;

  const ua = req.headers['user-agent'] ?? '';

  if (SUSPICIOUS_UA_PATTERNS.some((p) => p.test(ua))) {
    req.log.warn({ ua, ip: req.ip, event: 'BOT_REJECTED' }, 'Suspicious UA blocked');
    reply.code(403).send({ error: 'Forbidden' });
    return;
  }

  // Require browser-like headers that automated tools omit
  const hasAccept = !!req.headers['accept'];
  const hasAcceptLanguage = !!req.headers['accept-language'];
  const hasAcceptEncoding = !!req.headers['accept-encoding'];

  if (!hasAccept || !hasAcceptLanguage || !hasAcceptEncoding) {
    req.log.warn({ ua, ip: req.ip, event: 'BOT_FINGERPRINT_REJECTED' }, 'Missing browser headers');
    reply.code(403).send({ error: 'Forbidden' });
    return;
  }
}
