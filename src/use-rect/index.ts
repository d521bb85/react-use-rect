import { serverUseRect } from "./server-use-rect";
import { clientUseRect } from "./client-use-rect";

export const useRect =
  typeof window === "undefined" ? serverUseRect : clientUseRect;
