/**
 * Matrix — a dense, row-major 2D array of doubles.
 *
 * This is the single canonical matrix representation for the toolbox. It is
 * backed by a flat `Float64Array` (index = row * cols + col) for speed and
 * predictable memory, and exposes a small, readable NumPy-flavoured API.
 *
 * Vectors are plain `number[]` everywhere in the public API (see ./vector),
 * so results drop straight into components and charts with no conversion.
 */
export class Matrix {
  readonly rows: number;
  readonly cols: number;
  readonly data: Float64Array;

  constructor(rows: number, cols: number, data?: Float64Array | number[]) {
    this.rows = rows;
    this.cols = cols;
    if (data) {
      if (data.length !== rows * cols) {
        throw new Error(
          `Matrix data length ${data.length} does not match ${rows}x${cols}.`
        );
      }
      this.data = data instanceof Float64Array ? data : Float64Array.from(data);
    } else {
      this.data = new Float64Array(rows * cols);
    }
  }

  // --- Construction ---------------------------------------------------------

  static zeros(rows: number, cols: number): Matrix {
    return new Matrix(rows, cols);
  }

  static ones(rows: number, cols: number): Matrix {
    return Matrix.full(rows, cols, 1);
  }

  static full(rows: number, cols: number, value: number): Matrix {
    const m = new Matrix(rows, cols);
    m.data.fill(value);
    return m;
  }

  /** Identity matrix of the given size. */
  static eye(n: number): Matrix {
    const m = new Matrix(n, n);
    for (let i = 0; i < n; i++) m.data[i * n + i] = 1;
    return m;
  }

  /** Square matrix with `values` on the diagonal, zeros elsewhere. */
  static diag(values: number[]): Matrix {
    const n = values.length;
    const m = new Matrix(n, n);
    for (let i = 0; i < n; i++) m.data[i * n + i] = values[i];
    return m;
  }

  /** Build from a nested array; each inner array is a row. */
  static fromRows(rows: number[][]): Matrix {
    const r = rows.length;
    const c = r > 0 ? rows[0].length : 0;
    const m = new Matrix(r, c);
    for (let i = 0; i < r; i++) {
      if (rows[i].length !== c) {
        throw new Error('fromRows: all rows must have the same length.');
      }
      for (let j = 0; j < c; j++) m.data[i * c + j] = rows[i][j];
    }
    return m;
  }

  /** Build from a nested array of columns. */
  static fromColumns(cols: number[][]): Matrix {
    return Matrix.fromRows(cols).T();
  }

  /** Column vector (n x 1) from a 1D array. */
  static columnVector(v: number[]): Matrix {
    return new Matrix(v.length, 1, Float64Array.from(v));
  }

  /** Row vector (1 x n) from a 1D array. */
  static rowVector(v: number[]): Matrix {
    return new Matrix(1, v.length, Float64Array.from(v));
  }

  static random(rows: number, cols: number, rng: () => number = Math.random): Matrix {
    const m = new Matrix(rows, cols);
    for (let i = 0; i < m.data.length; i++) m.data[i] = rng();
    return m;
  }

  // --- Indexing & shape -----------------------------------------------------

  get shape(): [number, number] {
    return [this.rows, this.cols];
  }

  get(i: number, j: number): number {
    return this.data[i * this.cols + j];
  }

  set(i: number, j: number, value: number): void {
    this.data[i * this.cols + j] = value;
  }

  /** Copy of row `i` as a plain array. */
  row(i: number): number[] {
    const start = i * this.cols;
    return Array.from(this.data.subarray(start, start + this.cols));
  }

  /** Copy of column `j` as a plain array. */
  col(j: number): number[] {
    const out = new Array<number>(this.rows);
    for (let i = 0; i < this.rows; i++) out[i] = this.data[i * this.cols + j];
    return out;
  }

  setRow(i: number, values: number[]): void {
    const start = i * this.cols;
    for (let j = 0; j < this.cols; j++) this.data[start + j] = values[j];
  }

  setCol(j: number, values: number[]): void {
    for (let i = 0; i < this.rows; i++) this.data[i * this.cols + j] = values[i];
  }

  /** All rows as nested arrays. */
  toArray(): number[][] {
    const out: number[][] = new Array(this.rows);
    for (let i = 0; i < this.rows; i++) out[i] = this.row(i);
    return out;
  }

  /** Flatten to a 1D array (row-major). */
  ravel(): number[] {
    return Array.from(this.data);
  }

  clone(): Matrix {
    return new Matrix(this.rows, this.cols, this.data.slice());
  }

  // --- Element-wise ---------------------------------------------------------

  map(fn: (value: number, i: number, j: number) => number): Matrix {
    const out = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const idx = i * this.cols + j;
        out.data[idx] = fn(this.data[idx], i, j);
      }
    }
    return out;
  }

  forEach(fn: (value: number, i: number, j: number) => void): void {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        fn(this.data[i * this.cols + j], i, j);
      }
    }
  }

  private elementwise(other: Matrix | number, op: (a: number, b: number) => number): Matrix {
    const out = new Matrix(this.rows, this.cols);
    if (typeof other === 'number') {
      for (let i = 0; i < this.data.length; i++) out.data[i] = op(this.data[i], other);
    } else {
      this.assertSameShape(other);
      for (let i = 0; i < this.data.length; i++) out.data[i] = op(this.data[i], other.data[i]);
    }
    return out;
  }

  add(other: Matrix | number): Matrix {
    return this.elementwise(other, (a, b) => a + b);
  }

  sub(other: Matrix | number): Matrix {
    return this.elementwise(other, (a, b) => a - b);
  }

  /** Element-wise (Hadamard) product, or scalar multiply. */
  mul(other: Matrix | number): Matrix {
    return this.elementwise(other, (a, b) => a * b);
  }

  /** Scalar multiply (alias of mul with a scalar, for readability). */
  scale(k: number): Matrix {
    return this.map((v) => v * k);
  }

  neg(): Matrix {
    return this.map((v) => -v);
  }

  // --- Linear algebra -------------------------------------------------------

  /** Transpose. */
  T(): Matrix {
    const out = new Matrix(this.cols, this.rows);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        out.data[j * this.rows + i] = this.data[i * this.cols + j];
      }
    }
    return out;
  }

  /** Matrix product `this @ other`. */
  matmul(other: Matrix): Matrix {
    if (this.cols !== other.rows) {
      throw new Error(
        `matmul: shape mismatch ${this.rows}x${this.cols} @ ${other.rows}x${other.cols}.`
      );
    }
    const n = this.rows;
    const m = other.cols;
    const k = this.cols;
    const out = new Matrix(n, m);
    for (let i = 0; i < n; i++) {
      for (let p = 0; p < k; p++) {
        const a = this.data[i * k + p];
        if (a === 0) continue;
        const bRow = p * m;
        const oRow = i * m;
        for (let j = 0; j < m; j++) {
          out.data[oRow + j] += a * other.data[bRow + j];
        }
      }
    }
    return out;
  }

  /** Matrix-vector product `this @ v`, returned as a plain array. */
  matvec(v: number[]): number[] {
    if (this.cols !== v.length) {
      throw new Error(`matvec: ${this.rows}x${this.cols} @ ${v.length}.`);
    }
    const out = new Array<number>(this.rows).fill(0);
    for (let i = 0; i < this.rows; i++) {
      let sum = 0;
      const row = i * this.cols;
      for (let j = 0; j < this.cols; j++) sum += this.data[row + j] * v[j];
      out[i] = sum;
    }
    return out;
  }

  /** Diagonal as a plain array. */
  diagonal(): number[] {
    const n = Math.min(this.rows, this.cols);
    const out = new Array<number>(n);
    for (let i = 0; i < n; i++) out[i] = this.data[i * this.cols + i];
    return out;
  }

  trace(): number {
    return this.diagonal().reduce((a, b) => a + b, 0);
  }

  /** Sum of all elements. */
  sum(): number {
    let s = 0;
    for (let i = 0; i < this.data.length; i++) s += this.data[i];
    return s;
  }

  /** Frobenius norm. */
  frobenius(): number {
    let s = 0;
    for (let i = 0; i < this.data.length; i++) s += this.data[i] * this.data[i];
    return Math.sqrt(s);
  }

  isSquare(): boolean {
    return this.rows === this.cols;
  }

  private assertSameShape(other: Matrix): void {
    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new Error(
        `Shape mismatch: ${this.rows}x${this.cols} vs ${other.rows}x${other.cols}.`
      );
    }
  }
}
