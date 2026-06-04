import { Folder, FileText, ExternalLink } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

// ─── Component ────────────────────────────────────────────────────────────────

const SectionGroup = memo(function SectionGroup({ section }) {
  if (!section) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-bg shadow-sm transition-shadow duration-300">
      <div className="flex w-full items-center justify-between border-b border-border bg-surface px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-brand-subtle p-2.5">
            <Folder className="h-6 w-6 text-brand" />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold text-ink">{section.title}</h2>
            <p className="font-medium text-sm text-ink-secondary">{section.description}</p>
          </div>
        </div>
      </div>

      <div className="opacity-100 max-h-[1000px]">
        <div className="grid grid-cols-1 gap-3 p-2 md:grid-cols-2 lg:grid-cols-3">
          {section.items.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className="group relative flex flex-col rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent-emphasis hover:bg-canvas-hover hover:shadow-lg"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="rounded-xl bg-bg p-3 transition-colors text-ink-secondary group-hover:bg-brand-subtle group-hover:text-brand">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="absolute right-5 top-5 opacity-0 transition-opacity group-hover:opacity-100">
                  <ExternalLink className="h-4 w-4 text-brand" />
                </div>
              </div>

              <h3 className="mb-2 text-lg font-bold transition-colors text-ink group-hover:text-brand">
                {item.title}
              </h3>

              <p className="mb-4 line-clamp-2 text-sm text-ink-secondary">{item.description}</p>

              <div className="mt-auto flex flex-wrap gap-2 pt-4">
                {item.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="rounded-md border border-transparent bg-bg px-2.5 py-1 text-xs font-semibold transition-all text-ink-secondary group-hover:border-accent-subtle group-hover:bg-bg group-hover:text-brand"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
});

// ─── PropTypes ────────────────────────────────────────────────────────────────

SectionGroup.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        path: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  }),
};

SectionGroup.defaultProps = {
  section: null,
};

SectionGroup.displayName = 'SectionGroup';

export { SectionGroup };
export default SectionGroup;
