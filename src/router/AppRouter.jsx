import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { Loader } from '@/components/ui';
import { useProtection } from '@/hooks/useProtection';
import { enforceHumanBrowser } from '@/lib/botDetection';


// Lazy-loaded pages — each imports directly for proper code splitting
const LandingPage = lazy(() => import('@/features/landing/pages/LandingPage'));
const AboutExamPage = lazy(() => import('@/features/cfa/pages/AboutExamPage/AboutExamPage'));
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'));
const CFAPage = lazy(() => import('@/features/cfa/pages/CFAPage'));
// CFALevel1Page is the shared level index layout for Levels I, II, and III
const CFALevelPage = lazy(() => import('@/features/cfa/pages/CFALevel1Page'));
const ModulePage = lazy(() => import('@/features/cfa/pages/ModulePage'));
const TopicPage = lazy(() => import('@/features/cfa/pages/TopicPage'));
const NotFound = lazy(() => import('@/features/misc/pages/NotFound/NotFound'));
const ThemeDemo = lazy(() => import('@/features/misc/pages/ThemeDemo/ThemeDemo'));
const PrivacyPolicy = lazy(() => import('@/features/cfa/pages/PrivacyPolicyPage'));
const TermsAndConditions = lazy(() => import('@/features/cfa/pages/TermsAndConditionsPage/TermsAndConditionsPage'));

export function AppRouter() {
  useProtection();

  useEffect(() => {
    enforceHumanBrowser().catch(() => {});
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Suspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center bg-bg">
            <Loader />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about-exam" element={<AboutExamPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/theme-demo" element={<ThemeDemo />} />

            {/* CFA — Hub */}
            <Route path="/cfa" element={<CFAPage />} />

            {/* CFA Level I — shared CFALevelPage detects level from URL */}
            <Route path="/cfa/level-1" element={<CFALevelPage />} />
            <Route path="/cfa/level-1/:topicId" element={<TopicPage />} />
            <Route path="/cfa/level-1/:topicId/:moduleId" element={<ModulePage />} />

            {/* CFA Level II */}
            <Route path="/cfa/level-2" element={<CFALevelPage />} />
            <Route path="/cfa/level-2/:topicId" element={<TopicPage />} />
            <Route path="/cfa/level-2/:topicId/:moduleId" element={<ModulePage />} />

            {/* CFA Level III */}
            <Route path="/cfa/level-3" element={<CFALevelPage />} />
            <Route path="/cfa/level-3/:topicId" element={<TopicPage />} />
            <Route path="/cfa/level-3/:topicId/:moduleId" element={<ModulePage />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
