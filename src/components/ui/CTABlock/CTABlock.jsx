import PropTypes from 'prop-types';
import React, { memo } from 'react';

// ─── Component ────────────────────────────────────────────────────────────────

const CTABlock = memo(function CTABlock({
  variant = 'primary',
  title,
  description,
  children,
  className = '',
}) {
  const variantStyles = {
    primary: 'bg-highlight text-highlight-text',
    secondary: 'bg-cta-secondary text-cta-secondary-text',
  };

  return (
    <div className={`rounded-lg p-8 md:p-12 ${variantStyles[variant]} ${className}`}>
      <div className="max-w-2xl">
        {title && (
          <h2 className="mb-3 text-2xl font-bold leading-tight md:text-3xl">
            {title}
            <span className="ml-2 inline-block text-brand">●</span>
          </h2>
        )}
        {description && (
          <p
            className={`mb-6 text-sm leading-relaxed md:text-base ${
              variant === 'primary' ? 'text-ink-secondary' : 'opacity-90'
            }`}
          >
            {description}
          </p>
        )}
        {children && <div className="flex flex-wrap gap-3">{children}</div>}
      </div>
    </div>
  );
});

// ─── PropTypes ────────────────────────────────────────────────────────────────

CTABlock.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary']),
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

CTABlock.defaultProps = {
  variant: 'primary',
  title: '',
  description: '',
  children: null,
  className: '',
};

CTABlock.displayName = 'CTABlock';

export { CTABlock };
export default CTABlock;
