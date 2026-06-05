import { AlertCircle, AlertTriangle, BookOpen, CheckCircle, Lightbulb } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

import { Card } from '@components/ui';
import { FormulaTable } from '@features/cfa/components';

function KeyConceptsSection({ concepts }) {
  if (!concepts || concepts.length === 0) return null;
  return (
    <section>
      <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-ink">
        <CheckCircle className="h-5 w-5 text-success" />
        Key Concepts
      </h2>
      <div className="space-y-4">
        {concepts.map((concept, idx) => (
          <Card key={idx} className="border-l-4 border-l-success-emphasis bg-surface">
            <p className="leading-relaxed text-ink">{concept}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

function FormulasSection({ formulas }) {
  if (!formulas || formulas.length === 0) return null;
  return (
    <section>
      <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-ink">
        <BookOpen className="h-5 w-5 text-brand" />
        Key Formulas
      </h2>
      <FormulaTable formulas={formulas} />
    </section>
  );
}

function ExamTipsSection({ tips }) {
  if (!tips || tips.length === 0) return null;
  return (
    <section>
      <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-ink">
        <Lightbulb className="h-5 w-5 text-warning" />
        Exam Tips
      </h2>
      <div className="rounded-lg border border-warning-muted bg-warning-tint p-6">
        <ul className="space-y-3">
          {tips.map((tip, idx) => (
            <li key={idx} className="flex gap-3 text-ink">
              <span className="font-bold text-warning">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CommonMistakesSection({ mistakes }) {
  if (!mistakes || mistakes.length === 0) return null;
  return (
    <section>
      <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-ink">
        <AlertTriangle className="h-5 w-5 text-error" />
        Common Mistakes
      </h2>
      <div className="rounded-lg border border-error-muted bg-error-tint p-6">
        <ul className="space-y-3">
          {mistakes.map((mistake, idx) => (
            <li key={idx} className="flex gap-3 text-ink">
              <span className="font-bold text-error">✗</span>
              {mistake}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FallbackSection({ moduleData }) {
  if (moduleData.keyConcepts?.length || moduleData.formulas?.length) return null;
  return (
    <Card className="bg-surface">
      <div className="flex items-start gap-4">
        <AlertCircle className="mt-1 h-5 w-5 shrink-0 text-brand" />
        <div className="flex-1">
          <h3 className="mb-2 font-bold text-ink">Content Loading</h3>
          <p className="leading-relaxed text-sm text-ink-secondary">
            Detailed cheatsheets, formulas, and summaries for this module are currently being
            compiled. Check back soon for the full breakdown of <strong>{moduleData.title}</strong>.
          </p>
        </div>
      </div>
    </Card>
  );
}

const LegacyModuleLayout = memo(function LegacyModuleLayout({ moduleData }) {
  return (
    <div className="space-y-12">
      <KeyConceptsSection concepts={moduleData.keyConcepts} />
      <FormulasSection formulas={moduleData.formulas} />
      <ExamTipsSection tips={moduleData.examTips} />
      <CommonMistakesSection mistakes={moduleData.commonMistakes} />
      <FallbackSection moduleData={moduleData} />
    </div>
  );
});

LegacyModuleLayout.propTypes = {
  moduleData: PropTypes.object.isRequired,
};

LegacyModuleLayout.displayName = 'LegacyModuleLayout';

export { LegacyModuleLayout };
export default LegacyModuleLayout;
