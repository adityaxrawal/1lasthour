import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const SidebarNavigation = memo(function SidebarNavigation({ topicData, basePath, topicId, moduleId }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-ink-secondary">
        Modules in {topicData.title}
      </h3>
      <div className="space-y-1">
        {topicData.modules.map((m, idx) => (
          <Link
            key={m.id}
            to={`${basePath}/${topicId}/${m.id}`}
            className={`block rounded-lg px-4 py-3 text-sm transition-all ${
              m.id === moduleId
                ? 'bg-brand-subtle font-semibold text-brand'
                : 'text-ink-secondary hover:bg-surface hover:text-ink font-medium'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-5 text-sm ${m.id === moduleId ? 'text-brand' : 'text-ink-tertiary'}`}
              >
                {idx + 1}.
              </span>
              <span className="line-clamp-1">{m.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
});

SidebarNavigation.propTypes = {
  topicData: PropTypes.object.isRequired,
  basePath: PropTypes.string.isRequired,
  topicId: PropTypes.string.isRequired,
  moduleId: PropTypes.string.isRequired,
};

SidebarNavigation.displayName = 'SidebarNavigation';

export { SidebarNavigation };
export default SidebarNavigation;
