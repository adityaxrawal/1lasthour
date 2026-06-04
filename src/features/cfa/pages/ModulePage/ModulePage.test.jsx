import { render } from '@testing-library/react';
import React from 'react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { ModulePage } from './ModulePage';
import { useModulePage } from './useModulePage';

// Mock dependencies
vi.mock('./useModulePage', () => ({
  useModulePage: vi.fn()
}));

// Mock UI components to simplify rendering
vi.mock('@components/ui', () => ({
  LoadingState: ({ message }) => <div data-testid="loading-state">{message}</div>,
  ErrorState: ({ title, message }) => <div data-testid="error-state">{title}: {message}</div>,
  NotFoundState: ({ title }) => <div data-testid="not-found-state">{title}</div>
}));

vi.mock('./components/ComingSoonPage', () => ({
  ComingSoonPage: () => <div data-testid="coming-soon">Coming Soon</div>
}));

vi.mock('./components/ModuleBreadcrumbs', () => ({
  ModuleBreadcrumbs: () => <div data-testid="module-breadcrumbs">Breadcrumbs</div>
}));

vi.mock('./components/ModuleHeader', () => ({
  ModuleHeader: () => <div data-testid="module-header">Header</div>
}));

vi.mock('./components/ModuleSidebar', () => ({
  ModuleSidebar: () => <div data-testid="module-sidebar">Sidebar</div>
}));

vi.mock('./components/MainContent', () => ({
  MainContent: () => <div data-testid="main-content">Main Content</div>
}));

describe('ModulePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default valid state
    useModulePage.mockReturnValue({
      topicId: 't1',
      moduleId: 'm1',
      level: 1,
      topicData: { id: 't1' },
      moduleData: { id: 'm1' },
      moduleIndex: 1,
      hasLOSData: true,
      losCount: 5,
      totalConcepts: 10,
      totalFormulas: 2,
      relatedTopics: [],
      basePath: '/cfa',
      isLoading: false,
      isError: false,
    });
  });

  it('renders loading state when isLoading is true', () => {
    useModulePage.mockReturnValue({ isLoading: true });
    const { getByTestId, getByText } = render(<ModulePage />);
    
    expect(getByTestId('loading-state')).toBeInTheDocument();
    expect(getByText('Loading module...')).toBeInTheDocument();
  });

  it('renders error state when isError is true', () => {
    useModulePage.mockReturnValue({ isLoading: false, isError: true });
    const { getByTestId, getByText } = render(<ModulePage />);
    
    expect(getByTestId('error-state')).toBeInTheDocument();
    expect(getByText(/There was a problem fetching the module/)).toBeInTheDocument();
  });

  it('renders coming soon page for levels > 1', () => {
    useModulePage.mockReturnValue({ isLoading: false, isError: false, level: 2 });
    const { getByTestId } = render(<ModulePage />);
    
    expect(getByTestId('coming-soon')).toBeInTheDocument();
  });

  it('renders not found state when topicData or moduleData is missing', () => {
    useModulePage.mockReturnValue({ isLoading: false, isError: false, level: 1, topicData: null, moduleData: { id: 'm1' }, basePath: '/cfa', topicId: 't1' });
    const { getByTestId, unmount } = render(<ModulePage />);
    expect(getByTestId('not-found-state')).toBeInTheDocument();
    unmount();
    
    useModulePage.mockReturnValue({ isLoading: false, isError: false, level: 1, topicData: { id: 't1' }, moduleData: null, basePath: '/cfa', topicId: 't1' });
    const { getByTestId: getByTestId2 } = render(<ModulePage />);
    expect(getByTestId2('not-found-state')).toBeInTheDocument();
  });

  it('renders main content correctly when data is present', () => {
    const { getByTestId } = render(<ModulePage />);
    
    expect(getByTestId('module-breadcrumbs')).toBeInTheDocument();
    expect(getByTestId('module-header')).toBeInTheDocument();
    expect(getByTestId('main-content')).toBeInTheDocument();
    expect(getByTestId('module-sidebar')).toBeInTheDocument();
  });
});
