import React, { memo } from 'react';
import { Layers, HelpCircle, Clock, BarChart3, Calendar } from 'lucide-react';

const STATS = [
  {
    icon: Layers,
    value: '3 Levels',
    label: 'Level I, II & III',
  },
  {
    icon: HelpCircle,
    value: '180 Questions',
    label: 'Per exam day\n(Level I)',
  },
  {
    icon: Clock,
    value: '4h 30m',
    label: 'Total testing time\n(Level I)',
  },
  {
    icon: BarChart3,
    value: '~40–45%',
    label: 'Historical pass rate\n(Level I)',
  },
  {
    icon: Calendar,
    value: '2 Windows / Year',
    label: 'Level I',
  },
];

export const AtAGlanceSection = memo(function AtAGlanceSection() {
  return (
    <div className="space-y-5">
      <h2 className="text-sm font-bold tracking-widest text-brand uppercase">At A Glance</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="flex items-start gap-4 rounded-xl border border-border bg-bg p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Icon */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-subtle text-brand">
                <Icon size={22} />
              </div>

              {/* Text */}
              <div className="min-w-0">
                <div className="text-base font-bold leading-tight text-ink">{stat.value}</div>
                <div className="mt-0.5 whitespace-pre-line text-xs leading-relaxed text-ink-secondary">
                  {stat.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

AtAGlanceSection.displayName = 'AtAGlanceSection';
