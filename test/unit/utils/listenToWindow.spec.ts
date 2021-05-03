import { listenToWindow } from '../../../src/utils/listenToWindow';

describe('listenToWindow', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should add an event listener and return a function that removes it', () => {
    const expectedListenerConfig = {
      capture: true,
      passive: true
    };

    jest.spyOn(window, 'addEventListener');
    jest.spyOn(window, 'removeEventListener');

    const listener = jest.fn();

    const removeListener = listenToWindow('click', listener);
    expect(window.addEventListener).toBeCalledWith('click', listener, expectedListenerConfig);

    removeListener();
    expect(window.removeEventListener).toBeCalledWith('click', listener, expectedListenerConfig);
  });
});
