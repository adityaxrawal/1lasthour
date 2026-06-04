export const rateLimitErrorBuilder = () => ({
  statusCode: 429,
  error: 'RATE_LIMIT_EXCEEDED',
  message: 'Too many requests. Please slow down.',
  timestamp: new Date().toISOString(),
});
