import { ChevronRight } from 'lucide-react';
import React, { memo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

import { Card, Badge } from '@components/ui';
import { GlobalSearchResults } from '@features/dashboard/components';
import { PROJECT_STRUCTURE } from '@features/dashboard/constants';

// ─── Component ────────────────────────────────────────────────────────────────

const DashboardPage = memo(function DashboardPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  // If searching, show the global results view
  if (searchQuery) {
    return <GlobalSearchResults />;
  }

  // Otherwise show the standard dashboard
  return (
    <div className="space-y-10">
      {/* Main Grid */}
      {PROJECT_STRUCTURE.map((section, idx) => (
        <div key={idx}>
          <h2 className="mb-4 border-b border-border pb-2 text-sm font-semibold uppercase tracking-wider text-ink-secondary">
            {section.category}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item, itemIdx) => {
              const IconComponent = item.icon || ChevronRight;

              return (
                <Link to={item.path} key={itemIdx} className="group block h-full">
                  <Card className="flex h-full flex-col transition-all duration-200 hover:border-accent-emphasis hover:shadow-sm">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="rounded-md border border-border bg-surface p-2 transition-colors text-ink-secondary group-hover:border-accent-muted group-hover:text-brand">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      {item.status && (
                        <Badge variant={item.status === 'Completed' ? 'success' : 'default'}>
                          {item.status}
                        </Badge>
                      )}
                    </div>

                    <h3 className="mb-2 text-lg font-bold transition-colors text-ink group-hover:text-brand">
                      {item.title}
                    </h3>
                    <p className="mb-4 leading-relaxed text-sm text-ink-secondary">
                      {item.description}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-border bg-surface px-2 py-1 text-xs text-ink-tertiary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
});

DashboardPage.displayName = 'DashboardPage';

export { DashboardPage };
export default DashboardPage;
