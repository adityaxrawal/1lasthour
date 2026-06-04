import { Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const HeroContent = memo(function HeroContent({ onScrollTo }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {/* Badge */}
      <div className="mb-8 inline-flex animate-fade-in items-center gap-2 rounded-full bg-brand-subtle px-4 py-1.5 text-xs font-medium text-brand">
        <Sparkles className="h-3.5 w-3.5 text-brand" />
        CFA Level 1 Study Companion
      </div>

      {/* Headline */}
      <h1
        className="mb-6 animate-fade-in text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        style={{ animationDelay: '100ms' }}
      >
        <span className="text-brand italic">Your 1lasthour</span>
        <br />
        <span className="text-highlight">Before the Exam</span>
        <br />
        <span className="bg-gradient-to-r from-highlight to-secondary bg-clip-text text-transparent italic">
          Make It Count.
        </span>
      </h1>

      {/* Subheadline */}
      <p
        className="mx-auto mb-10 max-w-xl animate-fade-in text-lg leading-relaxed text-ink-secondary md:text-xl"
        style={{ animationDelay: '200ms' }}
      >
        Structured CFA Level 1 study materials — formulas, key concepts, and exam strategies —
        all in one beautiful, searchable interface.
      </p>

      {/* CTAs */}
      <div
        className="flex animate-fade-in flex-col items-center justify-center gap-4 sm:flex-row"
        style={{ animationDelay: '300ms' }}
      >
        <Link
          to="/cfa"
          className="group inline-flex items-center gap-2 rounded-xl bg-highlight px-8 py-3.5 text-base font-bold text-ink-inverted shadow-lg shadow-highlight/20 transition-all hover:bg-highlight-hover hover:shadow-xl"
        >
          Explore the Curriculum
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <button
          onClick={() => onScrollTo('how-it-works')}
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-brand bg-bg px-8 py-3.5 text-base font-semibold text-brand transition-all hover:bg-surface"
        >
          See How It Works
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
});

HeroContent.propTypes = {
  onScrollTo: PropTypes.func.isRequired,
};

HeroContent.displayName = 'HeroContent';

export { HeroContent };
export default HeroContent;
