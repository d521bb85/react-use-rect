const LISTENER_CONFIG = {
  capture: true,
  passive: true
};

export function listenTo(eventType: string, listener: () => void) {
  window.addEventListener(eventType, listener, LISTENER_CONFIG);

  return () => {
    window.removeEventListener(eventType, listener, LISTENER_CONFIG);
  };
}
