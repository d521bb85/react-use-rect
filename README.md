# react-use-rect

Utility hook that aims to help with tracking an element's bounding client rect.

It might be found useful for simple cases such as getting element's size and position once it mounts to the DOM. As well as for complex ones when an element position changes frequently and needs to be tracked down (e.g. dropdowns and tooltips).

## Installation

For npm users:

```bash
npm i react-use-rect
```

For Yarn users:

```bash
yarn add react-use-rect
```

## Usage

Let's examine a very simple case at first.

```tsx
import { useState } from 'react';
import { Rect, useRect } from 'react-use-rect';

function Example() {
  const [rect, setRect] = useState<Rect | null>(null);
  const [rectRef] = useRect(setRect);

  return <div ref={rectRef}>{rect && `This div is ${rect.width}px wide.`}</div>;
}
```

This hook doesn't make assumptions on how you'd like to manage a rect data: save it as a state, put it into a ref or not to store it at all.

In the example above we save our rect into a local state so we use the `useState` hook. However, it's possible to pass your own function to handle rect changes. Let's call it `dispatchChange` function.

```tsx
const [rectRef] = useRect((rect) => console.log(rect.top));
return <div ref={rectRef} />;
```

The hook revalidates an element's bounding rect on every render but it calls `dispatchChange` only when the element's rect has changed.

### Resize

You also may want to revalidate the rect when the element's size chages not as a consequence of rendering (e.g. textarea being resized by a user).

In order to cover this need the `resize` option is introduced.

```typescript
useRect(dispatchChange, { resize: true });
```

In the following example we'll be watching a textarea resize. Once it being resized we update styles of another element according to the textarea's rect.

```tsx
import { useRef } from 'react';
import { useRect } from 'react-use-rect';

function Example2() {
  const rulerRef = useRef(null);
  const [rectRef] = useRect(
    (rect) => {
      if (rulerRef.current) {
        rulerRef.current.style.top = `${rect.top + rect.height + 10}px`;
        rulerRef.current.style.left = `${rect.left}px`;
        rulerRef.current.style.width = `${rect.width}px`;
      }
    },
    { resize: true }
  );

  return (
    <div>
      <div
        ref={rulerRef}
        style={{
          position: 'fixed',
          height: 2,
          background: 'red'
        }}
      />
      <textarea ref={rectRef} />
    </div>
  );
}
```

### Scroll

It's also possible to revalidate a rect when a user scrolled the document, or some transition ended or something else happend and you want to be sure the rect is updated. Just call the `revalidate` function manually.

```typescript
const [rectRef, revalidate] = useRect(dispatchChange);
revalidate();
```

_Note that both `rectRef` and `revalidate` functions a referentially stable and never changes during a component lifetime._

If you want `dispatchChange` to be called regardless the rect has changed or not use the `force` option.

```typescript
revalidate({ force: true });
```

## Reference

```typescript
interface UseRect {
  (dispatchChange: DispatchChange, options?: Options): Result;
}

interface DispatchChange {
  (rect: Rect): void;
}

interface Rect {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

interface Options {
  resize?: boolean;
}

type Result = [SetElement, Revalidate];

interface SetElement {
  (element: Element | null): void;
}

interface Revalidate {
  (options?: RevalidateOptions): void;
}

interface RevalidateOptions {
  force?: boolean;
}
```
