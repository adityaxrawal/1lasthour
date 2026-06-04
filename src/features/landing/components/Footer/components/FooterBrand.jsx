import { Sparkles } from 'lucide-react';
import React, { memo } from 'react';

const FooterBrand = memo(function FooterBrand() {
  return (
    <div className="md:col-span-1">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-highlight" />
        <span className="text-2xl font-bold text-white">1lasthour.</span>
      </div>
      <p className="font-medium text-sm leading-relaxed text-white">
        {
          'A modern study companion for CFA Level 1 candidates. Free, beautiful, and built with care.'
        }
      </p>
    </div>
  );
});

FooterBrand.displayName = 'FooterBrand';

export { FooterBrand };
export default FooterBrand;
