/**
 * HTTP Client
 *
 * Centralized fetch wrapper for API requests.
 * Configure base URL, headers, and interceptors here.
 */

import { env } from '@/config/env';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

/**
 * Make an HTTP request
 * @param {string} endpoint - The API endpoint (relative to base URL)
 * @param {RequestInit} [options={}] - Fetch options
 * @returns {Promise<any>} Parsed JSON response
 */
export async function httpClient(endpoint, options = {}) {
  const url = `${env.apiBaseUrl}${endpoint}`;

  const config = {
    ...options,
    headers: {
      ...DEFAULT_HEADERS,
      ...options.headers,
    },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
    error.status = response.status;
    error.response = response;
    throw error;
  }

  // Handle empty responses (204 No Content)
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

/**
 * Convenience methods
 */
export const api = {
  get: (endpoint, options) => httpClient(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, data, options) =>
    httpClient(endpoint, { ...options, method: 'POST', body: JSON.stringify(data) }),
  put: (endpoint, data, options) =>
    httpClient(endpoint, { ...options, method: 'PUT', body: JSON.stringify(data) }),
  delete: (endpoint, options) => httpClient(endpoint, { ...options, method: 'DELETE' }),
};
