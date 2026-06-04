import PropTypes from 'prop-types';
import React, { memo } from 'react';

const FormulaTableEmptyState = memo(function FormulaTableEmptyState({ emptyMessage }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-surface px-4 py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-bg">
        <svg
          className="h-8 w-8 text-ink-tertiary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h3 className="mb-2 text-base font-medium text-ink">No Formulas Available</h3>
      <p className="max-w-sm text-sm text-ink-secondary">{emptyMessage}</p>
    </div>
  );
});

FormulaTableEmptyState.propTypes = {
  emptyMessage: PropTypes.string.isRequired,
};

FormulaTableEmptyState.displayName = 'FormulaTableEmptyState';

export { FormulaTableEmptyState };
export default FormulaTableEmptyState;
