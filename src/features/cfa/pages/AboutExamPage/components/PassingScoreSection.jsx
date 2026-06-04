import { Target, Users, LineChart } from 'lucide-react';
import React, { memo } from 'react';

const CARDS = [
  {
    icon: Target,
    iconBg: 'bg-brand-subtle',
    iconColor: 'text-brand',
    title: 'Minimum Passing Score (MPS)',
    body: 'The MPS is not publicly disclosed. CFA Institute sets it for each exam cycle.',
    extra: null,
  },
  {
    icon: Users,
    iconBg: 'bg-highlight/10',
    iconColor: 'text-highlight',
    title: 'Pass Rate (Level I)',
    body: (
      <>
        Historical pass rate for Level I is{' '}
        <span className="font-bold text-ink line-through decoration-highlight">~40–45%</span>.
        <br />
        The exam is challenging — be prepared!
      </>
    ),
    extra: null,
  },
  {
    icon: LineChart,
    iconBg: 'bg-success-tint',
    iconColor: 'text-success',
    title: 'Scoring & Results',
    body: 'Computer-based scoring. Results are typically available within 2-3 months after the exam window closes.',
    extra: null,
  },
];

export const PassingScoreSection = memo(function PassingScoreSection() {
  return (
    <div className="flex h-full flex-col space-y-5">
      <h2 className="text-sm font-bold tracking-widest text-brand uppercase">
        Passing Score &amp; Scoring
      </h2>

      <div className="flex flex-1 flex-col gap-4">
        {CARDS.map(({ icon: Icon, iconBg, iconColor, title, body }, i) => (
          <div
            key={i}
            className="flex flex-1 items-start gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className={`rounded-xl p-3 ${iconBg} ${iconColor} shrink-0`}>
              <Icon size={22} />
            </div>
            <div>
              <h3 className="mb-1.5 font-bold text-ink text-sm">{title}</h3>
              <p className="text-sm text-ink-secondary leading-relaxed">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

PassingScoreSection.displayName = 'PassingScoreSection';
