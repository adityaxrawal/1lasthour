import PropTypes from 'prop-types';
import React, { memo } from 'react';

// ─── Component ────────────────────────────────────────────────────────────────

const NavItem = memo(function NavItem({ id, label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      className={`w-full border-l-2 px-4 py-2 text-left text-sm font-medium transition-all duration-200 ${
        active
          ? 'border-accent-emphasis bg-brand-subtle/10 text-brand'
          : 'border-transparent text-ink-secondary hover:bg-surface hover:text-ink'
      }`}
    >
      {label}
    </button>
  );
});

// ─── PropTypes ────────────────────────────────────────────────────────────────

NavItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

NavItem.defaultProps = {
  active: false,
};

NavItem.displayName = 'NavItem';

export { NavItem };
export default NavItem;
