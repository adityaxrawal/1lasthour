import { ArrowLeft, ChevronRight } from 'lucide-react';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { LoadingState, ErrorState, NotFoundState } from '@components/ui';

import { ModulesGrid } from './components/ModulesGrid';
import { TopicHeader } from './components/TopicHeader';
import { TopicSidebar } from './components/TopicSidebar';
import { useTopicPage } from './useTopicPage';

// ─── Component ────────────────────────────────────────────────────────────────

const TopicPage = memo(function TopicPage() {
  const { topicId, topicData, sidebarTopics, isLoading, isError } = useTopicPage();

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Error loading data"
        message="There was a problem fetching the topic. Please try again later."
      />
    );
  }

  if (!topicData) {
    return (
      <NotFoundState
        title="Topic not found"
        linkTo="/cfa/level-1"
        linkText="Return to Level 1 Overview"
      />
    );
  }

  return (
    <div className="space-y-10">
      {/* Breadcrumb + Back */}
      <div className="flex items-center gap-3 overflow-hidden text-sm font-semibold text-brand sm:gap-4">
        <Link
          to="/cfa/level-1"
          className="flex shrink-0 items-center gap-1 transition-colors hover:opacity-80"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
          <span className="hidden sm:inline">Back</span>
        </Link>
        <span className="shrink-0 font-normal text-ink-tertiary">|</span>
        <div className="flex min-w-0 items-center gap-2">
          <Link
            to="/cfa/level-1"
            className="shrink-0 whitespace-nowrap transition-colors hover:opacity-80"
          >
            CFA Level I
          </Link>
          <ChevronRight className="h-4 w-4 shrink-0 text-ink-tertiary" />
          <span className="truncate text-ink" title={topicData.title}>
            {topicData.title}
          </span>
        </div>
      </div>

      {/* Header */}
      <TopicHeader topicData={topicData} />

      {/* Main Content: Modules + Sidebar */}
      <div className="flex flex-col gap-10 lg:flex-row">
        {/* Modules Grid */}
        <ModulesGrid topicData={topicData} topicId={topicId} />

        {/* Sidebar */}
        <TopicSidebar topicData={topicData} sidebarTopics={sidebarTopics} topicId={topicId} />
      </div>
    </div>
  );
});

TopicPage.displayName = 'TopicPage';

export { TopicPage };
export default TopicPage;
