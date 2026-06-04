import { useQuery } from '@tanstack/react-query';

import { cfaApi } from '../api/cfaApi';

import { cfaQueryKeys } from './cfaQueryKeys';

export function useModuleQuery(topicId, moduleId, level) {
  return useQuery({
    queryKey: cfaQueryKeys.module(topicId, moduleId, level),
    queryFn: () => cfaApi.getModuleById(topicId, moduleId, level),
    enabled: !!topicId && !!moduleId && !!level,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
