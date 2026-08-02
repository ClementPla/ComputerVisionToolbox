/**
 * Fisher's Linear Discriminant.
 *
 * Finds the projection direction(s) that maximise between-class scatter
 * relative to within-class scatter, via the symmetric whitening trick:
 * whiten by Sw^(-1/2), take the eigenvectors of the whitened between-class
 * scatter, then map back. Works for any number of classes and features, and
 * replaces the inline 2×2 Fisher/PCA-direction code in the tutorial.
 */
import { Matrix, eigSymmetric, mean, vec } from '../numpy';
import { Estimator, uniqueSorted } from './base';

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
