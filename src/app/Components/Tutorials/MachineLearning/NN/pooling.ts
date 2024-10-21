import { Layer } from "./layer";
import { Tensor } from "./tensor";

type PoolingType = "max" | "average" | "min" | "sum";


export class GlobalPooling extends Layer{

    type: PoolingType;
    constructor(type: PoolingType) {
        super();
        this.type = type;
    }
    override forward(input: Tensor): Tensor {

        let B = input.shape[0]
        let C = input.shape[1]
        let H = input.shape[2]
        let W = input.shape[3]
        let output = new Tensor([B, C])
        this.ctx = [input]
        for(let b = 0; b < B; b++){
            for(let c = 0; c < C; c++){
                let val = 0;
                for(let h = 0; h < H; h++){
                    for(let w = 0; w < W; w++){
                        let index = b * C * H * W + c * H * W + h * W + w
                        if(this.type === "max"){
                            val = Math.max(val, input.data[index])
                        }else if(this.type === "average"){
                            val += input.data[index]
                        }else if(this.type === "sum"){
                            val += input.data[index]
                        }else if(this.type === "min"){
                            val = Math.min(val, input.data[index])
                        }
                    }
                }
                if(this.type === "average"){
                    val /= H * W
                }
                output.data[b * C + c] = val
            }
        }

        return output;
    }
    override backward(previous: Tensor): Tensor {
        let [input] = this.ctx
        let B = input.shape[0]
        let C = input.shape[1]
        let H = input.shape[2]
        let W = input.shape[3]
        let gradient = previous.clone()
        for(let b = 0; b < B; b++){
            for(let c = 0; c < C; c++){
                let grad = previous.grad[b * C + c]
                if(this.type === "average"){
                    grad /= H * W
                }
                for(let h = 0; h < H; h++){
                    for(let w = 0; w < W; w++){
                        let index = b * C * H * W + c * H * W + h * W + w
                        if(this.type === "max"){
                            if(input.data[index] === input.data[index]){
                                input.grad[index] += grad
                            }
                        }else if(this.type === "average" || this.type === "sum"){
                            input.grad[index] += grad
                        }else if(this.type === "min"){
                            if(input.data[index] === input.data[index]){
                                input.grad[index] += grad
                            }
                        }
                    }
                }
            }
        }
        return input
    }
}