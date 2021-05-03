import { doesEventTargetContainElement } from '../../../src/utils/doesEventTargetContainElement';

describe('doesEventTargetContainElement', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should return true when the event target is window and the element is connected', () => {
    const element = document.createElement('div');
    document.body.appendChild(element);

    expect(doesEventTargetContainElement(window, element)).toBeTruthy();

    element.remove();
  });

  it('should return false when the element is not connected', () => {
    const element = document.createElement('div');
    expect(doesEventTargetContainElement(window, element)).toBeFalsy();
  });


  it('should return true if event target does contain element and false if does not', () => {
    const root = document.createElement('div');
    document.body.appendChild(root);

    root.innerHTML = `
      <div id="parent1">
        <div id="child1"></div>
      </div>

      <div id="parent2">
        <div id="child2"></div>
      </div>
    `;

    const parent1 = document.querySelector('#parent1') as Element;
    const child1 = document.querySelector('#child1') as Element;
    const child2 = document.querySelector('#child2') as Element;

    expect(doesEventTargetContainElement(root, child1)).toBeTruthy();
    expect(doesEventTargetContainElement(root, child2)).toBeTruthy();

    expect(doesEventTargetContainElement(parent1, child1)).toBeTruthy();
    expect(doesEventTargetContainElement(parent1, child2)).toBeFalsy();

    root.remove();
  });
});
