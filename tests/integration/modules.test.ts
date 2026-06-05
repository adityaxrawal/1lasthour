import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import request from "supertest";
import { buildApp } from "../../src/app.js";
import { modulesService } from "../../src/services/modules.service.js";

vi.mock("../../src/services/modules.service.js", () => ({
  modulesService: {
    getById: vi.fn(),
  },
}));

describe("GET /api/v1/topics/:topicId/modules/:moduleId", () => {
  let app: Awaited<ReturnType<typeof buildApp>>;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("returns 200 with module data", async () => {
    const mockModule = {
      id: "m1",
      topicId: "t1",
      title: "Test Module",
      learningOutcomes: [],
    };
    vi.mocked(modulesService.getById).mockResolvedValueOnce(mockModule as any);

    const res = await request(app.server)
      .get("/api/v1/topics/t1/modules/m1?level=1")
      .set("x-session-id", "test-session")
      .set("x-nonce", "123")
      .set("x-timestamp", Date.now().toString())
      .set("x-request-signature", "dummy");

    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(mockModule.id);
    expect(res.body.data.topicId).toBe(mockModule.topicId);
    // Title is watermarked with zero-width characters, so we check using string containment
    expect(res.body.data.title.replace(/[\u200B-\u200D\uFEFF]/g, '')).toBe(mockModule.title);
  });
});
