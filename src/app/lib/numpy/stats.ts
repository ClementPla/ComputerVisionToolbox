/**
 * Descriptive statistics over a data matrix.
 *
 * Convention (scikit-style): rows are samples, columns are features. `mean`,
 * `variance` and friends default to `axis = 0` (reduce over samples, one value
 * per feature). `cov` returns the feature × feature covariance matrix. This is
 * the single home for the mean/covariance code that was inlined in ~7 tutorials.
 */
import { Matrix } from './matrix';

/** Column means (axis 0) or row means (axis 1). */
export function mean(X: Matrix, axis: 0 | 1 = 0): number[] {
  if (axis === 0) {
    const out = new Array<number>(X.cols).fill(0);
    for (let i = 0; i < X.rows; i++) {
      for (let j = 0; j < X.cols; j++) out[j] += X.get(i, j);
    }
    return out.map((v) => v / X.rows);
  }
  const out = new Array<number>(X.rows).fill(0);
  for (let i = 0; i < X.rows; i++) {
    let s = 0;
    for (let j = 0; j < X.cols; j++) s += X.get(i, j);
    out[i] = s / X.cols;
  }
  return out;
}

/**
 * Per-feature variance. `ddof` is the delta degrees of freedom: 0 for the
 * population variance (default), 1 for the sample (unbiased) variance.
 */
export function variance(X: Matrix, ddof: 0 | 1 = 0): number[] {
  const mu = mean(X, 0);
  const out = new Array<number>(X.cols).fill(0);
  for (let i = 0; i < X.rows; i++) {
    for (let j = 0; j < X.cols; j++) {
      const d = X.get(i, j) - mu[j];
      out[j] += d * d;
    }
  }
  const denom = Math.max(1, X.rows - ddof);
  return out.map((v) => v / denom);
}

/** Per-feature standard deviation. */
export function std(X: Matrix, ddof: 0 | 1 = 0): number[] {
  return variance(X, ddof).map(Math.sqrt);
}

/**
 * Feature covariance matrix (cols × cols). `ddof = 1` (default) gives the
 * unbiased sample covariance; `ddof = 0` divides by N.
 */
export function cov(X: Matrix, ddof: 0 | 1 = 1): Matrix {
  const mu = mean(X, 0);
  const centered = X.map((v, _i, j) => v - mu[j]);
  const denom = Math.max(1, X.rows - ddof);
  return centered.T().matmul(centered).scale(1 / denom);
}

/** Feature correlation matrix (cols × cols). */
export function corr(X: Matrix): Matrix {
  const c = cov(X, 1);
  const d = c.diagonal().map((v) => Math.sqrt(v) || 1);
  return c.map((v, i, j) => v / (d[i] * d[j]));
}

/** Subtract the column means; returns the centered matrix and the means used. */
export function center(X: Matrix): { centered: Matrix; mean: number[] } {
  const mu = mean(X, 0);
  return { centered: X.map((v, _i, j) => v - mu[j]), mean: mu };
}

/**
 * Z-score each column. Zero-variance columns are left centered (scale 1) to
 * avoid division by zero.
 */
export function standardize(
  X: Matrix
): { standardized: Matrix; mean: number[]; std: number[] } {
  const mu = mean(X, 0);
  const sd = std(X, 0).map((s) => (s > 1e-12 ? s : 1));
  return {
    standardized: X.map((v, _i, j) => (v - mu[j]) / sd[j]),
    mean: mu,
    std: sd,
  };
}
