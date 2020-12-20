// @ts-nocheck

import { useCallback, useRef, useState } from 'react';
import { DEFAULT_OPTIONS, DEFAULT_RECT } from './defaults';
import { Options, Rect, Result } from './types';
import {
  areRectsNotEqual,
  getElementRect,
  listenTo,
  useIsomorphicEffect
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

  useIsomorphicEffect(update);

  const updateRef = useRef(update);
  updateRef.current = update;

  useIsomorphicEffect(() => {
    return listenTo('resize', () => updateRef.current());
  });

  useIsomorphicEffect(() => {
    if (scroll) {
      return listenTo('scroll', () => updateRef.current());
    }
  }, [scroll]);

  useIsomorphicEffect(() => {
    if (transitionEnd) {
      return listenTo('transitionend', () => updateRef.current());
    }
  }, [transitionEnd]);

  return [rect, setElement];
}
