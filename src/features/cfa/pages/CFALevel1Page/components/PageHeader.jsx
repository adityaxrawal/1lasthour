import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const PageHeader = memo(function PageHeader({ config, isSampleData }) {
  return (
    <header className="py-8 text-center">
      <div className="mb-4 flex items-center justify-center gap-2 text-sm text-ink-secondary">
        <Link to="/" className="transition-colors hover:text-brand">
          HOME
        </Link>
        <span>|</span>
        <Link to="/cfa" className="transition-colors hover:text-brand">
          CFA PROGRAM
        </Link>
        <span>|</span>
        <span className="text-brand">{config.label}</span>
      </div>
      <h1 className="leading-tight text-4xl font-bold text-ink md:text-5xl lg:text-6xl">
        <span className="text-ink">CFA </span>
        <span className="text-brand-bright">LEVEL</span>
        <span className="text-brand"> {config.romanNumeral}</span>
        <span className="relative ml-2 inline-block">
          <span className="text-brand">●</span>
        </span>
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-ink-secondary">{config.tagline}</p>
      {isSampleData && (
        <p className="mx-auto mt-2 max-w-lg text-xs text-ink-tertiary italic">
          Sample content — real curriculum data will be added in a future update.
        </p>
      )}
    </header>
  );
});

PageHeader.propTypes = {
  config: PropTypes.object.isRequired,
  isSampleData: PropTypes.bool.isRequired,
};

PageHeader.displayName = 'PageHeader';

export { PageHeader };
export default PageHeader;
