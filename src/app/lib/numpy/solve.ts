/**
 * Direct solvers and factorizations built on {@link Matrix}.
 *
 * All pure, hand-written: LU with partial pivoting powers `solve`, `inv` and
 * `det`; Cholesky and QR are provided for the estimators that need them.
 */
import { Matrix } from './matrix';

interface LU {
  /** Combined lower/upper factors (unit-diagonal L below, U on/above diagonal). */
  lu: Matrix;
  /** Row permutation: `piv[i]` is the source row that landed in row `i`. */
  piv: number[];
  /** Determinant sign from the pivoting (+1 / -1). */
  sign: number;
}

/** LU factorization with partial (row) pivoting. */
export function luFactor(A: Matrix): LU {
  if (!A.isSquare()) throw new Error('luFactor: matrix must be square.');
  const n = A.rows;
  const lu = A.clone();
  const piv = Array.from({ length: n }, (_, i) => i);
  let sign = 1;

  for (let k = 0; k < n; k++) {
    // Find pivot row.
    let p = k;
    let max = Math.abs(lu.get(k, k));
    for (let i = k + 1; i < n; i++) {
      const v = Math.abs(lu.get(i, k));
      if (v > max) {
        max = v;
        p = i;
      }
    }
    if (max === 0) throw new Error('luFactor: matrix is singular.');

    // Swap rows k and p.
    if (p !== k) {
      for (let j = 0; j < n; j++) {
        const tmp = lu.get(k, j);
        lu.set(k, j, lu.get(p, j));
        lu.set(p, j, tmp);
      }
      [piv[k], piv[p]] = [piv[p], piv[k]];
      sign = -sign;
    }

    // Eliminate below the pivot.
    const pivot = lu.get(k, k);
    for (let i = k + 1; i < n; i++) {
      const factor = lu.get(i, k) / pivot;
      lu.set(i, k, factor);
      for (let j = k + 1; j < n; j++) {
        lu.set(i, j, lu.get(i, j) - factor * lu.get(k, j));
      }
    }
  }

  return { lu, piv, sign };
}

/** Solve `A x = b` for a single right-hand side. */
export function solve(A: Matrix, b: number[]): number[] {
  return luSolve(luFactor(A), b);
}

/** Solve using a precomputed LU factorization (reuse across many RHS). */
export function luSolve(f: LU, b: number[]): number[] {
  const { lu, piv } = f;
  const n = lu.rows;

  // Apply the row permutation to b.
  const y = new Array<number>(n);
  for (let i = 0; i < n; i++) y[i] = b[piv[i]];

  // Forward substitution (unit lower-triangular L).
  for (let i = 0; i < n; i++) {
    let sum = y[i];
    for (let j = 0; j < i; j++) sum -= lu.get(i, j) * y[j];
    y[i] = sum;
  }

  // Back substitution (upper-triangular U).
  for (let i = n - 1; i >= 0; i--) {
    let sum = y[i];
    for (let j = i + 1; j < n; j++) sum -= lu.get(i, j) * y[j];
    y[i] = sum / lu.get(i, i);
  }
  return y;
}

/** Matrix inverse (throws on singular). */
export function inv(A: Matrix): Matrix {
  if (!A.isSquare()) throw new Error('inv: matrix must be square.');
  const n = A.rows;
  const f = luFactor(A);
  const out = new Matrix(n, n);
  const e = new Array<number>(n).fill(0);
  for (let c = 0; c < n; c++) {
    e.fill(0);
    e[c] = 1;
    const col = luSolve(f, e);
    for (let r = 0; r < n; r++) out.set(r, c, col[r]);
  }
  return out;
}

/** Determinant via LU. */
export function det(A: Matrix): number {
  const { lu, sign } = luFactor(A);
  let d = sign;
  for (let i = 0; i < lu.rows; i++) d *= lu.get(i, i);
  return d;
}

/**
 * Cholesky factorization of a symmetric positive-definite matrix.
 * Returns lower-triangular `L` with `A = L Lᵀ`. `jitter` is added to the
 * diagonal for numerical stability on near-singular covariance matrices.
 */
export function cholesky(A: Matrix, jitter = 0): Matrix {
  if (!A.isSquare()) throw new Error('cholesky: matrix must be square.');
  const n = A.rows;
  const L = new Matrix(n, n);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let sum = A.get(i, j);
      for (let k = 0; k < j; k++) sum -= L.get(i, k) * L.get(j, k);
      if (i === j) {
        const d = sum + (jitter || 0);
        if (d <= 0) throw new Error('cholesky: matrix is not positive-definite.');
        L.set(i, j, Math.sqrt(d));
      } else {
        L.set(i, j, sum / L.get(j, j));
      }
    }
  }
  return L;
}

/**
 * Reduced QR factorization via modified Gram–Schmidt.
 * For an `m x n` matrix (m >= n) returns `Q` (m x n, orthonormal columns) and
 * `R` (n x n, upper-triangular) with `A = Q R`.
 */
export function qr(A: Matrix): { Q: Matrix; R: Matrix } {
  const m = A.rows;
  const n = A.cols;
  const Q = A.clone();
  const R = new Matrix(n, n);

  for (let j = 0; j < n; j++) {
    // Norm of column j.
    let norm = 0;
    for (let i = 0; i < m; i++) norm += Q.get(i, j) * Q.get(i, j);
    norm = Math.sqrt(norm);
    R.set(j, j, norm);

    if (norm > 0) {
      for (let i = 0; i < m; i++) Q.set(i, j, Q.get(i, j) / norm);
    }

    // Orthogonalize the remaining columns against column j.
    for (let k = j + 1; k < n; k++) {
      let dot = 0;
      for (let i = 0; i < m; i++) dot += Q.get(i, j) * Q.get(i, k);
      R.set(j, k, dot);
      for (let i = 0; i < m; i++) Q.set(i, k, Q.get(i, k) - dot * Q.get(i, j));
    }
  }

  return { Q, R };
}
