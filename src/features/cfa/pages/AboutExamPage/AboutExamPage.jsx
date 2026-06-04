import React, { memo, useCallback } from 'react';
import { GlobalHeader } from '@/components/layout/GlobalHeader';
import { Footer } from '@/features/landing/components';
import { LANDING_NAV_LINKS } from '@/features/landing/constants/landingConstants';

import { HeroSection } from './components/HeroSection';
import { AtAGlanceSection } from './components/AtAGlanceSection';
import { ExamStructureSection } from './components/ExamStructureSection';
import { QuestionFormatSection } from './components/QuestionFormatSection';
import { TopicWeightsSection } from './components/TopicWeightsSection';
import { PassingScoreSection } from './components/PassingScoreSection';
import { RegistrationTimelineSection } from './components/RegistrationTimelineSection';
import { DifficultySection } from './components/DifficultySection';
import { SuccessCTABanner } from './components/SuccessCTABanner';

const AboutExamPage = memo(function AboutExamPage() {
  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen font-sans bg-bg text-ink selection:bg-brand-subtle selection:text-brand">
      <GlobalHeader navLinks={LANDING_NAV_LINKS} onScrollTo={scrollTo} />
      
      <main className="pt-16">
        <HeroSection />
        
        <div className="mx-auto max-w-[1400px] px-6 py-16 space-y-16">
          <AtAGlanceSection />
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <ExamStructureSection />
            </div>
            <div className="lg:col-span-4">
              <QuestionFormatSection />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <TopicWeightsSection />
            </div>
            <div className="lg:col-span-4">
              <PassingScoreSection />
            </div>
          </div>
          
          <RegistrationTimelineSection />
          
          <DifficultySection />
          
          <SuccessCTABanner />
        </div>
      </main>
      
      <Footer />
    </div>
  );
});

AboutExamPage.displayName = 'AboutExamPage';
export default AboutExamPage;
