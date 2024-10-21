import { argmax, matmul } from "./math";

export class Tensor {

    data: number[];
    shape: number[];
    grad: number[];
    require_grad: boolean = true;

    constructor(dims: number[], require_grad: boolean = true) {
        this.require_grad = require_grad;
        this.data = new Array(dims.reduce((a, b) => a * b)).fill(0)
        this.shape = dims;
        this.grad = new Array(dims.reduce((a, b) => a * b)).fill(0);
    }

    length() {
        return this.data.length;
    }

    at(index: number) {
        return this.data[index];
    }

    clone() {
        let t = new Tensor(this.shape);
        t.data = this.data.slice();
        t.grad = this.grad.slice();
        return t
    }

    matmul(other: Tensor, bias: Tensor | undefined): Tensor {
        return matmul(this, other, bias)
    }

    transpose() {
        let [rows, cols] = this.shape;
        let t = new Tensor([cols, rows]);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                t.data[j * rows + i] = this.data[i * cols + j]
                t.grad[j * rows + i] = this.grad[i * cols + j]
            }
        }
        return t
    }

    T() {
        return this.transpose()
    }

    new_like() {
        let t = new Tensor(this.shape);
        return t;
    }
    argmax(){
        return argmax(this)
    }

    norm() {
        let sum = 0;
        for (let i = 0; i < this.data.length; i++) {
            sum += this.data[i] ** 2;
        }
        return Math.sqrt(sum);
    }

}