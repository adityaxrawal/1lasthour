import React, { memo } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const FORMAT_ITEMS = [
  {
    icon: CheckCircle2,
    color: 'text-brand',
    text: 'Multiple-choice questions with 3 options (A, B, C).',
  },
  {
    icon: CheckCircle2,
    color: 'text-brand',
    text: 'Scenario / vignette-based: many questions share a common passage.',
  },
  {
    icon: AlertCircle,
    color: 'text-ink-tertiary',
    text: 'No partial credit.',
  },
  {
    icon: AlertCircle,
    color: 'text-ink-tertiary',
    text: 'No penalty for wrong answers — always guess if unsure.',
  },
];

export const QuestionFormatSection = memo(function QuestionFormatSection() {
  return (
    <div className="flex h-full flex-col space-y-5">
      <h2 className="text-sm font-bold tracking-widest text-brand uppercase">Question Format</h2>

      <div className="flex flex-1 flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm">
        {/* Format items */}
        <ul className="mb-6 space-y-4">
          {FORMAT_ITEMS.map(({ icon: Icon, color, text }, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-ink-secondary">
              <Icon size={17} className={`mt-0.5 shrink-0 ${color}`} />
              <span>{text}</span>
            </li>
          ))}
        </ul>

        {/* Example question box */}
        <div className="mt-auto rounded-xl border border-border bg-bg p-5">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-brand">
            Example Question
          </div>

          <p className="mb-4 text-sm font-medium text-ink">
            Q. The primary purpose of a capital market is to:
          </p>

          <div className="mb-4 space-y-2 text-sm text-ink-secondary">
            <div>A. &nbsp;provide liquidity to investors.</div>
            <div>O. &nbsp;facilitate long-term investments.</div>
            <div>C. &nbsp;guarantee a fixed rate of return.</div>
          </div>

          <div className="text-sm text-ink">
            Answer: <span className="font-bold">B</span>
          </div>
        </div>
      </div>
    </div>
  );
});

QuestionFormatSection.displayName = 'QuestionFormatSection';
