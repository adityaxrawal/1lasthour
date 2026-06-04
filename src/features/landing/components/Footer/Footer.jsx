import React, { memo } from 'react';

import { FooterBottom } from './components/FooterBottom';
import { FooterBrand } from './components/FooterBrand';
import { FooterLinks } from './components/FooterLinks';

// ─── Component ────────────────────────────────────────────────────────────────

const Footer = memo(function Footer() {
  return (
    <footer className="mt-auto bg-[var(--color-brand)] text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <FooterBrand />

          {/* Links */}
          <FooterLinks />
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export { Footer };
export default Footer;
