import { useCallback, useEffect, useRef, useState } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import { DEFAULT_OPTIONS, DEFAULT_RECT } from './defaults';
import { Options, Rect, Result } from './types';
import {
  areRectsNotEqual,
  getElementRect,
  listenTo,
  useIsomorphicLayoutEffect
} from './utils';

export function useRect(options: Options = {}): Result {
  const { scroll, transitionEnd } = { ...DEFAULT_OPTIONS, ...options };

  const [rect, setRect] = useState<Rect>(DEFAULT_RECT);
  const [element, setElement] = useState<Element | null>(null);

  const update = useCallback(() => {
    if (!element) {
      setRect(DEFAULT_RECT);
      return;
    }

    const nextRect = getElementRect(element);

    if (areRectsNotEqual(rect, nextRect)) {
      setRect(nextRect);
    }
  }, [element, rect]);

  useIsomorphicLayoutEffect(update);

  const updateRef = useRef(update);
  updateRef.current = update;

  useEffect(() => {
    return listenTo('resize', () => updateRef.current());
  }, []);

  useEffect(() => {
    if (!scroll) {
      return;
    }

    return listenTo('scroll', () => updateRef.current());
  }, [scroll]);

  useEffect(() => {
    if (!transitionEnd) {
      return;
    }

    return listenTo('transitionend', () => updateRef.current());
  }, [transitionEnd]);

  useEffect(() => {
    if (!element) {
      return;
    }

    const observer = new ResizeObserver(() => updateRef.current());
    observer.observe(element);

    return () => observer.disconnect();
  }, [element]);

  return [setElement, rect];
}
