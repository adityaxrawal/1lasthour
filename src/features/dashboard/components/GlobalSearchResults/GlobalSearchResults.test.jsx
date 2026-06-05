import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { useTopicsQuery } from '@/features/cfa/hooks/useTopicsQuery';
import { globalSearch, groupResultsByType } from '@/utils/searchUtils';

import GlobalSearchResults from './GlobalSearchResults';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

vi.mock('@/features/cfa/hooks/useTopicsQuery', () => ({
  useTopicsQuery: vi.fn(),
}));

vi.mock('@/utils/searchUtils', () => ({
  globalSearch: vi.fn(),
  groupResultsByType: vi.fn(),
}));

describe('GlobalSearchResults', () => {
  const mockSetSearchParams = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    useSearchParams.mockReturnValue([new URLSearchParams({ q: 'test' }), mockSetSearchParams]);

    useTopicsQuery.mockReturnValue({
      data: { data: [{ id: 'topic1', title: 'Test Topic' }] },
    });

    globalSearch.mockReturnValue([]);
    groupResultsByType.mockReturnValue({});
  });

  it('renders nothing when there is no query', () => {
    useSearchParams.mockReturnValue([new URLSearchParams(), mockSetSearchParams]);
    const { container } = render(
      <MemoryRouter>
        <GlobalSearchResults />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders "No results found" state correctly', () => {
    const { getByText } = render(
      <MemoryRouter>
        <GlobalSearchResults />
      </MemoryRouter>
    );
    expect(getByText('No results found')).toBeInTheDocument();
    expect(
      getByText(/We couldn't find any topics, modules, or concepts matching/)
    ).toBeInTheDocument();

    fireEvent.click(getByText('Clear search'));
    expect(mockSetSearchParams).toHaveBeenCalledWith({});
  });

  it('renders search results correctly grouped', () => {
    const mockResults = [
      { id: '1', type: 'topic', title: 'Topic Result', path: '/path1' },
      { id: '2', type: 'module', title: 'Module Result', path: '/path2' },
      { id: '3', type: 'concept', title: 'Concept Result', path: '/path3' },
      { id: '4', type: 'formula', title: 'Formula Result', path: '/path4' },
    ];

    globalSearch.mockReturnValue(mockResults);
    groupResultsByType.mockReturnValue({
      topic: [mockResults[0]],
      module: [mockResults[1]],
      concept: [mockResults[2]],
      formula: [mockResults[3]],
    });

    const { getByText } = render(
      <MemoryRouter>
        <GlobalSearchResults />
      </MemoryRouter>
    );

    // Header checks
    expect(getByText('Search Results for')).toBeInTheDocument();
    expect(getByText('"test"')).toBeInTheDocument();
    expect(getByText('4 results found')).toBeInTheDocument();

    // Sections
    expect(getByText('Topics')).toBeInTheDocument();
    expect(getByText('Topic Result')).toBeInTheDocument();

    expect(getByText('Modules')).toBeInTheDocument();
    expect(getByText('Module Result')).toBeInTheDocument();

    expect(getByText('Concepts')).toBeInTheDocument();
    expect(getByText('Concept Result')).toBeInTheDocument();

    expect(getByText('Formulas')).toBeInTheDocument();
    expect(getByText('Formula Result')).toBeInTheDocument();
  });

  it('handles grammar correctly for 1 result', () => {
    globalSearch.mockReturnValue([
      { id: '1', type: 'topic', title: 'Single Result', path: '/path1' },
    ]);
    groupResultsByType.mockReturnValue({
      topic: [{ id: '1', type: 'topic', title: 'Single Result', path: '/path1' }],
    });

    const { getByText } = render(
      <MemoryRouter>
        <GlobalSearchResults />
      </MemoryRouter>
    );

    expect(getByText('1 result found')).toBeInTheDocument();
  });

  it('renders context and description if present', () => {
    globalSearch.mockReturnValue([
      {
        id: '1',
        type: 'topic',
        title: 'Topic',
        path: '/path',
        context: 'Test Context',
        description: 'Test Description',
      },
    ]);
    groupResultsByType.mockReturnValue({
      topic: [
        {
          id: '1',
          type: 'topic',
          title: 'Topic',
          path: '/path',
          context: 'Test Context',
          description: 'Test Description',
        },
      ],
    });

    const { getByText } = render(
      <MemoryRouter>
        <GlobalSearchResults />
      </MemoryRouter>
    );

    expect(getByText('Test Context')).toBeInTheDocument();
    expect(getByText('Test Description')).toBeInTheDocument();
  });
});
