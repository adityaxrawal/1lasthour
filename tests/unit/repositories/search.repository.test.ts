import { describe, it, expect, vi, beforeEach } from "vitest";
import { searchRepository } from "../../../src/repositories/search.repository.js";
import { query } from "../../../src/config/database.js";

vi.mock("../../../src/config/database.js", () => ({
  query: vi.fn(),
}));

describe("searchRepository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("searches concepts when type is 'concept'", async () => {
    const mockConceptRow = {
      id: "c1",
      text: "Concept 1",
      conceptType: "definition",
      topicId: "t1",
      topicTitle: "Topic 1",
      moduleId: "m1",
      moduleTitle: "Module 1",
      losCode: "1.a",
    };

    vi.mocked(query).mockResolvedValueOnce({ rows: [mockConceptRow] } as any);

    const result = await searchRepository.search({
      q: "test",
      level: 1,
      type: "concept",
      limit: 10,
      offset: 0,
    });

    expect(query).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("concept");
    expect(result[0].text).toBe("Concept 1");
  });

  it("searches formulas when type is 'formula'", async () => {
    const mockFormulaRow = {
      id: "f1",
      name: "Formula 1",
      topicId: "t1",
      topicTitle: "Topic 1",
      moduleId: "m1",
      moduleTitle: "Module 1",
      losCode: "1.b",
    };

    vi.mocked(query).mockResolvedValueOnce({ rows: [mockFormulaRow] } as any);

    const result = await searchRepository.search({
      q: "test",
      level: 1,
      type: "formula",
      limit: 10,
      offset: 0,
    });

    expect(query).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("formula");
    expect(result[0].name).toBe("Formula 1");
  });

  it("searches both concepts and formulas when type is 'all'", async () => {
    const mockConceptRow = { id: "c1", topicId: "t1" };
    const mockFormulaRow = { id: "f1", topicId: "t1" };

    vi.mocked(query)
      .mockResolvedValueOnce({ rows: [mockConceptRow] } as any)
      .mockResolvedValueOnce({ rows: [mockFormulaRow] } as any);

    const result = await searchRepository.search({
      q: "test",
      level: 1,
      type: "all",
      limit: 10,
      offset: 0,
    });

    expect(query).toHaveBeenCalledTimes(2);
    expect(result).toHaveLength(2);
    expect(result[0].type).toBe("concept");
    expect(result[1].type).toBe("formula");
  });
});
