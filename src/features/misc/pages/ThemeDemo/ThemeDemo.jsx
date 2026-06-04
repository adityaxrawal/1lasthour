import React from 'react';

import { BadgesSection } from './components/BadgesSection';
import { ButtonsSection } from './components/ButtonsSection';
import { CardsSection } from './components/CardsSection';

/**
 * Theme Demo Page
 * Showcases all available theme components and utilities
 */
const ThemeDemo = () => {
  return (
    <div className="space-y-16 animate-fade-in text-ink">
      {/* Header */}
      <header className="text-center py-12 bg-bg border-b border-border mb-12">
        <h1 className="text-4xl font-bold text-ink mb-4 tracking-tight">CFA Design System</h1>
        <p className="text-xl text-ink-secondary max-w-2xl mx-auto">
          Professional, content-focused interface tokens for financial education.
        </p>
      </header>

      <div className="max-w-5xl mx-auto px-6 space-y-16">
        {/* Buttons Section */}
        <ButtonsSection />

        {/* Cards Section */}
        <CardsSection />

        {/* Badges Section */}
        <BadgesSection />

        {/* Footer */}
        <footer className="text-center text-ink-secondary py-12 border-t border-border mt-12">
          <p className="text-sm">CFA Guide Design System • Amplemarket Inspired Theme</p>
        </footer>
      </div>
    </div>
  );
};

export default ThemeDemo;
