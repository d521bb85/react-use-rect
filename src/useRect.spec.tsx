// @ts-nocheck
import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { useRect } from './useRect';
import { DEFAULT_RECT } from './defaults';

function mockRect(fakeRect: Rect) {
  jest
    .spyOn(Element.prototype, 'getBoundingClientRect')
    .mockReturnValue({ ...fakeRect, toJSON: () => {} });
}

describe('useRect', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should return default rect', async () => {
    const testFn = jest.fn();

    function Component() {
      const [rect, rectRef] = useRect();
      testFn(rect);
      return <div ref={rectRef} />;
    }

    render(<Component />);
    await waitFor(() => expect(testFn).toBeCalledWith(DEFAULT_RECT));
  });

  it('should calc element rect', async () => {
    const testFn = jest.fn();

    const fakeRect = {
      bottom: 1,
      height: 2,
      left: 3,
      right: 4,
      top: 5,
      width: 6,
      x: 7,
      y: 8
    };

    mockRect(fakeRect);

    function Component() {
      const [rect, rectRef] = useRect();
      testFn(rect);
      return <div ref={rectRef} />;
    }

    render(<Component />);
    await waitFor(() => expect(testFn).toBeCalledWith(fakeRect));
  });

  it('should update rect on window resize', async () => {
    const testFn = jest.fn();

    function Component() {
      const [rect, rectRef] = useRect();
      testFn(rect);
      return <div ref={rectRef} />;
    }

    render(<Component />);

    const fakeRect = {
      bottom: 1,
      height: 2,
      left: 3,
      right: 4,
      top: 5,
      width: 6,
      x: 7,
      y: 8
    };

    mockRect(fakeRect);

    fireEvent(window, new Event('resize'));
    await waitFor(() => expect(testFn).toBeCalledWith(fakeRect));
  });

  it('should update rect on window scroll', async () => {
    const testFn = jest.fn();

    function Component() {
      const [rect, rectRef] = useRect({ scroll: true });
      testFn(rect);
      return <div ref={rectRef} />;
    }

    render(<Component />);

    const fakeRect = {
      bottom: 1,
      height: 2,
      left: 3,
      right: 4,
      top: 5,
      width: 6,
      x: 7,
      y: 8
    };

    mockRect(fakeRect);

    fireEvent.scroll(window);
    await waitFor(() => expect(testFn).toBeCalledWith(fakeRect));
  });

  it('should update rect on window transitionEnd', async () => {
    const testFn = jest.fn();

    function Component() {
      const [rect, rectRef] = useRect({ transitionEnd: true });
      testFn(rect);
      return <div ref={rectRef} />;
    }

    render(<Component />);

    const fakeRect = {
      bottom: 1,
      height: 2,
      left: 3,
      right: 4,
      top: 5,
      width: 6,
      x: 7,
      y: 8
    };

    mockRect(fakeRect);

    fireEvent.transitionEnd(window);
    await waitFor(() => expect(testFn).toBeCalledWith(fakeRect));
  });
});
