import { useQuery } from '@tanstack/react-query';

import { cfaApi } from '../api/cfaApi';

import { cfaQueryKeys } from './cfaQueryKeys';

export function useTopicQuery(topicId, level) {
  return useQuery({
    queryKey: cfaQueryKeys.topic(topicId, level),
    queryFn: () => cfaApi.getTopicById(topicId, level),
    enabled: !!topicId && !!level,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
