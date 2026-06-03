/**
 * Centralised Redis cache key generators.
 * All keys are defined here to prevent typos and ensure consistency.
 */
export const cacheKeys = {
  /** List of topics for a given CFA level */
  topicList: (level: number) => `topics:level:${level}`,

  /** Single topic with its module list */
  topic: (topicId: string, level: number) => `topic:${topicId}:level:${level}`,

  /** Full module with all LOS, concepts, and formulas */
  module: (topicId: string, moduleId: string, level: number) =>
    `module:${topicId}:${moduleId}:level:${level}`,

  /** Search results — base64url-encoded query for safe Redis key storage */
  search: (level: number, type: string, q: string, limit: number, offset: number) =>
    `search:${level}:${type}:${Buffer.from(q).toString('base64url')}:${limit}:${offset}`,
};
