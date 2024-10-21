// Only for 2D matrices!

import { matmul, transpose } from "./matrix";
import * as math from 'mathjs'


type Matrix = number[][];
type Vector = number[];


export function SVD(matrix: number[][]) {

    // TODO

}

export function MMt_solution(matrix: number[][]) {
    let R = matrix.length;
    let C = matrix[0].length;
    if (R != 2 || C != 2) {
        throw new Error("Only 2x2 matrices are supported for MMt_solution");
    }

    // SVD algorithm
    let B = matmul(matrix, transpose(matrix));
    let eigen = eigenvectors2D(B);
    let U = eigen.vectors;

    // Singular values
    let S = [[Math.sqrt(eigen.values[0]), 0], [0, Math.sqrt(eigen.values[1])]];

    let A = matmul(transpose(U), S)
    return A;
}

export interface Eigen {
    values: number[];
    vectors: number[][];
}
export function eigenvectors2D(matrix: number[][]): Eigen {
    // Always 2x2 matrix
    // Always return the ordered eigenvalues and eigenvectors

    let R = matrix.length;
    let eigenVectors = new Array(R).fill(0).map(() => new Array(R).fill(0));

    // Eigenvalues algorithm
    let a = 1
    let b = -1 * (matrix[0][0] + matrix[1][1])
    let c = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]

    let det = Math.sqrt(b * b - 4 * a * c)
    let lambda1 = (-b + det) / (2 * a)
    let lambda2 = (-b - det) / (2 * a)

    if (((matrix[0][0] - lambda1) == 0) || ((matrix[0][0] - lambda2) == 0)) {
        eigenVectors[0] = [1, - matrix[1][0] / (matrix[1][1] - lambda1)]
        eigenVectors[1] = [1, - matrix[1][0] / (matrix[1][1] - lambda2)]
    }
    else {
        eigenVectors[0] = [-matrix[0][1] / (matrix[0][0] - lambda1), 1]
        eigenVectors[1] = [-matrix[0][1] / (matrix[0][0] - lambda2), 1]
    }

    // Normalize eigenvectors
    let norm1 = Math.sqrt(eigenVectors[0][0] ** 2 + eigenVectors[0][1] ** 2)
    let norm2 = Math.sqrt(eigenVectors[1][0] ** 2 + eigenVectors[1][1] ** 2)
    eigenVectors[0] = [eigenVectors[0][0] / norm1, eigenVectors[0][1] / norm1]
    eigenVectors[1] = [eigenVectors[1][0] / norm2, eigenVectors[1][1] / norm2]


    if (lambda1 > lambda2) {
        return { values: [lambda1, lambda2], vectors: eigenVectors }

    }
    else {
        return { values: [lambda2, lambda1], vectors: [eigenVectors[1], eigenVectors[0]] }
    }

}


export function PCA2D(data: number[][]) {
    // PCA algorithm
    let N = data.length;
    let mean = [0, 0]
    data.forEach(d => {
        mean[0] += d[0]
        mean[1] += d[1]
    })
    mean[0] /= N
    mean[1] /= N

    let centered = data.map(d => [d[0] - mean[0], d[1] - mean[1]])

    let m = math.matrix(centered)
    let M = math.multiply(math.transpose(m), m)
    let ans = math.eigs(M)

    let V = ans.eigenvectors
    let U = new Array()
    for (let i = 0; i < V.length; i++) {
        U.push(V[i].vector.valueOf())
    }

    let output = new Array(N)
    for (let i = 0; i < N; i++) {
        let x = centered[i][0]
        let y = centered[i][1]
        output[i] = [U[0][0] * x + U[0][1] * y, U[1][0] * x + U[1][1] * y]
    }
    // Compute the variance of the output
    let variance = [0, 0]
    output.forEach(d => {
        variance[0] += d[0] ** 2
        variance[1] += d[1] ** 2
    })
    variance[0] /= N
    variance[1] /= N
    variance[0] = Math.sqrt(variance[0])
    variance[1] = Math.sqrt(variance[1])

    // Scale the eigenvectors
    U[0][0] *= variance[0]
    U[0][1] *= variance[0]
    U[1][0] *= variance[1]
    U[1][1] *= variance[1]

    return { data: output, mean: mean, U: U }

}

export function PCA(data: number[][]) {
    // PCA algorithm
    let N = data.length;
    let K = data[0].length;
    let mean = new Array(K).fill(0)
    data.forEach(d => {
        d.forEach((v, i) => {
            mean[i] += v
        })
    })
    mean = mean.map(v => v / N)

    let centered = data.map(d => d.map((v, i) => v - mean[i]))

    let m = math.matrix(centered)
    let M = math.multiply(math.transpose(m), m)
    let ans = math.eigs(M)

    let V = ans.eigenvectors
    let U: number[][] = new Array()
    for (let i = 0; i < V.length; i++) {
        U.push(V[i].vector.valueOf() as number[])
    }

    let output: number[][] = new Array(N)
    for (let i = 0; i < N; i++) {
        
        output[i] = math.multiply(U, centered[i]).valueOf() as number[];
        
        
    }
    // Compute the variance of the output
    let variance = new Array(K).fill(0)
    output.forEach(d => {
        d.forEach((v, i) => {
            variance[i] += v ** 2
        })
    })
    variance = variance.map(v => v / N)
    variance = variance.map(v => v)
    for(let i = 0; i < K; i++) {
        for(let j = 0; j < K; j++) {
            U[i][j] *= variance[i]
        }
    }
    
    return { data: output, mean: mean, U: U }

}


export function solveLinearSystem(A: Matrix, b: Vector): Vector {
    const n = A.length;
    for (let i = 0; i < n; i++) {
        // Partial pivoting
        let maxRow = i;
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) {
                maxRow = k;
            }
        }

        // Swap rows in A and b
        [A[i], A[maxRow]] = [A[maxRow], A[i]];
        [b[i], b[maxRow]] = [b[maxRow], b[i]];

        // Make all rows below this one 0 in the current column
        for (let k = i + 1; k < n; k++) {
            const c = A[k][i] / A[i][i];
            for (let j = i; j < n; j++) {
                A[k][j] -= c * A[i][j];
            }
            b[k] -= c * b[i];
        }
    }

    // Solve equation Ax=b for an upper triangular matrix A
    const x = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        let sum = b[i];
        for (let j = i + 1; j < n; j++) {
            sum -= A[i][j] * x[j];
        }
        x[i] = sum / A[i][i];
    }
    return x;
}

/**
 * Computes the polynomial regression coefficients.
 */
export function polyfit(x: number[], y: number[], degree: number): Vector {
    const n = x.length;
    const m = degree;
    const X: Matrix = [];
    const B: Vector = [];

    // Compute the elements of the normal equation matrix and vector
    for (let row = 0; row <= m; row++) {
        X[row] = [];
        for (let col = 0; col <= m; col++) {
            let sum = 0;
            for (let i = 0; i < n; i++) {
                sum += Math.pow(x[i], row + col);
            }
            X[row][col] = sum;
        }
        let sumY = 0;
        for (let i = 0; i < n; i++) {
            sumY += y[i] * Math.pow(x[i], row);
        }
        B[row] = sumY;
    }

    // Solve the linear system
    const coefficients = solveLinearSystem(X, B);
    return coefficients;
}