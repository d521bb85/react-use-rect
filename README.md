# react-use-rect

This hook makes it easy to measure a DOM element boundaries (DOMRect).

It's especially useful when it's needed to re-measure boundaries when element size changes, window resizes, parent element scrolls or transition ends as well.

## Installation

```
npm install react-use-rect
```

## Usage

```typescript
import React from 'react';
import { useRect } from 'react-use-rect';

function Component() {
  const [rect, ref] = useRect();
  return <div ref={ref} />;
}
```

## Options

The hook accepts an object of options.

```typescript
useRect({ scroll: true, transitionEnd: true });
```

### scroll

_default: false_

If enabled, element boundaries will be re-measured when the scroll took place.

### transitionEnd

_default: false_

If enabled, element boundaries will be re-measured when transition ends.
