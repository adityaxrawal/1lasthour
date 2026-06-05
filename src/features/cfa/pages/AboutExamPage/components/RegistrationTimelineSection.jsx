import { CalendarDays, CreditCard, Clock, AlertCircle, Trophy, ExternalLink } from 'lucide-react';
import React, { memo } from 'react';

const TIMELINE = [
  {
    icon: CalendarDays,
    title: 'Registration Opens',
    desc: '~6 months before each exam window.',
  },
  {
    icon: CreditCard,
    title: 'Early Registration',
    desc: 'Lowest fees. Limited-time period.',
  },
  {
    icon: Clock,
    title: 'Standard Registration',
    desc: 'Fees increase after early deadline.',
  },
  {
    icon: AlertCircle,
    title: 'Late Registration',
    desc: 'Final chance with the highest fees.',
  },
  {
    icon: Trophy,
    title: 'Exam Day',
    desc: 'Two sessions in one day. Be prepared!',
  },
];

// Desktop step component
const DesktopStep = memo(function DesktopStep({ step, index, isLast }) {
  const Icon = step.icon;
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Connector line (right side, skip for last) */}
      {!isLast && (
        <div
          style={{
            position: 'absolute',
            top: '2rem',
            left: '50%',
            right: 0,
            height: '2px',
            borderTop: '2px dashed var(--color-border)',
            zIndex: 0,
          }}
        />
      )}
      {/* Connector line (left side, skip for first) */}
      {index > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '2rem',
            left: 0,
            right: '50%',
            height: '2px',
            borderTop: '2px dashed var(--color-border)',
            zIndex: 0,
          }}
        />
      )}

      {/* Icon */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          backgroundColor: 'var(--color-brand-subtle)',
          color: 'var(--color-brand)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px solid var(--color-bg)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          flexShrink: 0,
        }}
      >
        <Icon size={26} />
      </div>

      {/* Number badge */}
      <div
        style={{
          marginTop: '-0.5rem',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-brand)',
          color: '#fff',
          fontSize: '11px',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      >
        {index + 1}
      </div>

      {/* Text */}
      <div style={{ marginTop: '0.75rem', textAlign: 'center', padding: '0 4px' }}>
        <div
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: 'var(--color-ink)',
            marginBottom: '4px',
          }}
        >
          {step.title}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--color-ink-secondary)', lineHeight: 1.5 }}>
          {step.desc}
        </div>
      </div>
    </div>
  );
});
DesktopStep.displayName = 'DesktopStep';

export const RegistrationTimelineSection = memo(function RegistrationTimelineSection() {
  return (
    <div className="space-y-5">
      <h2 className="text-sm font-bold tracking-widest text-brand uppercase">
        Registration &amp; Exam Schedule (Level I)
      </h2>

      <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
        {/* ── Desktop: Flexbox Horizontal Timeline ──────────────────────── */}
        <div className="hidden md:flex" style={{ gap: 0, alignItems: 'flex-start' }}>
          {TIMELINE.map((step, idx) => (
            <DesktopStep key={idx} step={step} index={idx} isLast={idx === TIMELINE.length - 1} />
          ))}
        </div>

        {/* ── Mobile: Vertical Timeline ─────────────────────────────────── */}
        <div className="md:hidden space-y-6">
          {TIMELINE.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative flex items-start gap-4">
                {idx !== TIMELINE.length - 1 && (
                  <div className="absolute left-[1.15rem] top-11 bottom-[-1.5rem] border-l border-dashed border-border" />
                )}
                <div
                  className="relative z-10 flex shrink-0 items-center justify-center rounded-xl bg-brand-subtle text-brand"
                  style={{ width: '38px', height: '38px', borderRadius: '10px' }}
                >
                  <Icon size={17} />
                  <span
                    className="absolute flex items-center justify-center rounded-full bg-brand text-white font-bold"
                    style={{
                      bottom: '-6px',
                      right: '-6px',
                      width: '16px',
                      height: '16px',
                      fontSize: '10px',
                    }}
                  >
                    {idx + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-ink">{step.title}</h3>
                  <p className="text-xs text-ink-secondary">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* External link */}
        <div className="mt-10">
          <a
            href="https://www.cfainstitute.org/en/programs/cfa/exam"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-xl border border-border bg-bg px-5 py-3.5 text-sm font-medium text-brand transition-colors hover:bg-brand-subtle/50"
          >
            <ExternalLink size={16} className="shrink-0" />
            For official exam dates, fees &amp; details, visit the CFA Institute website.
          </a>
        </div>
      </div>
    </div>
  );
});

RegistrationTimelineSection.displayName = 'RegistrationTimelineSection';
