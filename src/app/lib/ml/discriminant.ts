/**
 * Fisher's Linear Discriminant.
 *
 * Finds the projection direction(s) that maximise between-class scatter
 * relative to within-class scatter, via the symmetric whitening trick:
 * whiten by Sw^(-1/2), take the eigenvectors of the whitened between-class
 * scatter, then map back. Works for any number of classes and features, and
 * replaces the inline 2×2 Fisher/PCA-direction code in the tutorial.
 */
import { Matrix, eigSymmetric, mean, inv, det, vec } from '../numpy';
import { Classifier, Estimator, uniqueSorted } from './base';

/** Rows of X belonging to class `c`. */
function rowsOfClass(X: Matrix, y: number[], c: number): number[][] {
  return X.toArray().filter((_, i) => y[i] === c);
}

/** Softmax over the rows of a score matrix. */
function softmaxRows(scores: Matrix): Matrix {
  return Matrix.fromRows(
    scores.toArray().map((row) => {
      const m = Math.max(...row);
      const exps = row.map((v) => Math.exp(v - m));
      const sum = exps.reduce((a, b) => a + b, 0);
      return exps.map((e) => e / sum);
    })
  );
}

export class FisherDiscriminant implements Estimator {
  /** Discriminant directions as rows, best first (≤ n_classes − 1 of them). */
  directions: Matrix = new Matrix(0, 0);
  /** Class labels seen during fit. */
  classes: number[] = [];

  /** @param shrinkage ridge added to the within-class scatter diagonal. */
  constructor(public shrinkage = 1e-6) {}

  fit(X: Matrix, y: number[] = []): this {
    const nFeatures = X.cols;
    this.classes = uniqueSorted(y);
    const globalMean = mean(X, 0);

    // Within-class scatter Sw and between-class scatter Sb.
    const Sw = new Matrix(nFeatures, nFeatures);
    const Sb = new Matrix(nFeatures, nFeatures);

    for (const c of this.classes) {
      const rows = X.toArray().filter((_, i) => y[i] === c);
      const Xc = Matrix.fromRows(rows);
      const mc = mean(Xc, 0);

      // Sw += Σ (x - m_c)(x - m_c)ᵀ
      for (const x of rows) {
        const d = vec.sub(x, mc);
        addOuter(Sw, d, d);
      }
      // Sb += n_c (m_c - m)(m_c - m)ᵀ
      const dm = vec.sub(mc, globalMean);
      addOuter(Sb, dm, dm, rows.length);
    }

    // Regularize Sw for invertibility.
    for (let i = 0; i < nFeatures; i++) Sw.set(i, i, Sw.get(i, i) + this.shrinkage);

    // Whiten: Sw^(-1/2) = U Λ^(-1/2) Uᵀ.
    const { values, vectors: U } = eigSymmetric(Sw);
    const invSqrt = Matrix.diag(values.map((v) => 1 / Math.sqrt(Math.max(v, 1e-12))));
    const whiten = U.matmul(invSqrt).matmul(U.T());

    // Eigenvectors of the whitened between-class scatter.
    const whitenedSb = whiten.matmul(Sb).matmul(whiten);
    const { vectors: W } = eigSymmetric(whitenedSb);

    // Map directions back and keep the leading (n_classes − 1).
    const back = whiten.matmul(W);
    const nDir = Math.max(1, this.classes.length - 1);
    const dirs = new Matrix(nDir, nFeatures);
    for (let r = 0; r < nDir; r++) {
      const col = vec.normalize(back.col(r));
      dirs.setRow(r, col);
    }
    this.directions = dirs;
    return this;
  }

  /** The leading discriminant direction as a plain vector. */
  direction(): number[] {
    return this.directions.row(0);
  }
}

/** In-place M += scale · (a ⊗ b). */
function addOuter(M: Matrix, a: number[], b: number[], scale = 1): void {
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      M.set(i, j, M.get(i, j) + scale * a[i] * b[j]);
    }
  }
}

/**
 * Linear Discriminant Analysis (Gaussian classes with a shared, pooled
 * covariance). Yields linear decision boundaries. Replaces the LDAClassifier
 * that carried its own Gauss–Jordan inverse and inline covariance.
 */
export class LinearDiscriminantAnalysis implements Classifier {
  classes: number[] = [];
  private betas: Matrix = new Matrix(0, 0); // one linear coef vector per class
  private biases: number[] = [];

  constructor(public shrinkage = 1e-6) {}

  fit(X: Matrix, y: number[] = []): this {
    const d = X.cols;
    const n = X.rows;
    this.classes = uniqueSorted(y);
    const K = this.classes.length;

    const means: number[][] = [];
    const priors: number[] = [];
    const pooled = new Matrix(d, d);

    for (const c of this.classes) {
      const rows = rowsOfClass(X, y, c);
      const mu = mean(Matrix.fromRows(rows), 0);
      means.push(mu);
      priors.push(rows.length / n);
      for (const x of rows) {
        const diff = vec.sub(x, mu);
        addOuter(pooled, diff, diff);
      }
    }

    // Pooled within-class covariance, regularized for invertibility.
    const denom = Math.max(1, n - K);
    const cov = pooled.scale(1 / denom);
    for (let i = 0; i < d; i++) cov.set(i, i, cov.get(i, i) + this.shrinkage);
    const invCov = inv(cov);

    // Linear discriminant coefficients per class.
    this.betas = new Matrix(K, d);
    this.biases = new Array(K);
    for (let k = 0; k < K; k++) {
      const beta = invCov.matvec(means[k]);
      this.betas.setRow(k, beta);
      this.biases[k] = -0.5 * vec.dot(means[k], beta) + Math.log(priors[k]);
    }
    return this;
  }

  decisionFunction(X: Matrix): Matrix {
    // scores = X · βᵀ + bias
    const raw = X.matmul(this.betas.T());
    return raw.map((v, _i, j) => v + this.biases[j]);
  }

  predict(X: Matrix): number[] {
    return this.decisionFunction(X)
      .toArray()
      .map((row) => this.classes[vec.argmax(row)]);
  }

  predictProba(X: Matrix): Matrix {
    return softmaxRows(this.decisionFunction(X));
  }
}

interface QDAClass {
  label: number;
  mean: number[];
  invCov: Matrix;
  constant: number; // -0.5 ln|Σ| + ln(prior)
}

/**
 * Quadratic Discriminant Analysis (Gaussian classes with per-class
 * covariance). Yields curved decision boundaries. Replaces the QDAClassifier
 * that carried its own inverse and determinant routines.
 */
export class QuadraticDiscriminantAnalysis implements Classifier {
  classes: number[] = [];
  private stats: QDAClass[] = [];

  constructor(public shrinkage = 1e-4) {}

  fit(X: Matrix, y: number[] = []): this {
    const d = X.cols;
    const n = X.rows;
    const labels = uniqueSorted(y);
    this.stats = [];

    for (const c of labels) {
      const rows = rowsOfClass(X, y, c);
      if (rows.length < d + 1) continue; // too few to estimate a covariance
      const Xc = Matrix.fromRows(rows);
      const mu = mean(Xc, 0);

      const cov = new Matrix(d, d);
      for (const x of rows) {
        const diff = vec.sub(x, mu);
        addOuter(cov, diff, diff);
      }
      const denom = Math.max(1, rows.length - 1);
      const scaled = cov.scale(1 / denom);
      for (let i = 0; i < d; i++) scaled.set(i, i, scaled.get(i, i) + this.shrinkage);

      const logDet = Math.log(Math.max(Math.abs(det(scaled)), 1e-18));
      this.stats.push({
        label: c,
        mean: mu,
        invCov: inv(scaled),
        constant: -0.5 * logDet + Math.log(rows.length / n),
      });
    }
    this.classes = this.stats.map((s) => s.label);
    return this;
  }

  decisionFunction(X: Matrix): Matrix {
    const rows = X.toArray().map((x) =>
      this.stats.map((s) => {
        const diff = vec.sub(x, s.mean);
        const quad = vec.dot(diff, s.invCov.matvec(diff));
        return s.constant - 0.5 * quad;
      })
    );
    return Matrix.fromRows(rows);
  }

  predict(X: Matrix): number[] {
    return this.decisionFunction(X)
      .toArray()
      .map((row) => this.classes[vec.argmax(row)]);
  }

  predictProba(X: Matrix): Matrix {
    return softmaxRows(this.decisionFunction(X));
  }
}
