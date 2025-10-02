export function matmul(
  mA: number[][] | MatrixClass,
  mB: number[][] | MatrixClass
) {
  let R = mA.length;
  let C = mA[0].length;
  let D = mB[0].length;
  let output = MatrixClass.zeros(R, D);
  for (let i = 0; i < R; i++) {
    for (let k = 0; k < D; k++) {
      let sum = 0;
      for (let j = 0; j < C; j++) {
        sum += mA[i][j] * mB[j][k];
      }
      output[i][k] = sum;
    }
  }
  return output;
}

export function dot(vA: number[], vB: number[]) {
  let output = 0;
  for (let i = 0; i < vA.length; i++) {
    output += vA[i] * vB[i];
  }
  return output;
}

export function transpose(matrix: number[][] | MatrixClass): MatrixClass {
  let m: MatrixClass;
  if (matrix instanceof MatrixClass) {
    m = matrix;
  } else {
    m = MatrixClass.fromArray(matrix);
  }
  let R = m.length;
  let C = m[0].length;
  let output = new MatrixClass(C, R);

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      output[j][i] = m[i][j];
    }
  }
  return output;
}

export function inverse2x2(matrix: number[][] | MatrixClass) {
  let det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  if (det === 0) {
    throw new Error('Matrix is singular and cannot be inverted.');
  }
  let invDet = 1 / det;
  let R = MatrixClass.zeros(2, 2);

  R[0][0] = matrix[1][1] * invDet;
  R[0][1] = -matrix[0][1] * invDet;
  R[1][0] = -matrix[1][0] * invDet;
  R[1][1] = matrix[0][0] * invDet;
  return R;
}

export function inverse(matrix: number[][] | MatrixClass): number[][] | null {
  let R = matrix.length;
  let C = matrix[0].length;
  if (R !== C) {
    throw new Error('Only square matrices can be inverted.');
  }
  if (R === 2) {
    return inverse2x2(matrix);
  }

  // Create augmented matrix [A | I]
  const augmented = matrix.map((row, i) => [
    ...row,
    ...Array.from({ length: C }, (_, j) => (i === j ? 1 : 0)),
  ]);

  // Perform Gauss-Jordan elimination
  for (let i = 0; i < C; i++) {
    // Find pivot
    let pivot = augmented[i][i];
    if (pivot === 0) {
      // Try to swap with a lower row
      let swapped = false;
      for (let j = i + 1; j < C; j++) {
        if (augmented[j][i] !== 0) {
          [augmented[i], augmented[j]] = [augmented[j], augmented[i]];
          pivot = augmented[i][i];
          swapped = true;
          break;
        }
      }
      if (!swapped) return null; // Singular matrix
    }

    // Normalize pivot row
    for (let j = 0; j < 2 * C; j++) {
      augmented[i][j] /= pivot;
    }

    // Eliminate other rows
    for (let k = 0; k < C; k++) {
      if (k === i) continue;
      const factor = augmented[k][i];
      for (let j = 0; j < 2 * C; j++) {
        augmented[k][j] -= factor * augmented[i][j];
      }
    }
  }
  // Extract inverse from augmented matrix
  return augmented.map((row) => row.slice(C));
}

export function scalarMultiply(
  matrix: number[][] | MatrixClass,
  scalar: number
) {
  let R = matrix.length;
  let C = matrix[0].length;
  let output = new MatrixClass(R, C);

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      output[i][j] = matrix[i][j] * scalar;
    }
  }
  return output;
}

export function addMatrices(
  mA: number[][] | MatrixClass,
  mB: number[][] | MatrixClass
) {
  let R = mA.length;
  let C = mA[0].length;
  let output = new MatrixClass(R, C);

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      output[i][j] = mA[i][j] + mB[i][j];
    }
  }
  return output;
}

export function subtractMatrices(
  mA: number[][] | MatrixClass,
  mB: number[][] | MatrixClass
) {
  let R = mA.length;
  let C = mA[0].length;
  let output = new MatrixClass(R, C);

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      output[i][j] = mA[i][j] - mB[i][j];
    }
  }
  return output;
}
export class Vector extends Array<number> {
  constructor(...elements: number[]) {
    super(...elements);
    Object.setPrototypeOf(this, Object.create(Vector.prototype));
  }

  norm(p: number = 2): number {
    if (p === 1) {
      return this.reduce((acc, val) => acc + Math.abs(val), 0);
    } else if (p === 2) {
      return Math.sqrt(this.reduce((acc, val) => acc + val * val, 0));
    } else if (p === Infinity) {
      return Math.max(...this.map((val) => Math.abs(val)));
    } else {
      throw new Error('Unsupported norm type');
    }
  }
}

export class MatrixClass extends Array<Vector> {
  constructor(rows: number, cols: number, fill: number = 0) {
    super(
      ...Array.from(
        { length: rows },
        () => new Vector(...Array(cols).fill(fill))
      )
    );
    Object.setPrototypeOf(this, Object.create(MatrixClass.prototype));
  }

  get numRows(): number {
    return this.length;
  }

  get numCols(): number {
    return this[0]?.length || 0;
  }

  get shape(): [number, number] {
    return [this.numRows, this.numCols];
  }

  transpose(): MatrixClass {
    return transpose(this);
  }

  static fromArray(arr: number[][]): MatrixClass {
    const matrix = new MatrixClass(arr.length, arr[0].length);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        matrix[i][j] = arr[i][j];
      }
    }
    return matrix;
  }

  toArray(): number[][] {
    return this.map((row) => [...row]);
  }

  static identity(size: number): MatrixClass {
    const identity = new MatrixClass(size, size);
    for (let i = 0; i < size; i++) {
      identity[i][i] = 1;
    }
    return identity;
  }

  static zeros(rows: number, cols: number): MatrixClass {
    return new MatrixClass(rows, cols, 0);
  }

  static ones(rows: number, cols: number): MatrixClass {
    return new MatrixClass(rows, cols, 1);
  }

  add(other: MatrixClass): MatrixClass {
    if (this.numRows !== other.numRows || this.numCols !== other.numCols) {
      throw new Error('Matrix dimensions must agree for addition.');
    }
    // Use the addMatrices function
    return addMatrices(this, other);
  }

  subtract(other: MatrixClass): MatrixClass {
    if (this.numRows !== other.numRows || this.numCols !== other.numCols) {
      throw new Error('Matrix dimensions must agree for subtraction.');
    }
    // Use the subtractMatrices function
    return subtractMatrices(this, other);
  }

  multiply(other: MatrixClass): MatrixClass {
    if (this.numCols !== other.numRows) {
      throw new Error(
        'Matrix dimensions must agree for multiplication (A.cols must equal B.rows).'
      );
    }
    // Use the matmul function
    const result = matmul(this, other);
    return result instanceof MatrixClass
      ? result
      : MatrixClass.fromArray(result);
  }
  norm(p: number = 2): number {
    if (p === 1) {
      let maxColSum = 0;
      for (let j = 0; j < this.numCols; j++) {
        let colSum = 0;
        for (let i = 0; i < this.numRows; i++) {
          colSum += Math.abs(this[i][j]);
        }
        maxColSum = Math.max(maxColSum, colSum);
      }
      return maxColSum;
    } else if (p === Infinity) {
      let maxRowSum = 0;
      for (let i = 0; i < this.numRows; i++) {
        let rowSum = this[i].reduce((acc, val) => acc + Math.abs(val), 0);
        maxRowSum = Math.max(maxRowSum, rowSum);
      }
      return maxRowSum;
    } else if (p === 2) {
      // For simplicity, we compute the Frobenius norm for p=2
      let sum = 0;
      for (let i = 0; i < this.numRows; i++) {
        for (let j = 0; j < this.numCols; j++) {
          sum += this[i][j] * this[i][j];
        }
      }
      return Math.sqrt(sum);
    } else {
      throw new Error('Unsupported norm type');
    }
  }
  hadamard(other: MatrixClass): MatrixClass {
    if (this.numRows !== other.numRows || this.numCols !== other.numCols) {
      throw new Error(
        'Matrix dimensions must agree for Hadamard product (element-wise multiplication).'
      );
    }
    const result = new MatrixClass(this.numRows, this.numCols);
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        result[i][j] = this[i][j] * other[i][j];
      }
    }
    return result;
  }

  scalarPower(exponent: number): MatrixClass {
    const result = new MatrixClass(this.numRows, this.numCols);
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        result[i][j] = Math.pow(Math.abs(this[i][j]), exponent);
      }
    }
    return result;
  }
  abs(): MatrixClass {
    const result = new MatrixClass(this.numRows, this.numCols);
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        result[i][j] = Math.abs(this[i][j]);
      }
    }
    return result;
  }
  addScalar(scalar: number): MatrixClass {
    const result = new MatrixClass(this.numRows, this.numCols);
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        result[i][j] = this[i][j] + scalar;
      }
    }
    return result;
  }
  sign(): MatrixClass {
    const result = new MatrixClass(this.numRows, this.numCols);
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        result[i][j] = Math.sign(this[i][j]);
      }
    }
    return result;
  }
  scalarMultiply(scalar: number): MatrixClass {
    // Use the scalarMultiply function
    return scalarMultiply(this, scalar);
  }

  inverse(): MatrixClass | null {
    if (this.numRows !== this.numCols) {
      throw new Error('Only square matrices can be inverted.');
    }
    // Use the inverse function
    const inv = inverse(this);
    if (inv === null) return null;
    return MatrixClass.fromArray(inv);
  }

  sum(): number {
    let total = 0;
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        total += this[i][j];
      }
    }
    return total;
  }
}
