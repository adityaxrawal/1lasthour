import PropTypes from 'prop-types';
import React, { memo } from 'react';

// ─── Sub-Components ────────────────────────────────────────────────────────────

const FeatureCard = memo(function FeatureCard({ icon: Icon, title, description, index }) {
  return (
    <div
      className="group relative rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-highlight-tint transition-all duration-300 group-hover:bg-highlight">
        {Icon && (
          <Icon className="h-6 w-6 transition-colors text-highlight group-hover:text-ink-inverted" />
        )}
      </div>
      <h3 className="mb-2 text-lg font-bold text-brand">{title}</h3>
      <p className="leading-relaxed text-sm text-ink-secondary">{description}</p>
    </div>
  );
});

FeatureCard.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  index: PropTypes.number,
};

FeatureCard.defaultProps = {
  icon: null,
  index: 0,
};

FeatureCard.displayName = 'FeatureCard';

// ─── Component ────────────────────────────────────────────────────────────────

const FeaturesSection = memo(function FeaturesSection({ features }) {
  return (
    <section id="features" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-brand">
            {'Features'}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-brand md:text-4xl">
            {'Everything you need to '} <span className="text-highlight">{'ace Level 1'}</span>
          </h2>
          <p className="text-lg text-ink-secondary">
            {
              'Built specifically for CFA candidates who want organized, accessible, and beautiful study materials.'
            }
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

// ─── PropTypes ────────────────────────────────────────────────────────────────

FeaturesSection.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

FeaturesSection.displayName = 'FeaturesSection';

export { FeaturesSection };
export default FeaturesSection;
