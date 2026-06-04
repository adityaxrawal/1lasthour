import { ArrowLeft, Clock } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const LEVEL_LABELS = { 1: 'I', 2: 'II', 3: 'III' };

const ComingSoonPage = memo(function ComingSoonPage({ level, topicId, moduleTitle, basePath }) {
  return (
    <div className="space-y-10">
      {/* Back link */}
      <div className="flex items-center gap-3 text-sm text-ink-secondary">
        <Link
          to={`${basePath}/${topicId}`}
          className="flex items-center gap-1 transition-colors hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Topic</span>
        </Link>
        <span className="text-ink-tertiary">|</span>
        <Link to={basePath} className="transition-colors hover:text-brand">
          Level {LEVEL_LABELS[level]}
        </Link>
      </div>

      {/* Coming Soon Content */}
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-border bg-surface">
          <Clock className="h-10 w-10 text-ink-tertiary" />
        </div>

        <h1 className="mb-3 text-3xl font-bold text-ink">Content Coming Soon</h1>
        <p className="mb-2 max-w-md text-ink-secondary">
          We&apos;re currently building the full curriculum for{' '}
          <span className="font-medium text-ink">CFA Level {LEVEL_LABELS[level]}</span>.
        </p>
        {moduleTitle && (
          <p className="mb-8 max-w-md text-sm text-ink-tertiary italic">
            &quot;{moduleTitle}&quot;
          </p>
        )}
        <p className="mb-8 max-w-md text-sm text-ink-secondary">
          Detailed cheatsheets, learning outcomes, key concepts, and formulas will be available here
          once the content is ready. Check back soon.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to={basePath}
            className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-ink-inverted transition-opacity hover:opacity-90"
          >
            Browse Level {LEVEL_LABELS[level]} Topics
          </Link>
          <Link
            to="/cfa/level-1"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent-emphasis hover:text-brand"
          >
            Go to Level I
          </Link>
        </div>
      </div>
    </div>
  );
});

ComingSoonPage.propTypes = {
  level: PropTypes.number.isRequired,
  topicId: PropTypes.string,
  moduleTitle: PropTypes.string,
  basePath: PropTypes.string.isRequired,
};

ComingSoonPage.defaultProps = {
  topicId: '',
  moduleTitle: '',
};

ComingSoonPage.displayName = 'ComingSoonPage';

export { ComingSoonPage };
export default ComingSoonPage;
