/**
 * useCFANavigation
 *
 * Custom hook for CFA-specific navigation.
 * Combines react-router-dom navigation with CFA store state management.
 */

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { cfaTopicPath, cfaModulePath } from '@/config/routes';
import { useCFAStore } from '@features/cfa/store/cfaStore';

/**
 * Provides navigation helpers scoped to CFA routes.
 * Automatically syncs Zustand CFA store with route changes.
 *
 * @returns {Object} Navigation helpers
 */
export function useCFANavigation() {
  const navigate = useNavigate();
  const { setActiveLevel, setActiveModule, setActiveTopic } = useCFAStore();

  const navigateToLevel = useCallback(
    (level) => {
      setActiveLevel(level);
      navigate(`/cfa/level-${level}`);
    },
    [navigate, setActiveLevel]
  );

  const navigateToTopic = useCallback(
    (topicId) => {
      setActiveTopic(topicId);
      navigate(cfaTopicPath(topicId));
    },
    [navigate, setActiveTopic]
  );

  const navigateToModule = useCallback(
    (topicId, moduleId) => {
      setActiveTopic(topicId);
      setActiveModule(moduleId);
      navigate(cfaModulePath(topicId, moduleId));
    },
    [navigate, setActiveTopic, setActiveModule]
  );

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return {
    navigateToLevel,
    navigateToTopic,
    navigateToModule,
    goBack,
  };
}
