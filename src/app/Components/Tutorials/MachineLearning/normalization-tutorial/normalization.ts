/**
 * The four feature-normalization schemes the tutorial visualizes, as pure
 * functions over a batch of RGB images (`[H][W][3]`, values 0-255).
 *
 * Every scheme standardizes each element as (x - mean) / std; they differ only
 * in which elements share statistics:
 *   - batch    : per channel, across all images
 *   - layer    : per image, across all channels
 *   - instance : per image, per channel
 *   - group    : per image, per channel-group (R+G together, B separate)
 *
 * The standardized value is mapped back into a 0-255 display range for the
 * canvas. Extracted from the component so the normalization maths stand alone.
 */
export type NormType = 'batch' | 'layer' | 'instance' | 'group';

type RGBImage = number[][][]; // [H][W][3]

const EPS = 1e-5;
const CHANNELS = 3;
/** Channel groups for Group Norm: R+G together, B separate. */
const GROUP_NORM_GROUPS = [[0, 1], [2]];

/** Population mean and (eps-stabilized) std of a list of values. */
function meanStd(values: number[], eps = EPS): { mean: number; std: number } {
  let sum = 0;
  let sumSq = 0;
  for (const v of values) {
    sum += v;
    sumSq += v * v;
  }
  const n = values.length || 1;
  const mean = sum / n;
  const variance = sumSq / n - mean * mean;
  return { mean, std: Math.sqrt(variance + eps) };
}

/** Map a standardized value into the 0-255 display range used by the canvas. */
function toDisplay(standardized: number): number {
  return Math.max(0, Math.min(255, standardized * 64 + 128));
}

function blankImage(size: number): RGBImage {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => [0, 0, 0] as number[])
  );
}

/**
 * Normalize a batch of images with the given scheme. Returns new images
 * (originals are not mutated).
 */
export function computeNormalizedImages(
  originals: RGBImage[],
  normType: NormType,
  size: number
): RGBImage[] {
  const out = originals.map(() => blankImage(size));

  switch (normType) {
    case 'batch':
      // Stats per channel, shared across all images.
      for (let c = 0; c < CHANNELS; c++) {
        const values: number[] = [];
        for (const img of originals) {
          for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) values.push(img[y][x][c]);
          }
        }
        const { mean, std } = meanStd(values);
        originals.forEach((img, i) => {
          for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
              out[i][y][x][c] = toDisplay((img[y][x][c] - mean) / std);
            }
          }
        });
      }
      break;

    case 'layer':
      // Stats per image, across all channels (pixel-major traversal).
      originals.forEach((img, i) => {
        const values: number[] = [];
        for (let y = 0; y < size; y++) {
          for (let x = 0; x < size; x++) {
            for (let c = 0; c < CHANNELS; c++) values.push(img[y][x][c]);
          }
        }
        const { mean, std } = meanStd(values);
        for (let y = 0; y < size; y++) {
          for (let x = 0; x < size; x++) {
            for (let c = 0; c < CHANNELS; c++) {
              out[i][y][x][c] = toDisplay((img[y][x][c] - mean) / std);
            }
          }
        }
      });
      break;

    case 'instance':
      // Stats per (image, channel).
      originals.forEach((img, i) => {
        for (let c = 0; c < CHANNELS; c++) {
          const values: number[] = [];
          for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) values.push(img[y][x][c]);
          }
          const { mean, std } = meanStd(values);
          for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
              out[i][y][x][c] = toDisplay((img[y][x][c] - mean) / std);
            }
          }
        }
      });
      break;

    case 'group':
      // Stats per (image, channel-group); channel-major traversal per group.
      originals.forEach((img, i) => {
        for (const group of GROUP_NORM_GROUPS) {
          const values: number[] = [];
          for (const c of group) {
            for (let y = 0; y < size; y++) {
              for (let x = 0; x < size; x++) values.push(img[y][x][c]);
            }
          }
          const { mean, std } = meanStd(values);
          for (const c of group) {
            for (let y = 0; y < size; y++) {
              for (let x = 0; x < size; x++) {
                out[i][y][x][c] = toDisplay((img[y][x][c] - mean) / std);
              }
            }
          }
        }
      });
      break;
  }

  return out;
}
