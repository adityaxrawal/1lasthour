import { useQuery } from '@tanstack/react-query';

import { cfaApi } from '../api/cfaApi';

import { cfaQueryKeys } from './cfaQueryKeys';

export function useTopicsQuery(level) {
  return useQuery({
    queryKey: cfaQueryKeys.topics(level),
    queryFn: () => cfaApi.getTopics(level),
    enabled: !!level,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
