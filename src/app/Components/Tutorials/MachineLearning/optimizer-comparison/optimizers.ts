/**
 * Gradient Descent Optimizers for 2D visualization
 */

export type OptimizerType = 'sgd' | 'momentum' | 'nesterov' | 'adagrad' | 'rmsprop' | 'adadelta' | 'adam';

export interface OptimizerConfig {
  learningRate: number;
  momentum: number;      // For momentum/nesterov
  beta1: number;         // For Adam
  beta2: number;         // For Adam/RMSProp/Adadelta
  epsilon: number;       // Numerical stability
}

export interface Point2D {
  x: number;
  y: number;
}

export interface GradientResult {
  gx: number;
  gy: number;
}

const DEFAULT_CONFIG: OptimizerConfig = {
  learningRate: 0.01,
  momentum: 0.9,
  beta1: 0.9,
  beta2: 0.999,
  epsilon: 1e-8
};

/**
 * Base optimizer class
 */
export abstract class Optimizer {
  protected config: OptimizerConfig;
  
  constructor(config: Partial<OptimizerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  abstract step(pos: Point2D, grad: GradientResult): Point2D;
  abstract reset(): void;
  
  updateConfig(config: Partial<OptimizerConfig>): void {
    this.config = { ...this.config, ...config };
  }

  getConfig(): OptimizerConfig {
    return { ...this.config };
  }
}

/**
 * Vanilla SGD
 */
export class SGD extends Optimizer {
  step(pos: Point2D, grad: GradientResult): Point2D {
    return {
      x: pos.x - this.config.learningRate * grad.gx,
      y: pos.y - this.config.learningRate * grad.gy
    };
  }
  
  reset(): void {}
}

/**
 * SGD with Momentum
 */
export class MomentumSGD extends Optimizer {
  private vx = 0;
  private vy = 0;

  step(pos: Point2D, grad: GradientResult): Point2D {
    this.vx = this.config.momentum * this.vx - this.config.learningRate * grad.gx;
    this.vy = this.config.momentum * this.vy - this.config.learningRate * grad.gy;
    
    return {
      x: pos.x + this.vx,
      y: pos.y + this.vy
    };
  }

  reset(): void {
    this.vx = 0;
    this.vy = 0;
  }
}

/**
 * Nesterov Accelerated Gradient
 */
export class NesterovSGD extends Optimizer {
  private vx = 0;
  private vy = 0;

  step(pos: Point2D, grad: GradientResult): Point2D {
    const vxPrev = this.vx;
    const vyPrev = this.vy;
    
    this.vx = this.config.momentum * this.vx - this.config.learningRate * grad.gx;
    this.vy = this.config.momentum * this.vy - this.config.learningRate * grad.gy;
    
    return {
      x: pos.x - this.config.momentum * vxPrev + (1 + this.config.momentum) * this.vx,
      y: pos.y - this.config.momentum * vyPrev + (1 + this.config.momentum) * this.vy
    };
  }

  reset(): void {
    this.vx = 0;
    this.vy = 0;
  }
}

/**
 * AdaGrad
 */
export class AdaGrad extends Optimizer {
  private gx2Sum = 0;
  private gy2Sum = 0;

  step(pos: Point2D, grad: GradientResult): Point2D {
    this.gx2Sum += grad.gx * grad.gx;
    this.gy2Sum += grad.gy * grad.gy;
    
    return {
      x: pos.x - this.config.learningRate * grad.gx / (Math.sqrt(this.gx2Sum) + this.config.epsilon),
      y: pos.y - this.config.learningRate * grad.gy / (Math.sqrt(this.gy2Sum) + this.config.epsilon)
    };
  }

  reset(): void {
    this.gx2Sum = 0;
    this.gy2Sum = 0;
  }
}

/**
 * RMSProp
 */
export class RMSProp extends Optimizer {
  private ex2 = 0;
  private ey2 = 0;

  step(pos: Point2D, grad: GradientResult): Point2D {
    const beta = this.config.beta2;
    
    this.ex2 = beta * this.ex2 + (1 - beta) * grad.gx * grad.gx;
    this.ey2 = beta * this.ey2 + (1 - beta) * grad.gy * grad.gy;
    
    return {
      x: pos.x - this.config.learningRate * grad.gx / (Math.sqrt(this.ex2) + this.config.epsilon),
      y: pos.y - this.config.learningRate * grad.gy / (Math.sqrt(this.ey2) + this.config.epsilon)
    };
  }

  reset(): void {
    this.ex2 = 0;
    this.ey2 = 0;
  }
}

/**
 * Adadelta
 */
export class Adadelta extends Optimizer {
  private eg2x = 0;
  private eg2y = 0;
  private ed2x = 0;
  private ed2y = 0;

  step(pos: Point2D, grad: GradientResult): Point2D {
    const rho = this.config.beta2;
    const eps = this.config.epsilon;
    
    // Accumulate gradient
    this.eg2x = rho * this.eg2x + (1 - rho) * grad.gx * grad.gx;
    this.eg2y = rho * this.eg2y + (1 - rho) * grad.gy * grad.gy;
    
    // Compute update
    const dx = -Math.sqrt(this.ed2x + eps) / Math.sqrt(this.eg2x + eps) * grad.gx;
    const dy = -Math.sqrt(this.ed2y + eps) / Math.sqrt(this.eg2y + eps) * grad.gy;
    
    // Accumulate updates
    this.ed2x = rho * this.ed2x + (1 - rho) * dx * dx;
    this.ed2y = rho * this.ed2y + (1 - rho) * dy * dy;
    
    return {
      x: pos.x + dx,
      y: pos.y + dy
    };
  }

  reset(): void {
    this.eg2x = 0;
    this.eg2y = 0;
    this.ed2x = 0;
    this.ed2y = 0;
  }
}

/**
 * Adam
 */
export class Adam extends Optimizer {
  private mx = 0;
  private my = 0;
  private vx = 0;
  private vy = 0;
  private t = 0;

  step(pos: Point2D, grad: GradientResult): Point2D {
    this.t++;
    const { learningRate, beta1, beta2, epsilon } = this.config;
    
    // Update biased first moment estimate
    this.mx = beta1 * this.mx + (1 - beta1) * grad.gx;
    this.my = beta1 * this.my + (1 - beta1) * grad.gy;
    
    // Update biased second raw moment estimate
    this.vx = beta2 * this.vx + (1 - beta2) * grad.gx * grad.gx;
    this.vy = beta2 * this.vy + (1 - beta2) * grad.gy * grad.gy;
    
    // Bias correction
    const mxHat = this.mx / (1 - Math.pow(beta1, this.t));
    const myHat = this.my / (1 - Math.pow(beta1, this.t));
    const vxHat = this.vx / (1 - Math.pow(beta2, this.t));
    const vyHat = this.vy / (1 - Math.pow(beta2, this.t));
    
    return {
      x: pos.x - learningRate * mxHat / (Math.sqrt(vxHat) + epsilon),
      y: pos.y - learningRate * myHat / (Math.sqrt(vyHat) + epsilon)
    };
  }

  reset(): void {
    this.mx = 0;
    this.my = 0;
    this.vx = 0;
    this.vy = 0;
    this.t = 0;
  }
}

/**
 * Factory function
 */
export function createOptimizer(type: OptimizerType, config?: Partial<OptimizerConfig>): Optimizer {
  switch (type) {
    case 'sgd': return new SGD(config);
    case 'momentum': return new MomentumSGD(config);
    case 'nesterov': return new NesterovSGD(config);
    case 'adagrad': return new AdaGrad(config);
    case 'rmsprop': return new RMSProp(config);
    case 'adadelta': return new Adadelta(config);
    case 'adam': return new Adam(config);
    default: return new SGD(config);
  }
}