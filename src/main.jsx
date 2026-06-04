import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@/styles/index.css';
import { AppProviders } from '@/providers';
import { AppRouter } from '@/router/AppRouter';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </StrictMode>
);
