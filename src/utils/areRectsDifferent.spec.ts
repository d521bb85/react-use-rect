import { areRectsDifferent } from './areRectsDifferent';

describe('areRectsDifferent', () => {
  it('should return false when both rects have the same values', () => {
    const rectA = {
      bottom: 13,
      height: 11,
      left: 23,
      right: 90,
      top: 49,
      width: 37,
      x: 4,
      y: 489
    };

    const rectB = {
      bottom: 13,
      height: 11,
      left: 23,
      right: 90,
      top: 49,
      width: 37,
      x: 4,
      y: 489
    };

    expect(areRectsDifferent(rectA, rectB)).toBe(false);
  });
});
