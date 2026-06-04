import { create } from 'zustand';

export const useCFAStore = create((set) => ({
  activeLevel: 1,
  activeModule: null,
  activeTopic: null,
  setActiveLevel: (level) => set({ activeLevel: level, activeModule: null, activeTopic: null }),
  setActiveModule: (module) => set({ activeModule: module }),
  setActiveTopic: (topic) => set({ activeTopic: topic, activeModule: null }),
}));
