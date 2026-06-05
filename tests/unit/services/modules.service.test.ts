import { describe, it, expect, vi, beforeEach } from "vitest";
import { modulesService } from "../../../src/services/modules.service.js";
import { cache } from "../../../src/cache/cache.js";
import { NotFoundError } from "../../../src/errors/errors.js";

vi.mock("../../../src/cache/cache.js", () => ({
  cache: {
    getOrSet: vi.fn(),
  },
}));

vi.mock("../../../src/repositories/modules.repository.js", () => ({
  modulesRepository: {
    findByIdWithContent: vi.fn(),
  },
}));

describe("modulesService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getById", () => {
    it("returns module if found in cache or DB", async () => {
      const mockModule = { id: "m1", title: "Module 1" };
      vi.mocked(cache.getOrSet).mockResolvedValueOnce(mockModule);

      const result = await modulesService.getById({
        topicId: "t1",
        moduleId: "m1",
        level: 1,
      });

      expect(cache.getOrSet).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockModule);
    });

    it("throws NotFoundError if module is not found", async () => {
      vi.mocked(cache.getOrSet).mockResolvedValueOnce(null);

      await expect(
        modulesService.getById({
          topicId: "t1",
          moduleId: "m1",
          level: 1,
        })
      ).rejects.toThrow(NotFoundError);
      expect(cache.getOrSet).toHaveBeenCalledTimes(1);
    });
  });
});
