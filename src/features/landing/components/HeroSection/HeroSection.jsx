import PropTypes from 'prop-types';
import React, { memo } from 'react';

import { HeroContent } from './components/HeroContent';
import { HeroVisual } from './components/HeroVisual';

// ─── Component ────────────────────────────────────────────────────────────────

const HeroSection = memo(function HeroSection({ onScrollTo }) {
  return (
    <section className="relative overflow-hidden pb-20 pt-16 md:pb-32 md:pt-[5.5rem]">
      {/* Decorative gradients */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-brand/5 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <HeroContent onScrollTo={onScrollTo} />

        {/* Hero Visual — Floating cards illustration */}
        <HeroVisual />
      </div>
    </section>
  );
});

// ─── PropTypes ────────────────────────────────────────────────────────────────

HeroSection.propTypes = {
  onScrollTo: PropTypes.func.isRequired,
};

HeroSection.displayName = 'HeroSection';

export { HeroSection };
export default HeroSection;
