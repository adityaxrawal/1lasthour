// ─── Base error class ─────────────────────────────────────────────────────────
export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly errorCode: string,
    public readonly isOperational = true,
    public readonly fields?: Record<string, unknown>,
  ) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// ─── HTTP 400 ─────────────────────────────────────────────────────────────────
export class ValidationError extends AppError {
  constructor(msg: string, fields?: Record<string, unknown>) {
    super(msg, 400, 'VALIDATION_ERROR', true, fields);
  }
}

// ─── HTTP 401 ─────────────────────────────────────────────────────────────────
export class UnauthorizedError extends AppError {
  constructor(msg: string) {
    super(msg, 401, 'UNAUTHORIZED');
  }
}

// ─── HTTP 403 ─────────────────────────────────────────────────────────────────
export class ForbiddenError extends AppError {
  constructor(msg: string) {
    super(msg, 403, 'FORBIDDEN');
  }
}

// ─── HTTP 404 ─────────────────────────────────────────────────────────────────
export class NotFoundError extends AppError {
  constructor(msg: string) {
    super(msg, 404, 'NOT_FOUND');
  }
}

// ─── HTTP 409 ─────────────────────────────────────────────────────────────────
export class ConflictError extends AppError {
  constructor(msg: string) {
    super(msg, 409, 'CONFLICT');
  }
}

// ─── HTTP 503 ─────────────────────────────────────────────────────────────────
export class ServiceUnavailableError extends AppError {
  constructor(msg: string) {
    super(msg, 503, 'SERVICE_UNAVAILABLE');
  }
}
