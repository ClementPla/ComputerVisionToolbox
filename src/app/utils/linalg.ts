// Only for 2D matrices!

import { matmul, transpose } from './matrix';
import * as math from 'mathjs';


export function MMt_solution(matrix: number[][]) {
  let R = matrix.length;
  let C = matrix[0].length;
  if (R != 2 || C != 2) {
    throw new Error('Only 2x2 matrices are supported for MMt_solution');
  }

  // SVD algorithm
  let B = matmul(matrix, transpose(matrix));
  let eigen = eigenDecomposition2x2(B);
  let U = eigen.vectors;

  // Singular values
  let S = [
    [Math.sqrt(eigen.values[0]), 0],
    [0, Math.sqrt(eigen.values[1])],
  ];

  let A = matmul(transpose(U), S);
  return A;
}

export interface Eigen {
  values: number[];
  vectors: number[][];
}
export function eigenDecomposition2x2(matrix: number[][]): Eigen {
  // Always 2x2 matrix
  // Always return the ordered eigenvalues and eigenvectors

  let R = matrix.length;
  let eigenVectors = new Array(R).fill(0).map(() => new Array(R).fill(0));

  // Eigenvalues algorithm
  let a = 1;
  let b = -1 * (matrix[0][0] + matrix[1][1]);
  let c = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

  let det = Math.sqrt(b * b - 4 * a * c);
  let lambda1 = (-b + det) / (2 * a);
  let lambda2 = (-b - det) / (2 * a);

  if (matrix[0][0] - lambda1 == 0 || matrix[0][0] - lambda2 == 0) {
    eigenVectors[0] = [1, -matrix[1][0] / (matrix[1][1] - lambda1)];
    eigenVectors[1] = [1, -matrix[1][0] / (matrix[1][1] - lambda2)];
  } else {
    eigenVectors[0] = [-matrix[0][1] / (matrix[0][0] - lambda1), 1];
    eigenVectors[1] = [-matrix[0][1] / (matrix[0][0] - lambda2), 1];
  }

  // Normalize eigenvectors
  let norm1 = Math.sqrt(eigenVectors[0][0] ** 2 + eigenVectors[0][1] ** 2);
  let norm2 = Math.sqrt(eigenVectors[1][0] ** 2 + eigenVectors[1][1] ** 2);
  eigenVectors[0] = [eigenVectors[0][0] / norm1, eigenVectors[0][1] / norm1];
  eigenVectors[1] = [eigenVectors[1][0] / norm2, eigenVectors[1][1] / norm2];

  if (lambda1 > lambda2) {
    return { values: [lambda1, lambda2], vectors: eigenVectors };
  } else {
    return {
      values: [lambda2, lambda1],
      vectors: [eigenVectors[1], eigenVectors[0]],
    };
  }
}

export function matVecMul(matrix: number[][], vec: number[]): number[] {
  return matrix.map(row => row.reduce((sum, val, i) => sum + val * vec[i], 0));
}

/**
 * Cholesky decomposition of a positive-definite matrix
 * Returns lower triangular matrix L such that A = L * L^T
 */
export function choleskyDecomposition(matrix: number[][]): number[][] {
  const n = matrix.length;
  const L: number[][] = Array(n).fill(null).map(() => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let sum = 0;
      for (let k = 0; k < j; k++) {
        sum += L[i][k] * L[j][k];
      }
      if (i === j) {
        L[i][j] = Math.sqrt(Math.max(0.0001, matrix[i][i] - sum));
      } else {
        L[i][j] = (matrix[i][j] - sum) / L[j][j];
      }
    }
  }
  return L;
}
export function cholesky2x2(matrix: number[][]): number[][] {
  const L: number[][] = [[0, 0], [0, 0]];
  L[0][0] = Math.sqrt(Math.max(0.0001, matrix[0][0]));
  L[1][0] = matrix[1][0] / L[0][0];
  L[1][1] = Math.sqrt(Math.max(0.0001, matrix[1][1] - L[1][0] * L[1][0]));
  return L;
}

/**
 * Compute eigenvalues and eigenvectors of a 3x3 symmetric matrix
 * Using power iteration for simplicity (good enough for visualization)
 */
export function eigenDecomposition3x3(matrix: number[][]): { values: number[], vectors: number[][] } {
  const vectors: number[][] = [];
  const values: number[] = [];
  let A = matrix.map(row => [...row]);

  for (let i = 0; i < 3; i++) {
    // Power iteration
    let v = [Math.random(), Math.random(), Math.random()];
    let norm = Math.sqrt(v.reduce((s, x) => s + x * x, 0));
    v = v.map(x => x / norm);

    for (let iter = 0; iter < 100; iter++) {
      const Av = matVecMul(A, v);
      norm = Math.sqrt(Av.reduce((s, x) => s + x * x, 0));
      if (norm > 0.0001) v = Av.map(x => x / norm);
    }

    const Av = matVecMul(A, v);
    const eigenvalue = v.reduce((s, x, j) => s + x * Av[j], 0);
    
    values.push(eigenvalue);
    vectors.push(v);

    // Deflate matrix
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        A[j][k] -= eigenvalue * v[j] * v[k];
      }
    }
  }

  // Sort by eigenvalue descending
  const indices = [0, 1, 2].sort((a, b) => values[b] - values[a]);
  return {
    values: indices.map(i => values[i]),
    vectors: indices.map(i => vectors[i])
  };
}
export function PCA2D(data: number[][]) {
  // PCA algorithm
  let N = data.length;
  let mean = [0, 0];
  data.forEach((d) => {
    mean[0] += d[0];
    mean[1] += d[1];
  });
  mean[0] /= N;
  mean[1] /= N;

  let centered = data.map((d) => [d[0] - mean[0], d[1] - mean[1]]);

  let m = math.matrix(centered);
  let M = math.multiply(math.transpose(m), m);
  let ans = math.eigs(M);

  let V = ans.eigenvectors;
  let U = new Array();
  for (let i = 0; i < V.length; i++) {
    U.push(V[i].vector.valueOf());
  }

  let output = new Array(N);
  for (let i = 0; i < N; i++) {
    let x = centered[i][0];
    let y = centered[i][1];
    output[i] = [U[0][0] * x + U[0][1] * y, U[1][0] * x + U[1][1] * y];
  }
  // Compute the variance of the output
  let variance = [0, 0];
  output.forEach((d) => {
    variance[0] += d[0] ** 2;
    variance[1] += d[1] ** 2;
  });
  variance[0] /= N;
  variance[1] /= N;
  variance[0] = Math.sqrt(variance[0]);
  variance[1] = Math.sqrt(variance[1]);

  // Scale the eigenvectors
  U[0][0] *= variance[0];
  U[0][1] *= variance[0];
  U[1][0] *= variance[1];
  U[1][1] *= variance[1];

  return { data: output, mean: mean, U: U };
}

export function PCA(data: number[][]) {
  // PCA algorithm
  let N = data.length;
  let K = data[0].length;
  let mean = new Array(K).fill(0);
  data.forEach((d) => {
    d.forEach((v, i) => {
      mean[i] += v;
    });
  });
  mean = mean.map((v) => v / N);

  let centered = data.map((d) => d.map((v, i) => v - mean[i]));

  let m = math.matrix(centered);
  let M = math.multiply(math.transpose(m), m);
  let ans = math.eigs(M);

  let V = ans.eigenvectors;
  let U: number[][] = new Array();
  for (let i = 0; i < V.length; i++) {
    U.push(V[i].vector.valueOf() as number[]);
  }

  let output: number[][] = new Array(N);
  for (let i = 0; i < N; i++) {
    output[i] = math.multiply(U, centered[i]).valueOf() as number[];
  }
  // Compute the variance of the output
  let variance = new Array(K).fill(0);
  output.forEach((d) => {
    d.forEach((v, i) => {
      variance[i] += v ** 2;
    });
  });
  variance = variance.map((v) => v / N);
  variance = variance.map((v) => v);
  for (let i = 0; i < K; i++) {
    for (let j = 0; j < K; j++) {
      U[i][j] *= variance[i];
    }
  }

  return { data: output, mean: mean, U: U };
}
