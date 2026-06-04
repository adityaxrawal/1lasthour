import { ArrowRight, TrendingUp } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const CTABlock = memo(function CTABlock({ config }) {
  return (
    <div className="mt-12 overflow-hidden rounded-xl bg-gradient-to-br from-highlight to-highlight-hover relative text-ink-inverted p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-md">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white opacity-10 blur-2xl" />
        <div className="absolute top-0 right-1/4 h-32 w-32 rounded-full bg-white opacity-5 blur-xl" />
      </div>

      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-bg text-brand-bright relative z-10 shadow-sm mt-1">
        <TrendingUp className="h-8 w-8 stroke-[2]" />
      </div>

      <div className="flex-1 text-center md:text-left relative z-10">
        <h2 className="mb-2 text-ink-inverted text-2xl font-bold md:text-3xl">
          {config.ctaTitle}
          <span className="ml-2 text-ink-inverted inline-block text-brand-bright">●</span>
        </h2>
        <p className="mb-6 opacity-90 text-ink-inverted max-w-xl text-sm md:text-base">
          {config.ctaDescription}
        </p>
        <Link
          to={config.ctaLinkPath}
          className="inline-flex items-center gap-2 rounded-full bg-bg px-6 py-2.5 text-sm font-bold text-highlight transition-colors hover:bg-surface shadow-sm"
        >
          Start Studying
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
});

CTABlock.propTypes = {
  config: PropTypes.shape({
    ctaTitle: PropTypes.string.isRequired,
    ctaDescription: PropTypes.string.isRequired,
    ctaLinkPath: PropTypes.string.isRequired,
  }).isRequired,
};

CTABlock.displayName = 'CTABlock';

export { CTABlock };
export default CTABlock;
