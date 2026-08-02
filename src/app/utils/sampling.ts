import { Point2D } from './geometry';
import { MMt_solution } from './linalg';
import { matVecMul, choleskyDecomposition } from './linalg';


export function randn_bm(mean = 0, std = 1) {
  /* Sampling using Box-Muller algorithm */
  let u = 1 - Math.random();
  let v = Math.random();
  let n = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return n * std + mean;
}

export function sample_randn(
  nPoints: number,
  mean = 0,
  std = 1
): Array<number> {
  let output = new Array<number>(nPoints);
  for (let i = 0; i < nPoints; i++) {
    output[i] = randn_bm(mean, std);
  }
  return output;
}

export function sampleGaussian2D(
  nPoints: number,
  mean: Point2D = { x: 0, y: 0 },
  std: Point2D | number[][] = { x: 1, y: 1 }
): Array<Point2D> {
  let output = new Array<Point2D>(nPoints);

  if (std instanceof Array) {
    if (std[1][0] === 0) {
      for (let i = 0; i < nPoints; i++) {
        output[i] = {
          x: randn_bm(mean.x, std[0][0]),
          y: randn_bm(mean.y, std[1][1]),
        };
      }
    } else {
      let A = MMt_solution(std);
      for (let i = 0; i < nPoints; i++) {
        let sx = randn_bm(0, 1);
        let sy = randn_bm(0, 1);
        output[i] = {
          x: mean.x + A[0][0] * sx + A[0][1] * sy,
          y: mean.y + A[1][0] * sx + A[1][1] * sy,
        };
      }
    }
    return output;
  }

  for (let i = 0; i < nPoints; i++) {
    output[i] = { x: randn_bm(mean.x, std.x), y: randn_bm(mean.y, std.y) };
  }
  return output;
}

export function linspace(
  start: number,
  stop: number,
  n: number
): Array<number> {
  let samples = new Array<number>(n);
  let step = (stop - start) / (n - 1);
  for (let i = 0; i < n; i++) {
    samples[i] = start + step * i;
  }
  return samples;
}


/**
 * Generate 3D samples from a multivariate Gaussian distribution
 */
export function sampleGaussian3D(
  n: number,
  mean: number[],
  covariance: number[][]
): number[][] {
  const L = choleskyDecomposition(covariance);
  const samples: number[][] = [];

  for (let i = 0; i < n; i++) {
    // Generate standard normal samples using Box-Muller
    const z: number[] = [];
    for (let j = 0; j < 3; j++) {
      const u1 = Math.random();
      const u2 = Math.random();
      z.push(Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2));
    }
    // Transform: x = mean + L * z
    const transformed = matVecMul(L, z);
    samples.push([
      mean[0] + transformed[0],
      mean[1] + transformed[1],
      mean[2] + transformed[2]
    ]);
  }
  return samples;
}