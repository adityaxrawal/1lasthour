/**
 * Global Application Store
 *
 * Root-level Zustand store for cross-feature shared state.
 * Feature-specific state should live in feature stores
 * (e.g., features/cfa/store/cfaStore.js).
 */

import { create } from 'zustand';

export const useAppStore = create((set) => ({
  /** @type {boolean} Whether the global search overlay is open */
  isSearchOpen: false,

  /** @type {string} The current global search query */
  searchQuery: '',

  /** Open the global search overlay */
  openSearch: () => set({ isSearchOpen: true }),

  /** Close the global search overlay */
  closeSearch: () => set({ isSearchOpen: false, searchQuery: '' }),

  /** Update the global search query */
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
