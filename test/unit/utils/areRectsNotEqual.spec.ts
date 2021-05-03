import { Rect } from '../../../src/types';
import { areRectsNotEqual } from '../../../src/utils/areRectsNotEqual';

describe('areRectsNotEqual', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should return false when both rects passed are the same object', () => {
    const rectA = {} as Rect;
    const rectB = rectA;

    expect(areRectsNotEqual(rectA, rectB)).toBeFalsy();
  });

  it('should return false when both rects are shallowly equal', () => {
    const rectA: Rect = {
      bottom: 1,
      height: 2,
      left: 3,
      right: 4,
      top: 5,
      width: 6,
      x: 7,
      y: 8
    };

    const rectB: Rect = {
      bottom: 1,
      height: 2,
      left: 3,
      right: 4,
      top: 5,
      width: 6,
      x: 7,
      y: 8
    };

    expect(areRectsNotEqual(rectA, rectB)).toBeFalsy();
  });

  it('should return true when rects are not equal to each other', () => {
    const rectA: Rect = {
      bottom: 1,
      height: 2,
      left: 3,
      right: 4,
      top: 5,
      width: 6,
      x: 7,
      y: 8
    };

    const rectB: Rect = {
      bottom: 1,
      height: 19,
      left: 3,
      right: 4,
      top: 5,
      width: 6,
      x: 7,
      y: 8
    };

    expect(areRectsNotEqual(rectA, rectB)).toBeTruthy();
  });
});
