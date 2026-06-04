import React, { memo } from 'react';

import { Card, Badge } from '@/components/ui';

const BadgesSection = memo(function BadgesSection() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-8 text-ink border-b border-border pb-4">Badges</h2>

      <Card className="flex flex-wrap gap-4">
        <Badge variant="default">Default</Badge>
        <Badge variant="accent">Accent</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
      </Card>
    </section>
  );
});

BadgesSection.displayName = 'BadgesSection';

export { BadgesSection };
export default BadgesSection;
