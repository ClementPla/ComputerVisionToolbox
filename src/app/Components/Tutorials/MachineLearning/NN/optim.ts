import { clip_grad } from './math';
import { Network } from './network';

export abstract class Optimizer {
  lr: number;
  weight_decay: number;
  model: Network;

  abstract step(): void;
  abstract zero_grad(): void;
  abstract reset(): void;
}

/**
 * Stochastic Gradient Descent with Momentum and Nesterov
 * 
 * Update rule:
 *   v_t = momentum * v_{t-1} + grad
 *   If nesterov: grad = grad + momentum * v_t
 *   param = param - lr * grad
 */
export class SGD extends Optimizer {
  momentum: number;
  nesterov: boolean;
  velocities: number[][] = [];

  constructor(
    model: Network,
    lr: number,
    weight_decay: number = 0,
    momentum: number = 0,
    nesterov: boolean = false
  ) {
    super();
    this.model = model;
    this.lr = lr;
    this.weight_decay = weight_decay;
    this.momentum = momentum;
    this.nesterov = nesterov;
    this.reset();
  }

  override reset(): void {
    this.velocities = [];
    const params = this.model.parameters();
    for (let i = 0; i < params.length; i++) {
      this.velocities.push(new Array(params[i].length()).fill(0));
    }
  }

  override step(): void {
    const params = this.model.parameters();

    for (let i = 0; i < params.length; i++) {
      let param = params[i];
      param = clip_grad(param, -10, 10);

      for (let j = 0; j < param.length(); j++) {
        let grad = param.grad[j];

        // L2 regularization (weight decay)
        if (this.weight_decay !== 0) {
          grad += this.weight_decay * param.data[j];
        }

        // Momentum
        if (this.momentum !== 0) {
          this.velocities[i][j] = this.momentum * this.velocities[i][j] + grad;

          if (this.nesterov) {
            // Nesterov: use velocity + momentum * velocity
            grad = grad + this.momentum * this.velocities[i][j];
          } else {
            grad = this.velocities[i][j];
          }
        }

        // Parameter update
        param.data[j] -= this.lr * grad;
      }
    }
  }

  override zero_grad(): void {
    this.model.zero_grad();
  }
}

/**
 * Adam Optimizer
 * 
 * Adaptive Moment Estimation with bias correction
 */
export class Adam extends Optimizer {
  beta1: number;
  beta2: number;
  epsilon: number;
  
  // First moment (mean of gradients)
  m: number[][] = [];
  // Second moment (mean of squared gradients)
  v: number[][] = [];
  // Timestep for bias correction
  t: number = 0;

  constructor(
    model: Network,
    lr: number = 0.001,
    weight_decay: number = 0,
    beta1: number = 0.9,
    beta2: number = 0.999,
    epsilon: number = 1e-8
  ) {
    super();
    this.model = model;
    this.lr = lr;
    this.weight_decay = weight_decay;
    this.beta1 = beta1;
    this.beta2 = beta2;
    this.epsilon = epsilon;
    this.reset();
  }

  override reset(): void {
    this.m = [];
    this.v = [];
    this.t = 0;

    const params = this.model.parameters();
    for (let i = 0; i < params.length; i++) {
      const size = params[i].length();
      this.m.push(new Array(size).fill(0));
      this.v.push(new Array(size).fill(0));
    }
  }

  override step(): void {
    this.t++;
    const params = this.model.parameters();

    // Bias correction factors
    const bc1 = 1 - Math.pow(this.beta1, this.t);
    const bc2 = 1 - Math.pow(this.beta2, this.t);

    for (let i = 0; i < params.length; i++) {
      const param = params[i];

      for (let j = 0; j < param.length(); j++) {
        let grad = param.grad[j];

        // L2 regularization (weight decay) - AdamW style
        if (this.weight_decay !== 0) {
          param.data[j] -= this.lr * this.weight_decay * param.data[j];
        }

        // Update biased first moment estimate
        this.m[i][j] = this.beta1 * this.m[i][j] + (1 - this.beta1) * grad;

        // Update biased second raw moment estimate
        this.v[i][j] = this.beta2 * this.v[i][j] + (1 - this.beta2) * grad * grad;

        // Compute bias-corrected estimates
        const mCorrected = this.m[i][j] / bc1;
        const vCorrected = this.v[i][j] / bc2;

        // Parameter update
        param.data[j] -= this.lr * mCorrected / (Math.sqrt(vCorrected) + this.epsilon);
      }
    }
  }

  override zero_grad(): void {
    this.model.zero_grad();
  }
}

/**
 * RMSProp Optimizer
 * 
 * Root Mean Square Propagation
 */
export class RMSProp extends Optimizer {
  rho: number;      // Decay rate for moving average
  epsilon: number;
  momentum: number;
  
  // Moving average of squared gradients
  squaredGrads: number[][] = [];
  // Velocity for momentum
  velocities: number[][] = [];

  constructor(
    model: Network,
    lr: number = 0.01,
    weight_decay: number = 0,
    momentum: number = 0,
    rho: number = 0.9,
    epsilon: number = 1e-8
  ) {
    super();
    this.model = model;
    this.lr = lr;
    this.weight_decay = weight_decay;
    this.momentum = momentum;
    this.rho = rho;
    this.epsilon = epsilon;
    this.reset();
  }

  override reset(): void {
    this.squaredGrads = [];
    this.velocities = [];

    const params = this.model.parameters();
    for (let i = 0; i < params.length; i++) {
      const size = params[i].length();
      this.squaredGrads.push(new Array(size).fill(0));
      this.velocities.push(new Array(size).fill(0));
    }
  }

  override step(): void {
    const params = this.model.parameters();

    for (let i = 0; i < params.length; i++) {
      const param = params[i];

      for (let j = 0; j < param.length(); j++) {
        let grad = param.grad[j];

        // L2 regularization
        if (this.weight_decay !== 0) {
          grad += this.weight_decay * param.data[j];
        }

        // Update moving average of squared gradients
        this.squaredGrads[i][j] = 
          this.rho * this.squaredGrads[i][j] + (1 - this.rho) * grad * grad;

        // Compute update
        const update = grad / (Math.sqrt(this.squaredGrads[i][j]) + this.epsilon);

        // Apply momentum if enabled
        if (this.momentum !== 0) {
          this.velocities[i][j] = this.momentum * this.velocities[i][j] + update;
          param.data[j] -= this.lr * this.velocities[i][j];
        } else {
          param.data[j] -= this.lr * update;
        }
      }
    }
  }

  override zero_grad(): void {
    this.model.zero_grad();
  }
}

/**
 * AdaGrad Optimizer
 * 
 * Adaptive Gradient - accumulates squared gradients
 */
export class AdaGrad extends Optimizer {
  epsilon: number;
  sumSquaredGrads: number[][] = [];

  constructor(
    model: Network,
    lr: number = 0.01,
    weight_decay: number = 0,
    epsilon: number = 1e-8
  ) {
    super();
    this.model = model;
    this.lr = lr;
    this.weight_decay = weight_decay;
    this.epsilon = epsilon;
    this.reset();
  }

  override reset(): void {
    this.sumSquaredGrads = [];
    const params = this.model.parameters();
    for (let i = 0; i < params.length; i++) {
      this.sumSquaredGrads.push(new Array(params[i].length()).fill(0));
    }
  }

  override step(): void {
    const params = this.model.parameters();

    for (let i = 0; i < params.length; i++) {
      const param = params[i];

      for (let j = 0; j < param.length(); j++) {
        let grad = param.grad[j];

        if (this.weight_decay !== 0) {
          grad += this.weight_decay * param.data[j];
        }

        // Accumulate squared gradient
        this.sumSquaredGrads[i][j] += grad * grad;

        // Parameter update
        param.data[j] -= this.lr * grad / (Math.sqrt(this.sumSquaredGrads[i][j]) + this.epsilon);
      }
    }
  }

  override zero_grad(): void {
    this.model.zero_grad();
  }
}