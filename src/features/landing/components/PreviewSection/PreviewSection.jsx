import { Check, ArrowRight } from 'lucide-react';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const PREVIEW_FORMULAS = [
  {
    name: 'Time Value of Money',
    formula: 'FV = PV × (1 + r)ⁿ',
    topic: 'Quantitative Methods',
  },
  {
    name: 'CAPM',
    formula: 'E(Rᵢ) = Rᶠ + βᵢ[E(Rₘ) − Rᶠ]',
    topic: 'Portfolio Management',
  },
  {
    name: 'Current Ratio',
    formula: 'Current Assets ÷ Current Liabilities',
    topic: 'Financial Statement Analysis',
  },
  {
    name: 'Duration',
    formula: 'ΔP/P ≈ −D × Δy',
    topic: 'Fixed Income',
  },
];

const PREVIEW_POINTS = [
  'KaTeX-rendered formulas that load instantly',
  'Module-by-module breakdowns with key takeaways',
  'Quick-reference cheat sheets for last-minute review',
  'Fully searchable — find any concept in seconds',
];

// ─── Component ────────────────────────────────────────────────────────────────

const PreviewSection = memo(function PreviewSection() {
  return (
    <section className="scroll-mt-20 bg-brand py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text side */}
          <div>
            <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-ink-inverted/90 drop-shadow-sm">
              {'Best-in-Class'}
            </span>
            <h2 className="mb-6 text-3xl font-bold text-ink-inverted md:text-5xl lg:text-6xl drop-shadow-md">
              {'Every formula.'}
              <br />
              <span className="text-ink-inverted/90">{'Beautifully organized.'}</span>
            </h2>
            <ul className="space-y-4">
              {PREVIEW_POINTS.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-highlight/20">
                    <Check className="h-3 w-3 text-highlight" />
                  </div>
                  <span className="text-ink-inverted">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/cfa/level-1"
              className="group mt-8 inline-flex items-center gap-2 font-semibold text-highlight underline decoration-highlight/40 transition-colors hover:text-ink-inverted hover:decoration-white/40"
            >
              {'See it in action'}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Visual side — formula cards floating on dark */}
          <div className="relative">
            <div className="rounded-2xl bg-white/10 p-6 shadow-2xl ring-1 ring-white/20 backdrop-blur-sm">
              <div className="space-y-4">
                {/* Formula cards — white surfaces on dark background */}
                {PREVIEW_FORMULAS.map((formula, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border bg-surface p-4 shadow-[var(--shadow-float)] transition-colors hover:border-brand/40"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-semibold text-sm text-brand">{formula.name}</span>
                      {/* Marine reading label — the key marine use-case in the design */}
                      <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-medium text-ink-secondary">
                        {formula.topic}
                      </span>
                    </div>
                    <code className="font-mono text-lg text-highlight">{formula.formula}</code>
                  </div>
                ))}
              </div>
            </div>
            {/* Glow effect */}
            <div className="-inset-4 -z-10 absolute rounded-3xl bg-highlight/10 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
});

PreviewSection.displayName = 'PreviewSection';

export { PreviewSection };
export default PreviewSection;
