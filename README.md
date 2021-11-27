# react-use-rect

This hook aims to help you on tracking a DOM element bounding rect.

It could be useful no matter you want just get an element's size and position once it mounts to the DOM, or build a complex logic for tooltips, popovers and other fancy UI stuff.

## Getting started

Install a package into your project.

```bash
npm i react-use-rect
```

And for Yarn users.

```bash
yarn add react-use-rect
```

Let's create a simple component that uses a `useRect` hook.

```typescript
import React, { useState } from 'react';
import { Rect, useRect } from 'react-use-rect';

function Example() {
  const [rect, setRect] = useState<Rect | undefined>();
  const [rectRef] = useRect(setRect);

  return (
    <div ref={rectRef}>{rect && <span>I'm ${rect.width}px wide!</span>}</div>
  );
}
```

If you want to keep track on an element's size change you may use `resize` option.

```typescript
useRect(setRect, { resize: true });
```

Well, `resize` is the one and the only option supported.

### Updating a bounding rect manually

There a certain scenarios when you may want to re-measure a bounding rect. And it tries to cover them all introducing `revalidateRect` function as well as `useWindowOn` hook which simplifies adding an event listener to a `window`.

Let's take a closer look at it.

```typescript
import React, { useState } from 'react';
import { Rect, useRect } from 'react-use-rect';

function Example() {
  const [rect, setRect] = useState<Rect | undefined>();
  const [rectRef] = useRect(setRect);

  return (
    <div ref={rectRef}>
      {rect && <span>Passing coordinates ${rect.top}px wide!</span>}
    </div>
  );
}
```
