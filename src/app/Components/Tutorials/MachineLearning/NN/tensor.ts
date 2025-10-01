import { start } from 'repl';
import { argmax, matmul, strassen_matmul } from './math';

export class Tensor {
  data: number[];
  shape: number[];
  grad: number[];
  require_grad: boolean = true;

  constructor(dims: number[], require_grad: boolean = true) {
    this.require_grad = require_grad;
    this.data = new Array(dims.reduce((a, b) => a * b)).fill(0);
    this.shape = dims;
    this.grad = new Array(dims.reduce((a, b) => a * b)).fill(0);
  }

  length() {
    return this.data.length;
  }

  at(index: number | number[]) {
    if (index instanceof Array) {
      // Fix this for more than 2D tensors
      let flatIndex = 0;
      for (let i = 0; i < index.length; i++) {
        let stride = this.shape.slice(i + 1).reduce((a, b) => a * b, 1);
        flatIndex += index[i] * stride;
      }
      return this.data[flatIndex];
    }
    return this.data[index];
  }

  clone() {
    let t = new Tensor(this.shape);
    t.data = this.data.slice();
    t.grad = this.grad.slice();
    return t;
  }

  matmul(other: Tensor, bias: Tensor | undefined): Tensor {
    return matmul(this, other, bias);
  }

  transpose() {
    let [rows, cols] = this.shape;
    let t = new Tensor([cols, rows]);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        t.data[j * rows + i] = this.data[i * cols + j];
        t.grad[j * rows + i] = this.grad[i * cols + j];
      }
    }
    return t;
  }

  T() {
    return this.transpose();
  }

  new_like() {
    let t = new Tensor(this.shape);
    return t;
  }
  argmax() {
    return argmax(this);
  }
  add(other: Tensor): Tensor {
    if (this.length() !== other.length()) {
      throw new Error(
        'Tensor dimensions do not match, got ' +
          this.length() +
          ' and ' +
          other.length()
      );
    }
    let t = new Tensor(this.shape);
    for (let i = 0; i < this.length(); i++) {
      t.data[i] = this.data[i] + other.data[i];
    }
    return t;
  }
  sub(other: Tensor): Tensor {
    if (this.length() !== other.length()) {
      throw new Error(
        'Tensor dimensions do not match, got ' +
          this.length() +
          ' and ' +
          other.length()
      );
    }
    let t = new Tensor(this.shape);
    for (let i = 0; i < this.length(); i++) {
      t.data[i] = this.data[i] - other.data[i];
    }
    return t;
  }

  norm() {
    let sum = 0;
    for (let i = 0; i < this.data.length; i++) {
      sum += this.data[i] ** 2;
    }
    return Math.sqrt(sum);
  }
  has_nan(): boolean {
    for (let i = 0; i < this.data.length; i++) {
      if (isNaN(this.data[i])) {
        return true;
      }
    }
    return false;
  }
  slice(slices: Slice[]): Tensor {
    if (slices.length !== this.shape.length) {
      throw new Error(
        'Number of slices must match number of dimensions, got ' +
          slices.length +
          ' and ' +
          this.shape.length
      );
    }
    let newShape = slices.map((s) => s.end - s.start);
    let t = new Tensor(newShape);
    let indices = new Array(this.shape.length).fill(0);
    let total = t.length();
    for (let i = 0; i < total; i++) {
      // Compute the multi-dimensional index for t
      let remainder = i;
      for (let d = newShape.length - 1; d >= 0; d--) {
        indices[d] = remainder % newShape[d];
        remainder = Math.floor(remainder / newShape[d]);
      }
      // Map to the original tensor's indices
      let originalIndices = indices.map((idx, dim) => idx + slices[dim].start);
      // Compute the flat index in the original tensor
      let flatIndex = 0;
      for (let d = 0; d < originalIndices.length; d++) {
        let stride = this.shape.slice(d + 1).reduce((a, b) => a * b, 1);
        flatIndex += originalIndices[d] * stride;
      }
      t.data[i] = this.data[flatIndex];
      t.grad[i] = this.grad[flatIndex];
    }
    return t;
  }
}

export class Slice {
  dim: number;
  start: number;
  end: number;
  constructor(dim: number, start: number, end: number) {
    this.dim = dim;
    this.start = start;
    this.end = end;
  }
}
