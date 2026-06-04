import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// ─── Component ────────────────────────────────────────────────────────────────

const FormulaItem = memo(function FormulaItem({ formula }) {
  const renderLatex = (latexString) => {
    if (!latexString) return null;

    try {
      const cleanLatex = latexString.replace(/^\$+|\$+$/g, '');
      return <BlockMath math={cleanLatex} />;
    } catch {
      return <code className="text-sm text-ink-secondary">{latexString}</code>;
    }
  };

  return (
    <div className="formula-item rounded-xl border border-border bg-surface p-6 shadow-sm transition-all duration-200 hover:border-brand/30">
      {/* Formula Name */}
      <h5 className="mb-4 text-[15px] font-bold text-ink">{formula.name}</h5>

      {/* Formula Expression (LaTeX) */}
      <div className="formula-expression mb-4 flex justify-center overflow-x-auto rounded-lg border border-warning/30 bg-warning-tint/50 px-4 py-4 text-warning text-lg">
        {formula.latex ? (
          renderLatex(formula.latex)
        ) : formula.expression ? (
          <code className="font-mono text-sm text-ink-secondary">{formula.expression}</code>
        ) : null}
      </div>

      {/* Variables Explanation */}
      {formula.variables && Object.keys(formula.variables).length > 0 && (
        <div className="variables mb-2">
          <p className="mb-1 text-xs font-medium text-ink-tertiary">Variables:</p>
          <ul className="space-y-0.5">
            {Object.entries(formula.variables).map(([key, value]) => (
              <li key={key} className="flex items-start gap-1 text-xs text-ink-secondary">
                <span className="font-mono text-brand">{key}</span>
                <span className="text-ink-tertiary">=</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Usage/Notes */}
      {formula.usage && (
        <p className="mt-4 italic text-[13px] text-ink-secondary leading-relaxed">
          {formula.usage}
        </p>
      )}
    </div>
  );
});

// ─── PropTypes ────────────────────────────────────────────────────────────────

FormulaItem.propTypes = {
  formula: PropTypes.shape({
    name: PropTypes.string.isRequired,
    latex: PropTypes.string,
    expression: PropTypes.string,
    variables: PropTypes.objectOf(PropTypes.string),
    usage: PropTypes.string,
  }).isRequired,
};

FormulaItem.displayName = 'FormulaItem';

export { FormulaItem };
export default FormulaItem;
