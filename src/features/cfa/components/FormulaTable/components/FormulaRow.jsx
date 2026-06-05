import { Copy, Check } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

import { LatexText } from './LatexText';

const CheckboxCell = memo(function CheckboxCell({ isSelected, onToggleSelect, index, name }) {
  return (
    <td className="w-12 px-4 py-4 align-top">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={(e) => onToggleSelect(index, e.target.checked)}
        className="
          mt-1 h-4 w-4 cursor-pointer rounded
          border-border 
          bg-bg 
          transition-colors 
          checked:bg-brand
          focus:ring-2 focus:ring-accent-muted
        "
        aria-label={`Select ${name}`}
      />
    </td>
  );
});
CheckboxCell.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  onToggleSelect: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const FormulaNameCell = memo(function FormulaNameCell({ name }) {
  return (
    <td className="w-1/4 px-4 py-4 align-top">
      <div className="font-medium transition-colors text-ink group-hover:text-brand">{name}</div>
    </td>
  );
});
FormulaNameCell.propTypes = { name: PropTypes.string.isRequired };

const ExpressionCell = memo(function ExpressionCell({ formula }) {
  return (
    <td className="w-1/3 px-4 py-4 align-top">
      <div
        className="
        inline-block rounded-md 
        border border-border 
        bg-surface 
        px-3 py-2
        font-mono text-sm
        text-ink-secondary
        transition-colors
        hover:border-border
      "
      >
        <LatexText text={formula} />
      </div>
    </td>
  );
});
ExpressionCell.propTypes = { formula: PropTypes.string.isRequired };

const NotesCell = memo(function NotesCell({ where }) {
  return (
    <td className="w-1/4 px-4 py-4 align-top">
      <div className="leading-relaxed text-sm text-ink-secondary">
        <LatexText text={where || '—'} />
      </div>
    </td>
  );
});
NotesCell.propTypes = { where: PropTypes.string };

const CopyActionCell = memo(function CopyActionCell({ formulaObj, index, copiedIndex, onCopy }) {
  return (
    <td className="px-4 py-4 text-right align-top">
      <button
        type="button"
        onClick={() => onCopy(formulaObj, index)}
        className={`
          rounded-md p-2 
          transition-all duration-200
          ${
            copiedIndex === index
              ? 'bg-success-tint text-success'
              : 'text-ink-tertiary transition-colors hover:bg-canvas-hover hover:text-ink'
          }
        `}
        title="Copy LaTeX formula"
        aria-label={`Copy ${formulaObj.name} formula`}
      >
        {copiedIndex === index ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </td>
  );
});
CopyActionCell.propTypes = {
  formulaObj: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  copiedIndex: PropTypes.number,
  onCopy: PropTypes.func.isRequired,
};

const FormulaRow = memo(function FormulaRow({
  formula,
  index,
  isSelected,
  onToggleSelect,
  copiedIndex,
  onCopy,
}) {
  return (
    <tr
      className={`
        border-b border-border transition-colors duration-200 last:border-0
        ${isSelected ? 'bg-brand-subtle' : 'hover:bg-canvas-hover'}
      `}
    >
      <CheckboxCell
        isSelected={isSelected}
        onToggleSelect={onToggleSelect}
        index={index}
        name={formula.name}
      />
      <FormulaNameCell name={formula.name} />
      <ExpressionCell formula={formula.formula} />
      <NotesCell where={formula.where} />
      <CopyActionCell
        formulaObj={formula}
        index={index}
        copiedIndex={copiedIndex}
        onCopy={onCopy}
      />
    </tr>
  );
});

FormulaRow.propTypes = {
  formula: PropTypes.shape({
    name: PropTypes.string.isRequired,
    formula: PropTypes.string.isRequired,
    where: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onToggleSelect: PropTypes.func.isRequired,
  copiedIndex: PropTypes.number,
  onCopy: PropTypes.func.isRequired,
};
FormulaRow.defaultProps = {
  copiedIndex: null,
};

export { FormulaRow };
export default FormulaRow;
