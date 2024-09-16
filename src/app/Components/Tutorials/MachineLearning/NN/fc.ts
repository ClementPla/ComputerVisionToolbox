import { Layer } from "./layer";
import { Tensor } from "./tensor";

export class FullyConnected extends Layer {

    weights: Tensor;
    bias: Tensor;
    hasBias: boolean;

    constructor(inputDim: number, outputDim: number, bias: boolean = true) {
        super();
        this.weights = new Tensor([inputDim, outputDim]);
        let xavier = 3*Math.sqrt(2 / (inputDim + outputDim));

        this.weights.data = this.weights.data.map(() => xavier * (2 * Math.random() - 1));
        this.hasBias = bias;
        if (this.hasBias) {
            this.bias = new Tensor([outputDim]);
        }
        this.name = "FullyConnected";
    }

    override forward(input: Tensor): Tensor {
        this.ctx = [];
        let output = input.matmul(this.weights, this.hasBias ? this.bias : undefined);
        this.ctx.push(input);
        return output;
    }

    override backward(previous: Tensor): Tensor {
        let input = this.ctx[0];  // Retrieve input from the forward pass
        let B = previous.shape[0];  // Batch size
        let N = previous.shape[1];  // Output dimension
        
        // Gradient with respect to the input        
        let gradient = previous.new_like();
        gradient.data = previous.grad;

        if(input.require_grad){
            let new_grad = gradient.matmul(this.weights.T(), undefined)
            input.grad = new_grad.data
        }
        // Gradient with respect to the weights
        this.weights.grad = gradient.T().matmul(input, undefined).T().data;

        if (this.hasBias) {
            // Gradient with respect to the bias (sum over the batch dimension)
            for (let i = 0; i < B; i++) {
                for (let j = 0; j < N; j++) {
                    this.bias.grad[j] += previous.grad[i * N + j];
                }
            }
        }
        // Return the input tensor (with gradients stored in input.grad)
        return input;
    }

    override parameters(): Tensor[] {
        if (this.hasBias) {
            return [this.weights, this.bias];
        }
        return [this.weights];
    }

    override description(): string[] {

        return [`Input shape: ${this.weights.shape[0]}`, `Output shape: ${this.weights.shape[1]}`];

    }

    override getName(): string {
        return `Fully connected (${this.weights.shape[0]} → ${this.weights.shape[1]})`;
    }
}