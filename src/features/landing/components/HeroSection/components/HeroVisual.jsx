import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const TOPICS_DATA = [
  { title: 'Quantitative Methods', modules: 11, weight: '6-9%' },
  { title: 'Economics', modules: 12, weight: '8-12%' },
  { title: 'Financial Statement Analysis', modules: 12, weight: '11-14%' },
  { title: 'Corporate Issuers', modules: 7, weight: '6-9%' },
  { title: 'Equity Investments', modules: 16, weight: '10-13%' },
  { title: 'Fixed Income', modules: 19, weight: '11-14%' },
];

const HeroVisual = memo(function HeroVisual() {
  return (
    <div
      className="relative mx-auto mt-20 max-w-4xl animate-fade-in"
      style={{ animationDelay: '400ms' }}
    >
      <div className="relative rounded-2xl border border-border bg-bg p-2 shadow-[var(--shadow-float)] backdrop-blur-sm">
        {/* Simulated App UI */}
        <div className="overflow-hidden rounded-xl bg-surface">
          {/* Fake browser bar */}
          <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-error" />
              <div className="h-3 w-3 rounded-full bg-warning" />
              <div className="h-3 w-3 rounded-full bg-success" />
            </div>
            <div className="mx-4 flex h-6 flex-1 items-center rounded-md bg-surface-2 px-3 text-xs text-ink-secondary">
              1lasthour.vercel.app/cfa/level-1
            </div>
          </div>
          {/* Simulated content grid */}
          <div className="p-6 md:p-8">
            <div className="mb-6 text-center">
              <div className="mb-2 text-xs uppercase tracking-widest text-ink-secondary">
                HOME | CFA LEVEL I
              </div>
              <h2 className="text-2xl font-bold text-ink md:text-3xl">
                CFA <span className="text-highlight">LEVEL</span> I
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {TOPICS_DATA.map((topic, i) => {
                const topicId = topic.title.toLowerCase().replace(/\s+/g, '-');
                return (
                  <Link
                    key={i}
                    to={`/cfa/level-1/${topicId}`}
                    className="block rounded-lg border border-border bg-surface p-3 transition-colors hover:border-brand/50 md:p-4 hover:shadow-md cursor-pointer"
                  >
                    <div className="line-clamp-1 mb-1 text-sm font-semibold text-ink md:text-base">
                      {topic.title}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-ink-secondary">
                      <span>{topic.modules} modules</span>
                      <span className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium text-ink-secondary">
                        {topic.weight}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Floating accent badges */}
      <div className="animate-pulse-slow absolute -right-4 -top-4 rotate-3 rounded-lg border border-highlight-tint bg-highlight-tint px-4 py-2 text-sm font-bold shadow-lg text-highlight md:-right-6 md:-top-6">
        100+ Modules
      </div>
      <div className="absolute -bottom-4 -left-4 hidden -rotate-2 rounded-lg bg-brand px-4 py-2 text-sm font-bold shadow-lg text-ink-inverted sm:block md:-bottom-6 md:-left-6">
        ✓ Free Forever
      </div>
    </div>
  );
});

HeroVisual.displayName = 'HeroVisual';

export { HeroVisual };
export default HeroVisual;
