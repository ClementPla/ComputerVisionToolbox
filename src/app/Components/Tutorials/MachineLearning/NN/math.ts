import { Tensor, Slice } from './tensor';

export function argmax(input: Tensor): Tensor {
  let B = input.shape[0];
  let C = input.shape[1];
  let output = new Tensor([B, 1]);
  for (let i = 0; i < B; i++) {
    let max = -Infinity;
    let max_index = 0;
    for (let j = 0; j < C; j++) {
      if (input.data[i * C + j] > max) {
        max = input.data[i * C + j];
        max_index = j;
      }
    }
    output.data[i] = max_index;
  }
  return output;
}

export function matmul(
  inputA: Tensor,
  inputB: Tensor,
  bias: Tensor | undefined
): Tensor {
  let A = inputA.shape[0];
  let B = inputA.shape[1];
  if (B !== inputB.shape[0]) {
    throw new Error(
      'Matrix dimensions do not match, got ' + B + ' and ' + inputB.shape[0]
    );
  }
  let C = inputB.shape[1];
  let output = new Tensor([A, C]);
  for (let i = 0; i < A; i++) {
    // ROW
    for (let j = 0; j < C; j++) {
      // COL
      let sum = 0;
      for (let k = 0; k < B; k++) {
        sum += inputA.data[i * B + k] * inputB.data[k * C + j];
      }
      if (bias !== undefined) {
        sum += bias.data[j];
      }
      output.data[i * C + j] = sum;
    }
  }
  return output;
}

export function strassen_matmul(inputA: Tensor, inputB: Tensor): Tensor {
  let A = inputA.shape[0];
  let B = inputA.shape[1];
  if (B !== inputB.shape[0]) {
    throw new Error(
      'Matrix dimensions do not match, got ' + B + ' and ' + inputB.shape[0]
    );
  }
  let C = inputB.shape[1];
  let output = new Tensor([A, C]);

  // Base case for recursion
  if (A <= 2 || B <= 2 || C <= 2) {
    return matmul(inputA, inputB, undefined);
  }

  // Split matrices into quadrants
  let midA = Math.floor(A / 2);
  let midB = Math.floor(B / 2);
  let midC = Math.floor(C / 2);
  let A11 = inputA.slice([new Slice(0, 0, midA), new Slice(1, 0, midB)]);
  let A12 = inputA.slice([new Slice(0, 0, midA), new Slice(1, midB, B)]);
  let A21 = inputA.slice([new Slice(0, midA, A), new Slice(1, 0, midB)]);
  let A22 = inputA.slice([new Slice(0, midA, A), new Slice(1, midB, B)]);
  let B11 = inputB.slice([new Slice(0, 0, midB), new Slice(1, 0, midC)]);
  let B12 = inputB.slice([new Slice(0, 0, midB), new Slice(1, midC, C)]);
  let B21 = inputB.slice([new Slice(0, midB, B), new Slice(1, 0, midC)]);
  let B22 = inputB.slice([new Slice(0, midB, B), new Slice(1, midC, C)]);

  // Compute the 7 products using Strassen's formulas
  let M1 = strassen_matmul(A11.add(A22), B11.add(B22));
  let M2 = strassen_matmul(A21.add(A22), B11);
  let M3 = strassen_matmul(A11, B12.sub(B22));
  let M4 = strassen_matmul(A22, B21.sub(B11));
  let M5 = strassen_matmul(A11.add(A12), B22);
  let M6 = strassen_matmul(A21.sub(A11), B11.add(B12));
  let M7 = strassen_matmul(A12.sub(A22), B21.add(B22));

  // Combine the 7 products into the final output
  let C11 = M1.add(M4).sub(M5).add(M7);
  let C12 = M3.add(M5);
  let C21 = M2.add(M4);
  let C22 = M1.sub(M2).add(M3).add(M6);

  // Place the quadrants into the output matrix
  for (let i = 0; i < midA; i++) {
    for (let j = 0; j < midC; j++) {
      output.data[i * C + j] = C11.data[i * midC + j];
      output.data[i * C + j + midC] = C12.data[i * midC + j];
      output.data[(i + midA) * C + j] = C21.data[i * midC + j];
      output.data[(i + midA) * C + j + midC] = C22.data[i * midC + j];
    }
  }
  return output;
}

export function conv2D(
  input: Tensor,
  weights: Tensor,
  bias: Tensor | undefined,
  stride: number = 1,
  padding: number = 0
): Tensor {
  let [C, H, W] = input.shape;
  let [F, _, HH, WW] = weights.shape;
  let H_out = Math.floor((H + 2 * padding - HH) / stride + 1);
  let W_out = Math.floor((W + 2 * padding - WW) / stride + 1);
  let output = new Tensor([C, H_out, W_out]);
  for (let c = 0; c < C; c++) {
    for (let h = 0; h < H_out; h++) {
      for (let w = 0; w < W_out; w++) {
        let sum = 0;
        for (let f = 0; f < F; f++) {
          for (let hh = 0; hh < HH; hh++) {
            for (let ww = 0; ww < WW; ww++) {
              let i = h * stride + hh;
              let j = w * stride + ww;
              if (i >= 0 && i < H && j >= 0 && j < W) {
                sum +=
                  input.data[c * H * W + i * W + j] *
                  weights.data[f * HH * WW + hh * WW + ww];
              }
            }
          }
        }
        if (bias !== undefined) {
          sum += bias.data[c];
        }
        output.data[c * H_out * W_out + h * W_out + w] = sum;
      }
    }
  }
  return output;
}

export function clip_grad(tensor: Tensor, min: number, max: number) {
  for (let i = 0; i < tensor.grad.length; i++) {
    if (tensor.grad[i] < min) {
      tensor.grad[i] = min;
    } else if (tensor.grad[i] > max) {
      tensor.grad[i] = max;
    }
  }
  return tensor;
}
