import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useLevelData } from '@features/cfa/hooks/useLevelData';
import { useTopicQuery } from '@features/cfa/hooks/useTopicQuery';
import { useTopicsQuery } from '@features/cfa/hooks/useTopicsQuery';

function useSidebarTopics(topicsData, basePath) {
  return useMemo(
    () =>
      topicsData.map((topic) => ({
        id: topic.id,
        label: topic.title,
        path: `${basePath}/${topic.id}`,
        count: topic.moduleCount || 0,
      })),
    [topicsData, basePath]
  );
}

function useTopicsData(level) {
  const query = useTopicsQuery(level);
  const data = useMemo(() => query.data?.data || [], [query.data?.data]);
  return { data, isLoading: query.isLoading, isError: query.isError };
}

function useTopicData(topicId, level) {
  const query = useTopicQuery(topicId, level);
  const data = query.data?.data || null;
  return { data, isLoading: query.isLoading, isError: query.isError };
}

export function useTopicPage() {
  const { topicId } = useParams();
  const { basePath, level } = useLevelData();

  const { data: topicsData, isLoading: isTopicsLoading, isError: isTopicsError } = useTopicsData(level);
  const { data: topicData, isLoading: isTopicLoading, isError: isTopicError } = useTopicData(topicId, level);

  const sidebarTopics = useSidebarTopics(topicsData, basePath);

  return {
    topicId,
    topicData,
    sidebarTopics,
    basePath,
    isLoading: isTopicsLoading || isTopicLoading,
    isError: isTopicsError || isTopicError,
  };
}
