import PropTypes from 'prop-types';
import React, { memo } from 'react';

// ─── Component ────────────────────────────────────────────────────────────────

const Card = memo(function Card({
  variant = 'default',
  hover = false,
  clickable = false,
  onClick,
  className = '',
  children,
  ...props
}) {
  const isClickable = clickable || !!onClick;

  // Ideas Lab reference: white cards on cream background, subtle border
  const baseClasses = `
    border border-border
    bg-surface
    rounded-lg
    transition-all duration-200
  `;

  // Hover: subtle border emphasis, very light shadow
  const hoverClasses =
    hover || isClickable
      ? `
    hover:border-accent-emphasis
    hover:shadow-sm
    cursor-pointer
  `
      : '';

  const variantClasses = {
    default: 'p-6',
    compact: 'p-4',
    glass: 'p-6',
    elevated: 'p-6 shadow-card bg-surface border-none',
    outline: 'p-6 border-2',
  };

  return (
    <div
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      className={`
        ${baseClasses} 
        ${hoverClasses} 
        ${variantClasses[variant] || variantClasses.default} 
        ${className}
      `}
      onClick={onClick}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.(e);
              }
            }
          : undefined
      }
      {...props}
    >
      {children}
    </div>
  );
});

// ─── PropTypes ────────────────────────────────────────────────────────────────

Card.propTypes = {
  variant: PropTypes.oneOf(['default', 'compact', 'glass', 'elevated', 'outline']),
  hover: PropTypes.bool,
  clickable: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Card.defaultProps = {
  variant: 'default',
  hover: false,
  clickable: false,
  onClick: undefined,
  className: '',
};

Card.displayName = 'Card';

export { Card };
export default Card;
