import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';

import { GlobalHeader } from '@/components/layout/GlobalHeader';
import { Footer } from '@/features/landing/components';

// ─── Component ────────────────────────────────────────────────────────────────

const Layout = memo(function Layout() {
  return (
    <div className="font-sans min-h-screen bg-bg text-ink selection:bg-brand-subtle selection:text-brand">
      {/* Global Header */}
      <GlobalHeader />

      {/* Main Content Area */}
      <main className="animate-fade-in mx-auto max-w-[1200px] px-6 py-10 pt-24">
        <div className="min-h-[calc(100vh-10rem)]">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
});

Layout.displayName = 'Layout';

export { Layout };
export default Layout;
