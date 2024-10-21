import { Tensor } from "./tensor";

export function argmax(input: Tensor): Tensor{

    let B = input.shape[0]
    let C = input.shape[1]
    let output = new Tensor([B, 1])
    for(let i = 0; i < B; i++){
        let max = -Infinity
        let max_index = 0
        for(let j = 0; j < C; j++){
            if(input.data[i * C + j] > max){
                max = input.data[i * C + j]
                max_index = j
            }
        }
        output.data[i] = max_index
    }
    return output
}

export function matmul(inputA: Tensor, inputB: Tensor, bias: Tensor | undefined): Tensor{
    let A = inputA.shape[0]
    let B = inputA.shape[1]
    if(B !== inputB.shape[0]){
        throw new Error('Matrix dimensions do not match, got ' + B + ' and ' + inputB.shape[0])


    }
    let C = inputB.shape[1]
    let output = new Tensor([A, C])
    for(let i = 0; i < A; i++){ // ROW
        for(let j = 0; j < C; j++){ // COL
            for(let k = 0; k < B; k++){
                output.data[i * C + j]  += inputA.data[i * B + k] * inputB.data[k * C + j]
            }
            if(bias !== undefined){
                output.data[i * C + j] += bias.data[j]
            }
        }
    }
    return output
}

export function clip_grad(input: Tensor, min: number, max: number): Tensor{
    for(let i = 0; i < input.length(); i++){
        input.grad[i] = Math.min(max, Math.max(min, input.grad[i]))
    }
    return input
}

export function conv2D(input: Tensor, weights: Tensor, bias: Tensor | undefined, stride: number = 1, padding: number = 0): Tensor{
    let [C, H, W] = input.shape
    let [F, _, HH, WW] = weights.shape
    let H_out = Math.floor((H + 2 * padding - HH) / stride + 1)
    let W_out = Math.floor((W + 2 * padding - WW) / stride + 1)
    let output = new Tensor([C, H_out, W_out])
    for(let c = 0; c < C; c++){
        for(let h = 0; h < H_out; h++){
            for(let w = 0; w < W_out; w++){
                let sum = 0
                for(let f = 0; f < F; f++){
                    for(let hh = 0; hh < HH; hh++){
                        for(let ww = 0; ww < WW; ww++){
                            let i = h * stride + hh
                            let j = w * stride + ww
                            if(i >= 0 && i < H && j >= 0 && j < W){
                                sum += input.data[c * H * W + i * W + j] * weights.data[f * HH * WW + hh * WW + ww]
                            }
                        }
                    }
                }
                if(bias !== undefined){
                    sum += bias.data[c]
                }
                output.data[c * H_out * W_out + h * W_out + w] = sum
            }
        }
    }
    return output
}