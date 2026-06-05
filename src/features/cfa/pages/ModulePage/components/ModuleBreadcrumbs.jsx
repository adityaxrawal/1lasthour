import { ArrowLeft, ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const ModuleBreadcrumbs = memo(function ModuleBreadcrumbs({
  basePath,
  topicId,
  topicData,
  moduleIndex,
}) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-ink-secondary sm:gap-3">
      <Link
        to={`${basePath}/${topicId}`}
        className="flex shrink-0 items-center gap-1 text-brand transition-colors hover:text-brand-dark"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Back</span>
      </Link>
      <ChevronRight className="h-4 w-4 shrink-0 text-ink-tertiary" />
      <Link to={basePath} className="shrink-0 whitespace-nowrap transition-colors hover:text-ink">
        Level I
      </Link>
      <ChevronRight className="h-4 w-4 shrink-0 text-ink-tertiary" />
      <Link
        to={`${basePath}/${topicId}`}
        className="truncate transition-colors hover:text-ink"
        title={topicData?.title}
      >
        {topicData?.title}
      </Link>
      <ChevronRight className="h-4 w-4 shrink-0 text-ink-tertiary" />
      <span className="shrink-0 whitespace-nowrap text-ink">Module {moduleIndex}</span>
    </div>
  );
});

ModuleBreadcrumbs.propTypes = {
  basePath: PropTypes.string.isRequired,
  topicId: PropTypes.string.isRequired,
  topicData: PropTypes.object,
  moduleIndex: PropTypes.number.isRequired,
};

ModuleBreadcrumbs.displayName = 'ModuleBreadcrumbs';

export { ModuleBreadcrumbs };
export default ModuleBreadcrumbs;
