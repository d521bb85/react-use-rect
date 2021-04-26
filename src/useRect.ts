import { useCallback, useEffect, useState } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import { DEFAULT_OPTIONS, DEFAULT_RECT } from './defaults';
import { Options, Result } from './types';
import {
  areRectsNotEqual,
  getElementRect,
  listenToWindow,
  useIsomorphicLayoutEffect,
  doesEventTargetContainElement
} from './utils';

export function useRect(options: Options = {}): Result {
  const scroll = options.scroll ?? DEFAULT_OPTIONS.scroll;
  const transitionEnd = options.transitionEnd ?? DEFAULT_OPTIONS.transitionEnd;

  const [element, setElement] = useState<Element | null>(null);
  const [rect, setRect] = useState(DEFAULT_RECT);

  const updateRect = useCallback(() => {
    setRect((currentRect) => {
      const nextRect = element ? getElementRect(element) : DEFAULT_RECT;
      return areRectsNotEqual(currentRect, nextRect) ? nextRect : currentRect;
    });
  }, [element, setRect]);

  // handle window resize
  useEffect(() => {
    if (!element) {
      return;
    }

    return listenToWindow('resize', updateRect);
  }, [element, updateRect]);

  // handle scroll
  useEffect(() => {
    if (!element || !scroll) {
      return;
    }

    return listenToWindow('scroll', ({ target }) => {
      if (doesEventTargetContainElement(target, element)) {
        updateRect();
      }
    });
  }, [scroll, element, updateRect]);

  // handle transitionend
  useEffect(() => {
    if (!element || !transitionEnd) {
      return;
    }

    return listenToWindow('transitionend', ({ target }) => {
      if (target === element || doesEventTargetContainElement(target, element)) {
        updateRect();
      }
    });
  }, [transitionEnd, element, updateRect]);

  // handle element resize
  useEffect(() => {
    if (!element) {
      return;
    }

    const observer = new ResizeObserver(updateRect);
    observer.observe(element);

    return () => observer.disconnect();
  }, [element, updateRect]);

  useIsomorphicLayoutEffect(updateRect);

  return [setElement, rect];
}
