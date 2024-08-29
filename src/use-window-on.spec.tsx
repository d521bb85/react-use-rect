import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { useWindowOn } from "./use-window-on";

describe("useWindowOn", () => {
  it("calls a callback when an event fires directly on window", () => {
    const callback = jest.fn();

    function Component() {
      useWindowOn("resize", callback);
      return null;
    }

    render(<Component />);
    fireEvent.resize(window);

    expect(callback).toBeCalled();
  });

  it("calls a callback when an event fires on a document", () => {
    const callback = jest.fn();

    function Component() {
      useWindowOn("scroll", callback);
      return null;
    }

    render(<Component />);
    fireEvent.scroll(document);
    expect(callback).toBeCalled();
  });

  it("calls a callback when an event fires on an element in the document", () => {
    const callback = jest.fn();

    function Container() {
      return (
        <div title="Container">
          <Component />
        </div>
      );
    }

    function Component() {
      useWindowOn("transitionend", callback);
      return null;
    }

    render(<Container />);
    fireEvent.transitionEnd(screen.getByTitle("Container"));
    expect(callback).toBeCalled();
  });
});
