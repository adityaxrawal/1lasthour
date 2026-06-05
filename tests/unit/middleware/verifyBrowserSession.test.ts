import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { verifyBrowserSession } from "../../../src/middleware/verifyBrowserSession.js";
import { FastifyRequest, FastifyReply } from "fastify";
import { env } from "../../../src/config/env.js";
import { sessionMemoryStore, generateFingerprintHash } from "../../../src/routes/session.js";
import { createHmac } from "crypto";

vi.mock("../../../src/config/env.js", () => ({
  env: {
    ALLOWED_ORIGIN: "http://localhost:1223",
    SESSION_SECRET: "test-secret",
  },
}));

vi.mock("../../../src/config/redis.js", () => ({
  isRedisConnected: false,
  redis: null,
}));

vi.mock("../../../src/routes/session.js", () => {
  const store = new Map();
  return {
    sessionMemoryStore: store,
    generateFingerprintHash: vi.fn(),
  };
});

describe("verifyBrowserSession", () => {
  let req: Partial<FastifyRequest>;
  let reply: Partial<FastifyReply>;
  let originalNodeEnv: string | undefined;

  beforeEach(() => {
    originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production"; // Do not short-circuit

    req = {
      headers: {
        "x-requested-with": "XMLHttpRequest",
        "x-session-id": "test-session-id",
        "x-nonce": "12345",
        "x-timestamp": Date.now().toString(),
      },
      url: "/api/test",
      ip: "127.0.0.1",
    };

    reply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };

    sessionMemoryStore.clear();
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
    vi.restoreAllMocks();
  });

  it("short-circuits in test environment", async () => {
    process.env.NODE_ENV = "test";
    await verifyBrowserSession(req as FastifyRequest, reply as FastifyReply);
    expect(reply.code).not.toHaveBeenCalled();
  });

  it("bypasses if dev-bypass signature is present in development", async () => {
    process.env.NODE_ENV = "development";
    req.headers!["x-request-signature"] = "dev-bypass";
    await verifyBrowserSession(req as FastifyRequest, reply as FastifyReply);
    expect(reply.code).not.toHaveBeenCalled();
  });

  it("rejects invalid origin", async () => {
    req.headers!.origin = "http://evil.com";
    await verifyBrowserSession(req as FastifyRequest, reply as FastifyReply);
    expect(reply.code).toHaveBeenCalledWith(403);
  });

  it("rejects invalid referer", async () => {
    req.headers!.referer = "http://evil.com";
    await verifyBrowserSession(req as FastifyRequest, reply as FastifyReply);
    expect(reply.code).toHaveBeenCalledWith(403);
  });

  it("rejects missing x-requested-with header", async () => {
    delete req.headers!["x-requested-with"];
    await verifyBrowserSession(req as FastifyRequest, reply as FastifyReply);
    expect(reply.code).toHaveBeenCalledWith(401);
  });

  it("rejects missing session headers", async () => {
    delete req.headers!["x-session-id"];
    await verifyBrowserSession(req as FastifyRequest, reply as FastifyReply);
    expect(reply.code).toHaveBeenCalledWith(401);
  });

  it("rejects invalid timestamp", async () => {
    req.headers!["x-timestamp"] = "invalid";
    req.headers!["x-request-signature"] = "dummy";
    await verifyBrowserSession(req as FastifyRequest, reply as FastifyReply);
    expect(reply.code).toHaveBeenCalledWith(401);
  });

  it("rejects expired requests (>30s)", async () => {
    req.headers!["x-timestamp"] = (Date.now() - 40000).toString();
    req.headers!["x-request-signature"] = "dummy";
    await verifyBrowserSession(req as FastifyRequest, reply as FastifyReply);
    expect(reply.code).toHaveBeenCalledWith(401);
  });

  it("rejects unknown session id", async () => {
    req.headers!["x-request-signature"] = "dummy";
    await verifyBrowserSession(req as FastifyRequest, reply as FastifyReply);
    expect(reply.code).toHaveBeenCalledWith(401);
    expect(reply.send).toHaveBeenCalledWith({ error: "Unauthorized: Session not found" });
  });

  it("rejects expired session", async () => {
    req.headers!["x-request-signature"] = "dummy";
    sessionMemoryStore.set("test-session-id", {
      expiresAt: Date.now() - 10000,
      fingerprintHash: "hash123",
    });
    await verifyBrowserSession(req as FastifyRequest, reply as FastifyReply);
    expect(reply.code).toHaveBeenCalledWith(401);
    expect(reply.send).toHaveBeenCalledWith({ error: "Unauthorized: Session expired" });
  });

  it("rejects mismatched fingerprint", async () => {
    req.headers!["x-request-signature"] = "dummy";
    sessionMemoryStore.set("test-session-id", {
      expiresAt: Date.now() + 10000,
      fingerprintHash: "expected-hash",
    });
    vi.mocked(generateFingerprintHash).mockReturnValue("different-hash");
    
    await verifyBrowserSession(req as FastifyRequest, reply as FastifyReply);
    expect(reply.code).toHaveBeenCalledWith(401);
    expect(reply.send).toHaveBeenCalledWith({ error: "Unauthorized: Fingerprint mismatch" });
  });

  it("rejects invalid signature", async () => {
    req.headers!["x-request-signature"] = "invalid-sig";
    sessionMemoryStore.set("test-session-id", {
      expiresAt: Date.now() + 10000,
      fingerprintHash: "expected-hash",
    });
    vi.mocked(generateFingerprintHash).mockReturnValue("expected-hash");

    await verifyBrowserSession(req as FastifyRequest, reply as FastifyReply);
    expect(reply.code).toHaveBeenCalledWith(401);
    expect(reply.send).toHaveBeenCalledWith({ error: "Unauthorized: Invalid signature" });
  });

  it("accepts valid session and signature", async () => {
    const sessionId = "test-session-id";
    const nonce = "12345";
    const timestamp = Date.now().toString();
    const url = "/api/test";

    sessionMemoryStore.set(sessionId, {
      expiresAt: Date.now() + 10000,
      fingerprintHash: "expected-hash",
    });
    vi.mocked(generateFingerprintHash).mockReturnValue("expected-hash");

    const sessionSecret = createHmac("sha256", env.SESSION_SECRET).update(sessionId).digest("hex");
    const message = `${sessionId}${nonce}${timestamp}${url}`;
    const signature = createHmac("sha256", sessionSecret).update(message).digest("hex");

    req.headers!["x-timestamp"] = timestamp;
    req.headers!["x-request-signature"] = signature;

    await verifyBrowserSession(req as FastifyRequest, reply as FastifyReply);
    expect(reply.code).not.toHaveBeenCalled();
  });

  it("rejects replayed requests", async () => {
    const sessionId = "replay-test-session";
    const nonce = "replay-nonce";
    const timestamp = (Date.now() + 5000).toString();
    const url = "/api/test";

    sessionMemoryStore.set(sessionId, {
      expiresAt: Date.now() + 10000,
      fingerprintHash: "expected-hash",
    });
    vi.mocked(generateFingerprintHash).mockReturnValue("expected-hash");

    const sessionSecret = createHmac("sha256", env.SESSION_SECRET).update(sessionId).digest("hex");
    const message = `${sessionId}${nonce}${timestamp}${url}`;
    const signature = createHmac("sha256", sessionSecret).update(message).digest("hex");

    req.headers!["x-session-id"] = sessionId;
    req.headers!["x-nonce"] = nonce;
    req.headers!["x-timestamp"] = timestamp;
    req.headers!["x-request-signature"] = signature;

    // First request should pass
    await verifyBrowserSession(req as FastifyRequest, reply as FastifyReply);
    expect(reply.code).not.toHaveBeenCalled();

    // Replay should fail
    await verifyBrowserSession(req as FastifyRequest, reply as FastifyReply);
    expect(reply.code).toHaveBeenCalledWith(409);
    expect(reply.send).toHaveBeenCalledWith({ error: "Replay Detected" });
  });
});
