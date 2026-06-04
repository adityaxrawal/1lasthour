import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { InlineMath } from 'react-katex';

const LatexText = memo(function LatexText({ text }) {
  if (!text) return null;

  const parts = text.split(/\$(.+?)\$/g);

  return (
    <span>
      {parts.map((part, i) =>
        i % 2 === 1 ? <InlineMath key={i} math={part} /> : <span key={i}>{part}</span>
      )}
    </span>
  );
});

LatexText.propTypes = {
  text: PropTypes.string,
};
LatexText.defaultProps = {
  text: '',
};

export { LatexText };
export default LatexText;
