import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { APP_NAV_LINKS, checkIsActive } from '../navConstants';

const DesktopNav = memo(function DesktopNav() {
  const location = useLocation();

  return (
    <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
      {APP_NAV_LINKS.map((link) => {
        const isActive = checkIsActive(location.pathname, link.path);
        return (
          <Link
            key={link.path}
            to={link.path}
            className={`relative rounded-full px-4 py-2 font-medium text-sm transition-all duration-300 ${
              isActive
                ? 'bg-surface shadow-sm ring-1 ring-border text-ink'
                : 'transition-colors text-ink-secondary hover:bg-surface/50 hover:text-ink'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
});

DesktopNav.displayName = 'DesktopNav';

export { DesktopNav };
export default DesktopNav;
