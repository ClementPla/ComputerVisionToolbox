/**
 * Gaussian probability densities.
 *
 * One canonical set of normal pdfs, replacing the per-component 1D/2D gaussian
 * formulas (and the inline 2×2 inverse/determinant recomputed per grid point in
 * the Gaussian tutorial).
 */
import { Matrix, inv, det, vec } from '../numpy';

/** Univariate normal density N(mean, variance). */
export function normalPdf(x: number, mean: number, variance: number): number {
  return (
    Math.exp(-((x - mean) ** 2) / (2 * variance)) /
    Math.sqrt(2 * Math.PI * variance)
  );
}

/**
 * Multivariate normal density with a spherical (isotropic) covariance
 * `variance · I`. Fast path with no matrix operations — use for KDE kernels and
 * isotropic mixtures.
 */
export function isotropicNormalPdf(x: number[], mean: number[], variance: number): number {
  const d = x.length;
  let sq = 0;
  for (let i = 0; i < d; i++) sq += (x[i] - mean[i]) ** 2;
  return Math.exp(-sq / (2 * variance)) / Math.pow(2 * Math.PI * variance, d / 2);
}

/**
 * Multivariate normal with a full covariance matrix. Precomputes the inverse
 * and normalization once, so evaluating `pdf` over a grid is cheap.
 */
export class MultivariateNormal {
  private readonly invCov: Matrix;
  private readonly norm: number;

  constructor(public readonly mean: number[], public readonly cov: Matrix) {
    const d = mean.length;
    this.invCov = inv(cov);
    const detCov = Math.max(det(cov), 1e-300);
    this.norm = 1 / (Math.pow(2 * Math.PI, d / 2) * Math.sqrt(detCov));
  }

  pdf(x: number[]): number {
    const diff = vec.sub(x, this.mean);
    const mahalanobis = vec.dot(diff, this.invCov.matvec(diff));
    return this.norm * Math.exp(-0.5 * mahalanobis);
  }
}

/** One-off multivariate normal density (builds a {@link MultivariateNormal}). */
export function multivariateNormalPdf(x: number[], mean: number[], cov: Matrix): number {
  return new MultivariateNormal(mean, cov).pdf(x);
}
