export function doesEventTargetContainElement(
  target: EventTarget | null,
  element: Element
) {
  return (
    (target === window && element.isConnected) ||
    (target instanceof Node && target.contains(element))
  );
}
