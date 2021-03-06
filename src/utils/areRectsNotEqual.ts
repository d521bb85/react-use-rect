import { Rect } from '../types';

const RECT_KEYS: (keyof Rect)[] = [
  'bottom',
  'height',
  'left',
  'right',
  'top',
  'width',
  'x',
  'y'
];

export function areRectsNotEqual(rectA: Rect, rectB: Rect) {
  return rectA !== rectB && RECT_KEYS.some((key) => rectA[key] !== rectB[key]);
}
