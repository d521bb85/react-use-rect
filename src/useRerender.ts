import { useState, useCallback } from 'react';

export function useRerender() {
  const [, rerender] = useState({});
  return useCallback(() => rerender({}), []);
}
