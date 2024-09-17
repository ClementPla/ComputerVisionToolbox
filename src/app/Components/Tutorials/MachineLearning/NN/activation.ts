import { Layer } from "./layer";
import { Tensor } from "./tensor";


export class Activation extends Layer {

    override name: string = "Activation";

    override forward(input: Tensor): Tensor {
        throw new Error("Method not implemented.");
    }

    override backward(gradient: Tensor): Tensor {
        throw new Error("Method not implemented.");
    }

}
export class RELU extends Activation {
    override name: string = "RELU";

    override forward(input: Tensor): Tensor {
        let output = input.new_like();
        this.ctx = [];
        this.ctx.push(input);
        for (let i = 0; i < output.data.length; i++) {
            output.data[i] = Math.max(0, input.data[i]);
        }
        return output;
    }

    override backward(gradient: Tensor): Tensor {
        let input = this.ctx[0];
        for (let i = 0; i < input.data.length; i++) {
            input.grad[i] = input.data[i] > 0 ? gradient.grad[i] : 0;
        }
        return input;
    }

}

export class Sigmoid extends Activation {
    override name: string = "Sigmoid";

    override forward(input: Tensor): Tensor {
        let output = input.new_like();
        this.ctx = [];
        this.ctx.push(input);
        this.ctx.push(output);
        for (let i = 0; i < output.data.length; i++) {
            output.data[i] = 1 / (1 + Math.exp(-input.data[i]));
        }
        return output;
    }

    override backward(gradient: Tensor): Tensor {
        let input = this.ctx[0];
        let output = this.ctx[1];
        for (let i = 0; i < output.data.length; i++) {
            input.grad[i] = gradient.grad[i] * output.data[i] * (1 - output.data[i]);
        }
        return input;
    }

}

export class TanH extends Activation {
    override name: string = "TanH";

    override forward(input: Tensor): Tensor {
        let output = input.new_like();
        this.ctx = [];

        for (let i = 0; i < output.data.length; i++) {
            output.data[i] = Math.tanh(input.data[i]);
        }
        this.ctx.push(input);
        this.ctx.push(output);

        return output;
    }

    override backward(gradient: Tensor): Tensor {
        let input = this.ctx[0];
        let output = this.ctx[1];
        for (let i = 0; i < input.data.length; i++) {
            input.grad[i] = gradient.grad[i] * (1 - output.data[i] * output.data[i]);
        }
        return input;
    }

}

export class Identity extends Activation {
    override name: string = "Identity";
    override forward(input: Tensor): Tensor {
        return input;
    }
    override backward(gradient: Tensor): Tensor {
        return gradient;
    }
}

export class Softmax extends Activation {

    override name: string = "Softmax";

    override forward(input: Tensor): Tensor {
        let output = input.new_like();
        let B = input.shape[0];
        let C = input.shape[1];

        this.ctx = [];
        this.ctx.push(input);
        let sums = new Tensor([B]);
        for (let i = 0; i < B; i++) {
            let sum = 0;
            for (let j = 0; j < C; j++) {
                output.data[i * C + j] = Math.exp(input.data[i * C + j]);
                sum += output.data[i * C + j];
            }
            for (let j = 0; j < C; j++) {
                output.data[i * C + j] /= sum;
            }
            sums.data[i] = sum;
        }
        this.ctx.push(sums);
        return output;
    }
    override backward(gradient: Tensor): Tensor {
        let input = this.ctx[0];
        let sums = this.ctx[1];
        let B = input.shape[0];
        let C = input.shape[1];
        let grad = new Tensor(input.shape);
        for (let i = 0; i < B; i++) {
            for (let j = 0; j < C; j++) {
                grad.data[i * C + j] = gradient.data[i * C + j] * (sums.data[i] - Math.exp(input.data[i * C + j])) / (sums.data[i] * sums.data[i]);
            }
        }
        input.grad = grad.data;
        // We assume the gradient is already calculated in the loss function
        return input;
    }
}