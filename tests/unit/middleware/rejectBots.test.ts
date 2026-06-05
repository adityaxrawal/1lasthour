import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { rejectBots } from "../../../src/middleware/rejectBots.js";
import { FastifyRequest, FastifyReply } from "fastify";

describe("rejectBots", () => {
  let req: Partial<FastifyRequest>;
  let reply: Partial<FastifyReply>;
  let originalNodeEnv: string | undefined;

  beforeEach(() => {
    originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development"; // So it doesn't short-circuit

    req = {
      headers: {
        "user-agent": "Mozilla/5.0",
        "accept": "text/html",
        "accept-language": "en-US",
        "accept-encoding": "gzip",
      },
      ip: "127.0.0.1",
      log: {
        warn: vi.fn(),
      } as any,
    };

    reply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
    vi.restoreAllMocks();
  });

  it("short-circuits if NODE_ENV is test", async () => {
    process.env.NODE_ENV = "test";
    await rejectBots(req as FastifyRequest, reply as FastifyReply);
    expect(reply.code).not.toHaveBeenCalled();
  });

  it("allows valid browser requests", async () => {
    await rejectBots(req as FastifyRequest, reply as FastifyReply);
    expect(reply.code).not.toHaveBeenCalled();
    expect(req.log?.warn).not.toHaveBeenCalled();
  });

  it("rejects suspicious User-Agents (e.g. postman)", async () => {
    req.headers!["user-agent"] = "PostmanRuntime/7.28.4";
    await rejectBots(req as FastifyRequest, reply as FastifyReply);
    expect(req.log?.warn).toHaveBeenCalledWith(
      expect.objectContaining({ event: "BOT_REJECTED" }),
      "Suspicious UA blocked"
    );
    expect(reply.code).toHaveBeenCalledWith(403);
    expect(reply.send).toHaveBeenCalledWith({ error: "Forbidden" });
  });

  it("rejects empty User-Agents", async () => {
    req.headers!["user-agent"] = "";
    await rejectBots(req as FastifyRequest, reply as FastifyReply);
    expect(req.log?.warn).toHaveBeenCalledWith(
      expect.objectContaining({ event: "BOT_REJECTED" }),
      "Suspicious UA blocked"
    );
    expect(reply.code).toHaveBeenCalledWith(403);
  });

  it("rejects requests missing accept header", async () => {
    delete req.headers!["accept"];
    await rejectBots(req as FastifyRequest, reply as FastifyReply);
    expect(req.log?.warn).toHaveBeenCalledWith(
      expect.objectContaining({ event: "BOT_FINGERPRINT_REJECTED" }),
      "Missing browser headers"
    );
    expect(reply.code).toHaveBeenCalledWith(403);
  });

  it("rejects requests missing accept-language header", async () => {
    delete req.headers!["accept-language"];
    await rejectBots(req as FastifyRequest, reply as FastifyReply);
    expect(reply.code).toHaveBeenCalledWith(403);
  });

  it("rejects requests missing accept-encoding header", async () => {
    delete req.headers!["accept-encoding"];
    await rejectBots(req as FastifyRequest, reply as FastifyReply);
    expect(reply.code).toHaveBeenCalledWith(403);
  });
});
