import { useEffect, useRef } from 'react';

export function useWindowOn<T extends keyof WindowEventMap>(
  eventType: T,
  callback: (event: WindowEventMap[T]) => void
) {
  if (typeof window === undefined) {
    return;
  }

  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    const listener = (event: WindowEventMap[T]) => {
      callbackRef.current(event);
    };

    const options: AddEventListenerOptions = {
      capture: true,
      passive: true
    };

    window.addEventListener(eventType, listener, options);
    return () => {
      window.removeEventListener(eventType, listener, options);
    };
  }, [eventType]);
}