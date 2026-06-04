import { signedFetch } from '@/lib/signedFetch';

/**
 * Strip invisible Unicode characters from an ID string before using it in a URL.
 *
 * Characters removed:
 *   U+200B  Zero Width Space
 *   U+200C  Zero Width Non-Joiner
 *   U+200D  Zero Width Joiner
 *   U+2060  Word Joiner
 *   U+FEFF  BOM / Zero Width No-Break Space
 *   U+00AD  Soft Hyphen
 *
 * These can be present in DB-sourced IDs and cause ugly %E2%80%8B sequences in URLs.
 */
function cleanId(id) {
  if (typeof id !== 'string') return id;
  return id.replace(/[\u200B-\u200D\u2060\uFEFF\u00AD]/g, '');
}

export const cfaApi = {
  /**
   * Fetch all topics for a given level.
   * @param {number} level CFA Level (1, 2, or 3)
   * @returns {Promise<Array>} List of topics
   */
  getTopics: async (level) => {
    return signedFetch(`/api/v1/topics?level=${encodeURIComponent(level)}`);
  },

  /**
   * Fetch a single topic by ID for a given level.
   * @param {string} topicId Topic identifier
   * @param {number} level CFA Level (1, 2, or 3)
   * @returns {Promise<Object>} Topic details
   */
  getTopicById: async (topicId, level) => {
    return signedFetch(`/api/v1/topics/${encodeURIComponent(cleanId(topicId))}?level=${encodeURIComponent(level)}`);
  },

  /**
   * Fetch a specific module's details.
   * @param {string} topicId Topic identifier
   * @param {string} moduleId Module identifier
   * @param {number} level CFA Level (1, 2, or 3)
   * @returns {Promise<Object>} Module details
   */
  getModuleById: async (topicId, moduleId, level) => {
    return signedFetch(`/api/v1/topics/${encodeURIComponent(cleanId(topicId))}/modules/${encodeURIComponent(cleanId(moduleId))}?level=${encodeURIComponent(level)}`);
  },
};

