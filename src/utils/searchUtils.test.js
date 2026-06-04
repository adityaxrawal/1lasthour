import { describe, it, expect, beforeEach } from 'vitest';
import { globalSearch, groupResultsByType } from './searchUtils';

describe('searchUtils', () => {
  const mockCfaData = [
    {
      id: 'topic1',
      title: 'Quantitative Methods',
      description: 'Intro to quant.',
      modules: [
        {
          id: 'module1',
          number: 1,
          title: 'Time Value of Money',
          learningOutcomes: [
            {
              title: 'Calculate future value',
              description: 'LOS description',
              concepts: [
                { id: 'concept1', text: 'Present Value', details: 'Value today' }
              ],
              formulas: [
                { id: 'formula1', name: 'FV Formula', latex: 'FV = PV(1+r)^n' }
              ]
            }
          ]
        },
        null // testing null tolerance
      ]
    },
    null // testing null tolerance
  ];

  beforeEach(() => {
    // Reset cache implicitly by providing new array reference in tests
  });

  describe('globalSearch', () => {
    it('returns empty array if no query provided', () => {
      expect(globalSearch('', mockCfaData)).toEqual([]);
      expect(globalSearch(null, mockCfaData)).toEqual([]);
    });

    it('returns empty array if cfaData is invalid', () => {
      expect(globalSearch('quant', null)).toEqual([]);
      expect(globalSearch('quant', {})).toEqual([]);
    });

    it('finds topics by title or description', () => {
      const results = globalSearch('quant', mockCfaData);
      expect(results).toHaveLength(1);
      expect(results[0].type).toBe('topic');
      expect(results[0].title).toBe('Quantitative Methods');
    });

    it('finds modules by title', () => {
      const results = globalSearch('time value', mockCfaData);
      // Wait, "time value" could match the module
      expect(results).toHaveLength(1);
      expect(results[0].type).toBe('module');
      expect(results[0].title).toContain('Time Value of Money');
    });

    it('finds concepts by text or details', () => {
      const results = globalSearch('present value', mockCfaData);
      expect(results).toHaveLength(1);
      expect(results[0].type).toBe('concept');
      expect(results[0].title).toBe('Present Value');
    });

    it('finds formulas by name or latex', () => {
      const results = globalSearch('FV = PV', mockCfaData);
      expect(results).toHaveLength(1);
      expect(results[0].type).toBe('formula');
      expect(results[0].title).toBe('FV Formula');
    });

    it('is case-insensitive', () => {
      const results = globalSearch('QUANTITATIVE', mockCfaData);
      expect(results).toHaveLength(1);
    });

    it('handles caching when data reference is same', () => {
      const res1 = globalSearch('quant', mockCfaData);
      const res2 = globalSearch('quant', mockCfaData);
      // Since it's identical array ref, it should hit cache.
      expect(res1).toEqual(res2);
    });
  });

  describe('groupResultsByType', () => {
    it('groups results correctly', () => {
      const results = [
        { id: '1', type: 'topic', title: 'T' },
        { id: '2', type: 'module', title: 'M' },
        { id: '3', type: 'topic', title: 'T2' },
      ];

      const grouped = groupResultsByType(results);
      
      expect(Object.keys(grouped)).toHaveLength(2);
      expect(grouped.topic).toHaveLength(2);
      expect(grouped.module).toHaveLength(1);
      expect(grouped.concept).toBeUndefined();
    });

    it('returns empty object for empty array', () => {
      expect(groupResultsByType([])).toEqual({});
    });
  });
});
