import React, { memo, useEffect } from 'react';
import { GlobalHeader } from '@/components/layout/GlobalHeader';
import { Footer } from '@/features/landing/components';

import { PrivacyPolicyHero } from './components/PrivacyPolicyHero';
import { PrivacyPolicyAccordion } from './components/PrivacyPolicyAccordion';
import { PrivacyPolicyCTA } from './components/PrivacyPolicyCTA';

const PrivacyPolicyPage = memo(function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 font-sans text-[#333333] dark:text-slate-300 transition-colors duration-200">
      <GlobalHeader />

      {/* Main Content Container */}
      <main className="mx-auto max-w-7xl px-6 pt-32 pb-10">
        <PrivacyPolicyHero />
        <PrivacyPolicyAccordion />
      </main>

      <PrivacyPolicyCTA />
      
      <Footer />
    </div>
  );
});

PrivacyPolicyPage.displayName = 'PrivacyPolicyPage';

export { PrivacyPolicyPage };
export default PrivacyPolicyPage;
