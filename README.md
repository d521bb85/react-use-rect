# react-use-rect

Utility hook that aims to help with tracking an element's bounding client rect.

It might be found useful for simple cases such as getting element's size and position once it mounted to the DOM.
As well as for complex ones when an element position changes frequently and needs to be tracked down (e.g. dropdowns and tooltips).

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

This hook doesn't make assumption on how you'd like to manage a rect data: save it as a state, put it into a ref or not to store it at all.

In the example above we save our rect into a local state so we use the `useState` hook. However, it's possible to pass to the hook your own function which will be called everytime a rect changes.

```tsx
const [rectRef] = useRect((rect) => console.log(rect.top));
return <div ref={rectRef} />;
```

The hook revalidates an element's bounding rect on each render but calls a passed function only when the element's rect changes.

### Resize

You also may want to revalidate the rect when the element's size has changed not as a consequence of rendering (e.g. textarea resized by a user manually). In order to cover this need the `resize` option is introduced.

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

A rect object implements the following interface.

```typescript
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
```

_It's the same as [DOMRect](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect)._
