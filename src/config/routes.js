/**
 * Route Constants
 *
 * Centralized route path definitions for the application.
 * Use these constants instead of hardcoding paths.
 */

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  THEME_DEMO: '/theme-demo',

  // CFA Routes
  CFA: '/cfa',
  CFA_LEVEL_1: '/cfa/level-1',
  CFA_TOPIC: '/cfa/level-1/:topicId',
  CFA_MODULE: '/cfa/level-1/:topicId/:moduleId',
};

/**
 * Build a CFA topic URL
 * @param {string} topicId
 * @returns {string}
 */
export function cfaTopicPath(topicId) {
  return `/cfa/level-1/${topicId}`;
}

/**
 * Build a CFA module URL
 * @param {string} topicId
 * @param {string} moduleId
 * @returns {string}
 */
export function cfaModulePath(topicId, moduleId) {
  return `/cfa/level-1/${topicId}/${moduleId}`;
}
