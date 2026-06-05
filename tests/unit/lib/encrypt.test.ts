import { describe, it, expect } from "vitest";
import { encryptPayload } from "../../../src/lib/encrypt.js";

describe("encryptPayload", () => {
  it("encrypts a JSON-serialisable payload to base64 iv and data", async () => {
    const payload = { test: "data" };
    const sessionKey = "test-session-key";
    
    const result = await encryptPayload(payload, sessionKey);
    
    expect(result).toHaveProperty("iv");
    expect(result).toHaveProperty("data");
    expect(typeof result.iv).toBe("string");
    expect(typeof result.data).toBe("string");
    
    // Check if base64 encoded
    expect(Buffer.from(result.iv, "base64").toString("base64")).toBe(result.iv);
    expect(Buffer.from(result.data, "base64").toString("base64")).toBe(result.data);
  });

  it("handles short session keys by padding", async () => {
    const payload = "short key payload";
    const sessionKey = "short";
    
    const result = await encryptPayload(payload, sessionKey);
    
    expect(result).toHaveProperty("iv");
    expect(result).toHaveProperty("data");
  });

  it("handles long session keys by truncating", async () => {
    const payload = "long key payload";
    const sessionKey = "a".repeat(100);
    
    const result = await encryptPayload(payload, sessionKey);
    
    expect(result).toHaveProperty("iv");
    expect(result).toHaveProperty("data");
  });
});
