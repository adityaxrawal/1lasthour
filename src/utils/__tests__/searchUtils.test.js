import { describe, it, expect } from 'vitest';

import { groupResultsByType } from '../searchUtils';

describe('groupResultsByType', () => {
  it('should return empty object for empty array', () => {
    expect(groupResultsByType([])).toEqual({});
  });

  it('should group results by exact type match', () => {
    const results = [
      { id: 1, type: 'Module' },
      { id: 2, type: 'Formula' },
      { id: 3, type: 'Module' }
    ];
    const expected = {
      Module: [
        { id: 1, type: 'Module' },
        { id: 3, type: 'Module' }
      ],
      Formula: [
        { id: 2, type: 'Formula' }
      ]
    };
    expect(groupResultsByType(results)).toEqual(expected);
  });

  it('should preserve original string values for type without normalization', () => {
    const results = [
      { id: 1, type: 'LOS Outcome' },
      { id: 2, type: 'Learning Outcome' }
    ];
    const expected = {
      'LOS Outcome': [
        { id: 1, type: 'LOS Outcome' }
      ],
      'Learning Outcome': [
        { id: 2, type: 'Learning Outcome' }
      ]
    };
    expect(groupResultsByType(results)).toEqual(expected);
  });

  it('should group items without type under "undefined" key', () => {
    const results = [
      { id: 1 },
      { id: 2, type: '' }
    ];
    const expected = {
      'undefined': [
        { id: 1 }
      ],
      '': [
        { id: 2, type: '' }
      ]
    };
    expect(groupResultsByType(results)).toEqual(expected);
  });
});
