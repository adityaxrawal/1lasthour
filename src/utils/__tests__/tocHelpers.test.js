import { describe, it, expect } from 'vitest';

import { getTOCItems } from '../tocHelpers';

describe('getTOCItems', () => {
  it('should return empty array for empty inputs', () => {
    expect(getTOCItems(false, {})).toEqual([]);
  });

  it('should return legacy module sections when no LOS data', () => {
    const legacyModule = {
      keyConcepts: [1, 2],
      formulas: [1],
      examTips: [1],
      commonMistakes: [1],
    };
    const expected = [
      { href: '#concepts', label: 'Key Concepts', className: 'font-medium' },
      { href: '#formulas', label: 'Key Formulas', className: 'font-medium' },
      { href: '#tips', label: 'Exam Tips', className: '' },
      { href: '#mistakes', label: 'Common Mistakes', className: '' }
    ];
    expect(getTOCItems(false, legacyModule)).toEqual(expected);
  });

  it('should omit sections if undefined in legacy module', () => {
    const legacyModule = {};
    const expected = [];
    expect(getTOCItems(false, legacyModule)).toEqual(expected);
  });

  it('should return LOS sections when LOS data is present', () => {
    const losModule = {
      learningOutcomes: [
        { formulas: [1] }
      ]
    };
    const expected = [
      { href: '#los-header', label: 'Interpret Interest Rates', className: 'font-medium' },
      { href: '#concepts', label: 'Key Concepts', className: 'font-medium' },
      { href: '#formulas', label: 'Formulas', className: 'font-medium' }
    ];
    expect(getTOCItems(true, losModule)).toEqual(expected);
  });
});
