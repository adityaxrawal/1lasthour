import { ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { SearchBar, CategoryList } from '@components/ui';

const LevelFilter = memo(function LevelFilter({ level }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-ink-secondary">
        CFA LEVELS
      </h3>
      <ul className="space-y-2">
        <li>
          <Link
            to="/cfa/level-1"
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              level === 1 ? 'text-brand-bright' : 'text-ink-secondary hover:text-brand-bright'
            }`}
          >
            <ChevronRight className="h-4 w-4" />
            Level I
          </Link>
        </li>
        <li className="flex items-center gap-2 text-sm text-ink-tertiary cursor-not-allowed">
          <ChevronRight className="h-4 w-4" />
          Level II
          <span className="ml-auto text-[10px] uppercase tracking-wider text-ink-tertiary">
            Soon
          </span>
        </li>
        <li className="flex items-center gap-2 text-sm text-ink-tertiary cursor-not-allowed">
          <ChevronRight className="h-4 w-4" />
          Level III
          <span className="ml-auto text-[10px] uppercase tracking-wider text-ink-tertiary">
            Soon
          </span>
        </li>
      </ul>
    </div>
  );
});
LevelFilter.propTypes = { level: PropTypes.number.isRequired };

const LatestReadings = memo(function LatestReadings({ readings, basePath }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-ink-secondary">
        LATEST READINGS
      </h3>
      <div className="space-y-4">
        {readings.map((topic) => (
          <Link key={topic.id} to={`${basePath}/${topic.id}`} className="group flex gap-4">
            <div className="w-12 shrink-0 pt-0.5 text-xs font-bold text-ink-secondary">
              {topic.weight}
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm font-bold text-ink transition-colors group-hover:text-brand-bright">
                {topic.title}
              </p>
              <p className="mt-1 text-xs text-ink-secondary">
                {topic.modules?.length || 0} modules
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
});
LatestReadings.propTypes = {
  readings: PropTypes.array.isRequired,
  basePath: PropTypes.string.isRequired,
};

const PopularTags = memo(function PopularTags({ tags }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-ink-secondary">
        POPULAR TAGS
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="cursor-pointer rounded-full border border-border px-3 py-1 text-xs transition-colors text-ink-secondary hover:border-brand-bright hover:text-brand-bright"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
});
PopularTags.propTypes = { tags: PropTypes.arrayOf(PropTypes.string).isRequired };

const LevelSidebar = memo(function LevelSidebar({
  searchQuery,
  setSearchQuery,
  categories,
  activeCategory,
  level,
  latestReadings,
  config,
  basePath,
}) {
  return (
    <aside className="shrink-0 space-y-8 lg:w-72">
      <SearchBar placeholder="Search topics..." value={searchQuery} onChange={setSearchQuery} />
      <CategoryList title="ALL TOPICS" items={categories} activeId={activeCategory} />
      <LevelFilter level={level} />
      <LatestReadings readings={latestReadings} basePath={basePath} />
      <PopularTags tags={config.popularTags} />
    </aside>
  );
});

LevelSidebar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  activeCategory: PropTypes.string,
  level: PropTypes.number.isRequired,
  latestReadings: PropTypes.array.isRequired,
  config: PropTypes.object.isRequired,
  basePath: PropTypes.string.isRequired,
};

LevelSidebar.defaultProps = {
  activeCategory: null,
};

LevelSidebar.displayName = 'LevelSidebar';

export { LevelSidebar };
export default LevelSidebar;
