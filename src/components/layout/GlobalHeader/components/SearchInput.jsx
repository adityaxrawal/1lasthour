import { Search } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

const SearchInput = memo(function SearchInput({ value, onChange }) {
  return (
    <div className="group relative hidden w-64 sm:block">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors text-ink-tertiary group-focus-within:text-highlight" />
      <input
        type="text"
        className="block w-full rounded-full border border-border bg-surface/50 py-1.5 pl-10 pr-4 text-sm shadow-sm transition-all text-ink placeholder-fg-subtle/70 focus:border-highlight focus:outline-none focus:ring-1 focus:ring-highlight"
        placeholder="Search modules..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
});

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

SearchInput.displayName = 'SearchInput';

export { SearchInput };
export default SearchInput;
