import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { queryClient } from '@/services/queryClient';

import { ThemeProvider } from './ThemeProvider';

export function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
