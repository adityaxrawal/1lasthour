import { clsx } from 'clsx';
import { Check, AlertTriangle } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';

/**
 * Style configuration for different concept types
 */
const CONCEPT_STYLES = {
  core: {
    icon: <Check className="h-4 w-4" strokeWidth={3} />,
    iconContainerClass: 'bg-brand text-ink-inverted',
    bgClass: 'bg-surface shadow-sm',
    borderClass: 'border-border',
  },
  important: {
    icon: <Check className="h-4 w-4" strokeWidth={3} />,
    iconContainerClass: 'bg-brand text-ink-inverted',
    bgClass: 'bg-surface shadow-sm',
    borderClass: 'border-border',
  },
  trick: {
    icon: <AlertTriangle className="h-4 w-4" strokeWidth={2.5} />,
    iconContainerClass: 'bg-warning text-ink-inverted',
    bgClass: 'bg-warning-tint',
    borderClass: 'border-warning-muted',
  },
  trap: {
    icon: <AlertTriangle className="h-4 w-4" strokeWidth={2.5} />,
    iconContainerClass: 'text-warning',
    bgClass: 'bg-warning-tint',
    borderClass: 'border-warning/30',
  },
};

const getConceptStyle = (type) => CONCEPT_STYLES[type] || CONCEPT_STYLES.core;

// ─── Sub-Components ────────────────────────────────────────────────────────────

const ConceptHeader = memo(function ConceptHeader({ style, text }) {
  return (
    <div className="flex items-start gap-4 mb-1">
      <div
        className={clsx(
          'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
          style.iconContainerClass
        )}
      >
        {style.icon}
      </div>
      <p className="leading-relaxed text-[15px] text-ink flex-1">{text}</p>
    </div>
  );
});
ConceptHeader.propTypes = { style: PropTypes.object.isRequired, text: PropTypes.string.isRequired };

const ConceptDetails = memo(function ConceptDetails({ isExpanded, details }) {
  if (!details) return null;
  return (
    <div
      className={clsx(
        'mt-2 overflow-hidden transition-all duration-200 pl-10',
        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      )}
    >
      <p className="border-t border-border pt-2 text-xs text-ink-secondary">
        {details}
      </p>
    </div>
  );
});
ConceptDetails.propTypes = { isExpanded: PropTypes.bool.isRequired, details: PropTypes.string };

const ConceptActions = memo(function ConceptActions({ isExpanded, hasDetails }) {
  if (!hasDetails) return null;
  return (
    <button
      type="button"
      className="mt-3 text-sm font-medium transition-colors text-brand hover:text-brand-emphasis flex items-center gap-1 pl-10"
    >
      {isExpanded ? 'Less' : 'More'}{' '}
      <span className="text-lg leading-none">{isExpanded ? '↑' : '›'}</span>
    </button>
  );
});
ConceptActions.propTypes = { isExpanded: PropTypes.bool.isRequired, hasDetails: PropTypes.bool.isRequired };

// ─── Component ────────────────────────────────────────────────────────────────

const ConceptItem = memo(function ConceptItem({ concept }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const style = getConceptStyle(concept.type);
  const hasDetails = Boolean(concept.details && concept.details.length > 0);

  const handleClick = () => {
    if (hasDetails) setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (e) => {
    if (hasDetails && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={hasDetails ? 0 : undefined}
      className={clsx(
        'concept-item rounded-xl border p-5 transition-all duration-200',
        style.bgClass,
        style.borderClass,
        hasDetails && 'cursor-pointer hover:border-brand/30'
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <ConceptHeader style={style} text={concept.text} />
      <ConceptDetails isExpanded={isExpanded} details={concept.details} />
      <ConceptActions isExpanded={isExpanded} hasDetails={hasDetails} />
    </div>
  );
});

// ─── PropTypes ────────────────────────────────────────────────────────────────

ConceptItem.propTypes = {
  concept: PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['core', 'important', 'trick', 'trap']),
    details: PropTypes.string,
  }).isRequired,
};

ConceptItem.displayName = 'ConceptItem';

export { ConceptItem };
export default ConceptItem;
