import { Sparkles } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { env } from '@/config/env';

import { SearchInput } from './SearchInput';

const HeaderLeft = memo(function HeaderLeft({ isLanding, searchParams, handleSearch }) {
  return (
    <div className="z-10 flex flex-shrink-0 items-center gap-6">
      <Link to="/" className="group flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-highlight shadow-lg shadow-highlight/20 transition-transform duration-300 text-ink-inverted group-hover:scale-105">
          <Sparkles className="h-4 w-4" />
        </div>
        <span className="font-bold text-lg tracking-tight transition-colors text-ink group-hover:text-highlight">
          1lasthour.
        </span>
        {env.isDev && (
          <span className="ml-2 rounded-md bg-amber-tint px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-emphasis border border-amber-muted">
            DEV
          </span>
        )}
      </Link>

      {/* Search Input (App Only) */}
      {!isLanding && (
        <SearchInput
          value={searchParams.get('q') || ''}
          onChange={handleSearch}
        />
      )}
    </div>
  );
});

HeaderLeft.propTypes = {
  isLanding: PropTypes.bool.isRequired,
  searchParams: PropTypes.object.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

HeaderLeft.displayName = 'HeaderLeft';

export { HeaderLeft };
export default HeaderLeft;
