export interface Rect {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
    x: number;
    y: number;
}
export declare function useRect(): [(targetElement: Element | null) => void, Rect];
