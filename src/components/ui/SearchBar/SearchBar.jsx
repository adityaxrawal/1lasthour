import { Search } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

import { cn } from '@/utils/cn';

// ─── Component ────────────────────────────────────────────────────────────────

const SearchBar = memo(function SearchBar({
  placeholder = 'Search...',
  value,
  onChange,
  onSubmit,
  className = '',
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-surface py-3 pl-4 pr-12 transition-colors text-ink placeholder:text-ink-tertiary focus:border-accent-emphasis focus:outline-none"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-brand p-2 transition-colors text-ink-inverted hover:bg-accent-muted"
        aria-label="Submit search"
      >
        <Search className="h-4 w-4" />
      </button>
    </form>
  );
});

// ─── PropTypes ────────────────────────────────────────────────────────────────

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
};

SearchBar.defaultProps = {
  placeholder: 'Search...',
  onSubmit: undefined,
  className: '',
};

SearchBar.displayName = 'SearchBar';

export { SearchBar };
export default SearchBar;
