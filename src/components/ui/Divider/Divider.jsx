import PropTypes from 'prop-types';
import React, { memo } from 'react';

// ─── Component ────────────────────────────────────────────────────────────────

const Divider = memo(function Divider({ orientation = 'horizontal', className = '', ...props }) {
  const classes =
    orientation === 'horizontal'
      ? `w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent ${className}`
      : `w-px h-full bg-gradient-to-b from-transparent via-slate-700 to-transparent ${className}`;

  return <div className={classes} {...props} />;
});

// ─── PropTypes ────────────────────────────────────────────────────────────────

Divider.propTypes = {
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  className: PropTypes.string,
};

Divider.defaultProps = {
  orientation: 'horizontal',
  className: '',
};

Divider.displayName = 'Divider';

export { Divider };
export default Divider;
