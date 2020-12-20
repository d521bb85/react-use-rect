export interface Rect {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

export interface Options {
  scroll?: boolean;
  transitionEnd?: boolean;
}

export type Result = [Rect, (element: Element | null) => void];
