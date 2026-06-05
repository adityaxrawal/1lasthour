import { describe, it, expect, vi } from "vitest";
import { pool, query } from "../../../src/config/database.js";
import { logger } from "../../../src/utils/logger.js";

vi.mock("../../../src/utils/logger.js", () => ({
  logger: {
    error: vi.fn(),
  },
}));

describe("database", () => {
  it("emits error to logger", () => {
    const error = new Error("Test pool error");
    pool.emit("error", error);
    expect(logger.error).toHaveBeenCalledWith({ err: error }, "PostgreSQL pool error");
  });

  it("calls pool.query", async () => {
    vi.spyOn(pool, "query").mockResolvedValueOnce({ rows: [] } as any);
    const result = await query("SELECT * FROM test", ["val"]);
    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM test", ["val"]);
    expect(result).toEqual({ rows: [] });
  });
});
