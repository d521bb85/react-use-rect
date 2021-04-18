import { useCallback, useEffect, useRef, useState } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import { DEFAULT_OPTIONS, DEFAULT_RECT } from './defaults';
import { Options, Rect, Result } from './types';
import {
  areRectsNotEqual,
  getElementRect,
  listenToWindow,
  useIsomorphicLayoutEffect,
  doesEventTargetContainElement
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

  // wrap the update function into a ref
  // to avoid frequent events re-subscriptions
  const updateRef = useRef(update);
  useEffect(() => {
    updateRef.current = update;
  }, [update]);

  useEffect(() => {
    if (!element) {
      return;
    }

    return listenToWindow('resize', () => updateRef.current());
  }, [element]);

  useEffect(() => {
    if (!element || !scroll) {
      return;
    }

    return listenToWindow('scroll', ({ target }) => {
      if (doesEventTargetContainElement(target, element)) {
        updateRef.current();
      }
    });
  }, [scroll, element]);

  useEffect(() => {
    if (!element || !transitionEnd) {
      return;
    }

    return listenToWindow('transitionend', ({ target }) => {
      if (
        target === element ||
        doesEventTargetContainElement(target, element)
      ) {
        updateRef.current();
      }
    });
  }, [transitionEnd, element]);

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
