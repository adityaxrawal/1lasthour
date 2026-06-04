import { useState, useCallback } from 'react';

export function useLOSTabSection(learningOutcomes) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedLOS = learningOutcomes?.[selectedIndex] || null;

  const goToPrev = useCallback(() => setSelectedIndex((i) => Math.max(0, i - 1)), []);
  const goToNext = useCallback(
    () => setSelectedIndex((i) => Math.min((learningOutcomes?.length || 1) - 1, i + 1)),
    [learningOutcomes?.length]
  );

  return {
    selectedIndex,
    setSelectedIndex,
    selectedLOS,
    goToPrev,
    goToNext,
  };
}
