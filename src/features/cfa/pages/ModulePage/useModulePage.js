import { useParams } from 'react-router-dom';

import { useLevelData } from '@features/cfa/hooks/useLevelData';

import { 
  useModuleData, 
  useModuleNavigation, 
  useModuleProgress, 
  useRelatedTopics 
} from './useModulePageData';

export function useModulePage() {
  const { topicId, moduleId } = useParams();
  const { basePath, level } = useLevelData();

  const { topicsData, topicData, moduleData, isLoading, isError } = useModuleData(topicId, moduleId, level);
  const moduleIndex = useModuleNavigation(topicData, moduleId);
  const stats = useModuleProgress(moduleData);
  const relatedTopics = useRelatedTopics(topicsData, topicId);

  return {
    topicId,
    moduleId,
    level,
    topicData,
    moduleData,
    moduleIndex,
    ...stats,
    relatedTopics,
    basePath,
    isLoading,
    isError,
  };
}
