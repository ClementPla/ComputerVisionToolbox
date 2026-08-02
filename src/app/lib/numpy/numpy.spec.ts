import { Matrix } from './matrix';
import { vec } from './vector';
import { inv, solve, det, cholesky, qr } from './solve';
import { eigSymmetric, svd } from './decomp';
import { mean, cov, standardize } from './stats';

/** Assert two numbers are close. */
function near(a: number, b: number, eps = 1e-9): boolean {
  return Math.abs(a - b) <= eps;
}

/** Assert two matrices are close element-wise. */
function matNear(A: Matrix, B: Matrix, eps = 1e-6): boolean {
  if (A.rows !== B.rows || A.cols !== B.cols) return false;
  for (let i = 0; i < A.data.length; i++) if (!near(A.data[i], B.data[i], eps)) return false;
  return true;
}

describe('numpy/Matrix', () => {
  it('constructs and indexes row-major', () => {
    const m = Matrix.fromRows([
      [1, 2, 3],
      [4, 5, 6],
    ]);
    expect(m.shape).toEqual([2, 3]);
    expect(m.get(1, 2)).toBe(6);
    expect(m.row(0)).toEqual([1, 2, 3]);
    expect(m.col(1)).toEqual([2, 5]);
  });

  it('transposes', () => {
    const m = Matrix.fromRows([
      [1, 2, 3],
      [4, 5, 6],
    ]);
    expect(m.T().toArray()).toEqual([
      [1, 4],
      [2, 5],
      [3, 6],
    ]);
  });

  it('multiplies matrices', () => {
    const a = Matrix.fromRows([
      [1, 2],
      [3, 4],
    ]);
    const b = Matrix.fromRows([
      [5, 6],
      [7, 8],
    ]);
    expect(a.matmul(b).toArray()).toEqual([
      [19, 22],
      [43, 50],
    ]);
  });

  it('matvec and elementwise ops', () => {
    const a = Matrix.fromRows([
      [1, 0],
      [0, 2],
    ]);
    expect(a.matvec([3, 4])).toEqual([3, 8]);
    expect(a.add(1).toArray()).toEqual([
      [2, 1],
      [1, 3],
    ]);
    expect(a.scale(2).toArray()).toEqual([
      [2, 0],
      [0, 4],
    ]);
  });
});

describe('numpy/vector', () => {
  it('dot, norm, distance', () => {
    expect(vec.dot([1, 2, 3], [4, 5, 6])).toBe(32);
    expect(near(vec.norm([3, 4]), 5)).toBe(true);
    expect(near(vec.distance([0, 0], [3, 4]), 5)).toBe(true);
  });

  it('normalize gives unit length', () => {
    expect(near(vec.norm(vec.normalize([3, 4])), 1)).toBe(true);
  });
});

describe('numpy/solve', () => {
  const A = Matrix.fromRows([
    [2, 1, 1],
    [1, 3, 2],
    [1, 0, 0],
  ]);

  it('solves A x = b', () => {
    const b = [4, 5, 6];
    const x = solve(A, b);
    expect(vec.distance(A.matvec(x), b) < 1e-9).toBe(true);
  });

  it('inverts (A · A⁻¹ = I)', () => {
    expect(matNear(A.matmul(inv(A)), Matrix.eye(3))).toBe(true);
  });

  it('computes determinant', () => {
    expect(near(det(A), -1, 1e-9)).toBe(true);
  });

  it('cholesky reconstructs an SPD matrix', () => {
    const spd = Matrix.fromRows([
      [4, 2],
      [2, 3],
    ]);
    const L = cholesky(spd);
    expect(matNear(L.matmul(L.T()), spd)).toBe(true);
  });

  it('qr reconstructs A and Q has orthonormal columns', () => {
    const M = Matrix.fromRows([
      [1, 2],
      [3, 4],
      [5, 7],
    ]);
    const { Q, R } = qr(M);
    expect(matNear(Q.matmul(R), M)).toBe(true);
    expect(matNear(Q.T().matmul(Q), Matrix.eye(2))).toBe(true);
  });
});

describe('numpy/decomp', () => {
  it('eig of a symmetric matrix reconstructs A (V Λ Vᵀ)', () => {
    const A = Matrix.fromRows([
      [2, 1],
      [1, 2],
    ]);
    const { values, vectors } = eigSymmetric(A);
    expect(near(values[0], 3, 1e-6)).toBe(true);
    expect(near(values[1], 1, 1e-6)).toBe(true);
    const recon = vectors.matmul(Matrix.diag(values)).matmul(vectors.T());
    expect(matNear(recon, A)).toBe(true);
  });

  it('eigenvalues come out sorted descending', () => {
    const A = Matrix.fromRows([
      [6, 0, 0],
      [0, 2, 0],
      [0, 0, 9],
    ]);
    const { values } = eigSymmetric(A);
    expect(near(values[0], 9, 1e-6)).toBe(true);
    expect(near(values[2], 2, 1e-6)).toBe(true);
  });

  it('svd reconstructs A (U Σ Vᵀ)', () => {
    const A = Matrix.fromRows([
      [3, 1, 1],
      [-1, 3, 1],
    ]);
    const { U, S, V } = svd(A);
    const recon = U.matmul(Matrix.diag(S)).matmul(V.T());
    expect(matNear(recon, A, 1e-5)).toBe(true);
  });
});

describe('numpy/stats', () => {
  const X = Matrix.fromRows([
    [1, 10],
    [2, 20],
    [3, 30],
  ]);

  it('computes column means', () => {
    expect(mean(X)).toEqual([2, 20]);
  });

  it('covariance is symmetric and correct', () => {
    const c = cov(X); // ddof = 1
    expect(near(c.get(0, 0), 1)).toBe(true);
    expect(near(c.get(1, 1), 100)).toBe(true);
    expect(near(c.get(0, 1), c.get(1, 0))).toBe(true);
    expect(near(c.get(0, 1), 10)).toBe(true);
  });

  it('standardize yields zero mean', () => {
    const { standardized } = standardize(X);
    const mu = mean(standardized);
    expect(near(mu[0], 0)).toBe(true);
    expect(near(mu[1], 0)).toBe(true);
  });
});
