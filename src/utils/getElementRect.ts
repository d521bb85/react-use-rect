import { Rect } from '../types';

export function getElementRect(element: Element): Rect {
  const {
    bottom,
    height,
    left,
    right,
    top,
    width,
    x,
    y
  } = element.getBoundingClientRect();

  return {
    bottom,
    height,
    left,
    right,
    top,
    width,
    x,
    y
  };
}
