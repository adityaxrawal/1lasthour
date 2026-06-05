import React, { memo } from 'react';

import { LoadingState, ErrorState, NotFoundState } from '@components/ui';

import { ComingSoonPage } from './components/ComingSoonPage';
import { MainContent } from './components/MainContent';
import { ModuleBreadcrumbs } from './components/ModuleBreadcrumbs';
import { ModuleHeader } from './components/ModuleHeader';
import { ModuleSidebar } from './components/ModuleSidebar';
import { useModulePage } from './useModulePage';

// ─── Component ────────────────────────────────────────────────────────────────

const ModulePage = memo(function ModulePage() {
  const {
    topicId,
    moduleId,
    level,
    topicData,
    moduleData,
    moduleIndex,
    hasLOSData,
    losCount,
    totalConcepts,
    totalFormulas,
    relatedTopics,
    basePath,
    isLoading,
    isError,
  } = useModulePage();

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Error loading data"
        message="There was a problem fetching the module. Please try again later."
      />
    );
  }

  if (level > 1) {
    return (
      <ComingSoonPage
        level={level}
        topicId={topicId}
        moduleTitle={moduleData?.title || moduleId}
        basePath={basePath}
      />
    );
  }

  if (!topicData || !moduleData) {
    return (
      <NotFoundState
        title="Module not found"
        linkTo={`${basePath}/${topicId || ''}`}
        linkText="Return to Overview"
      />
    );
  }

  return (
    <div className="space-y-10">
      <ModuleBreadcrumbs
        basePath={basePath}
        topicId={topicId}
        topicData={topicData}
        moduleIndex={moduleIndex}
      />

      <div className="flex flex-col gap-10 lg:flex-row">
        <article className="min-w-0 flex-1">
          <ModuleHeader
            topicData={topicData}
            moduleIndex={moduleIndex}
            moduleData={moduleData}
            hasLOSData={hasLOSData}
            losCount={losCount}
            totalConcepts={totalConcepts}
            totalFormulas={totalFormulas}
          />
          <MainContent hasLOSData={hasLOSData} moduleId={moduleId} moduleData={moduleData} />
        </article>

        <ModuleSidebar
          topicData={topicData}
          moduleId={moduleId}
          topicId={topicId}
          basePath={basePath}
          hasLOSData={hasLOSData}
          moduleData={moduleData}
          relatedTopics={relatedTopics}
        />
      </div>
    </div>
  );
});

ModulePage.displayName = 'ModulePage';

export { ModulePage };
export default ModulePage;
