import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const SidebarRelated = memo(function SidebarRelated({ relatedTopics, basePath }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-ink-secondary">
        Related Topics
      </h3>
      <div className="space-y-3">
        {relatedTopics.map((topic) => (
          <Link
            key={topic.id}
            to={`${basePath}/${topic.id}`}
            className="flex items-center gap-2 text-sm font-medium transition-colors text-ink-secondary hover:text-brand"
          >
            <span className="text-[#f19a39] text-lg leading-none">→</span>
            <span>{topic.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
});

SidebarRelated.propTypes = {
  relatedTopics: PropTypes.array.isRequired,
  basePath: PropTypes.string.isRequired,
};

SidebarRelated.displayName = 'SidebarRelated';

export { SidebarRelated };
export default SidebarRelated;
