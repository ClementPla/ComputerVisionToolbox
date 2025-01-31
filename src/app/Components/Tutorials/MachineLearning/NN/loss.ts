import { not } from "mathjs";
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
    softmax: Softmax | null;
  
    constructor(is_logits: boolean = true) {
      super();
      this.is_logits = is_logits;
      this.softmax = is_logits ? new Softmax : null;
    }
  
    forward(inputs: Tensor[]): Tensor {
      let [input, target] = inputs;
      let [B, C] = input.shape;
      this.ctx = inputs;
  
      let loss = new Tensor([0]);
      if (this.is_logits) {
        input = this.softmax!.forward(input);
        this.ctx[0] = input;
      }
      console.log(input.data);
      for (let i = 0; i < B; i++) {
        for (let j = 0; j < C; j++) {
          loss.data[0] -= target.at([i, j]) * Math.log(input.at([i, j]) + 1e-10);
        }
      }
      console.log(loss.data[0]);
      loss.data[0] /= B;
      return loss;
    }
  
    backward(): Tensor {
      let [input, target] = this.ctx;
      let [B, C] = input.shape;
  
      for (let i = 0; i < B; i++) {
        for (let j = 0; j < C; j++) {
          input.grad[i * C + j] = (input.at([i, j]) - target.at([i, j])) / B;
        }
      }
  
      return input;
    }
  }