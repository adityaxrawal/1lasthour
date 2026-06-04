import React, { memo } from 'react';

import { Card } from '@/components/ui';

const CardsSection = memo(function CardsSection() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-8 text-ink border-b border-border pb-4">Cards</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-2 text-ink">Default Content Card</h3>
          <p className="text-ink-secondary text-sm leading-relaxed">
            Standard card with subtle border and warm background. Used for modules, topics, and
            general content.
          </p>
        </Card>

        <Card clickable onClick={() => {}}>
          <h3 className="text-lg font-semibold mb-2 text-brand">Clickable Card</h3>
          <p className="text-ink-secondary text-sm leading-relaxed">
            Pass <code>clickable</code> prop to enable hover lift and cursor pointer. Good for
            navigation items.
          </p>
        </Card>
      </div>
    </section>
  );
});

CardsSection.displayName = 'CardsSection';

export { CardsSection };
export default CardsSection;
