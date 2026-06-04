import { Check, ArrowRight } from 'lucide-react';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const PRICING_FEATURES = [
  'Full CFA Level 1 curriculum',
  'All 100+ study modules',
  'Complete formula library',
  'Cheat sheets & quick references',
  'Smart search across all content',
  'Dark & Light mode',
  'Mobile-friendly design',
  'No account required',
];

// ─── Component ────────────────────────────────────────────────────────────────

const PricingSection = memo(function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-20 bg-surface-2 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-highlight">
            {'Pricing'}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-ink md:text-4xl">
            {'Free. No strings attached.'}
          </h2>
          <p className="text-lg text-ink-secondary">
            1lasthour is a passion project built to help CFA candidates succeed. Everything is free
            forever.
          </p>
        </div>

        <div className="mx-auto max-w-md">
          <div className="relative rounded-2xl border-2 border-highlight bg-surface p-8 text-center shadow-2xl shadow-highlight/15">
            {/* Popular badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-highlight px-4 py-1 text-xs font-bold uppercase tracking-wide text-ink-inverted">
              {'Forever Free'}
            </div>

            <div className="mb-6 mt-4">
              <span className="text-5xl font-bold text-brand">$0</span>
              <span className="ml-1 text-ink-secondary">/forever</span>
            </div>

            <ul className="mb-8 space-y-3 text-left">
              {PRICING_FEATURES.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="h-4 w-4 flex-shrink-0 text-highlight" />
                  <span className="text-sm text-ink-secondary">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/cfa/level-1"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-highlight px-6 py-4 font-bold text-ink-inverted shadow-lg shadow-highlight/20 transition-all hover:bg-highlight-hover hover:-translate-y-0.5"
            >
              {"Start Studying — It's Free"}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

PricingSection.displayName = 'PricingSection';

export { PricingSection };
export default PricingSection;
