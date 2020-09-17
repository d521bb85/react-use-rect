# react-use-rect

This hook measures a target element boundaries.

It updates the measure once:

- the target element size changes;
- the target element or it's ascendant elements scroll;
- transitions end.

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
