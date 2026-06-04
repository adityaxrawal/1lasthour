import PropTypes from 'prop-types';
import React, { memo } from 'react';

// ─── Sub-Components ────────────────────────────────────────────────────────────

const StatItem = memo(function StatItem({ value, label }) {
  return (
    <div className="px-6 text-center animate-fade-in">
      <div className="mb-1 text-3xl font-bold text-brand md:text-4xl">{value}</div>
      <div className="text-sm text-ink-secondary">{label}</div>
    </div>
  );
});

StatItem.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
};

StatItem.displayName = 'StatItem';

// ─── Component ────────────────────────────────────────────────────────────────

const StatsSection = memo(function StatsSection() {
  return (
    <section className="border-y border-border bg-surface-2 py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          <StatItem value="10" label="CFA Topics" />
          <StatItem value="100+" label="Study Modules" />
          <StatItem value="500+" label="Key Formulas" />
          <StatItem value="∞" label="Study Sessions" />
        </div>
      </div>
    </section>
  );
});

StatsSection.displayName = 'StatsSection';

export { StatsSection };
export default StatsSection;
