import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { buildApp } from "../../src/app.js";

describe("GET /health", () => {
  let app: Awaited<ReturnType<typeof buildApp>>;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("returns 200 OK with status pass", async () => {
    const res = await request(app.server).get("/api/v1/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      status: "ok",
      timestamp: expect.any(String),
    });
  });
});
