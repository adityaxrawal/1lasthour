import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { APP_NAV_LINKS, checkIsActive } from '../navConstants';

const MobileNav = memo(function MobileNav({
  isLanding,
  navLinks,
  handleScrollTo,
  searchValue,
  onSearchChange,
  setMobileMenuOpen,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in border-t border-border bg-bg md:hidden">
      <div className="mx-auto max-w-[1400px] space-y-1 px-6 py-4">
        {isLanding ? (
          <>
            {navLinks.map((link) => {
              if (link.path) {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.id}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block w-full rounded-lg px-4 py-3 text-left font-medium transition-colors hover:bg-surface hover:text-ink ${
                      isActive ? 'bg-surface text-ink' : 'text-ink-secondary'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
                <button
                  type="button"
                  key={link.id}
                  onClick={() => {
                    if (location.pathname !== '/') {
                      setMobileMenuOpen(false);
                      navigate(`/#${link.id}`);
                    } else {
                      handleScrollTo(link.id);
                    }
                  }}
                  className="block w-full rounded-lg px-4 py-3 text-left font-medium transition-colors text-ink-secondary hover:bg-surface hover:text-ink"
                >
                  {link.label}
                </button>
              );
            })}
            <Link
              to="/cfa/level-1"
              className="mt-3 block w-full rounded-lg bg-highlight px-5 py-3 text-center text-sm font-semibold text-ink-inverted transition-all hover:bg-highlight-hover"
            >
              Start Studying →
            </Link>
          </>
        ) : (
          <>
            <div className="mb-4">
              <input
                type="text"
                className="block w-full rounded-full border border-border bg-surface/50 py-2 px-4 text-sm shadow-sm transition-all text-ink placeholder-fg-subtle/70 focus:border-highlight focus:outline-none focus:ring-1 focus:ring-highlight"
                placeholder="Search modules..."
                value={searchValue}
                onChange={onSearchChange}
              />
            </div>
            {APP_NAV_LINKS.map((link) => {
              const isActive = checkIsActive(location.pathname, link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block w-full rounded-lg px-4 py-3 text-left transition-colors ${
                    isActive
                      ? 'bg-surface text-ink font-medium'
                      : 'text-ink-secondary hover:bg-surface hover:text-ink'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
});

MobileNav.propTypes = {
  isLanding: PropTypes.bool.isRequired,
  navLinks: PropTypes.array,
  handleScrollTo: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  setMobileMenuOpen: PropTypes.func.isRequired,
};

MobileNav.displayName = 'MobileNav';

export { MobileNav };
export default MobileNav;
