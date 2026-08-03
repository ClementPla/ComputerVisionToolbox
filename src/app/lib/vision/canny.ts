/**
 * Canny edge detection — a pure, from-scratch pipeline.
 *
 * Stages: grayscale → Gaussian blur → Sobel gradients → non-maximum
 * suppression → double-threshold hysteresis. Each stage is exposed so a
 * tutorial can visualize the intermediate results. Operates on single-channel
 * Float64 buffers; helpers convert to/from canvas RGBA.
 *
 * First module of the toolbox's `vision/` (classic computer-vision) layer.
 */

export interface CannyOptions {
  sigma?: number;
  lowThreshold?: number; // 0..255 on gradient magnitude
  highThreshold?: number; // 0..255
}

export interface CannyResult {
  width: number;
  height: number;
  grayscale: Float64Array;
  blurred: Float64Array;
  magnitude: Float64Array; // normalized to 0..255
  suppressed: Float64Array; // after non-max suppression, 0..255
  edges: Uint8ClampedArray; // final binary edge map, values 0 or 255
  /** Per-pixel hysteresis class: 0 none · 1 weak-dropped · 2 weak-kept · 3 strong. */
  hysteresisClasses: Uint8Array;
}

/** Hysteresis class labels. */
export const HYST_NONE = 0;
export const HYST_WEAK_DROPPED = 1;
export const HYST_WEAK_KEPT = 2;
export const HYST_STRONG = 3;

/** Luminance grayscale from RGBA pixel data. */
export function toGrayscale(rgba: Uint8ClampedArray, width: number, height: number): Float64Array {
  const out = new Float64Array(width * height);
  for (let i = 0; i < width * height; i++) {
    const r = rgba[i * 4];
    const g = rgba[i * 4 + 1];
    const b = rgba[i * 4 + 2];
    out[i] = 0.299 * r + 0.587 * g + 0.114 * b;
  }
  return out;
}

/** Separable Gaussian blur with reflected borders. */
export function gaussianBlur(
  src: Float64Array,
  width: number,
  height: number,
  sigma: number
): Float64Array {
  if (sigma <= 0) return src.slice();
  const radius = Math.max(1, Math.ceil(3 * sigma));
  const kernel = new Float64Array(2 * radius + 1);
  let sum = 0;
  for (let k = -radius; k <= radius; k++) {
    const v = Math.exp(-(k * k) / (2 * sigma * sigma));
    kernel[k + radius] = v;
    sum += v;
  }
  for (let i = 0; i < kernel.length; i++) kernel[i] /= sum;

  const reflect = (p: number, n: number) => (p < 0 ? -p - 1 : p >= n ? 2 * n - p - 1 : p);

  // Horizontal pass.
  const tmp = new Float64Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let acc = 0;
      for (let k = -radius; k <= radius; k++) {
        acc += kernel[k + radius] * src[y * width + reflect(x + k, width)];
      }
      tmp[y * width + x] = acc;
    }
  }
  // Vertical pass.
  const out = new Float64Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let acc = 0;
      for (let k = -radius; k <= radius; k++) {
        acc += kernel[k + radius] * tmp[reflect(y + k, height) * width + x];
      }
      out[y * width + x] = acc;
    }
  }
  return out;
}

/** Sobel gradient magnitude and direction (radians). */
export function sobel(
  src: Float64Array,
  width: number,
  height: number
): { magnitude: Float64Array; direction: Float64Array } {
  const magnitude = new Float64Array(width * height);
  const direction = new Float64Array(width * height);
  const at = (x: number, y: number) => {
    const cx = Math.min(width - 1, Math.max(0, x));
    const cy = Math.min(height - 1, Math.max(0, y));
    return src[cy * width + cx];
  };
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const gx =
        -at(x - 1, y - 1) - 2 * at(x - 1, y) - at(x - 1, y + 1) +
        at(x + 1, y - 1) + 2 * at(x + 1, y) + at(x + 1, y + 1);
      const gy =
        -at(x - 1, y - 1) - 2 * at(x, y - 1) - at(x + 1, y - 1) +
        at(x - 1, y + 1) + 2 * at(x, y + 1) + at(x + 1, y + 1);
      magnitude[y * width + x] = Math.hypot(gx, gy);
      direction[y * width + x] = Math.atan2(gy, gx);
    }
  }
  return { magnitude, direction };
}

/** Thin edges: keep a pixel only if it's a local maximum along the gradient. */
export function nonMaximumSuppression(
  magnitude: Float64Array,
  direction: Float64Array,
  width: number,
  height: number
): Float64Array {
  const out = new Float64Array(width * height);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      // Quantize direction to one of 4 orientations.
      let angle = (direction[idx] * 180) / Math.PI;
      if (angle < 0) angle += 180;
      let n1: number;
      let n2: number;
      if (angle < 22.5 || angle >= 157.5) {
        n1 = magnitude[idx - 1];
        n2 = magnitude[idx + 1];
      } else if (angle < 67.5) {
        n1 = magnitude[idx - width + 1];
        n2 = magnitude[idx + width - 1];
      } else if (angle < 112.5) {
        n1 = magnitude[idx - width];
        n2 = magnitude[idx + width];
      } else {
        n1 = magnitude[idx - width - 1];
        n2 = magnitude[idx + width + 1];
      }
      const m = magnitude[idx];
      out[idx] = m >= n1 && m >= n2 ? m : 0;
    }
  }
  return out;
}

/** Double-threshold + connectivity: strong edges plus weak edges linked to them. */
export function hysteresis(
  suppressed: Float64Array,
  width: number,
  height: number,
  low: number,
  high: number
): Uint8ClampedArray {
  const STRONG = 2;
  const WEAK = 1;
  const marks = new Uint8Array(width * height);
  const stack: number[] = [];
  for (let i = 0; i < suppressed.length; i++) {
    if (suppressed[i] >= high) {
      marks[i] = STRONG;
      stack.push(i);
    } else if (suppressed[i] >= low) {
      marks[i] = WEAK;
    }
  }

  // Promote weak pixels connected (8-neighbourhood) to strong ones.
  const edges = new Uint8ClampedArray(width * height);
  while (stack.length) {
    const idx = stack.pop()!;
    edges[idx] = 255;
    const x = idx % width;
    const y = (idx - x) / width;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const nIdx = ny * width + nx;
        if (marks[nIdx] === WEAK) {
          marks[nIdx] = STRONG; // visited
          stack.push(nIdx);
        }
      }
    }
  }
  return edges;
}

/** Run the full Canny pipeline on a grayscale buffer. */
export function cannyFromGray(
  gray: Float64Array,
  width: number,
  height: number,
  opts: CannyOptions = {}
): CannyResult {
  const sigma = opts.sigma ?? 1.4;
  const low = opts.lowThreshold ?? 20;
  const high = opts.highThreshold ?? 50;

  const blurred = gaussianBlur(gray, width, height, sigma);
  const { magnitude, direction } = sobel(blurred, width, height);

  // Normalize magnitude to 0..255 for thresholding and display.
  let maxMag = 0;
  for (let i = 0; i < magnitude.length; i++) if (magnitude[i] > maxMag) maxMag = magnitude[i];
  const scale = maxMag > 0 ? 255 / maxMag : 0;
  const normMag = new Float64Array(magnitude.length);
  for (let i = 0; i < magnitude.length; i++) normMag[i] = magnitude[i] * scale;

  const suppressed = nonMaximumSuppression(normMag, direction, width, height);
  const edges = hysteresis(suppressed, width, height, low, high);

  // Classify each pixel for the hysteresis visualization (reconstructed from
  // the thresholds + which weak pixels survived linking).
  const hysteresisClasses = new Uint8Array(width * height);
  for (let i = 0; i < suppressed.length; i++) {
    if (suppressed[i] >= high) hysteresisClasses[i] = HYST_STRONG;
    else if (suppressed[i] >= low) hysteresisClasses[i] = edges[i] === 255 ? HYST_WEAK_KEPT : HYST_WEAK_DROPPED;
    else hysteresisClasses[i] = HYST_NONE;
  }

  return { width, height, grayscale: gray, blurred, magnitude: normMag, suppressed, edges, hysteresisClasses };
}

/** Convenience: run Canny directly on canvas RGBA data. */
export function canny(
  rgba: Uint8ClampedArray,
  width: number,
  height: number,
  opts: CannyOptions = {}
): CannyResult {
  return cannyFromGray(toGrayscale(rgba, width, height), width, height, opts);
}

/** Pack a single-channel buffer (0..255) into RGBA for a canvas. */
export function grayToRGBA(single: ArrayLike<number>, width: number, height: number): Uint8ClampedArray {
  const out = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const v = single[i];
    out[i * 4] = v;
    out[i * 4 + 1] = v;
    out[i * 4 + 2] = v;
    out[i * 4 + 3] = 255;
  }
  return out;
}
