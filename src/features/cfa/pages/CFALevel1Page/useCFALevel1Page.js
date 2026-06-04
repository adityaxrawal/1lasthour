import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { useTopicsQuery } from '@features/cfa/hooks/useTopicsQuery';

// ─── Level Config ─────────────────────────────────────────────────────────────

const LEVEL_CONFIG = {
  1: {
    basePath: '/cfa/level-1',
    label: 'CFA LEVEL I',
    romanNumeral: 'I',
    tagline: 'Master the fundamentals of investment tools, ethics, and portfolio management.',
    ctaTitle: 'Continue Your CFA Journey',
    ctaDescription:
      'Stay on track with your study plan. Access formulas, key concepts, and exam strategies all in one place.',
    ctaLinkPath: '/cfa/level-1/ethical-and-professional-standards',
    popularTags: ['ethics', 'quant', 'fra', 'equity', 'fixed income', 'derivatives'],
  },
  2: {
    basePath: '/cfa/level-2',
    label: 'CFA LEVEL II',
    romanNumeral: 'II',
    tagline:
      'Apply investment tools to asset valuation and portfolio construction using complex financial analysis.',
    ctaTitle: 'Master CFA Level II',
    ctaDescription:
      'Dive into application-focused valuation and analysis. Work through complex case studies and vignette-style questions.',
    ctaLinkPath: '/cfa/level-2/equity-investments',
    popularTags: ['valuation', 'equity', 'fixed income', 'derivatives', 'FSA', 'ethics'],
  },
  3: {
    basePath: '/cfa/level-3',
    label: 'CFA LEVEL III',
    romanNumeral: 'III',
    tagline:
      'Master portfolio management, wealth planning, and the application of all investment tools in practice.',
    ctaTitle: 'Complete Your CFA Journey',
    ctaDescription:
      'Tackle the final frontier of CFA — portfolio management, wealth planning, and integrated case studies.',
    ctaLinkPath: '/cfa/level-3/asset-allocation',
    popularTags: [
      'asset allocation',
      'IPS',
      'risk management',
      'fixed income PM',
      'equity PM',
      'alternatives',
    ],
  },
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Level-aware hook for the CFA level index pages.
 * Detects which CFA level is currently being viewed from the URL pathname
 * and returns the appropriate data, metadata, and UI state.
 */
export function useCFALevel1Page() {
  const { pathname } = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Detect current level from pathname
  const level = useMemo(() => {
    if (pathname.includes('/cfa/level-3')) return 3;
    if (pathname.includes('/cfa/level-2')) return 2;
    return 1;
  }, [pathname]);

  const config = LEVEL_CONFIG[level];
  const { basePath } = config;

  // Fetch topics using React Query
  const { data, isLoading, isError } = useTopicsQuery(level);

  // Use an empty array if data is not yet loaded
  const topicsData = useMemo(() => data?.data || [], [data?.data]);

  // Build category list from topics
  const categories = useMemo(() => {
    return [
      {
        id: 'all',
        label: 'All Topics',
        path: basePath,
        count: topicsData.length,
      },
      ...topicsData.map((topic) => ({
        id: topic.id,
        label: topic.title,
        path: `${basePath}/${topic.id}`,
        count: topic.moduleCount || 0,
      })),
    ];
  }, [topicsData, basePath]);

  // Filter topics based on search
  const filteredTopics = useMemo(
    () =>
      topicsData.filter(
        (topic) =>
          topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.description?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [topicsData, searchQuery]
  );

  const latestReadings = useMemo(() => topicsData.slice(0, 3), [topicsData]);

  return {
    level,
    config,
    basePath,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    categories,
    filteredTopics,
    latestReadings,
    isLoading,
    isError,
  };
}
