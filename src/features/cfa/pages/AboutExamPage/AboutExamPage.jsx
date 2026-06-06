import React, { memo, useCallback } from 'react';

import { GlobalHeader } from '@/components/layout/GlobalHeader';
import { Footer } from '@/features/landing/components';
import { LANDING_NAV_LINKS } from '@/features/landing/constants/landingConstants';

import { AtAGlanceSection } from './components/AtAGlanceSection';
import { DifficultySection } from './components/DifficultySection';
import { ExamStructureSection } from './components/ExamStructureSection';
import { HeroSection } from './components/HeroSection';
import { PassingScoreSection } from './components/PassingScoreSection';
import { QuestionFormatSection } from './components/QuestionFormatSection';
import { RegistrationTimelineSection } from './components/RegistrationTimelineSection';
import { SuccessCTABanner } from './components/SuccessCTABanner';
import { TopicWeightsSection } from './components/TopicWeightsSection';

const AboutExamPage = memo(function AboutExamPage() {
  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen font-sans bg-bg text-ink selection:bg-brand-subtle selection:text-brand">
      <GlobalHeader navLinks={LANDING_NAV_LINKS} onScrollTo={scrollTo} />

      <main className="pt-16">
        <HeroSection />

        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <AtAGlanceSection />

          <div id="exam-structure" className="grid grid-cols-1 gap-8 lg:grid-cols-12 pt-20">
            <div className="lg:col-span-8">
              <ExamStructureSection />
            </div>
            <div className="lg:col-span-4">
              <QuestionFormatSection />
            </div>
          </div>

          <div id="topic-weights" className="grid grid-cols-1 gap-8 lg:grid-cols-12 pt-20">
            <div className="lg:col-span-8">
              <TopicWeightsSection />
            </div>
            <div className="lg:col-span-4">
              <PassingScoreSection />
            </div>
          </div>

          <div className="pt-20">
            <RegistrationTimelineSection />
          </div>

          <div className="pt-20">
            <DifficultySection />
          </div>

          <div className="pt-20">
            <SuccessCTABanner />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
});

AboutExamPage.displayName = 'AboutExamPage';
export default AboutExamPage;
