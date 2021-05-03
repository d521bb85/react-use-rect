import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import * as RO from '@juggle/resize-observer';
import { Rect } from '../../src/types';
import { useRect } from '../../src/useRect';

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
      const [rectRef, rect] = useRect();
      testFn(rect);
      return <div ref={rectRef} />;
    }

    render(<Component />);
    await waitFor(() => expect(testFn).toBeCalledWith({
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0
    }));
  });

  it('should get element rect', async () => {
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
      const [rectRef, rect] = useRect();
      testFn(rect);
      return <div ref={rectRef} />;
    }

    render(<Component />);
    await waitFor(() => expect(testFn).toBeCalledWith(fakeRect));
  });

  it('should update rect on window resize', async () => {
    const testFn = jest.fn();

    function Component() {
      const [rectRef, rect] = useRect();
      testFn(rect);
      return <div ref={rectRef} />;
    }

    render(<Component />);

    const fakeRect = {
      bottom: 2,
      height: 3,
      left: 4,
      right: 5,
      top: 6,
      width: 7,
      x: 8,
      y: 9
    };

    mockRect(fakeRect);

    fireEvent(window, new Event('resize'));
    await waitFor(() => expect(testFn).toBeCalledWith(fakeRect));
  });

  it('should update rect on parent scroll', async () => {
    const testFn = jest.fn();

    function Component() {
      const [rectRef, rect] = useRect({ scroll: true });
      testFn(rect);
      return <div ref={rectRef} />;
    }

    render(<Component />);

    const fakeRect = {
      bottom: 3,
      height: 4,
      left: 5,
      right: 6,
      top: 7,
      width: 8,
      x: 9,
      y: 10
    };

    mockRect(fakeRect);

    fireEvent.scroll(document.body);
    await waitFor(() => expect(testFn).toBeCalledWith(fakeRect));
  });

  it('should update rect on parent transitionEnd', async () => {
    const testFn = jest.fn();

    function Component() {
      const [rectRef, rect] = useRect({ transitionEnd: true });
      testFn(rect);
      return <div ref={rectRef} />;
    }

    const { container } = render(<Component />);

    const fakeRect = {
      bottom: 4,
      height: 5,
      left: 6,
      right: 7,
      top: 8,
      width: 9,
      x: 10,
      y: 11
    };

    mockRect(fakeRect);

    fireEvent.transitionEnd(container);
    await waitFor(() => expect(testFn).toBeCalledWith(fakeRect));
  });

  it('should update rect when element size changes', async () => {
    let resizeObserverCallback = () => {};

    const observeMock = jest.fn();
    const disconnectMock = jest.fn();

    const ResizeObserverMock = jest
      .spyOn(RO, 'ResizeObserver')
      .mockImplementation((callback) => {
        resizeObserverCallback = callback as () => {};
        return {
          observe: observeMock,
          disconnect: disconnectMock
        } as any;
      });

    const testFn = jest.fn();

    function Component() {
      const [rectRef, rect] = useRect();
      testFn(rect);
      return <div ref={rectRef} />;
    }

    render(<Component />);

    await waitFor(() => expect(ResizeObserverMock).toBeCalled());
    await waitFor(() => expect(observeMock).toBeCalled());

    const fakeRect = {
      bottom: 5,
      height: 6,
      left: 7,
      right: 8,
      top: 9,
      width: 10,
      x: 11,
      y: 12
    };

    mockRect(fakeRect);

    act(() => resizeObserverCallback());

    await waitFor(() => expect(testFn).toBeCalledWith(fakeRect));
  });
});
