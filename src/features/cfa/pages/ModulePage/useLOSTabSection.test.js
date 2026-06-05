import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { useLOSTabSection } from './useLOSTabSection';

describe('useLOSTabSection', () => {
  const mockLOS = [{ id: 'los1' }, { id: 'los2' }, { id: 'los3' }];

  it('should initialize with first LOS', () => {
    const { result } = renderHook(() => useLOSTabSection(mockLOS));
    expect(result.current.selectedIndex).toBe(0);
    expect(result.current.selectedLOS.id).toBe('los1');
  });

  it('should navigate next and prev correctly', () => {
    const { result } = renderHook(() => useLOSTabSection(mockLOS));

    act(() => {
      result.current.goToNext();
    });
    expect(result.current.selectedIndex).toBe(1);

    act(() => {
      result.current.goToNext();
    });
    expect(result.current.selectedIndex).toBe(2);

    // Test boundary
    act(() => {
      result.current.goToNext();
    });
    expect(result.current.selectedIndex).toBe(2);

    act(() => {
      result.current.goToPrev();
    });
    expect(result.current.selectedIndex).toBe(1);

    // Test boundary
    act(() => {
      result.current.goToPrev();
      result.current.goToPrev();
    });
    expect(result.current.selectedIndex).toBe(0);
  });

  it('should handle empty learningOutcomes safely', () => {
    const { result } = renderHook(() => useLOSTabSection(null));
    expect(result.current.selectedIndex).toBe(0);
    expect(result.current.selectedLOS).toBe(null);

    act(() => {
      result.current.goToNext();
    });
    expect(result.current.selectedIndex).toBe(0);
  });
});
