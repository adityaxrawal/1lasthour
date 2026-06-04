import { Copy } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { useState, memo, useCallback } from 'react';
import 'katex/dist/katex.min.css';

import { FormulaRow } from './components/FormulaRow';
import { FormulaTableEmptyState } from './components/FormulaTableEmptyState';
import { FormulaTableHeader } from './components/FormulaTableHeader';

// ─── Component ────────────────────────────────────────────────────────────────

const FormulaTable = memo(function FormulaTable({
  formulas,
  selectedFormulas,
  onToggleSelect,
  emptyMessage,
  showSelectAll,
}) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = useCallback((formula, index) => {
    navigator.clipboard.writeText(formula.formula);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  const handleSelectAll = useCallback(
    (checked) => {
      formulas.forEach((_, idx) => onToggleSelect(idx, checked));
    },
    [formulas, onToggleSelect]
  );

  const allSelected = formulas.length > 0 && selectedFormulas.length === formulas.length;

  if (formulas.length === 0) {
    return <FormulaTableEmptyState emptyMessage={emptyMessage} />;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-bg shadow-sm">
      <table className="w-full text-left text-sm border-collapse">
        {/* Table Header */}
        <FormulaTableHeader
          showSelectAll={showSelectAll}
          allSelected={allSelected}
          handleSelectAll={handleSelectAll}
        />

        {/* Table Body */}
        <tbody className="divide-y divide-border-default">
          {formulas.map((formula, idx) => (
            <FormulaRow
              key={idx}
              formula={formula}
              index={idx}
              isSelected={selectedFormulas.includes(idx)}
              onToggleSelect={onToggleSelect}
              copiedIndex={copiedIndex}
              onCopy={handleCopy}
            />
          ))}
        </tbody>
      </table>

      {/* Footer with helpful info */}
      {formulas.length > 0 && (
        <div className="flex items-center justify-between border-t border-border bg-surface px-4 py-3 text-xs text-ink-secondary">
          <span>
            {selectedFormulas.length} of {formulas.length} formula{formulas.length !== 1 ? 's' : ''}{' '}
            selected
          </span>
          <span className="text-ink-tertiary">
            Click <Copy className="inline h-3 w-3" /> to copy LaTeX
          </span>
        </div>
      )}
    </div>
  );
});

// ─── PropTypes ────────────────────────────────────────────────────────────────

FormulaTable.propTypes = {
  formulas: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      formula: PropTypes.string.isRequired,
      where: PropTypes.string,
    })
  ),
  selectedFormulas: PropTypes.arrayOf(PropTypes.number),
  onToggleSelect: PropTypes.func,
  emptyMessage: PropTypes.string,
  showSelectAll: PropTypes.bool,
};

FormulaTable.defaultProps = {
  formulas: [],
  selectedFormulas: [],
  onToggleSelect: () => {},
  emptyMessage: 'No formulas available for this module.',
  showSelectAll: true,
};

FormulaTable.displayName = 'FormulaTable';

export { FormulaTable };
export default FormulaTable;
