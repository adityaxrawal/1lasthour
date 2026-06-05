import {
  BookOpen,
  Network,
  Clock,
  Target,
  Star,
  FileText,
  CheckCircle2,
  BarChart2,
} from 'lucide-react';
import React, { memo } from 'react';

const DIFFICULTY_REASONS = [
  {
    icon: BookOpen,
    text: 'Vast syllabus touching real-world investment topics',
  },
  {
    icon: Network,
    text: 'Application-based questions, not just memorization',
  },
  {
    icon: Clock,
    text: 'Time management is critical in both sessions',
  },
  {
    icon: Target,
    text: 'Consistent discipline for months makes the difference',
  },
];

const HELP_ITEMS = [
  {
    icon: BookOpen,
    bold: 'Structured Curriculum',
    rest: 'covering all 10 topic areas in depth.',
  },
  {
    icon: CheckCircle2,
    bold: 'High-Quality Practice',
    rest: 'with thousands of exam-style questions.',
  },
  {
    icon: BarChart2,
    bold: 'Smart Analytics',
    rest: 'to track progress and focus on weak areas.',
  },
  {
    icon: FileText,
    bold: 'Formula Sheets, Cheat Sheets & Quick References.',
    rest: null,
  },
  {
    icon: Target,
    bold: 'Exam-Focused Tools',
    rest: 'to simulate the real exam experience.',
  },
];

export const DifficultySection = memo(function DifficultySection() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* ── Left: Is The CFA Exam Difficult? ────────────────────────── */}
      <div className="space-y-5">
        <h2 className="text-sm font-bold tracking-widest text-brand uppercase">
          Is The CFA Exam Difficult?
        </h2>

        <div className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-8 shadow-sm h-[calc(100%-2.5rem)]">
          <div>
            <p className="mb-8 font-medium text-ink leading-relaxed">
              The CFA exam is known to be one of the most challenging in finance.
              <br />
              It tests not just what you know, but{' '}
              <span className="font-bold">how you apply it</span>.
            </p>

            {/* 4-column reason grid */}
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              {DIFFICULTY_REASONS.map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-3">
                  <div className="text-brand">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <p className="text-xs leading-relaxed text-ink-secondary">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Good news callout */}
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-900/30 dark:bg-amber-900/10">
            <Star size={18} className="mt-0.5 shrink-0 fill-amber-400 text-amber-400" />
            <p className="text-sm text-ink-secondary">
              <span className="font-bold text-ink">Good news:</span> With a structured plan and the
              right resources, thousands of candidates pass every year—you can be one of them.
            </p>
          </div>
        </div>
      </div>

      {/* ── Right: How 1lasthour Helps ───────────────────────────────── */}
      <div className="space-y-5">
        <h2 className="text-sm font-bold tracking-widest text-brand uppercase">
          How 1lasthour Helps You Succeed
        </h2>

        <div className="flex flex-col justify-center rounded-2xl border border-border bg-surface p-8 shadow-sm h-[calc(100%-2.5rem)]">
          <ul className="space-y-6">
            {HELP_ITEMS.map(({ icon: Icon, bold, rest }, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="mt-0.5 shrink-0 rounded-lg bg-brand-subtle p-2 text-brand">
                  <Icon size={18} />
                </div>
                <div className="text-sm text-ink-secondary">
                  <span className="font-bold text-ink">{bold}</span>
                  {rest && <> {rest}</>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});

DifficultySection.displayName = 'DifficultySection';
