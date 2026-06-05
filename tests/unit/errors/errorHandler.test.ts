import { describe, it, expect, vi } from "vitest";
import { globalErrorHandler } from "../../../src/errors/errorHandler.js";
import { AppError } from "../../../src/errors/errors.js";
import type { FastifyRequest, FastifyReply } from "fastify";

describe("globalErrorHandler", () => {
  const req = { id: "req-123" } as FastifyRequest;
  
  const reply = {
    code: vi.fn().mockReturnThis(),
    send: vi.fn(),
  } as unknown as FastifyReply;

  it("handles AppError correctly", async () => {
    const error = new AppError("Invalid input", 400, "VALIDATION_ERROR");
    await globalErrorHandler(error, req, reply);

    expect(reply.code).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "VALIDATION_ERROR",
        message: "Invalid input",
        requestId: "req-123",
      })
    );
  });

  it("handles PostgreSQL unique violation", async () => {
    const error = Object.assign(new Error(), { code: "23505" });
    await globalErrorHandler(error, req, reply);

    expect(reply.code).toHaveBeenCalledWith(409);
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "CONFLICT",
        message: "Resource already exists",
      })
    );
  });

  it("handles PostgreSQL statement timeout", async () => {
    const error = Object.assign(new Error(), { code: "57014" });
    await globalErrorHandler(error, req, reply);

    expect(reply.code).toHaveBeenCalledWith(503);
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "DATABASE_TIMEOUT",
        message: "Query timed out — please try again",
      })
    );
  });

  it("handles Fastify validation error (400)", async () => {
    const error = Object.assign(new Error("Missing field"), { statusCode: 400 });
    await globalErrorHandler(error, req, reply);

    expect(reply.code).toHaveBeenCalledWith(400);
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "VALIDATION_ERROR",
        message: "Missing field",
      })
    );
  });

  it("handles unknown Error as 500", async () => {
    const error = new Error("Something exploded");
    await globalErrorHandler(error, req, reply);

    expect(reply.code).toHaveBeenCalledWith(500);
    expect(reply.send).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "INTERNAL_ERROR",
        message: expect.any(String),
      })
    );
  });
});
