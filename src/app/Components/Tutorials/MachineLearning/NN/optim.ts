import { clip_grad } from "./math";
import { Network } from "./network";

export abstract class Optimizer {

    lr: number;
    weight_decay: number;
    model: Network;
    momentum: number;
    momentums: number[][] | undefined;

    abstract step(): void;
    abstract zero_grad(): void;
    abstract reset_momentums(): void;

}


export class SGD extends Optimizer {

    nesterov: boolean;

    constructor(model: Network, lr: number, weight_decay: number = 0, momentum: number = 0, nesterov: boolean = false) {
        super();
        this.model = model;
        this.lr = lr;
        this.weight_decay = weight_decay;
        this.momentum = momentum;
        this.nesterov = nesterov;
    }
    override reset_momentums() {
        if (this.momentum != 0) {
            this.momentums = []
            let params = this.model.parameters()
            for (let i = 0; i < params.length; i++) {

                this.momentums.push(new Array(params[i].length()).fill(0))
            }
        }
    }

    step() {
        let params = this.model.parameters()
        for (let i = 0; i < params.length; i++) {
            let param = params[i]
            param = clip_grad(param, -10, 10)
            if (this.weight_decay != 0) {
                for (let j = 0; j < param.length(); j++) {
                    param.grad[j] += this.weight_decay * param.data[j]
                }
            }
            if (this.momentums) {
                this.momentums[i] = param.grad

                if (this.nesterov) {
                    for (let j = 0; j < param.length(); j++) {
                        param.grad[j] += this.momentum * this.momentums[i][j]
                    }
                }
                else {
                    param.grad = this.momentums[i]
                }


            }
            for (let j = 0; j < param.length(); j++) {
                param.data[j] -= this.lr * param.grad[j]
            }
        }
    }
    zero_grad() {
        this.model.zero_grad()
    }
}

export class Adam extends Optimizer {
    beta1: number;
    beta2: number;
    epsilon: number;
    velocities: number[][] | undefined;

    constructor(model: Network, lr: number, weight_decay: number = 0, beta1: number = 0.9, beta2: number = 0.999, epsilon: number = 1e-8) {
        super();
        this.model = model;
        this.lr = lr;
        this.weight_decay = weight_decay;
        this.beta1 = beta1;
        this.beta2 = beta2;
        this.epsilon = epsilon;
    }

    override reset_momentums() {
        if (this.momentum != 0) {
            this.momentums = [];
            this.velocities = [];
            let params = this.model.parameters();
            for (let i = 0; i < params.length; i++) {
                this.momentums.push(new Array(params[i].length()).fill(0));
                this.velocities.push(new Array(params[i].length()).fill(0));
            }
        }
    }

    override step() {
        let params = this.model.parameters();
        for (let i = 0; i < params.length; i++) {
            let param = params[i];
            if (this.weight_decay != 0) {
                for (let j = 0; j < param.length(); j++) {
                    param.grad[j] += this.weight_decay * param.data[j];
                }
            }
            if (this.momentums && this.velocities) {
                this.momentums[i] = this.momentums[i].map((momentum, j) => {
                    return this.beta1 * momentum + (1 - this.beta1) * param.grad[j];
                });
                this.velocities[i] = this.velocities[i].map((velocity, j) => {
                    return this.beta2 * velocity + (1 - this.beta2) * param.grad[j] * param.grad[j];
                });

                let momentumsCorrected = this.momentums[i].map(momentum => {
                    return momentum / (1 - Math.pow(this.beta1, 1));
                });
                let velocitiesCorrected = this.velocities[i].map(velocity => {
                    return velocity / (1 - Math.pow(this.beta2, 1));
                });

                for (let j = 0; j < param.length(); j++) {
                    param.data[j] -= this.lr * momentumsCorrected[j] / (Math.sqrt(velocitiesCorrected[j]) + this.epsilon);
                }
            }
        }
    }

    override zero_grad() {
        this.model.zero_grad();
    }
}

export class RMSProp extends Optimizer {
    rho: number;
    epsilon: number;
    squared_gradients: number[][];

    constructor(model: Network, lr: number, weight_decay: number, rho: number = 0.9, epsilon: number = 1e-8) {
        super();
        this.model = model;
        this.lr = lr;
        this.weight_decay = weight_decay;
        this.rho = rho;
        this.epsilon = epsilon;
    }

    override reset_momentums() {
        this.squared_gradients = [];
        let params = this.model.parameters();
        for (let i = 0; i < params.length; i++) {
            this.squared_gradients.push(new Array(params[i].length()).fill(0));
        }
    }

    override step() {
        let params = this.model.parameters();
        for (let i = 0; i < params.length; i++) {
            let param = params[i];
            if (this.weight_decay != 0) {
                for (let j = 0; j < param.length(); j++) {
                    param.grad[j] += this.weight_decay * param.data[j];
                }
            }
            this.squared_gradients[i] = this.squared_gradients[i].map((squared_gradient, j) => {
                squared_gradient = this.rho * squared_gradient + (1 - this.rho) * param.grad[j] * param.grad[j];
                param.data[j] -= this.lr * param.grad[j] / (Math.sqrt(squared_gradient) + this.epsilon);
                return squared_gradient;
            });

        }
    }

    override zero_grad() {
        this.model.zero_grad();
    }
}