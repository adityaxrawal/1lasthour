import React, { memo } from 'react';
import { Sun, Moon, ChevronDown, FileText } from 'lucide-react';

const SessionCard = memo(function SessionCard({ session, icon: Icon, iconBg, iconColor }) {
  return (
    <div className="flex-1 rounded-xl border border-border bg-bg p-6">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <div className={`rounded-lg p-2.5 ${iconBg} ${iconColor}`}>
          <Icon size={22} />
        </div>
        <div>
          <h3 className="font-bold text-ink">{session.title}</h3>
          <div className="text-sm font-semibold text-brand">{session.duration}</div>
        </div>
      </div>

      <ul className="space-y-3.5">
        {session.details.map((detail, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-ink-secondary">
            <ChevronDown size={15} className="mt-0.5 shrink-0 text-ink-tertiary" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});
SessionCard.displayName = 'SessionCard';

const SESSION_1 = {
  title: 'Session 1',
  duration: '135 minutes',
  details: [
    '90 multiple-choice questions',
    '3 answer choices (A, B, C)',
    'Computer-based testing',
  ],
};

const SESSION_2 = {
  title: 'Session 2',
  duration: '135 minutes',
  details: [
    '90 multiple-choice questions',
    '3 answer choices (A, B, C)',
    'Computer-based testing',
  ],
};

export const ExamStructureSection = memo(function ExamStructureSection() {
  return (
    <div className="space-y-5">
      <h2 className="text-sm font-bold tracking-widest text-brand uppercase">
        Exam Structure (Level I)
      </h2>

      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
        {/* Sessions row */}
        <div className="flex flex-col items-stretch gap-0 md:flex-row">
          <SessionCard
            session={SESSION_1}
            icon={Sun}
            iconBg="bg-amber-50"
            iconColor="text-amber-500"
          />

          {/* Divider with "Optional Break" */}
          <div className="flex flex-row md:flex-col items-center justify-center py-4 md:py-0 md:px-6">
            <div className="flex-1 md:flex-none h-[1px] md:h-full w-full md:w-0 border-t md:border-t-0 md:border-l border-dashed border-border" />
            <div className="px-4 md:px-2 md:py-4 text-center text-xs font-semibold uppercase tracking-wider text-ink-tertiary bg-surface whitespace-nowrap">
              Optional<br className="hidden md:block" /> Break
            </div>
            <div className="flex-1 md:flex-none h-[1px] md:h-full w-full md:w-0 border-t md:border-t-0 md:border-l border-dashed border-border" />
          </div>

          <SessionCard
            session={SESSION_2}
            icon={Moon}
            iconBg="bg-brand-subtle"
            iconColor="text-brand"
          />
        </div>

        {/* Summary card */}
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl border border-border bg-brand-subtle/30 px-6 py-5">
          <div className="rounded-lg bg-brand-subtle p-2.5 text-brand shrink-0">
            <FileText size={22} />
          </div>
          <div>
            <div className="font-bold text-ink text-sm sm:text-base">
              Total: 180 questions in a single exam day (4h 30m total)
            </div>
            <div className="mt-1 text-xs sm:text-sm text-ink-secondary">
              Two sessions • No partial credit • No penalty for wrong answers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ExamStructureSection.displayName = 'ExamStructureSection';
