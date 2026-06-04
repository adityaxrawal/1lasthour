import { useMemo } from 'react';
import { useModuleQuery } from '@features/cfa/hooks/useModuleQuery';
import { useTopicQuery } from '@features/cfa/hooks/useTopicQuery';
import { useTopicsQuery } from '@features/cfa/hooks/useTopicsQuery';

export function useModuleData(topicId, moduleId, level) {
  const topicsQuery = useTopicsQuery(level);
  const topicQuery = useTopicQuery(topicId, level);
  const moduleQuery = useModuleQuery(topicId, moduleId, level);

  const topicsData = useMemo(() => topicsQuery.data?.data || [], [topicsQuery.data?.data]);
  const topicData = topicQuery.data?.data || null;
  const moduleData = moduleQuery.data?.data || null;

  const isLoading = topicsQuery.isLoading || topicQuery.isLoading || moduleQuery.isLoading;
  const isError = topicsQuery.isError || topicQuery.isError || moduleQuery.isError;

  return { topicsData, topicData, moduleData, isLoading, isError };
}

export function useModuleNavigation(topicData, moduleId) {
  return useMemo(() => {
    const modules = topicData?.modules;
    if (!modules) return 0;
    const idx = modules.findIndex((m) => m.id === moduleId);
    return idx >= 0 ? idx + 1 : 0;
  }, [topicData?.modules, moduleId]);
}

export function useModuleProgress(moduleData) {
  return useMemo(() => {
    if (!moduleData) {
      return { hasLOSData: false, losCount: 0, totalConcepts: 0, totalFormulas: 0 };
    }
    const outcomes = moduleData.learningOutcomes;
    const outcomesLength = outcomes ? outcomes.length : 0;
    const hasLOSData = outcomesLength > 0;
    
    return {
      hasLOSData,
      losCount: moduleData.losCount || outcomesLength,
      totalConcepts: moduleData.conceptCount || 0,
      totalFormulas: moduleData.formulaCount || 0,
    };
  }, [moduleData]);
}

export function useRelatedTopics(topicsData, topicId) {
  return useMemo(
    () => topicsData.filter((t) => t.id !== topicId).slice(0, 3),
    [topicsData, topicId]
  );
}
