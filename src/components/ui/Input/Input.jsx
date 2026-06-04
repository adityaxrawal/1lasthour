import PropTypes from 'prop-types';
import React, { forwardRef, memo } from 'react';

import { cn } from '@/utils/cn';

// ─── Component ────────────────────────────────────────────────────────────────

function InputLabel({ label }) {
  if (!label) return null;
  return <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>;
}

function InputHelperText({ error, helperText }) {
  if (error) {
    return <p className="mt-1.5 text-sm text-danger-emphasis">{error}</p>;
  }
  if (helperText) {
    return <p className="mt-1.5 text-sm text-ink-secondary">{helperText}</p>;
  }
  return null;
}

function InputIcon({ icon, position }) {
  if (!icon) return null;
  const posClass = position === 'left' ? 'left-3' : 'right-3';
  return (
    <div className={`icon-sm absolute ${posClass} top-1/2 -translate-y-1/2 text-ink-secondary`}>
      {icon}
    </div>
  );
}

const InputComponent = forwardRef(
  (
    { label, error, helperText, leftIcon, rightIcon, fullWidth = false, className = '', ...props },
    ref
  ) => {
    const inputClasses = `
    w-full px-3 py-2.5 h-10 rounded-md
    bg-bg border border-border
    text-ink placeholder-fg-muted
    focus:outline-none focus:border-accent-emphasis focus:ring-4 focus:ring-accent-muted
    transition-all duration-200
  `;

    return (
      <div className={cn(fullWidth ? 'w-full' : '', className)}>
        <InputLabel label={label} />
        <div className="relative">
          <InputIcon icon={leftIcon} position="left" />
          <input
            ref={ref}
            className={cn(
              inputClasses,
              error ? 'border-danger-emphasis focus:ring-danger-muted' : '',
              leftIcon ? 'pl-10' : '',
              rightIcon ? 'pr-10' : ''
            )}
            {...props}
          />
          <InputIcon icon={rightIcon} position="right" />
        </div>
        <InputHelperText error={error} helperText={helperText} />
      </div>
    );
  }
);

InputComponent.displayName = 'Input';

const Input = memo(InputComponent);

// ─── PropTypes ────────────────────────────────────────────────────────────────

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

Input.defaultProps = {
  label: '',
  error: '',
  helperText: '',
  leftIcon: null,
  rightIcon: null,
  fullWidth: false,
  className: '',
};

export { Input };
export default Input;
