/**
 * Environment Configuration
 *
 * Centralized access to environment variables.
 * All env vars should be read through this module.
 */

export const env = {
  /** @type {string} Explicit environment override from .env (e.g. 'development' or 'production') */
  appEnv: import.meta.env.VITE_ENV || import.meta.env.MODE,

  /** @type {boolean} Whether the app is in development mode */
  isDev: import.meta.env.VITE_ENV === 'development' || (!import.meta.env.VITE_ENV && import.meta.env.DEV),

  /** @type {boolean} Whether the app is in production mode */
  isProd: import.meta.env.VITE_ENV === 'production' || (!import.meta.env.VITE_ENV && import.meta.env.PROD),

  /** @type {string} The base URL for API requests */
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',

  /** @type {string} The internal Vite mode */
  mode: import.meta.env.MODE,
};
