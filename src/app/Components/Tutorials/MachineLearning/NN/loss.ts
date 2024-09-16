import { Softmax } from "./activation";
import { Layer } from "./layer";
import { Tensor } from "./tensor";

export class MSELoss extends Layer {

    forward(inputs: Tensor[]): Tensor {
        let input = inputs[0];
        let target = inputs[1];
        this.ctx = inputs;
        let loss = new Tensor([1]);
        loss.data = [0];
        for (let i = 0; i < input.length(); i++) {
            loss.data[0] += (input.at(i) - target.at(i)) ** 2;
        }
        loss.data[0] /= input.length();
        return loss
    }

    backward(): Tensor {
        let input = this.ctx[0];
        let target = this.ctx[1];
        let gradient = new Tensor(input.shape);

        for (let i = 0; i < input.length(); i++) {
            gradient.data[i] = 2 * (input.at(i) - target.at(i));
        }
        return input;
    }
}

export class CrossEntropyLoss extends Layer {
    is_logits: boolean;

    constructor(is_logits: boolean = true) {
        super();
        this.is_logits = is_logits;

    }

    forward(inputs: Tensor[]): Tensor {
        let input = inputs[0];
        let target = inputs[1];
        let B = input.shape[0];
        let C = input.shape[1];
        this.ctx = inputs;
        let loss = new Tensor([1]);
        if(this.is_logits){

            input = (new Softmax()).forward(input);
        }
        loss.data = [0];
        for (let i = 0; i < B; i++) {
            for (let j = 0; j < C; j++) {
                loss.data[0] += Number(target.at(i)==j) * Math.log(input.at(i * C + j) + 1e-10);
            }

        }
        loss.data[0] *= -1;
        loss.data[0] /= B;

        return loss
    }

    backward(): Tensor {
        let input = this.ctx[0];   // Logits (before softmax)
        let target = this.ctx[1];  // Class indices

        let B = input.shape[0];    // Batch size
        let C = input.shape[1];    // Number of classes
    
        // Gradient w.r.t. logits
        for (let i = 0; i < B; i++) {
            let correct_class_index = target.at(i);  // Class index for the correct label
            for (let j = 0; j < C; j++) {
                if (j === correct_class_index) {
                    // Gradient for the correct class
                    input.grad[i * C + j] = (input.at(i * C + j) - 1) / B;
                } else {
                    // Gradient for the incorrect classes
                    input.grad[i * C + j] = input.at(i * C + j) / B;
                }
            }
        }
    
        return input;
    }
}