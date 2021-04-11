# react-use-rect

The hook that measures a DOM element boundaries (DOMRect).

It responds to a target element size change, window resize, parent elements scroll and transition ends as well.

## Get started

```
npm install react-use-rect
```

```typescript
import React from 'react';
import { useRect } from 'react-use-rect';

function Component() {
  const [ref, rect] = useRect();
  return <div ref={ref} />;
}
```

## Options

```typescript
useRect({ scroll: true, transitionEnd: true });
```

### scroll

_default: false_

If enabled, it will respond to scroll changes.

_NOTE: Please, use this option only if you're sure you intend to update an element boundaries on it's parents scroll. Ubiquitous usage of this option can have a negative impact on scroll performance._

### transitionEnd

_default: false_

If enabled, it will respond to transition ends.
