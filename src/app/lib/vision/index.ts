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
} from './canny';
export type { CannyOptions, CannyResult } from './canny';
