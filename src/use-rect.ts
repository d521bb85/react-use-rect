import { useRef, useEffect, useCallback, useLayoutEffect } from 'react';

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

export type Revalidate = () => void;

export function useRect(
  dispatchChange: DispatchChange,
  options: Options = {}
): Result {
  const dispatchChangeRef = useRef(dispatchChange);
  useEffect(() => {
    dispatchChangeRef.current = dispatchChange;
  });

  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  });

  const elementRef = useRef<Element | null>(null);
  const rectRef = useRef<Rect | null>(null);

  const revalidate = useCallback(() => {
    if (!elementRef.current) {
      return;
    }

    const nextRect = elementRef.current.getBoundingClientRect();

    if (shouldDispatchRectChange(rectRef.current, nextRect)) {
      rectRef.current = nextRect;
      dispatchChangeRef.current(nextRect);
    }
  }, []);

  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const setupResizeObserver = useCallback(() => {
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
    }

    if (elementRef.current && optionsRef.current.resize) {
      resizeObserverRef.current = new ResizeObserver(revalidate);
      resizeObserverRef.current.observe(elementRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, []);

  const setElement = useCallback((element: Element | null) => {
    elementRef.current = element;
    revalidate();
    setupResizeObserver();
  }, []);

  useIsomorphicLayoutEffect(revalidate);

  return [setElement, revalidate];
}

const RECT_KEYS = [
  'bottom',
  'height',
  'left',
  'right',
  'top',
  'width',
  'x',
  'y'
] as const;

function shouldDispatchRectChange(rect: Rect | null, nextRect: Rect) {
  return (
    !rect ||
    (rect !== nextRect && RECT_KEYS.some((key) => rect[key] !== nextRect[key]))
  );
}

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;
