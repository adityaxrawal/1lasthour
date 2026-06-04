import PropTypes from 'prop-types';
import React, { memo } from 'react';

// ─── Component ────────────────────────────────────────────────────────────────

const Section = memo(function Section({ id, title, icon: Icon, children }) {
  return (
    <section id={id} className="mb-16 scroll-mt-32 animate-fade-in text-ink">
      <div className="mb-6 flex items-center gap-3 border-b border-border pb-2">
        <div className="rounded-md border border-border bg-surface p-1.5 text-ink-secondary">
          {Icon && <Icon size={20} strokeWidth={1.5} />}
        </div>
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      </div>
      <div className="leading-relaxed text-ink-secondary">{children}</div>
    </section>
  );
});

// ─── PropTypes ────────────────────────────────────────────────────────────────

Section.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  children: PropTypes.node,
};

Section.defaultProps = {
  icon: null,
  children: null,
};

Section.displayName = 'Section';

export { Section };
export default Section;
