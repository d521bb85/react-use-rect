# react-use-rect

The hook that measures a DOM element boundaries (DOMRect).

It responds to a target element and window size changes, parent elements scroll changes and transition ends as well.

## Installation

```
npm install react-use-rect
```

## Usage

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

_NOTE: Please, use this option only if you're sure you intend to update an element boundaries on scroll changes. Ubiquitous usage of this option can have a negative impact on scroll performance._

### transitionEnd

_default: false_

If enabled, it will respond to transition ends.
