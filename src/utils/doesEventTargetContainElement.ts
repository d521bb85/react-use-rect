export function doesEventTargetContainElement(
  target: EventTarget | null,
  element: Element
) {
  return (
    target === window || (target instanceof Node && target.contains(element))
  );
}
