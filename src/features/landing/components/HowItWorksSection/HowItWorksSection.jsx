import { Target, Brain, TrendingUp } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

const StepCard = memo(function StepCard({ step, title, description, icon: Icon }) {
  return (
    <div className="group relative flex flex-col items-center text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-highlight shadow-lg shadow-highlight/20 transition-all duration-300 text-ink-inverted group-hover:bg-highlight-hover group-hover:scale-110">
        <Icon className="h-7 w-7" />
      </div>
      <span className="mb-2 text-xs font-bold uppercase tracking-widest text-brand">
        {'Step '} {step}
      </span>
      <h3 className="mb-2 text-xl font-bold text-brand">{title}</h3>
      <p className="max-w-xs text-sm leading-relaxed text-ink-secondary">{description}</p>
    </div>
  );
});

StepCard.propTypes = {
  step: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

StepCard.displayName = 'StepCard';

const HowItWorksSection = memo(function HowItWorksSection() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-surface-2 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-brand">
            {'How It Works'}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-brand md:text-4xl">
            {'Three steps to exam readiness'}
          </h2>
          <p className="text-lg text-ink-secondary">
            {'No sign-ups, no credit cards. Just open and start studying.'}
          </p>
        </div>

        <div className="relative grid gap-12 md:grid-cols-3 md:gap-8">
          {/* Connecting line */}
          <div className="absolute left-[20%] right-[20%] top-8 hidden h-0.5 bg-secondary md:block" />

          <StepCard
            step={1}
            title="Browse Topics"
            description="Explore all 10 CFA Level 1 topics. See module counts, exam weights, and estimated study hours at a glance."
            icon={Target}
          />
          <StepCard
            step={2}
            title="Study Modules"
            description="Dive into detailed learning modules with key concepts, summaries, and real-world applications."
            icon={Brain}
          />
          <StepCard
            step={3}
            title="Master Formulas"
            description="Review beautifully rendered formulas, use cheat sheets, and build your confidence for exam day."
            icon={TrendingUp}
          />
        </div>
      </div>
    </section>
  );
});

HowItWorksSection.displayName = 'HowItWorksSection';

export { HowItWorksSection };
export default HowItWorksSection;
