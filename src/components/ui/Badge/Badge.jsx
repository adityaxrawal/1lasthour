import PropTypes from 'prop-types';
import React, { memo } from 'react';

const VARIANTS = {
  default: 'bg-surface text-ink-secondary border-border',
  accent: 'bg-brand-subtle text-brand border-accent-muted',
  success: 'bg-success-tint text-success border-success-muted',
  warning: 'bg-attention-subtle text-attention-emphasis border-attention-muted',
  attention: 'bg-attention-subtle text-attention-emphasis border-attention-muted',
  error: 'bg-danger-subtle text-danger-emphasis border-danger-muted',
  danger: 'bg-danger-subtle text-danger-emphasis border-danger-muted',
  primary: 'bg-brand-subtle text-brand border-accent-muted',
  secondary: 'bg-surface text-ink-secondary border-border',
};

const SIZES = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-xs font-medium',
  lg: 'px-3 py-1 text-sm',
};

// ─── Component ────────────────────────────────────────────────────────────────

const Badge = memo(function Badge({
  variant = 'default',
  size = 'md',
  children,
  className = '',
  ...props
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border transition-colors duration-200 ${
        VARIANTS[variant] || VARIANTS.default
      } ${SIZES[size] || SIZES.md} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
});

// ─── PropTypes ────────────────────────────────────────────────────────────────

Badge.propTypes = {
  variant: PropTypes.oneOf(Object.keys(VARIANTS)),
  size: PropTypes.oneOf(Object.keys(SIZES)),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Badge.defaultProps = {
  variant: 'default',
  size: 'md',
  className: '',
};

Badge.displayName = 'Badge';

export { Badge };
export default Badge;
