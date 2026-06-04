import { describe, it, expect } from 'vitest';
import { calculateZoom, calculateZoomIn, calculateZoomOut, calculatePan } from '../zoomPanHelpers';

describe('zoomPanHelpers', () => {
  it('calculateZoom should apply multiplicative zoom and clamp bounds', () => {
    expect(calculateZoom(100, 1)).toBeCloseTo(101, 0); // 1.01 ** 1 * 100 = 101
    expect(calculateZoom(100, -1)).toBeCloseTo(99, 0); // 1.01 ** -1 * 100 = 99.01
    expect(calculateZoom(600, 10)).toBe(600); // clamped max
    expect(calculateZoom(50, -10)).toBe(50); // clamped min
  });

  it('calculateZoomIn should increase zoom by 1.25x and clamp to 600', () => {
    expect(calculateZoomIn(100)).toBe(125);
    expect(calculateZoomIn(500)).toBe(600); // 500 * 1.25 = 625 clamped to 600
  });

  it('calculateZoomOut should decrease zoom by 1.25x and clamp to 50', () => {
    expect(calculateZoomOut(100)).toBe(80);
    expect(calculateZoomOut(60)).toBe(50); // 60 / 1.25 = 48 clamped to 50
  });

  it('calculatePan should compute correct scroll delta based on client movement', () => {
    const e = { clientX: 200, clientY: 300 };
    const startPos = { x: 100, y: 150 };
    const scrollPos = { left: 500, top: 600 };
    
    // dx = 100, dy = 150
    // new left = 500 - 100 = 400
    // new top = 600 - 150 = 450
    expect(calculatePan(e, startPos, scrollPos)).toEqual({
      left: 400,
      top: 450
    });
  });
});
