import { ArrowRight } from 'lucide-react';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

// ─── Component ────────────────────────────────────────────────────────────────

const CTABannerSection = memo(function CTABannerSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="relative overflow-hidden rounded-2xl bg-highlight p-10 text-center md:p-16 shadow-[var(--shadow-float)]">
          {/* Decorative */}
          <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/10" />
          <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/10" />

          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold text-ink-inverted md:text-4xl">
              {'Ready to ace your CFA Level 1?'}
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-lg text-ink-inverted/80">
              {
                "Don't leave your preparation to chance. Start studying with structured, beautifully designed materials — right now."
              }
            </p>
            <Link
              to="/cfa/level-1"
              className="inline-flex items-center gap-2 rounded-xl bg-bg px-8 py-3.5 text-base font-bold shadow-lg transition-colors text-highlight hover:bg-surface hover:text-brand"
            >
              {'Start Studying — Free Forever'}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

CTABannerSection.displayName = 'CTABannerSection';

export { CTABannerSection };
export default CTABannerSection;
