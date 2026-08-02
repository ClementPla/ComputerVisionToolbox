import { Layer } from './layer';
import { Tensor } from './tensor';

export abstract class Activation extends Layer {
  override name: string = 'Activation';
}

/**
 * ReLU Activation
 * f(x) = max(0, x)
 * f'(x) = 1 if x > 0, else 0
 */
export class RELU extends Activation {
  override name: string = 'RELU';

  override forward(input: Tensor): Tensor {
    const output = input.new_like();
    this.ctx = [input, output];

    for (let i = 0; i < input.length(); i++) {
      output.data[i] = Math.max(0, input.data[i]);
    }

    return output;
  }

  override backward(gradOutput: Tensor): Tensor {
    const input = this.ctx[0];

    for (let i = 0; i < input.length(); i++) {
      // Gradient is passed through where input > 0, else 0
      input.grad[i] = input.data[i] > 0 ? gradOutput.grad[i] : 0;
    }

    return input;
  }
}

/**
 * Leaky ReLU Activation
 * f(x) = x if x > 0, else alpha * x
 */
export class LeakyRELU extends Activation {
  override name: string = 'LeakyRELU';
  alpha: number;

  constructor(alpha: number = 0.01) {
    super();
    this.alpha = alpha;
  }

  override forward(input: Tensor): Tensor {
    const output = input.new_like();
    this.ctx = [input];

    for (let i = 0; i < input.length(); i++) {
      output.data[i] = input.data[i] > 0 ? input.data[i] : this.alpha * input.data[i];
    }

    return output;
  }

  override backward(gradOutput: Tensor): Tensor {
    const input = this.ctx[0];

    for (let i = 0; i < input.length(); i++) {
      input.grad[i] = input.data[i] > 0 ? gradOutput.grad[i] : this.alpha * gradOutput.grad[i];
    }

    return input;
  }
}

/**
 * Sigmoid Activation
 * f(x) = 1 / (1 + exp(-x))
 * f'(x) = f(x) * (1 - f(x))
 */
export class Sigmoid extends Activation {
  override name: string = 'Sigmoid';

  override forward(input: Tensor): Tensor {
    const output = input.new_like();
    this.ctx = [input, output];

    for (let i = 0; i < input.length(); i++) {
      // Numerically stable sigmoid
      const x = input.data[i];
      if (x >= 0) {
        output.data[i] = 1 / (1 + Math.exp(-x));
      } else {
        const expX = Math.exp(x);
        output.data[i] = expX / (1 + expX);
      }
    }

    return output;
  }

  override backward(gradOutput: Tensor): Tensor {
    const input = this.ctx[0];
    const output = this.ctx[1];

    for (let i = 0; i < input.length(); i++) {
      const s = output.data[i];
      input.grad[i] = gradOutput.grad[i] * s * (1 - s);
    }

    return input;
  }
}

/**
 * Tanh Activation
 * f(x) = tanh(x)
 * f'(x) = 1 - tanh(x)^2
 */
export class TanH extends Activation {
  override name: string = 'TanH';

  override forward(input: Tensor): Tensor {
    const output = input.new_like();
    this.ctx = [input, output];

    for (let i = 0; i < input.length(); i++) {
      output.data[i] = Math.tanh(input.data[i]);
    }

    return output;
  }

  override backward(gradOutput: Tensor): Tensor {
    const input = this.ctx[0];
    const output = this.ctx[1];

    for (let i = 0; i < input.length(); i++) {
      const t = output.data[i];
      input.grad[i] = gradOutput.grad[i] * (1 - t * t);
    }

    return input;
  }
}

/**
 * Identity Activation (pass-through)
 */
export class Identity extends Activation {
  override name: string = 'Identity';

  override forward(input: Tensor): Tensor {
    this.ctx = [input];
    return input;
  }

  override backward(gradOutput: Tensor): Tensor {
    const input = this.ctx[0];
    input.grad = gradOutput.grad.slice();
    return input;
  }
}

/**
 * Softmax Activation
 * f(x)_i = exp(x_i) / sum(exp(x_j))
 * 
 * Note: Typically used with CrossEntropyLoss which handles
 * the combined gradient more efficiently.
 */
export class Softmax extends Activation {
  override name: string = 'Softmax';

  override forward(input: Tensor): Tensor {
    const output = input.new_like();
    const B = input.shape[0];
    const C = input.shape[1];

    this.ctx = [input, output];

    for (let i = 0; i < B; i++) {
      // Find max for numerical stability
      let maxVal = -Infinity;
      for (let j = 0; j < C; j++) {
        maxVal = Math.max(maxVal, input.data[i * C + j]);
      }

      // Compute exp and sum
      let sum = 0;
      for (let j = 0; j < C; j++) {
        output.data[i * C + j] = Math.exp(input.data[i * C + j] - maxVal);
        sum += output.data[i * C + j];
      }

      // Normalize
      for (let j = 0; j < C; j++) {
        output.data[i * C + j] /= sum;
      }
    }

    return output;
  }

  override backward(gradOutput: Tensor): Tensor {
    const input = this.ctx[0];
    const output = this.ctx[1];
    const B = input.shape[0];
    const C = input.shape[1];

    // Full Jacobian-based gradient (correct but expensive)
    // dL/dx_i = sum_j(dL/dy_j * dy_j/dx_i)
    // dy_j/dx_i = y_i * (delta_ij - y_j)
    
    for (let b = 0; b < B; b++) {
      for (let i = 0; i < C; i++) {
        let gradSum = 0;
        const yi = output.data[b * C + i];
        
        for (let j = 0; j < C; j++) {
          const yj = output.data[b * C + j];
          const gradJ = gradOutput.grad[b * C + j];
          
          if (i === j) {
            gradSum += gradJ * yi * (1 - yi);
          } else {
            gradSum += gradJ * (-yi * yj);
          }
        }
        
        input.grad[b * C + i] = gradSum;
      }
    }

    return input;
  }
}

/**
 * Log Softmax Activation
 * f(x)_i = log(softmax(x)_i) = x_i - log(sum(exp(x_j)))
 */
export class LogSoftmax extends Activation {
  override name: string = 'LogSoftmax';

  override forward(input: Tensor): Tensor {
    const output = input.new_like();
    const B = input.shape[0];
    const C = input.shape[1];

    const logSumExp = new Tensor([B]);
    this.ctx = [input, logSumExp];

    for (let i = 0; i < B; i++) {
      // Find max for numerical stability
      let maxVal = -Infinity;
      for (let j = 0; j < C; j++) {
        maxVal = Math.max(maxVal, input.data[i * C + j]);
      }

      // Compute log-sum-exp
      let sumExp = 0;
      for (let j = 0; j < C; j++) {
        sumExp += Math.exp(input.data[i * C + j] - maxVal);
      }
      logSumExp.data[i] = maxVal + Math.log(sumExp);

      // Compute log softmax
      for (let j = 0; j < C; j++) {
        output.data[i * C + j] = input.data[i * C + j] - logSumExp.data[i];
      }
    }

    return output;
  }

  override backward(gradOutput: Tensor): Tensor {
    const input = this.ctx[0];
    const logSumExp = this.ctx[1];
    const B = input.shape[0];
    const C = input.shape[1];

    for (let i = 0; i < B; i++) {
      // Compute softmax for this sample
      let sumGrad = 0;
      for (let j = 0; j < C; j++) {
        sumGrad += gradOutput.grad[i * C + j];
      }

      for (let j = 0; j < C; j++) {
        const softmax = Math.exp(input.data[i * C + j] - logSumExp.data[i]);
        input.grad[i * C + j] = gradOutput.grad[i * C + j] - softmax * sumGrad;
      }
    }

    return input;
  }
}

/**
 * GELU Activation (Gaussian Error Linear Unit)
 * Used in Transformers (BERT, GPT)
 * f(x) ≈ 0.5 * x * (1 + tanh(sqrt(2/π) * (x + 0.044715 * x^3)))
 */
export class GELU extends Activation {
  override name: string = 'GELU';
  private static readonly SQRT_2_PI = Math.sqrt(2 / Math.PI);

  override forward(input: Tensor): Tensor {
    const output = input.new_like();
    this.ctx = [input, output];

    for (let i = 0; i < input.length(); i++) {
      const x = input.data[i];
      const inner = GELU.SQRT_2_PI * (x + 0.044715 * x * x * x);
      output.data[i] = 0.5 * x * (1 + Math.tanh(inner));
    }

    return output;
  }

  override backward(gradOutput: Tensor): Tensor {
    const input = this.ctx[0];

    for (let i = 0; i < input.length(); i++) {
      const x = input.data[i];
      const x3 = x * x * x;
      const inner = GELU.SQRT_2_PI * (x + 0.044715 * x3);
      const tanhInner = Math.tanh(inner);
      const sech2 = 1 - tanhInner * tanhInner;
      
      // Derivative using chain rule
      const dInner = GELU.SQRT_2_PI * (1 + 3 * 0.044715 * x * x);
      const dGelu = 0.5 * (1 + tanhInner) + 0.5 * x * sech2 * dInner;
      
      input.grad[i] = gradOutput.grad[i] * dGelu;
    }

    return input;
  }
}