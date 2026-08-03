/**
 * vision/ — classic computer-vision algorithms (pure TypeScript).
 */
export {
  canny,
  cannyFromGray,
  toGrayscale,
  gaussianBlur,
  sobel,
  nonMaximumSuppression,
  hysteresis,
  grayToRGBA,
  HYST_NONE,
  HYST_WEAK_DROPPED,
  HYST_WEAK_KEPT,
  HYST_STRONG,
} from './canny';
export type { CannyOptions, CannyResult } from './canny';
