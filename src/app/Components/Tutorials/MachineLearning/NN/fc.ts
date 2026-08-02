import { Layer } from './layer';
import { Tensor } from './tensor';

/**
 * Fully Connected (Dense) Layer
 * 
 * Computes: output = input @ weights + bias
 * 
 * Shapes:
 *   input:   [B, inputDim]
 *   weights: [inputDim, outputDim]
 *   bias:    [outputDim]
 *   output:  [B, outputDim]
 */
export class FullyConnected extends Layer {
  weights: Tensor;
  bias: Tensor;
  hasBias: boolean;

  // Cache for backward pass
  private inputCache: Tensor | null = null;

  constructor(inputDim: number, outputDim: number, bias: boolean = true) {
    super();
    this.name = 'FullyConnected';

    // Initialize weights with Xavier/Glorot initialization
    this.weights = new Tensor([inputDim, outputDim]);
    const xavier = Math.sqrt(6 / (inputDim + outputDim));
    for (let i = 0; i < this.weights.data.length; i++) {
      this.weights.data[i] = xavier * (2 * Math.random() - 1);
    }

    // Initialize bias to zero
    this.hasBias = bias;
    if (this.hasBias) {
      this.bias = new Tensor([outputDim]);
      this.bias.data.fill(0);
    }
  }

  override forward(input: Tensor): Tensor {
    // Cache input for backward pass
    this.inputCache = input;

    // Compute output = input @ weights + bias
    const output = input.matmul(this.weights, this.hasBias ? this.bias : undefined);

    return output;
  }

  override backward(gradOutput: Tensor): Tensor {
    const input = this.inputCache!;
    const B = gradOutput.shape[0];   // Batch size
    const M = input.shape[1];        // Input dimension
    const N = gradOutput.shape[1];   // Output dimension

    // The incoming gradient is in gradOutput.grad
    // We need to compute:
    // 1. Gradient w.r.t. input (to pass backward)
    // 2. Gradient w.r.t. weights (for optimizer)
    // 3. Gradient w.r.t. bias (for optimizer)

    // Create a tensor wrapper for the gradient
    const grad = new Tensor(gradOutput.shape);
    grad.data = gradOutput.grad;

    // 1. Gradient w.r.t. input: dL/dX = dL/dY @ W^T
    if (input.require_grad) {
      const weightsT = this.weights.T();
      const inputGrad = grad.matmul(weightsT, undefined);
      input.grad = inputGrad.data;
    }

    // 2. Gradient w.r.t. weights: dL/dW = X^T @ dL/dY
    const inputT = input.T();
    const weightsGrad = inputT.matmul(grad, undefined);
    this.weights.grad = weightsGrad.data;

    // 3. Gradient w.r.t. bias: dL/db = sum(dL/dY, axis=0)
    if (this.hasBias) {
      // Sum over batch dimension
      this.bias.grad.fill(0);
      for (let i = 0; i < B; i++) {
        for (let j = 0; j < N; j++) {
          this.bias.grad[j] += gradOutput.grad[i * N + j];
        }
      }
    }

    return input;
  }

  override parameters(): Tensor[] {
    if (this.hasBias) {
      return [this.weights, this.bias];
    }
    return [this.weights];
  }

  override description(): string[] {
    return [
      `Input shape: ${this.weights.shape[0]}`,
      `Output shape: ${this.weights.shape[1]}`
    ];
  }

  override getName(): string {
    return `Fully connected (${this.weights.shape[0]} → ${this.weights.shape[1]})`;
  }

  /**
   * Get the number of parameters in this layer
   */
  numParameters(): number {
    let count = this.weights.shape[0] * this.weights.shape[1];
    if (this.hasBias) {
      count += this.weights.shape[1];
    }
    return count;
  }
}

/**
 * Dropout Layer
 * 
 * During training: randomly sets elements to 0 with probability p
 * During inference: no dropout applied
 */
export class Dropout extends Layer {
  p: number;
  training: boolean = true;
  private mask: number[] = [];

  constructor(p: number = 0.5) {
    super();
    this.name = 'Dropout';
    this.p = p;
  }

  override forward(input: Tensor): Tensor {
    if (!this.training || this.p === 0) {
      return input;
    }

    const output = input.new_like();
    this.mask = new Array(input.length());
    const scale = 1 / (1 - this.p);

    for (let i = 0; i < input.length(); i++) {
      if (Math.random() > this.p) {
        this.mask[i] = scale;
        output.data[i] = input.data[i] * scale;
      } else {
        this.mask[i] = 0;
        output.data[i] = 0;
      }
    }

    this.ctx = [input];
    return output;
  }

  override backward(gradOutput: Tensor): Tensor {
    const input = this.ctx[0];

    if (!this.training || this.p === 0) {
      input.grad = gradOutput.grad;
      return input;
    }

    for (let i = 0; i < input.length(); i++) {
      input.grad[i] = gradOutput.grad[i] * this.mask[i];
    }

    return input;
  }

  setTraining(training: boolean): void {
    this.training = training;
  }
}

/**
 * Batch Normalization Layer
 */
export class BatchNorm1d extends Layer {
  numFeatures: number;
  epsilon: number;
  momentum: number;
  training: boolean = true;

  // Learnable parameters
  gamma: Tensor;  // Scale
  beta: Tensor;   // Shift

  // Running statistics
  runningMean: Tensor;
  runningVar: Tensor;

  // Cache for backward
  private xNorm: Tensor | null = null;
  private std: number[] = [];

  constructor(numFeatures: number, epsilon: number = 1e-5, momentum: number = 0.1) {
    super();
    this.name = 'BatchNorm1d';
    this.numFeatures = numFeatures;
    this.epsilon = epsilon;
    this.momentum = momentum;

    // Initialize learnable parameters
    this.gamma = new Tensor([numFeatures]);
    this.gamma.data.fill(1);

    this.beta = new Tensor([numFeatures]);
    this.beta.data.fill(0);

    // Initialize running statistics
    this.runningMean = new Tensor([numFeatures]);
    this.runningMean.data.fill(0);

    this.runningVar = new Tensor([numFeatures]);
    this.runningVar.data.fill(1);
  }

  override forward(input: Tensor): Tensor {
    const B = input.shape[0];
    const C = input.shape[1];
    const output = input.new_like();

    this.ctx = [input];

    if (this.training) {
      // Compute batch statistics
      const mean = new Array(C).fill(0);
      const variance = new Array(C).fill(0);

      // Compute mean
      for (let c = 0; c < C; c++) {
        for (let b = 0; b < B; b++) {
          mean[c] += input.data[b * C + c];
        }
        mean[c] /= B;
      }

      // Compute variance
      for (let c = 0; c < C; c++) {
        for (let b = 0; b < B; b++) {
          const diff = input.data[b * C + c] - mean[c];
          variance[c] += diff * diff;
        }
        variance[c] /= B;
      }

      // Normalize and apply scale/shift
      this.std = new Array(C);
      this.xNorm = input.new_like();

      for (let c = 0; c < C; c++) {
        this.std[c] = Math.sqrt(variance[c] + this.epsilon);
        for (let b = 0; b < B; b++) {
          const idx = b * C + c;
          this.xNorm!.data[idx] = (input.data[idx] - mean[c]) / this.std[c];
          output.data[idx] = this.gamma.data[c] * this.xNorm!.data[idx] + this.beta.data[c];
        }
      }

      // Update running statistics
      for (let c = 0; c < C; c++) {
        this.runningMean.data[c] = (1 - this.momentum) * this.runningMean.data[c] + this.momentum * mean[c];
        this.runningVar.data[c] = (1 - this.momentum) * this.runningVar.data[c] + this.momentum * variance[c];
      }
    } else {
      // Use running statistics
      for (let c = 0; c < C; c++) {
        const std = Math.sqrt(this.runningVar.data[c] + this.epsilon);
        for (let b = 0; b < B; b++) {
          const idx = b * C + c;
          const xNorm = (input.data[idx] - this.runningMean.data[c]) / std;
          output.data[idx] = this.gamma.data[c] * xNorm + this.beta.data[c];
        }
      }
    }

    return output;
  }

  override backward(gradOutput: Tensor): Tensor {
    const input = this.ctx[0];
    const B = input.shape[0];
    const C = input.shape[1];

    // Gradient w.r.t. gamma: sum(dL/dY * xNorm)
    // Gradient w.r.t. beta: sum(dL/dY)
    this.gamma.grad.fill(0);
    this.beta.grad.fill(0);

    for (let c = 0; c < C; c++) {
      for (let b = 0; b < B; b++) {
        const idx = b * C + c;
        this.gamma.grad[c] += gradOutput.grad[idx] * this.xNorm!.data[idx];
        this.beta.grad[c] += gradOutput.grad[idx];
      }
    }

    // Gradient w.r.t. input (simplified)
    for (let c = 0; c < C; c++) {
      for (let b = 0; b < B; b++) {
        const idx = b * C + c;
        input.grad[idx] = gradOutput.grad[idx] * this.gamma.data[c] / this.std[c];
      }
    }

    return input;
  }

  override parameters(): Tensor[] {
    return [this.gamma, this.beta];
  }

  setTraining(training: boolean): void {
    this.training = training;
  }
}