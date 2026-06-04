import { Award } from 'lucide-react';
import React, { memo } from 'react';

import { StandardPageLayout } from '@components/layout';
import { LevelCard } from '@features/cfa/components';

import { useCFAPage } from './useCFAPage';

// ─── Component ────────────────────────────────────────────────────────────────

const CFAPage = memo(function CFAPage() {
  const { levels } = useCFAPage();

  return (
    <StandardPageLayout
      title="CFA Program"
      description="The Chartered Financial Analyst (CFA) credential is the gold standard for the investment management profession."
      icon={<Award className="h-6 w-6" />}
      breadcrumbs={[{ label: 'CFA Program' }]}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {levels.map((item) => (
          <LevelCard key={item.level} {...item} />
        ))}
      </div>
    </StandardPageLayout>
  );
});

CFAPage.displayName = 'CFAPage';

export { CFAPage };
export default CFAPage;
