import { ArrowRight, Menu, X, Home, ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import ThemeToggle from '@/components/ui/ThemeToggle';

const HeaderBreadcrumbs = ({ isLanding, breadcrumbs }) => {
  if (isLanding || breadcrumbs.length === 0) return null;

  return (
    <div className="hidden items-center gap-1.5 rounded-full border border-border bg-surface/50 px-3 py-1.5 text-xs text-ink-secondary lg:flex mr-2">
      <Link
        to="/"
        className="flex items-center transition-colors hover:text-highlight"
        title="Home"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>

      {breadcrumbs.map((crumb, idx) => (
        <React.Fragment key={crumb.url}>
          <ChevronRight className="h-3 w-3 text-ink-tertiary/70" />
          {idx === breadcrumbs.length - 1 ? (
            <span className="max-w-[150px] truncate font-medium text-ink">{crumb.label}</span>
          ) : (
            <Link
              to={crumb.url}
              className="max-w-[100px] truncate transition-colors hover:text-highlight"
            >
              {crumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const HeaderCTA = ({ isLanding }) => {
  if (!isLanding) return null;

  return (
    <Link
      to="/cfa/level-1"
      className="hidden items-center gap-2 rounded-lg bg-highlight px-5 py-2 text-sm font-semibold text-ink-inverted shadow-md shadow-highlight/20 transition-all hover:bg-highlight-hover hover:shadow-lg sm:inline-flex"
    >
      Start Studying
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
};

const MobileMenuToggle = ({ mobileMenuOpen, setMobileMenuOpen }) => (
  <button
    type="button"
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    className="rounded-lg p-2 transition-colors text-ink-secondary hover:bg-surface hover:text-ink md:hidden"
    aria-label="Toggle menu"
  >
    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
  </button>
);

const HeaderRight = memo(function HeaderRight({
  isLanding,
  breadcrumbs,
  mobileMenuOpen,
  setMobileMenuOpen,
}) {
  return (
    <div className="z-10 flex items-center gap-3">
      <HeaderBreadcrumbs isLanding={isLanding} breadcrumbs={breadcrumbs} />
      <ThemeToggle />
      <HeaderCTA isLanding={isLanding} />
      <MobileMenuToggle mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
    </div>
  );
});

HeaderRight.propTypes = {
  isLanding: PropTypes.bool.isRequired,
  breadcrumbs: PropTypes.array.isRequired,
  mobileMenuOpen: PropTypes.bool.isRequired,
  setMobileMenuOpen: PropTypes.func.isRequired,
};

HeaderRight.displayName = 'HeaderRight';

export { HeaderRight };
export default HeaderRight;
