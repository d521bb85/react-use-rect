export interface UseRect {
  (dispatchChange: DispatchChange, options?: Options): Result;
}

export interface DispatchChange {
  (rect: Rect): void;
}
export interface Options {
  readonly resize?: boolean;
}

export interface Rect {
  readonly bottom: number;
  readonly height: number;
  readonly left: number;
  readonly right: number;
  readonly top: number;
  readonly width: number;
  readonly x: number;
  readonly y: number;
}

export type Result = [SetElement, Revalidate];

export interface SetElement {
  (element: Element | null): void;
}

export interface Revalidate {
  (options?: RevalidateOptions): void;
}

export interface RevalidateOptions {
  readonly force?: boolean;
}
