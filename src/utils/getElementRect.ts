import { Rect } from '../types';

export function getElementRect(element: Element): Rect {
  const { toJSON, ...rect } = element.getBoundingClientRect();
  return rect;
}
