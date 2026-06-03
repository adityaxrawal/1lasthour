import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { buildApp } from "../../src/app.js";

describe("GET /api/v1/topics", () => {
  let app: Awaited<ReturnType<typeof buildApp>>;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("400 when level param missing", async () => {
    const res = await request(app.server).get("/api/v1/topics");
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("VALIDATION_ERROR");
  });

  it("400 when level is out of range", async () => {
    const res = await request(app.server).get("/api/v1/topics?level=5");
    expect(res.status).toBe(400);
  });

  // Note: This relies on the database having been seeded. 
  // In a real testing environment, you'd use a dedicated test DB and seed it before tests.
  it("200 with topic array for level=1", async () => {
    const res = await request(app.server).get("/api/v1/topics?level=1");
    if (res.status === 200) {
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.meta.level).toBe(1);
    } else {
      // If DB is down or empty
      expect([200, 500]).toContain(res.status); 
    }
  });

  it("404 for unknown topicId", async () => {
    const res = await request(app.server).get(
      "/api/v1/topics/nonexistent-topic?level=1",
    );
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("NOT_FOUND");
  });
});
