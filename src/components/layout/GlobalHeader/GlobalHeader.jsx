import PropTypes from 'prop-types';
import React, { useState, useEffect, memo } from 'react';
import { useLocation, useSearchParams, Link, useNavigate } from 'react-router-dom';

import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';

import { DesktopNav } from './components/DesktopNav';
import { HeaderLeft } from './components/HeaderLeft';
import { HeaderRight } from './components/HeaderRight';
import { MobileNav } from './components/MobileNav';

const LandingNav = memo(function LandingNav({ navLinks, handleScrollTo }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="hidden items-center gap-8 md:flex">
      {navLinks.map((link) => {
        if (link.path) {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.id}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-ink ${isActive ? 'text-ink' : 'text-ink-secondary'}`}
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
                navigate(`/#${link.id}`);
              } else {
                handleScrollTo(link.id);
              }
            }}
            className="text-sm font-medium transition-colors text-ink-secondary hover:text-ink"
          >
            {link.label}
          </button>
        );
      })}
    </div>
  );
});
LandingNav.propTypes = {
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleScrollTo: PropTypes.func.isRequired,
};

// ─── Component ────────────────────────────────────────────────────────────────

function useIsLanding(pathname) {
  return pathname === '/' || pathname === '/landing' || pathname === '/about-exam';
}

function useSearchHandling(setSearchParams) {
  return (e) => {
    const term = e.target.value;
    setSearchParams((prev) => {
      if (term) {
        prev.set('q', term);
      } else {
        prev.delete('q');
      }
      return prev;
    });
  };
}

const GlobalHeader = memo(function GlobalHeader({ navLinks = [], onScrollTo = () => {} }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const isLanding = useIsLanding(location.pathname);
  const breadcrumbs = useBreadcrumbs();
  const handleSearch = useSearchHandling(setSearchParams);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    setMobileMenuOpen(false);
    onScrollTo(id);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 transition-all duration-300 border-b border-border/50 bg-bg shadow-sm">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        <HeaderLeft isLanding={isLanding} searchParams={searchParams} handleSearch={handleSearch} />

        {isLanding ? (
          <LandingNav navLinks={navLinks} handleScrollTo={handleScrollTo} />
        ) : (
          <DesktopNav />
        )}

        <HeaderRight
          isLanding={isLanding}
          breadcrumbs={breadcrumbs}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </div>

      {mobileMenuOpen && (
        <MobileNav
          isLanding={isLanding}
          navLinks={navLinks}
          handleScrollTo={handleScrollTo}
          searchValue={searchParams.get('q') || ''}
          onSearchChange={handleSearch}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      )}
    </header>
  );
});

// ─── PropTypes ────────────────────────────────────────────────────────────────

GlobalHeader.propTypes = {
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  onScrollTo: PropTypes.func,
};

GlobalHeader.displayName = 'GlobalHeader';

export { GlobalHeader };
export default GlobalHeader;
