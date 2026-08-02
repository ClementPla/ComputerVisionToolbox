/**
 * Principal Component Analysis.
 *
 * Replaces the `PCA` / `PCA2D` functions in utils/linalg and the inline
 * covariance/eigen code in the PCA and Fisher tutorials.
 */
import { Matrix, eigSymmetric, cov, center } from '../numpy';
import { Transformer } from './base';

export class PCA implements Transformer {
  /** Feature means removed during fit. */
  mean: number[] = [];
  /** Principal axes as rows (n_components × n_features), sorted by variance. */
  components: Matrix = new Matrix(0, 0);
  /** Variance explained by each component (eigenvalues of the covariance). */
  explainedVariance: number[] = [];

  /** @param nComponents number of components to keep (default: all features). */
  constructor(public nComponents?: number) {}

  fit(X: Matrix): this {
    this.mean = center(X).mean;
    const { values, vectors } = eigSymmetric(cov(X, 1));
    const k = this.nComponents ?? values.length;

    // Eigenvectors are columns of `vectors`; store the top-k as rows.
    const comp = new Matrix(k, X.cols);
    for (let r = 0; r < k; r++) {
      for (let j = 0; j < X.cols; j++) comp.set(r, j, vectors.get(j, r));
    }
    this.components = comp;
    this.explainedVariance = values.slice(0, k);
    return this;
  }

  /** Project rows of X onto the principal axes. */
  transform(X: Matrix): Matrix {
    const centered = X.map((v, _i, j) => v - this.mean[j]);
    return centered.matmul(this.components.T());
  }

  /** The leading principal direction as a plain vector. */
  firstComponent(): number[] {
    return this.components.row(0);
  }

  /** Fraction of total variance explained by each kept component. */
  explainedVarianceRatio(): number[] {
    const total = this.explainedVariance.reduce((a, b) => a + b, 0);
    return total > 0 ? this.explainedVariance.map((v) => v / total) : this.explainedVariance;
  }
}
