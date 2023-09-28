import { UseRect } from "./common-interfaces";

// in a backend environment (SSR) it's impossible to get an element's rect
// so we just use a dummy implementation that does nothing
export const serverUseRect: UseRect = () => [() => {}, () => {}];
