import { Tensor } from './tensor';

/**
 * Argmax along the last dimension
 * Input: [B, C]
 * Output: [B] with indices of max values
 */
export function argmax(input: Tensor): Tensor {
  const B = input.shape[0];
  const C = input.shape[1];
  const output = new Tensor([B]);

  for (let i = 0; i < B; i++) {
    let maxVal = -Infinity;
    let maxIdx = 0;

    for (let j = 0; j < C; j++) {
      const val = input.data[i * C + j];
      if (val > maxVal) {
        maxVal = val;
        maxIdx = j;
      }
    }

    output.data[i] = maxIdx;
  }

  return output;
}

/**
 * Matrix multiplication: A @ B + bias
 * A: [M, K]
 * B: [K, N]
 * bias: [N] (optional)
 * Output: [M, N]
 */
export function matmul(
  inputA: Tensor,
  inputB: Tensor,
  bias: Tensor | undefined
): Tensor {
  const M = inputA.shape[0];
  const K = inputA.shape[1];

  if (K !== inputB.shape[0]) {
    throw new Error(
      `Matrix dimensions do not match: [${inputA.shape}] @ [${inputB.shape}]`
    );
  }

  const N = inputB.shape[1];
  const output = new Tensor([M, N]);

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      let sum = 0;
      for (let k = 0; k < K; k++) {
        sum += inputA.data[i * K + k] * inputB.data[k * N + j];
      }
      if (bias !== undefined) {
        sum += bias.data[j];
      }
      output.data[i * N + j] = sum;
    }
  }

  return output;
}

/**
 * 2D Convolution
 * input: [C, H, W]
 * weights: [F, C, HH, WW]
 * Output: [F, H_out, W_out]
 */
export function conv2D(
  input: Tensor,
  weights: Tensor,
  bias: Tensor | undefined,
  stride: number = 1,
  padding: number = 0
): Tensor {
  const [C, H, W] = input.shape;
  const [F, _, HH, WW] = weights.shape;

  const H_out = Math.floor((H + 2 * padding - HH) / stride + 1);
  const W_out = Math.floor((W + 2 * padding - WW) / stride + 1);

  const output = new Tensor([F, H_out, W_out]);

  for (let f = 0; f < F; f++) {
    for (let h = 0; h < H_out; h++) {
      for (let w = 0; w < W_out; w++) {
        let sum = 0;

        for (let c = 0; c < C; c++) {
          for (let hh = 0; hh < HH; hh++) {
            for (let ww = 0; ww < WW; ww++) {
              const hi = h * stride + hh - padding;
              const wi = w * stride + ww - padding;

              if (hi >= 0 && hi < H && wi >= 0 && wi < W) {
                sum +=
                  input.data[c * H * W + hi * W + wi] *
                  weights.data[f * C * HH * WW + c * HH * WW + hh * WW + ww];
              }
            }
          }
        }

        if (bias !== undefined) {
          sum += bias.data[f];
        }

        output.data[f * H_out * W_out + h * W_out + w] = sum;
      }
    }
  }

  return output;
}

/**
 * Clip gradients to prevent explosion
 */
export function clip_grad(tensor: Tensor, min: number, max: number): Tensor {
  for (let i = 0; i < tensor.grad.length; i++) {
    tensor.grad[i] = Math.max(min, Math.min(max, tensor.grad[i]));
  }
  return tensor;
}

/**
 * Clip gradients by global norm
 * If ||grad|| > maxNorm, scale down to maxNorm
 */
export function clip_grad_norm(tensors: Tensor[], maxNorm: number): number {
  // Compute total norm
  let totalNormSq = 0;
  for (const tensor of tensors) {
    for (let i = 0; i < tensor.grad.length; i++) {
      totalNormSq += tensor.grad[i] * tensor.grad[i];
    }
  }
  const totalNorm = Math.sqrt(totalNormSq);

  // Scale if necessary
  if (totalNorm > maxNorm) {
    const scale = maxNorm / totalNorm;
    for (const tensor of tensors) {
      for (let i = 0; i < tensor.grad.length; i++) {
        tensor.grad[i] *= scale;
      }
    }
  }

  return totalNorm;
}

/**
 * One-hot encoding
 * indices: [B] with class indices
 * numClasses: number of classes
 * Output: [B, numClasses]
 */
export function oneHot(indices: Tensor, numClasses: number): Tensor {
  const B = indices.shape[0];
  const output = new Tensor([B, numClasses]);
  output.data.fill(0);

  for (let i = 0; i < B; i++) {
    const idx = indices.data[i];
    if (idx >= 0 && idx < numClasses) {
      output.data[i * numClasses + idx] = 1;
    }
  }

  return output;
}

/**
 * Compute accuracy between predictions and targets
 */
export function accuracy(predictions: Tensor, targets: Tensor): number {
  const preds = argmax(predictions);
  const B = targets.shape[0];
  let correct = 0;

  for (let i = 0; i < B; i++) {
    if (preds.data[i] === targets.data[i]) {
      correct++;
    }
  }

  return correct / B;
}

/**
 * Random shuffle of array (in-place)
 */
export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Generate random integers in range [min, max)
 */
export function randint(min: number, max: number, size: number): number[] {
  const result = new Array(size);
  for (let i = 0; i < size; i++) {
    result[i] = Math.floor(Math.random() * (max - min)) + min;
  }
  return result;
}

/**
 * Generate random floats from normal distribution
 * Using Box-Muller transform
 */
export function randn(size: number, mean: number = 0, std: number = 1): number[] {
  const result = new Array(size);

  for (let i = 0; i < size; i += 2) {
    const u1 = Math.random();
    const u2 = Math.random();

    const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);

    result[i] = z0 * std + mean;
    if (i + 1 < size) {
      result[i + 1] = z1 * std + mean;
    }
  }

  return result;
}