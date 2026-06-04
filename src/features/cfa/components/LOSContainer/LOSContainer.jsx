import { clsx } from 'clsx';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

import ConceptItem from '../ConceptItem';
import FormulaItem from '../FormulaItem';

// ─── Component ────────────────────────────────────────────────────────────────

function LOSHeader({ los, hasFormulas }) {
  return (
    <div className="los-header border-b border-border bg-canvas-inset px-6 py-6" id="los-header">
      <div className="flex items-start gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-brand bg-transparent px-3 py-1 text-xs font-medium text-brand">
              {los.concepts?.length || 0} concepts
            </span>
            {hasFormulas && (
              <span className="rounded-full border border-warning bg-transparent px-3 py-1 text-xs font-medium text-warning">
                {los.formulas.length} formulas
              </span>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-ink">{los.title}</h3>
            {los.description && (
              <p className="mt-2 text-ink-secondary leading-relaxed">{los.description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LOSConcepts({ concepts }) {
  return (
    <div className="concepts-column bg-bg p-6" id="concepts">
      <h4 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-ink-secondary">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-ink-inverted">
          <span className="text-[10px]">✓</span>
        </div>
        <span>Key Concepts</span>
      </h4>
      <div className="space-y-4">
        {concepts && concepts.length > 0 ? (
          concepts.map((concept) => <ConceptItem key={concept.id} concept={concept} />)
        ) : (
          <p className="italic text-sm text-ink-tertiary">No concepts for this LOS</p>
        )}
      </div>
    </div>
  );
}

function LOSFormulas({ formulas }) {
  if (!formulas || formulas.length === 0) return null;
  return (
    <div className="formulas-column bg-surface p-6" id="formulas">
      <h4 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-ink-secondary">
        <span className="font-serif italic text-warning font-bold text-lg leading-none">
          ƒ
        </span>
        <span>Formulas</span>
      </h4>
      <div className="space-y-4">
        {formulas.map((formula) => (
          <FormulaItem key={formula.id} formula={formula} />
        ))}
      </div>
    </div>
  );
}

const LOSContainer = memo(function LOSContainer({ los }) {
  if (!los) return null;

  const hasFormulas = Boolean(los.formulas && los.formulas.length > 0);

  return (
    <div
      className={clsx(
        'los-container mb-6 overflow-hidden rounded-xl border border-border bg-surface shadow-sm'
      )}
    >
      <LOSHeader los={los} hasFormulas={hasFormulas} />
      <div
        className={clsx(
          'los-content grid grid-cols-1 divide-y divide-border-default',
          hasFormulas ? 'lg:grid-cols-2 lg:divide-x lg:divide-y-0' : ''
        )}
      >
        <LOSConcepts concepts={los.concepts} />
        <LOSFormulas formulas={los.formulas} />
      </div>
    </div>
  );
});

// ─── PropTypes ────────────────────────────────────────────────────────────────

LOSContainer.propTypes = {
  los: PropTypes.shape({
    icon: PropTypes.node,
    color: PropTypes.string,
    losCode: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    concepts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
      })
    ),
    formulas: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
      })
    ),
  }),
};

LOSContainer.defaultProps = {
  los: null,
};

LOSContainer.displayName = 'LOSContainer';

export { LOSContainer };
export default LOSContainer;
