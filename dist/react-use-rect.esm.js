import { ResizeObserver } from '@juggle/resize-observer';
import equal from 'fast-deep-equal';
import { useCallback, useState, useRef, useEffect, useLayoutEffect } from 'react';

function useRerender() {
  var _useState = useState({}),
      rerender = _useState[1];

  return useCallback(function () {
    return rerender({});
  }, []);
}

var IS_SSR = typeof window === 'undefined';
var useIsomorphicEffect = IS_SSR ? useEffect : useLayoutEffect;
var GLOBAL_EVENTS = ['resize', 'scroll', 'transitionend'];
var GLOBAL_EVENT_CONFIG = {
  capture: true,
  passive: true
};
var DEFAULT_RECT = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0
};
function useRect() {
  var resizeObserverRef = useRef();
  var targetElementRef = useRef();
  var rectRef = useRef(DEFAULT_RECT);
  var rerender = useRerender();
  var updateRect = useCallback(function () {
    if (!targetElementRef.current) {
      if (rectRef.current !== DEFAULT_RECT) {
        rectRef.current = DEFAULT_RECT;
        rerender();
      }

      return;
    }

    var clientRect = targetElementRef.current.getBoundingClientRect();
    var nextRect = {
      bottom: clientRect.bottom,
      height: clientRect.height,
      left: clientRect.left,
      right: clientRect.right,
      top: clientRect.top,
      width: clientRect.width,
      x: clientRect.x,
      y: clientRect.y
    };

    if (!equal(rectRef.current, nextRect)) {
      rectRef.current = nextRect;
      rerender();
    }
  }, [rerender]);
  var targetElementCallbackRef = useCallback(function (targetElement) {
    targetElementRef.current = targetElement !== null && targetElement !== void 0 ? targetElement : undefined;

    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
      resizeObserverRef.current = undefined;
    }

    if (targetElementRef.current) {
      resizeObserverRef.current = new ResizeObserver(updateRect);
      resizeObserverRef.current.observe(targetElementRef.current);
    }
  }, [updateRect]);
  useIsomorphicEffect(function () {
    if (IS_SSR) {
      return undefined;
    }

    var globalEventListener = function globalEventListener() {
      return updateRect();
    };

    GLOBAL_EVENTS.forEach(function (eventType) {
      window.addEventListener(eventType, globalEventListener, GLOBAL_EVENT_CONFIG);
    });
    return function () {
      GLOBAL_EVENTS.forEach(function (eventType) {
        window.removeEventListener(eventType, globalEventListener, GLOBAL_EVENT_CONFIG);
      });
    };
  }, [updateRect]);
  useIsomorphicEffect(updateRect);
  return [targetElementCallbackRef, rectRef.current];
}

export { useRect };
//# sourceMappingURL=react-use-rect.esm.js.map
