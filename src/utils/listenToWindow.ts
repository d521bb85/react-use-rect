const LISTENER_CONFIG = {
  capture: true,
  passive: true
};

export function listenToWindow<K extends keyof WindowEventMap>(
  eventType: K,
  listener: (event: WindowEventMap[K]) => void
) {
  window.addEventListener(eventType, listener, LISTENER_CONFIG);

  return () => window.removeEventListener(eventType, listener, LISTENER_CONFIG);
}
