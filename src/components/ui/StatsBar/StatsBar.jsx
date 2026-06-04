import PropTypes from 'prop-types';
import React, { memo } from 'react';

// ─── Component ────────────────────────────────────────────────────────────────

const StatsBar = memo(function StatsBar({ stats }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
      {stats.map((stat, idx) => (
        <React.Fragment key={idx}>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-ink">{stat.value}</span>
            <span className="text-ink-secondary">{stat.label}</span>
          </div>
          {idx < stats.length - 1 && (
            <span className="text-ink-tertiary" aria-hidden="true">
              •
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
});

// ─── PropTypes ────────────────────────────────────────────────────────────────

StatsBar.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

StatsBar.displayName = 'StatsBar';

export { StatsBar };
export default StatsBar;
