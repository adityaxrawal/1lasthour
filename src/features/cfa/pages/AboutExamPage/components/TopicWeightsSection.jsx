import { CheckCircle2 } from 'lucide-react';
import React, { memo } from 'react';

const TOPICS = [
  { id: '01', name: 'Ethical & Professional Standards', weight: '15 – 20%', score: 90, tier: 'high' },
  { id: '02', name: 'Quantitative Methods', weight: '6 – 9%', score: 38, tier: 'medium' },
  { id: '03', name: 'Economics', weight: '6 – 9%', score: 38, tier: 'medium' },
  { id: '04', name: 'Financial Statement Analysis', weight: '11 – 14%', score: 65, tier: 'high' },
  { id: '05', name: 'Corporate Issuers', weight: '6 – 9%', score: 38, tier: 'medium' },
  { id: '06', name: 'Equity Investments', weight: '11 – 14%', score: 65, tier: 'high' },
  { id: '07', name: 'Fixed Income', weight: '11 – 14%', score: 65, tier: 'high' },
  { id: '08', name: 'Derivatives', weight: '5 – 8%', score: 28, tier: 'low' },
  { id: '09', name: 'Alternative Investments', weight: '7 – 10%', score: 45, tier: 'medium' },
  { id: '10', name: 'Portfolio Management', weight: '8 – 12%', score: 52, tier: 'medium' },
];

// Use explicit colors (not dynamic classes) so Tailwind won't purge them
const TIER_BAR_COLOR = {
  high: '#db5a33',    // highlight orange
  medium: '#f59e0b',  // amber-400
  low: '#22c55e',     // green-500
};

const TIER_LEGEND_COLOR = {
  high: '#db5a33',
  medium: '#f59e0b',
  low: '#22c55e',
};

export const TopicWeightsSection = memo(function TopicWeightsSection() {
  return (
    <div className="space-y-5">
      <h2 className="text-sm font-bold tracking-widest text-brand uppercase">
        Topic Areas &amp; Exam Weights (Level I)
      </h2>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border">
              <tr className="text-xs uppercase tracking-wider text-ink-tertiary">
                <th className="px-5 py-3.5 font-semibold">#</th>
                <th className="px-5 py-3.5 font-semibold">Topic Area</th>
                <th className="px-5 py-3.5 font-semibold">Exam Weight</th>
                <th className="px-5 py-3.5 font-semibold min-w-[160px]">Weight Guide</th>
                <th className="px-5 py-3.5 text-center font-semibold">Covered by 1lasthour.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {TOPICS.map((topic) => (
                <tr key={topic.id} className="transition-colors hover:bg-bg/50">
                  {/* # */}
                  <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs font-medium text-ink-tertiary">
                    {topic.id}
                  </td>
                  {/* Topic Name */}
                  <td className="whitespace-nowrap px-5 py-3.5 font-semibold text-ink">
                    {topic.name}
                  </td>
                  {/* Weight */}
                  <td className="whitespace-nowrap px-5 py-3.5 text-ink-secondary">
                    {topic.weight}
                  </td>
                  {/* Bar — use inline style for reliable color rendering */}
                  <td className="px-5 py-3.5" style={{ minWidth: '160px', width: '200px' }}>
                    <div
                      style={{
                        position: 'relative',
                        height: '10px',
                        width: '100%',
                        overflow: 'hidden',
                        borderRadius: '9999px',
                        backgroundColor: 'var(--color-border)',
                        display: 'block',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${topic.score}%`,
                          borderRadius: '9999px',
                          backgroundColor: TIER_BAR_COLOR[topic.tier],
                          display: 'block',
                        }}
                      />
                    </div>
                  </td>
                  {/* Covered */}
                  <td className="px-5 py-3.5 text-center">
                    <CheckCircle2 size={18} className="mx-auto text-success" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-6 border-t border-border bg-bg/40 px-5 py-3.5 text-xs font-medium text-ink-secondary">
          {[
            { color: TIER_LEGEND_COLOR.high, label: 'Higher Weight (11%+)' },
            { color: TIER_LEGEND_COLOR.medium, label: 'Medium Weight (6% – 10%)' },
            { color: TIER_LEGEND_COLOR.low, label: 'Lower Weight (≤ 5%)' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

TopicWeightsSection.displayName = 'TopicWeightsSection';
