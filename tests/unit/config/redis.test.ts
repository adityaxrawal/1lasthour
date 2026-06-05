import { describe, it, expect, vi, beforeEach } from "vitest";
import { redis, connectRedis, disconnectRedis, isRedisConnected } from "../../../src/config/redis.js";
import { logger } from "../../../src/utils/logger.js";

vi.mock("../../../src/utils/logger.js", () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

// We need to manipulate isRedisConnected inside the module for coverage.
// But it is exported. We can trigger events to cover the branch logic.

describe("redis config", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("handles connect event", () => {
    redis.emit("connect");
    expect(logger.info).toHaveBeenCalledWith("Redis connected");
  });

  it("handles error event", () => {
    // Should warn if connected (we mock connected state temporarily if we could, 
    // but default is false so it might not log unless we connect first)
    // To cover both branches:
    redis.emit("error", new Error("Test err"));
  });

  it("handles reconnecting event", () => {
    redis.emit("reconnecting");
  });

  describe("retryStrategy", () => {
    it("returns null after 5 attempts", () => {
      // The strategy is passed in the constructor. We can access it via redis.options
      const strategy = (redis as any).options.retryStrategy;
      expect(strategy(6)).toBeNull();
    });

    it("returns exponential backoff up to 2000", () => {
      const strategy = (redis as any).options.retryStrategy;
      expect(strategy(1)).toBe(200);
      expect(strategy(4)).toBe(800);
      expect(strategy(5)).toBe(1000);
    });
  });

  describe("connectRedis", () => {
    it("connects successfully", async () => {
      vi.spyOn(redis, "connect").mockResolvedValueOnce(undefined as any);
      vi.spyOn(redis, "ping").mockResolvedValueOnce("PONG");

      await connectRedis();

      expect(logger.info).toHaveBeenCalledWith("Redis connection verified");
      
      // Now it's connected, test the events that check isRedisConnected
      redis.emit("error", new Error("Test err"));
      expect(logger.warn).toHaveBeenCalledWith({ err: expect.any(Error) }, "Redis connection error");

      redis.emit("reconnecting");
      expect(logger.warn).toHaveBeenCalledWith("Redis reconnecting...");
    });

    it("handles connection failure", async () => {
      vi.spyOn(redis, "connect").mockRejectedValueOnce(new Error("Fail"));
      vi.spyOn(redis, "disconnect").mockReturnValueOnce();

      await connectRedis();

      expect(logger.warn).toHaveBeenCalledWith("Redis unavailable — caching disabled, continuing");
      expect(redis.disconnect).toHaveBeenCalled();
    });
  });

  describe("disconnectRedis", () => {
    it("quits redis", async () => {
      vi.spyOn(redis, "quit").mockResolvedValueOnce("OK");
      await disconnectRedis();
      expect(redis.quit).toHaveBeenCalled();
    });
  });
});
