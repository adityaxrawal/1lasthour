import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import * as routerDom from 'react-router-dom';

// Mocks
vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

vi.mock('@features/cfa/hooks/useLevelData', () => ({
  useLevelData: vi.fn(),
}));

vi.mock('@features/cfa/hooks/useModuleQuery', () => ({
  useModuleQuery: vi.fn(),
}));

vi.mock('@features/cfa/hooks/useTopicQuery', () => ({
  useTopicQuery: vi.fn(),
}));

vi.mock('@features/cfa/hooks/useTopicsQuery', () => ({
  useTopicsQuery: vi.fn(),
}));

import { useLevelData } from '@features/cfa/hooks/useLevelData';
import { useModuleQuery } from '@features/cfa/hooks/useModuleQuery';
import { useTopicQuery } from '@features/cfa/hooks/useTopicQuery';
import { useTopicsQuery } from '@features/cfa/hooks/useTopicsQuery';

import { useModulePage } from './useModulePage';

describe('useModulePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default mocks
    routerDom.useParams.mockReturnValue({ topicId: 't1', moduleId: 'm1' });
    useLevelData.mockReturnValue({ basePath: '/cfa', level: 1 });
    
    useTopicsQuery.mockReturnValue({ data: { data: [{ id: 't1' }, { id: 't2' }] }, isLoading: false, isError: false });
    useTopicQuery.mockReturnValue({ 
      data: { data: { id: 't1', modules: [{ id: 'm1' }, { id: 'm2' }] } }, 
      isLoading: false, 
      isError: false 
    });
    useModuleQuery.mockReturnValue({ 
      data: { data: { id: 'm1', learningOutcomes: [{ id: 'los1' }], losCount: 1, conceptCount: 2, formulaCount: 3 } }, 
      isLoading: false, 
      isError: false 
    });
  });

  it('should return combined data correctly', () => {
    const { result } = renderHook(() => useModulePage());

    expect(result.current.topicId).toBe('t1');
    expect(result.current.moduleId).toBe('m1');
    expect(result.current.level).toBe(1);
    expect(result.current.topicData.id).toBe('t1');
    expect(result.current.moduleData.id).toBe('m1');
    expect(result.current.moduleIndex).toBe(1);
    expect(result.current.hasLOSData).toBe(true);
    expect(result.current.losCount).toBe(1);
    expect(result.current.totalConcepts).toBe(2);
    expect(result.current.totalFormulas).toBe(3);
    expect(result.current.relatedTopics).toHaveLength(1);
    expect(result.current.relatedTopics[0].id).toBe('t2');
    expect(result.current.basePath).toBe('/cfa');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('should handle loading state', () => {
    useTopicQuery.mockReturnValue({ isLoading: true });
    const { result } = renderHook(() => useModulePage());
    expect(result.current.isLoading).toBe(true);
  });

  it('should handle error state', () => {
    useModuleQuery.mockReturnValue({ isError: true });
    const { result } = renderHook(() => useModulePage());
    expect(result.current.isError).toBe(true);
  });

  it('should handle empty moduleData gracefully', () => {
    useModuleQuery.mockReturnValue({ data: null });
    const { result } = renderHook(() => useModulePage());
    expect(result.current.hasLOSData).toBe(false);
    expect(result.current.losCount).toBe(0);
  });

  it('should handle missing modules array gracefully for moduleIndex', () => {
    useTopicQuery.mockReturnValue({ data: { data: { id: 't1' } } });
    const { result } = renderHook(() => useModulePage());
    expect(result.current.moduleIndex).toBe(0);
  });
  
  it('should fallback stats when missing explicit counts', () => {
    useModuleQuery.mockReturnValue({
      data: { data: { learningOutcomes: [{}, {}] } }
    });
    const { result } = renderHook(() => useModulePage());
    expect(result.current.losCount).toBe(2);
    expect(result.current.totalConcepts).toBe(0);
  });
});

