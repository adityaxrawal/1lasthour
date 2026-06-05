import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const FooterBottom = memo(function FooterBottom() {
  return (
    <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
      <p className="text-sm text-white">
        © {new Date().getFullYear()} 1lasthour. All rights reserved.
      </p>
      <div className="flex items-center gap-4 text-sm text-white">
        <Link to="/privacy-policy" className="text-white transition-colors hover:text-secondary">
          {'Privacy Policy'}
        </Link>
        <a
          href="/terms-and-conditions"
          className="text-white transition-colors hover:text-secondary"
        >
          {'Terms of Service'}
        </a>
      </div>
    </div>
  );
});

FooterBottom.displayName = 'FooterBottom';

export { FooterBottom };
export default FooterBottom;
