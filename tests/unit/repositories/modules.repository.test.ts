import { describe, it, expect, vi, beforeEach } from "vitest";
import { modulesRepository } from "../../../src/repositories/modules.repository.js";
import { query } from "../../../src/config/database.js";

vi.mock("../../../src/config/database.js", () => ({
  query: vi.fn(),
}));

describe("modulesRepository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("findByIdWithContent", () => {
    it("returns null if module is not found", async () => {
      vi.mocked(query).mockResolvedValueOnce({ rows: [] } as any);

      const result = await modulesRepository.findByIdWithContent({ topicId: "t1", moduleId: "m1" });
      expect(result).toBeNull();
      expect(query).toHaveBeenCalledTimes(1);
    });

    it("returns module with nested content", async () => {
      const mockModule = { id: "m1", title: "Module 1", topicId: "t1" };
      const mockTopic = { title: "Topic 1" };
      const mockLos = [{ id: "los1", title: "LOS 1", moduleId: "m1" }];
      const mockConcept = { id: "c1", losId: "los1", text: "Concept 1" };
      const mockFormula = { id: "f1", losId: "los1", latex: "a^2" };

      // Mock sequence of queries
      vi.mocked(query)
        .mockResolvedValueOnce({ rows: [mockModule] } as any) // modRes
        .mockResolvedValueOnce({ rows: [mockTopic] } as any) // topicRes
        .mockResolvedValueOnce({ rows: mockLos } as any) // losRes
        .mockResolvedValueOnce({ rows: [mockConcept] } as any) // conceptRes
        .mockResolvedValueOnce({ rows: [mockFormula] } as any); // formulaRes

      const result = await modulesRepository.findByIdWithContent({ topicId: "t1", moduleId: "m1" });

      expect(query).toHaveBeenCalledTimes(5);
      expect(result).toBeDefined();
      expect(result?.title).toBe("Module 1");
      expect(result?.topicTitle).toBe("Topic 1");
      expect(result?.learningOutcomes).toHaveLength(1);
      expect(result?.learningOutcomes[0].concepts).toHaveLength(1);
      expect(result?.learningOutcomes[0].formulas).toHaveLength(1);
      expect(result?.learningOutcomes[0].concepts[0].text).toBe("Concept 1");
      expect(result?.learningOutcomes[0].formulas[0].latex).toBe("a^2");
    });
  });

  describe("findWithStatsByTopic", () => {
    it("returns array of modules with stats", async () => {
      const mockModules = [
        { id: "m1", title: "Mod 1", topicId: "t1", losCount: 5 },
        { id: "m2", title: "Mod 2", topicId: "t1", losCount: 2 },
      ];
      vi.mocked(query).mockResolvedValueOnce({ rows: mockModules } as any);

      const result = await modulesRepository.findWithStatsByTopic({ topicId: "t1" });

      expect(query).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockModules);
    });
  });
});
