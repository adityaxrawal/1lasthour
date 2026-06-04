import React, { memo } from 'react';

import AboutExamHeroImage from '../../../../../assets/about-exam-hero.png';

// ── Main HeroSection Component ─────────────────────────────────────────────────

export const HeroSection = memo(function HeroSection() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="px-4 sm:px-6 mt-4">
      <section className="relative w-full overflow-hidden rounded-2xl shadow-lg min-h-[400px] md:min-h-[480px]">
        {/* Background backgrounds: white in light mode, original radial gradient in dark mode */}
        <div className="absolute inset-0 z-0 bg-white dark:bg-[var(--color-brand)]" />

        {/* Dot grid overlay (only visible in dark mode from original section design) */}
        <div
          className="absolute inset-0 z-0 pointer-events-none hidden dark:block"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.10) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Inner wrapper */}
        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1200px] flex-col md:flex-row items-center gap-12 md:gap-0 px-6 py-12 md:py-16 md:px-12">
          
          {/* ── Left: Text Content ──────────────────────────────────────── */}
          <div className="flex w-full flex-col items-center justify-center text-center md:w-[50%] md:items-start md:pr-10 md:text-left z-20">
            {/* Badge */}
            <span className="mb-4 inline-flex items-center rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[1.5px] bg-[#f0f4ff] text-[#3A6BC4] dark:bg-transparent dark:border-[1.5px] dark:border-white/65 dark:text-white leading-none">
              CFA Institute
            </span>

            {/* Headline */}
            <h1 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-[56px]">
              <span className="text-[#0c1e5c] dark:hidden">CFA Level I</span>
              <span className="text-[#E8472A] dark:hidden"><br />Exam</span>
              <span className="hidden dark:block text-white text-3xl sm:text-4xl md:text-[48px] font-extrabold tracking-tight">
                Understanding the CFA Exam
              </span>
            </h1>

            {/* Subtext */}
            <div className="mb-8 max-w-[420px]">
              <p className="text-sm sm:text-base font-normal leading-relaxed text-ink-secondary dark:hidden">
                All the essential details about the CFA Level I exam—structure, format, topics, registration, and scoring. Plan smart. Prepare better.
              </p>
              <p className="text-sm sm:text-base font-normal leading-relaxed text-white/90 hidden dark:block">
                A clear guide to the CFA Program exam—its structure, format, scoring, and everything you need to know to plan your success.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button 
                onClick={() => scrollTo('topic-weights')}
                className="w-full sm:w-auto rounded-lg bg-[#E8472A] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#d43c22] transition-colors flex items-center justify-center gap-2"
              >
                Explore the Curriculum <span className="font-bold">&rarr;</span>
              </button>
              <button 
                onClick={() => scrollTo('exam-structure')}
                className="w-full sm:w-auto rounded-lg border-[1.5px] border-[#3A6BC4]/10 bg-white px-6 py-3 text-sm font-semibold text-[#3A6BC4] shadow-sm hover:bg-[#f0f4ff]/50 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
              >
                See How It Works <span className="font-bold">&rarr;</span>
              </button>
            </div>
          </div>

          {/* ── Right: Illustration Stage ───────────────────────────────── */}
          <div className="relative flex w-full h-[360px] md:h-[480px] items-center justify-center md:w-[50%] overflow-visible mt-8 md:mt-0">
            {/* Soft, light-gray circular/oval shape background (hidden in dark mode since we have radial gradient) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] z-0 dark:hidden">
              <div className="w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] md:w-[540px] md:h-[540px] rounded-full bg-[#F5F7FB] blur-3xl opacity-100" />
            </div>

            {/* Container for the 3 objects to scale together */}
            <div className="relative z-10 w-[320px] h-[300px] sm:w-[400px] sm:h-[380px] md:w-[500px] md:h-[460px] flex items-center justify-center">
              <img 
                src={AboutExamHeroImage} 
                alt="CFA Level I Exam Setup" 
                className="w-full h-auto object-contain z-20 drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

HeroSection.displayName = 'HeroSection';

