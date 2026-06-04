import { BookOpen, Lightbulb } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

const ModuleHeader = memo(function ModuleHeader({
  topicData,
  moduleIndex,
  moduleData,
  hasLOSData,
  losCount,
  totalConcepts,
  totalFormulas,
}) {
  return (
    <header className="mb-8 pb-4">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-brand px-4 py-1 text-sm font-medium text-brand">
          Level I
        </span>
        <span className="rounded-full bg-brand-subtle px-4 py-1 text-sm font-medium text-brand">
          {topicData?.title}
        </span>
        <span className="rounded-full bg-canvas-inset border border-border px-4 py-1 text-sm font-medium text-ink-secondary">
          Module {moduleIndex}
        </span>
      </div>
      <h1 className="leading-tight text-4xl font-bold text-ink md:text-[42px]">
        {moduleData?.title}
      </h1>

      {/* Module Stats */}
      {hasLOSData && (
        <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
          <div className="flex flex-1 items-center gap-3 sm:gap-4 rounded-xl border border-border bg-surface p-4 sm:px-6 sm:py-5 min-w-[140px] sm:min-w-[200px]">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg bg-brand-subtle text-brand">
              <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-ink">{losCount}</div>
              <div className="text-xs sm:text-sm font-medium text-ink-secondary leading-tight">Learning Outcomes</div>
            </div>
          </div>
          <div className="flex flex-1 items-center gap-3 sm:gap-4 rounded-xl border border-border bg-surface p-4 sm:px-6 sm:py-5 min-w-[140px] sm:min-w-[200px]">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg bg-warning-tint text-warning">
              <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-ink">{totalConcepts}</div>
              <div className="text-xs sm:text-sm font-medium text-ink-secondary leading-tight">Key Concepts</div>
            </div>
          </div>
          <div className="flex flex-1 items-center gap-3 sm:gap-4 rounded-xl border border-border bg-surface p-4 sm:px-6 sm:py-5 min-w-[140px] sm:min-w-[200px]">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg bg-amber-tint text-amber">
              <span className="font-serif text-xl sm:text-2xl font-bold">Σ</span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-ink">{totalFormulas}</div>
              <div className="text-xs sm:text-sm font-medium text-ink-secondary leading-tight">Formulas</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
});

ModuleHeader.propTypes = {
  topicData: PropTypes.object,
  moduleIndex: PropTypes.number.isRequired,
  moduleData: PropTypes.object,
  hasLOSData: PropTypes.bool.isRequired,
  losCount: PropTypes.number,
  totalConcepts: PropTypes.number,
  totalFormulas: PropTypes.number,
};

ModuleHeader.displayName = 'ModuleHeader';

export { ModuleHeader };
export default ModuleHeader;
