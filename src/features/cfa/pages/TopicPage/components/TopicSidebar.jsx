import { BookOpen, Clock, PieChart, Search } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

import { CategoryList } from '@components/ui';

const TopicSidebar = memo(function TopicSidebar({ topicData, sidebarTopics, topicId }) {
  return (
    <aside className="shrink-0 space-y-8 lg:w-[320px]">
      {/* Other Topics */}
      <div className="space-y-6">
        <div className="relative flex">
          <input
            type="text"
            placeholder="Search topics..."
            className="w-full rounded-l-md border border-border bg-surface px-4 py-2 text-sm text-ink placeholder:text-ink-tertiary focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
          <button className="flex items-center justify-center rounded-r-md bg-brand px-3 text-ink-inverted transition-colors hover:bg-brand-dark">
            <Search className="h-4 w-4" />
          </button>
        </div>
        <CategoryList title="ALL TOPICS" items={sidebarTopics} activeId={topicId} />
      </div>

      {/* Quick Stats */}
      <div className="rounded-xl bg-brand/5 p-6">
        <h3 className="mb-6 text-xs font-bold uppercase tracking-wider text-brand">
          TOPIC OVERVIEW
        </h3>
        <ul className="space-y-4 text-[15px] font-medium">
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-ink-secondary">
              <PieChart className="h-5 w-5 text-brand" strokeWidth={2} />
              <span>Exam Weight</span>
            </div>
            <span className="text-lg font-bold text-ink">{topicData.weight}</span>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-ink-secondary">
              <BookOpen className="h-5 w-5 text-brand" strokeWidth={2} />
              <span>Modules</span>
            </div>
            <span className="text-lg font-bold text-ink">{topicData.modules?.length || 0}</span>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-ink-secondary">
              <Clock className="h-5 w-5 text-brand" strokeWidth={2} />
              <span>Est. Study Time</span>
            </div>
            <span className="text-lg font-bold text-ink">{topicData.studyHours || '~20h'}</span>
          </li>
        </ul>
      </div>

      {/* Popular Tags */}
      <div>
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-ink-secondary">
          POPULAR TAGS
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            'statistics',
            'probability',
            'regression',
            'time value of money',
            'hypothesis testing',
            'data analysis',
          ].map((tag) => (
            <span
              key={tag}
              className="cursor-pointer rounded-full border border-border px-3 py-1 text-xs text-ink-secondary transition-colors hover:border-brand hover:text-brand"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
});

TopicSidebar.propTypes = {
  topicData: PropTypes.object.isRequired,
  sidebarTopics: PropTypes.array.isRequired,
  topicId: PropTypes.string.isRequired,
};

TopicSidebar.displayName = 'TopicSidebar';

export { TopicSidebar };
export default TopicSidebar;
