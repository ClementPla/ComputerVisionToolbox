import { Softmax } from './activation';
import { Layer } from './layer';
import { Tensor } from './tensor';

export class MSELoss extends Layer {
  override name: string = 'MSELoss';

  forward(inputs: Tensor[]): Tensor {
    let input = inputs[0];
    let target = inputs[1];
    this.ctx = inputs;

    let loss = new Tensor([1]);
    loss.data[0] = 0;

    const n = input.length();
    for (let i = 0; i < n; i++) {
      const diff = input.at(i) - target.at(i);
      loss.data[0] += diff * diff;
    }
    loss.data[0] /= n;

    return loss;
  }

  backward(): Tensor {
    let input = this.ctx[0];
    let target = this.ctx[1];

    const n = input.length();
    const scale = 2 / n;

    for (let i = 0; i < n; i++) {
      input.grad[i] = scale * (input.at(i) - target.at(i));
    }

    return input;
  }
}

export class CrossEntropyLoss extends Layer {
  override name: string = 'CrossEntropyLoss';
  is_logits: boolean;
  private softmax: Softmax;

  constructor(is_logits: boolean = true) {
    super();
    this.is_logits = is_logits;
    this.softmax = new Softmax();
  }

  forward(inputs: Tensor[]): Tensor {
    let logits = inputs[0];
    let target = inputs[1];

    const B = logits.shape[0];
    const C = logits.shape[1];

    // Compute softmax probabilities
    let probs: Tensor;
    if (this.is_logits) {
      probs = this.softmax.forward(logits);
    } else {
      probs = logits;
    }

    // Store for backward: [logits, target, probs]
    this.ctx = [logits, target, probs];

    // Compute cross-entropy loss: -1/B * Σ log(p[correct_class])
    let loss = new Tensor([1]);
    loss.data[0] = 0;

    for (let i = 0; i < B; i++) {
      const correctClass = target.at(i);
      const prob = probs.at(i * C + correctClass);
      loss.data[0] -= Math.log(prob + 1e-10);
    }
    loss.data[0] /= Math.max(B, 1);

    return loss;
  }

  backward(): Tensor {
    let logits = this.ctx[0];
    let target = this.ctx[1];
    let probs = this.ctx[2];

    const B = logits.shape[0];
    const C = logits.shape[1];

    // Gradient of cross-entropy + softmax combined:
    // dL/d(logits) = probs - one_hot(target)
    // Scaled by 1/B for mean reduction
    for (let i = 0; i < B; i++) {
      const correctClass = target.at(i);
      for (let j = 0; j < C; j++) {
        const p = probs.at(i * C + j);
        const isCorrect = j === correctClass ? 1 : 0;
        logits.grad[i * C + j] = (p - isCorrect) / B;
      }
    }

    return logits;
  }
}

/**
 * Binary Cross Entropy Loss
 * For binary classification with sigmoid output
 */
export class BCELoss extends Layer {
  override name: string = 'BCELoss';

  forward(inputs: Tensor[]): Tensor {
    let input = inputs[0];  // Predictions (after sigmoid, values in [0,1])
    let target = inputs[1]; // Binary labels (0 or 1)

    this.ctx = inputs;

    const n = input.length();
    let loss = new Tensor([1]);
    loss.data[0] = 0;

    for (let i = 0; i < n; i++) {
      const p = Math.max(1e-10, Math.min(1 - 1e-10, input.at(i)));
      const t = target.at(i);
      loss.data[0] -= t * Math.log(p) + (1 - t) * Math.log(1 - p);
    }
    loss.data[0] /= n;

    return loss;
  }

  backward(): Tensor {
    let input = this.ctx[0];
    let target = this.ctx[1];

    const n = input.length();

    for (let i = 0; i < n; i++) {
      const p = Math.max(1e-10, Math.min(1 - 1e-10, input.at(i)));
      const t = target.at(i);
      // dL/dp = -t/p + (1-t)/(1-p)
      input.grad[i] = (-t / p + (1 - t) / (1 - p)) / n;
    }

    return input;
  }
}