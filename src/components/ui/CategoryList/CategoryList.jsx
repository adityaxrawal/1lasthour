import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

// ─── Component ────────────────────────────────────────────────────────────────

const CategoryList = memo(function CategoryList({
  title = 'ALL CATEGORIES',
  items = [],
  activeId,
  className = '',
}) {
  return (
    <div className={`${className}`}>
      {title && (
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-ink-secondary">
          {title}
        </h3>
      )}
      <ul className="space-y-2">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <Link
                to={item.path}
                className={`flex items-center gap-2 text-sm transition-colors ${
                  isActive ? 'font-medium text-brand-bright' : 'text-ink-secondary hover:text-ink'
                }`}
              >
                {isActive && <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-bright" />}
                <span
                  className={isActive ? 'font-bold text-brand-bright' : 'ml-3.5 text-ink-secondary'}
                >
                  {item.label}
                </span>
                {item.count !== undefined && (
                  <span className="ml-auto text-xs text-ink-tertiary">({item.count})</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

// ─── PropTypes ────────────────────────────────────────────────────────────────

CategoryList.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      count: PropTypes.number,
    })
  ),
  activeId: PropTypes.string,
  className: PropTypes.string,
};

CategoryList.defaultProps = {
  title: 'ALL CATEGORIES',
  items: [],
  activeId: undefined,
  className: '',
};

CategoryList.displayName = 'CategoryList';

export { CategoryList };
export default CategoryList;
