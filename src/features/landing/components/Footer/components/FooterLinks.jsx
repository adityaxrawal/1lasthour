import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const FooterLinkItem = memo(function FooterLinkItem({ to, href, children }) {
  const className = "text-white transition-colors hover:text-secondary";
  if (href) {
    return (
      <li>
        <a href={href} className={className} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
          {children}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link to={to} className={className}>
        {children}
      </Link>
    </li>
  );
});
FooterLinkItem.propTypes = { to: PropTypes.string, href: PropTypes.string, children: PropTypes.node.isRequired };

const FooterLinkGroup = memo(function FooterLinkGroup({ title, links }) {
  return (
    <div>
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">
        {title}
      </h4>
      <ul className="space-y-2 text-sm text-white">
        {links.map((link, i) => (
          <FooterLinkItem key={i} to={link.to} href={link.href}>
            {link.label}
          </FooterLinkItem>
        ))}
      </ul>
    </div>
  );
});
FooterLinkGroup.propTypes = { title: PropTypes.string.isRequired, links: PropTypes.arrayOf(PropTypes.object).isRequired };

const QUICK_LINKS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/cfa', label: 'CFA Curriculum' },
  { to: '/cfa/level-1', label: 'Level I' },
];

const POPULAR_TOPICS = [
  { to: '/cfa/level-1/ethics', label: 'Ethics' },
  { to: '/cfa/level-1/quantitative-methods', label: 'Quantitative Methods' },
  { to: '/cfa/level-1/economics', label: 'Economics' },
  { to: '/cfa/level-1/fra', label: 'FRA' },
];

const RESOURCES = [
  { href: 'https://www.cfainstitute.org', label: 'CFA Institute' },
  { to: '/about-exam', label: 'Exam Format' },
  { to: '#study-guide', label: 'Study Guide' },
  { to: '#calculator-tips', label: 'Calculator Tips' },
];

const FooterLinks = memo(function FooterLinks() {
  return (
    <>
      <FooterLinkGroup title="Quick Links" links={QUICK_LINKS} />
      <FooterLinkGroup title="Popular Topics" links={POPULAR_TOPICS} />
      <FooterLinkGroup title="Resources" links={RESOURCES} />
    </>
  );
});

FooterLinks.displayName = 'FooterLinks';

export { FooterLinks };
export default FooterLinks;
