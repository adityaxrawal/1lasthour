import { describe, it, expect } from "vitest";
import {
  AppError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  ServiceUnavailableError,
} from "../../../src/errors/errors.js";

describe("errors", () => {
  it("AppError constructor works", () => {
    const err = new AppError("Test message", 500, "TEST_CODE", true, { foo: "bar" });
    expect(err.message).toBe("Test message");
    expect(err.statusCode).toBe(500);
    expect(err.errorCode).toBe("TEST_CODE");
    expect(err.isOperational).toBe(true);
    expect(err.fields).toEqual({ foo: "bar" });
  });

  it("ValidationError sets properties", () => {
    const err = new ValidationError("Invalid", { field: "name" });
    expect(err.statusCode).toBe(400);
    expect(err.errorCode).toBe("VALIDATION_ERROR");
    expect(err.fields).toEqual({ field: "name" });
  });

  it("UnauthorizedError sets properties", () => {
    const err = new UnauthorizedError("Unauthorized");
    expect(err.statusCode).toBe(401);
    expect(err.errorCode).toBe("UNAUTHORIZED");
  });

  it("ForbiddenError sets properties", () => {
    const err = new ForbiddenError("Forbidden");
    expect(err.statusCode).toBe(403);
    expect(err.errorCode).toBe("FORBIDDEN");
  });

  it("NotFoundError sets properties", () => {
    const err = new NotFoundError("Not Found");
    expect(err.statusCode).toBe(404);
    expect(err.errorCode).toBe("NOT_FOUND");
  });

  it("ConflictError sets properties", () => {
    const err = new ConflictError("Conflict");
    expect(err.statusCode).toBe(409);
    expect(err.errorCode).toBe("CONFLICT");
  });

  it("ServiceUnavailableError sets properties", () => {
    const err = new ServiceUnavailableError("Service Unavailable");
    expect(err.statusCode).toBe(503);
    expect(err.errorCode).toBe("SERVICE_UNAVAILABLE");
  });
});
