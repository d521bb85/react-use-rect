import { ResizeObserver } from '@juggle/resize-observer';
import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect
} from 'react';

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

const DEFAULT_RECT: Rect = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0
};

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

function areRectsDifferent(rectA: Rect, rectB: Rect) {
  for (const key of RECT_KEYS) {
    if (rectA[key] !== rectB[key]) {
      return true;
    }
  }

  return false;
}

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

function useRerender() {
  const [, rerender] = useState({});
  return useCallback(() => rerender({}), []);
}

export interface Options {
  scroll?: boolean;
  transitionEnd?: boolean;
}

export function useRect({ scroll = true, transitionEnd = true }: Options) {
  const resizeObserverRef = useRef<ResizeObserver>();
  const targetElementRef = useRef<Element>();
  const rectRef = useRef(DEFAULT_RECT);

  const rerender = useRerender();

  const updateRect = useCallback(() => {
    if (!targetElementRef.current) {
      if (rectRef.current !== DEFAULT_RECT) {
        rectRef.current = DEFAULT_RECT;
        rerender();
      }

      return;
    }

    const clientRect = targetElementRef.current.getBoundingClientRect();
    const nextRect = {
      bottom: clientRect.bottom,
      height: clientRect.height,
      left: clientRect.left,
      right: clientRect.right,
      top: clientRect.top,
      width: clientRect.width,
      x: clientRect.x,
      y: clientRect.y
    };

    if (areRectsDifferent(rectRef.current, nextRect)) {
      rectRef.current = nextRect;
      rerender();
    }
  }, [rerender]);

  const targetElementCallbackRef = useCallback(
    (targetElement: Element | null) => {
      targetElementRef.current = targetElement ?? undefined;

      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = undefined;
      }

      if (targetElementRef.current) {
        resizeObserverRef.current = new ResizeObserver(updateRect);
        resizeObserverRef.current.observe(targetElementRef.current);
      }
    },
    [updateRect]
  );

  useIsomorphicLayoutEffect(() => {
    const globalEventListener = () => updateRect();
    const globalEventConfig = {
      capture: true,
      passive: true
    };

    if (scroll) {
      window.addEventListener('scroll', globalEventListener, globalEventConfig);
    }

    if (transitionEnd) {
      window.addEventListener(
        'transitionend',
        globalEventListener,
        globalEventConfig
      );
    }

    return () => {
      if (scroll) {
        window.removeEventListener(
          'scroll',
          globalEventListener,
          globalEventConfig
        );
      }

      if (transitionEnd) {
        window.removeEventListener(
          'transitionend',
          globalEventListener,
          globalEventConfig
        );
      }
    };
  }, [scroll, transitionEnd, updateRect]);

  useIsomorphicLayoutEffect(updateRect);

  return [targetElementCallbackRef, rectRef.current] as [
    (targetElement: Element | null) => void,
    Rect
  ];
}
