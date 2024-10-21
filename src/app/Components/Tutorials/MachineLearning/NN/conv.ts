import { Layer } from "./layer";
import { conv2D } from "./math";
import { Tensor } from "./tensor";

 export class Conv2D extends Layer{
    weights: Tensor;
    bias: Tensor;
    hasBias: boolean;
    constructor(inputDim: number, outputDim: number, kernel_size: number, bias: boolean = true) {
        super();

        this.weights = new Tensor([outputDim, inputDim, kernel_size, kernel_size]);
        let xavier = Math.sqrt(2 / (inputDim + outputDim));
        this.weights.data = this.weights.data.map(() => xavier * (2 * Math.random() - 1));
        this.hasBias = bias;
        if (this.hasBias) {
            this.bias = new Tensor([outputDim]);
        }
        this.name = "Conv2D";
    }
    override forward(input: Tensor): Tensor {
        this.ctx = [];

        let output = conv2D(input, this.weights, this.hasBias ? this.bias : undefined);
        this.ctx.push(input);
        return output;
    }
    override backward(previous: Tensor): Tensor {
        let input = this.ctx[0];  // Retrieve input from the forward pass
        let B = previous.shape[0];  // Batch size
        let N = previous.shape[1];  // Output dimension
        let gradient = previous.clone();
        if(input.require_grad){
            let new_grad = gradient.matmul(this.weights.T(), undefined)
            input.grad = new_grad.data
        }
        this.weights.grad = gradient.T().matmul(input, undefined).T().data;
        if (this.hasBias) {
            for (let i = 0; i < B; i++) {
                for (let j = 0; j < N; j++) {
                    this.bias.grad[j] += previous.grad[i * N + j];
                }
            }
        }
        return input;
    }
 }