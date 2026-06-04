import { Sparkles, Download, ChevronRight } from 'lucide-react';
import React, { memo } from 'react';

import { Button } from '@/components/ui';

const ButtonsSection = memo(function ButtonsSection() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-ink border-b border-border pb-4">
        <div className="p-2 bg-brand-subtle rounded-md text-brand">
          <Sparkles className="w-5 h-5" />
        </div>
        Buttons
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-semibold text-ink-secondary uppercase tracking-wider mb-4">
            Variants
          </h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary Action</Button>
            <Button variant="secondary">Secondary Action</Button>
            <Button variant="tertiary">Tertiary Link</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="danger">Danger Zone</Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink-secondary uppercase tracking-wider mb-4">
            Sizes
          </h3>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="secondary" size="sm">
              Small
            </Button>
            <Button variant="secondary" size="md">
              Medium (Default)
            </Button>
            <Button variant="secondary" size="lg">
              Large
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink-secondary uppercase tracking-wider mb-4">
            With Icons
          </h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" leftIcon={<Download className="w-4 h-4" />}>
              Download Report
            </Button>
            <Button variant="secondary" rightIcon={<ChevronRight className="w-4 h-4" />}>
              Next Module
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

ButtonsSection.displayName = 'ButtonsSection';

export { ButtonsSection };
export default ButtonsSection;
