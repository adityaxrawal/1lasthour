import PropTypes from 'prop-types';
import React, { memo } from 'react';

const FormulaTableHeader = memo(function FormulaTableHeader({
  showSelectAll,
  allSelected,
  handleSelectAll,
}) {
  return (
    <thead>
      <tr className="border-b border-border bg-surface">
        {/* Select All Checkbox */}
        <th className="w-10 px-4 py-3">
          {showSelectAll && (
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="
                h-4 w-4 cursor-pointer rounded
                border-border 
                bg-bg 
                transition-colors 
                checked:bg-brand
                focus:ring-2 focus:ring-accent-muted
              "
              aria-label="Select all formulas"
            />
          )}
        </th>

        <th className="w-1/4 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-secondary">
          Formula Name
        </th>
        <th className="w-1/3 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-secondary">
          Expression
        </th>
        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-secondary">
          Notes
        </th>
        <th className="w-24 px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-ink-secondary">
          Actions
        </th>
      </tr>
    </thead>
  );
});

FormulaTableHeader.propTypes = {
  showSelectAll: PropTypes.bool.isRequired,
  allSelected: PropTypes.bool.isRequired,
  handleSelectAll: PropTypes.func.isRequired,
};

FormulaTableHeader.displayName = 'FormulaTableHeader';

export { FormulaTableHeader };
export default FormulaTableHeader;
