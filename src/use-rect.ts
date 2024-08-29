import { useCallback, useEffect, useRef } from "react";

export type UseRect = (
  dispatchChange: DispatchChange,
  options?: Options,
) => Result;

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

export type DispatchChange = (rect: Rect) => void;
export interface Options {
  resize?: boolean;
}

export type Result = [SetElement, Revalidate];

export type SetElement = (element: Element | null) => void;

export type Revalidate = (options?: RevalidateOptions) => void;

export interface RevalidateOptions {
  force?: boolean;
}

export function useRect(
  dispatchChange: DispatchChange,
  { resize = false }: Options = {},
): Result {
  const dispatchChangeRef = useRef(dispatchChange);
  useEffect(() => {
    dispatchChangeRef.current = dispatchChange;
  }, [dispatchChange]);

  const resizeRef = useRef(resize);
  useEffect(() => {
    resizeRef.current = resize;
    setupResizeObserver();
  }, [resize]);

  const elementRef = useRef<Element | null>(null);
  const setElement = useCallback((element: Element | null) => {
    if (element === elementRef.current) {
      return;
    }

    elementRef.current = element;
    revalidate();
    setupResizeObserver();
  }, []);

  const rectRef = useRef<Rect | null>(null);
  const revalidate = useCallback(
    ({ force = false }: RevalidateOptions = {}) => {
      if (!elementRef.current) {
        return;
      }

      const nextRect = elementRef.current.getBoundingClientRect();

      if (force || shouldDispatchRectChange(rectRef.current, nextRect)) {
        rectRef.current = nextRect;
        const { bottom, height, left, right, top, width, x, y } = nextRect;

        dispatchChangeRef.current({
          bottom,
          height,
          left,
          right,
          top,
          width,
          x,
          y,
        });
      }
    },
    [],
  );

  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const setupResizeObserver = useCallback(() => {
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
      resizeObserverRef.current = null;
    }

    if (elementRef.current && resizeRef.current) {
      resizeObserverRef.current = new ResizeObserver(() => revalidate());
      resizeObserverRef.current.observe(elementRef.current);
    }
  }, [revalidate]);

  useEffect(revalidate);

  return [setElement, revalidate];
}

const RECT_KEYS = [
  "bottom",
  "height",
  "left",
  "right",
  "top",
  "width",
  "x",
  "y",
] as const;

function shouldDispatchRectChange(rect: Rect | null, nextRect: Rect) {
  return (
    !rect ||
    (rect !== nextRect && RECT_KEYS.some((key) => rect[key] !== nextRect[key]))
  );
}
