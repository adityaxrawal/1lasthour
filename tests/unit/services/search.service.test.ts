import { describe, it, expect, vi, beforeEach } from "vitest";
import { searchService } from "../../../src/services/search.service.js";
import { cache } from "../../../src/cache/cache.js";

vi.mock("../../../src/cache/cache.js", () => ({
  cache: {
    getOrSet: vi.fn(),
  },
}));

vi.mock("../../../src/repositories/search.repository.js", () => ({
  searchRepository: {
    search: vi.fn(),
  },
}));

describe("searchService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("search", () => {
    it("returns search results via cache", async () => {
      const mockResults = [{ id: "c1", type: "concept", text: "Concept 1" }];
      vi.mocked(cache.getOrSet).mockResolvedValueOnce(mockResults);

      const result = await searchService.search({
        q: "test",
        level: 1,
        type: "all",
        limit: 10,
        offset: 0,
      });

      expect(cache.getOrSet).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResults);
    });
  });
});
