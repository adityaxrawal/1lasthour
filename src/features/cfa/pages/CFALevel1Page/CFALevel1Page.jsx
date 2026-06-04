import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { LoadingState, ErrorState } from '@components/ui';

import { CTABlock } from './components/CTABlock';
import { LevelSidebar } from './components/LevelSidebar';
import { PageHeader } from './components/PageHeader';
import { TopicsGrid } from './components/TopicsGrid';
import { useCFALevel1Page } from './useCFALevel1Page';

const ControlsBar = memo(function ControlsBar({ topicCount }) {
  return (
    <div className="flex items-center justify-between gap-4 pb-2">
      <div className="flex items-center gap-4 text-sm text-ink-secondary">
        <span className="flex items-center gap-1">
          <span className="font-bold text-ink">{topicCount}</span>
          <span>topics</span>
        </span>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-ink-secondary">
          SORT BY
        </span>
        <button className="flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-surface">
          Recommended
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-ink-tertiary"
          >
            <path
              d="M1 1L5 5L9 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
});
ControlsBar.propTypes = { topicCount: PropTypes.number.isRequired };

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * CFALevel1Page — shared layout for CFA Level I, II, and III index pages.
 * The hook (useCFALevel1Page) detects the current level from the URL
 * and provides the appropriate data, copy, and navigation paths.
 */
const CFALevel1Page = memo(function CFALevel1Page() {
  const {
    level,
    config,
    basePath,
    searchQuery,
    setSearchQuery,
    activeCategory,
    categories,
    filteredTopics,
    latestReadings,
    isLoading,
    isError,
  } = useCFALevel1Page();

  const isSampleData = level > 1;

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <ErrorState 
        title="Error loading data" 
        message="There was a problem fetching the topics. Please try again later." 
      />
    );
  }

  return (
    <div className="space-y-12">
      <PageHeader config={config} isSampleData={isSampleData} />
      <ControlsBar topicCount={filteredTopics.length} />

      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="min-w-0 flex-1">
          <TopicsGrid filteredTopics={filteredTopics} basePath={basePath} />
          <CTABlock config={config} />
        </div>

        <LevelSidebar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categories={categories}
          activeCategory={activeCategory}
          level={level}
          latestReadings={latestReadings}
          config={config}
          basePath={basePath}
        />
      </div>
    </div>
  );
});

CFALevel1Page.displayName = 'CFALevel1Page';

export { CFALevel1Page };
export default CFALevel1Page;
