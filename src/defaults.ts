import { Rect, Options } from './types';

export const DEFAULT_RECT: Rect = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0
};

export const DEFAULT_OPTIONS: Required<Options> = {
  scroll: false,
  transitionEnd: false
};
