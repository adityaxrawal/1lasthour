import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import request from "supertest";
import { buildApp } from "../../src/app.js";
import { searchService } from "../../src/services/search.service.js";

vi.mock("../../src/services/search.service.js", () => ({
  searchService: {
    search: vi.fn(),
  },
}));

describe("GET /api/v1/search", () => {
  let app: Awaited<ReturnType<typeof buildApp>>;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("returns 200 with search results", async () => {
    const mockResults = [
      { id: "c1", type: "concept", text: "Concept 1" },
    ];
    vi.mocked(searchService.search).mockResolvedValueOnce(mockResults as any);

    const res = await request(app.server)
      .get("/api/v1/search?q=test&level=1&type=all&limit=10&offset=0")
      .set("x-session-id", "test-session")
      .set("x-nonce", "123")
      .set("x-timestamp", Date.now().toString())
      .set("x-request-signature", "dummy"); // We mocked out the security checks probably?
      // Wait, verifyBrowserSession is active for /api/v1 routes except session? 
      // It is active for CFA specific routes which are topics/modules/search.
      // I might need to either mock verifyBrowserSession or provide valid signature.
      
    // Actually, maybe we mock `verifyBrowserSession` middleware globally? Or maybe the routes themselves?
    // Let's see what happens.
    expect(res.status).toBe(200);
    expect(res.body.data[0].id).toBe("c1");
    expect(res.body.data[0].type).toBe("concept");
    expect(res.body.data[0].text.replace(/[\u200B-\u200D\uFEFF]/g, '')).toBe("Concept 1");
    expect(res.body.meta).toEqual({
      limit: 10,
      offset: 0,
      query: "test",
      total: 1,
    });
  });
});
