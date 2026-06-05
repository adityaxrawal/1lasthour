import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { buildApp } from "../../src/app.js";

describe("GET /api/honeypot", () => {
  let app: Awaited<ReturnType<typeof buildApp>>;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("returns 200 with fake notes payload", async () => {
    const res = await request(app.server)
      .get("/api/honeypot")
      .set("user-agent", "Mozilla/5.0")
      .set("accept-language", "en-US")
      .set("accept", "application/json")
      .set("accept-encoding", "gzip, deflate, br");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      notes: [],
    });
  });
});
