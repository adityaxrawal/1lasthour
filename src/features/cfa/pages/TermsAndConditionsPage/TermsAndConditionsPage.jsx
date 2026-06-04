import React, { memo, useEffect } from 'react';

import { GlobalHeader } from '@/components/layout/GlobalHeader';
import { Footer } from '@/features/landing/components';

import { TermsAndConditionsCTA } from './components/TermsAndConditionsCTA';
import { TermsAndConditionsHero } from './components/TermsAndConditionsHero';
import { TermsContentArea } from './components/TermsContentArea';

const TermsAndConditionsPage = memo(function TermsAndConditionsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-900 font-sans text-[#333333] dark:text-slate-300 transition-colors duration-200">
      <GlobalHeader />

      <main className="mx-auto w-full max-w-[1280px] px-6 pt-32 pb-10">
        <TermsAndConditionsHero />
        <TermsContentArea />
      </main>

      <TermsAndConditionsCTA />
      
      <Footer />
    </div>
  );
});

TermsAndConditionsPage.displayName = 'TermsAndConditionsPage';

export default TermsAndConditionsPage;
