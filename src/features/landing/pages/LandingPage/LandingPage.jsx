import React, { memo, useCallback } from 'react';

import { GlobalHeader } from '@/components/layout/GlobalHeader';
import { LANDING_NAV_LINKS, LANDING_FEATURES, LANDING_FAQS } from '../../constants/landingConstants';

import {
  HeroSection,
  StatsSection,
  FeaturesSection,
  HowItWorksSection,
  PreviewSection,
  PricingSection,
  FAQSection,
  CTABannerSection,
  Footer,
} from '../../components';

// ─── Component ────────────────────────────────────────────────────────────────

const LandingPage = memo(function LandingPage() {
  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // ─── RENDER ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen font-sans bg-bg text-ink selection:bg-brand-subtle selection:text-brand">
      <GlobalHeader navLinks={LANDING_NAV_LINKS} onScrollTo={scrollTo} />
      <HeroSection onScrollTo={scrollTo} />
      <StatsSection />
      <FeaturesSection features={LANDING_FEATURES} />
      <HowItWorksSection />
      <PreviewSection />
      <PricingSection />
      <FAQSection faqs={LANDING_FAQS} />
      <CTABannerSection />
      <Footer />
    </div>
  );
});

LandingPage.displayName = 'LandingPage';

export { LandingPage };
export default LandingPage;
