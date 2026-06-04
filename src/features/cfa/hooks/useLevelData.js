import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resolves the CFA data set and base path from the current URL.
 */
export function useLevelData() {
  const { pathname } = useLocation();

  return useMemo(() => {
    if (pathname.includes('/cfa/level-3')) {
      return { basePath: '/cfa/level-3', level: 3 };
    }
    if (pathname.includes('/cfa/level-2')) {
      return { basePath: '/cfa/level-2', level: 2 };
    }
    return { basePath: '/cfa/level-1', level: 1 };
  }, [pathname]);
}
