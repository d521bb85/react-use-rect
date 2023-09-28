import { useRef, useCallback, useEffect, useLayoutEffect } from "react";
import type {
  UseRect,
  Rect,
  SetElement,
  Revalidate,
} from "./common-interfaces";

export const clientUseRect: UseRect = (dispatchChange, options) => {
  const dispatchChangeRef = useRef(dispatchChange);
  dispatchChangeRef.current = dispatchChange;

  const resizeRef = useRef(options?.resize);
  resizeRef.current = options?.resize;

  const elementRef = useRef<Element | null>(null);

  const rectRef = useRef<Rect | null>(null);

  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const setElement: SetElement = useCallback((element) => {
    if (element === elementRef.current) {
      return;
    }
    elementRef.current = element;
    setupResizeObserver();
    revalidate();
  }, []);

  const revalidate: Revalidate = useCallback(({ force = false } = {}) => {
    if (!elementRef.current) {
      return;
    }
    const effectiveRect = elementRef.current.getBoundingClientRect();
    if (
      force ||
      !rectRef.current ||
      didRectChange(rectRef.current, effectiveRect)
    ) {
      rectRef.current = effectiveRect;
      dispatchChangeRef.current(effectiveRect);
    }
  }, []);

  const setupResizeObserver = useCallback(() => {
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
      resizeObserverRef.current = null;
    }
    if (resizeRef.current && elementRef.current) {
      resizeObserverRef.current = new ResizeObserver(() => revalidate());
      resizeObserverRef.current.observe(elementRef.current);
    }
  }, []);

  useEffect(() => {
    setupResizeObserver();
  }, [resizeRef.current]);

  useLayoutEffect(revalidate);

  return [setElement, revalidate];
};

function didRectChange(storedRect: Rect, effectiveRect: Rect) {
  return (
    storedRect.bottom !== effectiveRect.bottom ||
    storedRect.height !== effectiveRect.height ||
    storedRect.left !== effectiveRect.left ||
    storedRect.right !== effectiveRect.right ||
    storedRect.top !== effectiveRect.top ||
    storedRect.width !== effectiveRect.width ||
    storedRect.x !== effectiveRect.x ||
    storedRect.y !== effectiveRect.y
  );
}
