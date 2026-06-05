import { Search, FileText, Calculator, Lightbulb, BookOpen, ArrowRight } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { memo, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { useTopicsQuery } from '@/features/cfa/hooks/useTopicsQuery';
import { globalSearch, groupResultsByType } from '@/utils/searchUtils';
import { Card, Badge } from '@components/ui';

// ─── Sub-Components ────────────────────────────────────────────────────────────

const SearchSection = memo(function SearchSection({ title, items, Icon }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-ink-secondary">
        {Icon && <Icon className="h-4 w-4" />}
        <h3 className="text-sm font-semibold uppercase tracking-wider">{title}</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link to={item.path} key={item.id} className="group h-full">
            <Card className="flex h-full flex-col transition-all duration-200 hover:border-accent-emphasis hover:shadow-md">
              <div className="mb-2 flex items-start justify-between">
                <Badge variant="outline" className="text-xs capitalize">
                  {item.type}
                </Badge>
                {item.context && (
                  <span
                    className="max-w-[50%] truncate text-right text-xs text-ink-tertiary"
                    title={item.context}
                  >
                    {item.context}
                  </span>
                )}
              </div>

              <h4 className="mb-2 line-clamp-2 text-base font-bold transition-colors text-ink group-hover:text-brand">
                {item.title}
              </h4>

              {item.description && (
                <p className="mb-4 flex-grow line-clamp-3 text-sm text-ink-secondary">
                  {item.description}
                </p>
              )}

              <div className="mt-auto flex items-center pt-2 text-xs font-medium opacity-0 transition-all duration-200 text-brand group-hover:-translate-y-1 group-hover:opacity-100">
                View Details <ArrowRight className="ml-1 h-3 w-3" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
});

SearchSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      path: PropTypes.string.isRequired,
      context: PropTypes.string,
    })
  ),
  Icon: PropTypes.elementType,
};

SearchSection.defaultProps = {
  items: [],
  Icon: null,
};

// ─── Component ────────────────────────────────────────────────────────────────

const GlobalSearchResults = memo(function GlobalSearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  // Fetch data to build the search index from (defaulting to level 1)
  const { data: topicsResponse } = useTopicsQuery(1);
  const topicsData = useMemo(() => topicsResponse?.data || [], [topicsResponse?.data]);

  const results = useMemo(() => globalSearch(query, topicsData), [query, topicsData]);
  const groupedResults = useMemo(() => groupResultsByType(results), [results]);

  if (!query) return null;

  if (results.length === 0) {
    return (
      <div className="animate-in fade-in rounded-md border border-dashed border-border bg-surface py-20 text-center duration-500">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-bg shadow-sm">
          <Search className="h-8 w-8 text-ink-secondary" />
        </div>
        <h3 className="mb-2 text-lg font-medium text-ink">No results found</h3>
        <p className="mx-auto mb-6 max-w-md text-ink-secondary">
          We couldn&apos;t find any topics, modules, or concepts matching &quot;{query}&quot;. Try
          checking for typos or using broader keywords.
        </p>
        <button
          onClick={() => setSearchParams({})}
          className="rounded-md border border-border bg-bg px-5 py-2.5 text-sm font-medium shadow-sm transition-colors text-ink hover:bg-canvas-hover"
        >
          Clear search
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in slide-in-from-bottom-4 space-y-8 duration-500">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h2 className="text-2xl font-bold text-ink">
          Search Results for <span className="text-brand">&quot;{query}&quot;</span>
        </h2>
        <span className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-ink-secondary">
          {results.length} result{results.length !== 1 ? 's' : ''} found
        </span>
      </div>

      {groupedResults.topic && (
        <SearchSection title="Topics" items={groupedResults.topic} Icon={BookOpen} />
      )}
      {groupedResults.module && (
        <SearchSection title="Modules" items={groupedResults.module} Icon={FileText} />
      )}
      {groupedResults.concept && (
        <SearchSection title="Concepts" items={groupedResults.concept} Icon={Lightbulb} />
      )}
      {groupedResults.formula && (
        <SearchSection title="Formulas" items={groupedResults.formula} Icon={Calculator} />
      )}
    </div>
  );
});

GlobalSearchResults.displayName = 'GlobalSearchResults';

export { GlobalSearchResults };
export default GlobalSearchResults;
