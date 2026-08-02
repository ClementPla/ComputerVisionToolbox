/**
 * Eigen- and singular-value decompositions.
 *
 * `eigSymmetric` uses the cyclic Jacobi rotation method — simple, robust and
 * accurate for the small symmetric matrices (covariance, Gram, scatter) that
 * the ML estimators produce. `svd` is derived from it. Both are pure and
 * replace the ad-hoc 2x2/3x3/mathjs eigen paths that were scattered around.
 */
import { Matrix } from './matrix';

export interface Eigen {
  /** Eigenvalues, sorted in descending order. */
  values: number[];
  /** Eigenvectors as columns of the matrix, aligned with `values`. */
  vectors: Matrix;
}

/**
 * Eigendecomposition of a real symmetric matrix via cyclic Jacobi rotations.
 * Only the symmetric part is used; the input is not modified.
 */
export function eigSymmetric(A: Matrix, maxSweeps = 100, tol = 1e-12): Eigen {
  if (!A.isSquare()) throw new Error('eigSymmetric: matrix must be square.');
  const n = A.rows;
  const a = A.clone();
  const V = Matrix.eye(n);

  for (let sweep = 0; sweep < maxSweeps; sweep++) {
    // Sum of squares of off-diagonal elements.
    let off = 0;
    for (let p = 0; p < n; p++) {
      for (let q = p + 1; q < n; q++) off += a.get(p, q) * a.get(p, q);
    }
    if (off < tol) break;

    for (let p = 0; p < n; p++) {
      for (let q = p + 1; q < n; q++) {
        const apq = a.get(p, q);
        if (Math.abs(apq) < 1e-300) continue;

        const app = a.get(p, p);
        const aqq = a.get(q, q);
        const theta = (aqq - app) / (2 * apq);
        const t =
          Math.sign(theta || 1) /
          (Math.abs(theta) + Math.sqrt(theta * theta + 1));
        const c = 1 / Math.sqrt(t * t + 1);
        const s = t * c;

        // Apply the rotation to rows/columns p and q of `a`.
        for (let i = 0; i < n; i++) {
          const aip = a.get(i, p);
          const aiq = a.get(i, q);
          a.set(i, p, c * aip - s * aiq);
          a.set(i, q, s * aip + c * aiq);
        }
        for (let i = 0; i < n; i++) {
          const api = a.get(p, i);
          const aqi = a.get(q, i);
          a.set(p, i, c * api - s * aqi);
          a.set(q, i, s * api + c * aqi);
        }

        // Accumulate the rotation into the eigenvector matrix.
        for (let i = 0; i < n; i++) {
          const vip = V.get(i, p);
          const viq = V.get(i, q);
          V.set(i, p, c * vip - s * viq);
          V.set(i, q, s * vip + c * viq);
        }
      }
    }
  }

  const values = a.diagonal();

  // Sort descending and reorder eigenvector columns to match.
  const order = values
    .map((v, i) => i)
    .sort((i, j) => values[j] - values[i]);

  const sortedValues = order.map((i) => values[i]);
  const sortedVectors = new Matrix(n, n);
  order.forEach((srcCol, dstCol) => {
    for (let i = 0; i < n; i++) sortedVectors.set(i, dstCol, V.get(i, srcCol));
  });

  return { values: sortedValues, vectors: sortedVectors };
}

export interface SVD {
  U: Matrix; // m x r, orthonormal columns
  S: number[]; // r singular values, descending
  V: Matrix; // n x r, orthonormal columns (A = U diag(S) Vᵀ)
}

/**
 * Thin singular value decomposition, derived from the symmetric
 * eigendecomposition of the smaller of AᵀA / AAᵀ.
 */
export function svd(A: Matrix): SVD {
  const m = A.rows;
  const n = A.cols;

  if (m >= n) {
    // Eigendecomposition of AᵀA gives V and the singular values.
    const AtA = A.T().matmul(A);
    const { values, vectors: V } = eigSymmetric(AtA);
    const S = values.map((v) => Math.sqrt(Math.max(0, v)));

    // U = A V / σ (column by column).
    const U = new Matrix(m, n);
    for (let k = 0; k < n; k++) {
      const vk = V.col(k);
      const av = A.matvec(vk);
      const sigma = S[k];
      if (sigma > 1e-12) {
        for (let i = 0; i < m; i++) U.set(i, k, av[i] / sigma);
      }
    }
    return { U, S, V };
  } else {
    // Eigendecomposition of AAᵀ gives U and the singular values.
    const AAt = A.matmul(A.T());
    const { values, vectors: U } = eigSymmetric(AAt);
    const S = values.map((v) => Math.sqrt(Math.max(0, v)));

    // V = Aᵀ U / σ.
    const V = new Matrix(n, m);
    for (let k = 0; k < m; k++) {
      const uk = U.col(k);
      const atu = A.T().matvec(uk);
      const sigma = S[k];
      if (sigma > 1e-12) {
        for (let i = 0; i < n; i++) V.set(i, k, atu[i] / sigma);
      }
    }
    return { U, S, V };
  }
}
