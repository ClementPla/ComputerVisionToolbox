import { assert } from "console";
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