import PropTypes from 'prop-types';
import React, { memo } from 'react';

import { cn } from '@/utils/cn';

// ─── Component ────────────────────────────────────────────────────────────────

const Button = memo(function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  children,
  leftIcon,
  rightIcon,
  onClick,
  className = '',
  ...props
}) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-medium rounded-md
    transition-all duration-200
    focus:outline-none focus:ring-4 focus:ring-accent-muted
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
  `;

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm h-8',
    md: 'px-6 py-2.5 text-[15px] h-10', // Spec: 40px height, 15px font
    lg: 'px-8 py-3 text-base h-12',
  };

  const variantClasses = {
    primary: `
      bg-brand text-ink-inverted
      hover:bg-accent-hover
      active:scale-[0.98]
    `,
    secondary: `
      bg-bg border border-border
      text-ink
      hover:bg-surface hover:border-border-hover
      active:bg-canvas-hover
    `,
    tertiary: `
      bg-transparent text-brand
      hover:text-accent-hover
      p-0 h-auto
    `,
    ghost: `
      bg-transparent text-ink-secondary
      hover:bg-surface hover:text-ink
    `,
    danger: `
      bg-danger-emphasis text-ink-inverted
      hover:bg-error-mid
    `,
  };

  const getVariantClass = (v) => {
    if (variantClasses[v]) return variantClasses[v];
    if (v === 'accent') return variantClasses.primary;
    if (v === 'outline') return variantClasses.secondary;
    if (v === 'invisible') return variantClasses.ghost;
    return variantClasses.primary;
  };

  return (
    <button
      type="button"
      className={cn(
        baseClasses,
        sizeClasses[size] || sizeClasses.md,
        getVariantClass(variant),
        className
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {leftIcon && <span className="inline-flex icon-sm">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="inline-flex icon-sm">{rightIcon}</span>}
    </button>
  );
});

// ─── PropTypes ────────────────────────────────────────────────────────────────

Button.propTypes = {
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'ghost',
    'danger',
    'accent',
    'outline',
    'invisible',
  ]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  children: PropTypes.node.isRequired,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  variant: 'primary',
  size: 'md',
  disabled: false,
  fullWidth: false,
  leftIcon: null,
  rightIcon: null,
  onClick: undefined,
  className: '',
};

Button.displayName = 'Button';

export { Button };
export default Button;
