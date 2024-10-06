import { Activation, Identity, RELU, Sigmoid, TanH } from "./activation";
import { FullyConnected } from "./fc";
import { Layer } from "./layer";
import { argmax } from "./math";
import { Tensor } from "./tensor";

export class Network {
    layers: Layer[];
    is_regression: boolean;

    constructor(is_regression: boolean = false) {
        this.is_regression = is_regression
        this.layers = [];
    }

    addLayer(layer: Layer) {
        this.layers.push(layer);
    }

    addLayerAtPosition(layer: Layer, position: number) {
        this.layers.splice(position, 0, layer);

    }
    removeLayerAtPosition(position: number) {
        this.layers.splice(position, 1);
    }

    forward(input: Tensor | Tensor[] | null): Tensor {
        let activations = input;
        for (let i = 0; i < this.layers.length; i++) {
            activations = this.layers[i].forward(activations);
        }
        if (activations instanceof Array) {
            activations = activations[0];
        }

        if (activations === null) {
            throw new Error("Activations cannot be null");
        }
        return activations;
    }
    inference(input: Tensor | Tensor[]): Tensor {
        let output = this.forward(input);
        
        if (this.is_regression) {
            return output;
        }
        else {
            // return argmax(output);
            let B = output.shape[0]
            let C = output.shape[1]
            let proba = new Tensor([B])
            for (let i = 0; i < B; i++) {
                proba.data[i] = output.data[i * C + 1]
            }

            return proba;
        }
    }

    backward(output: Tensor | null) {
        for (let i = this.layers.length - 1; i >= 0; i--) {
            output = this.layers[i].backward(output);
        }
    }
    parameters(): Tensor[] {
        let params = new Array<Tensor>();
        for (let i = 0; i < this.layers.length; i++) {
            let param = this.layers[i].parameters();
            if (param) {
                params = params.concat(param);
            }
        }
        return params;
    }
    zero_grad() {
        for (let i = 0; i < this.layers.length; i++) {
            let param = this.layers[i].parameters();
            if (param) {
                for (let j = 0; j < param.length; j++) {
                    param[j].grad.fill(0);
                }
            }
        }
    }
    changeActivation(activation: string) {
        for (let i = 0; i < this.layers.length; i++) {
            if (this.layers[i] instanceof Activation) {
                let act: Layer
                if (activation === "sigmoid") {
                    act = new Sigmoid();
                }
                else if (activation === "tanh") {
                    act = new TanH();
                }
                else if (activation === "identity"){
                    act = new Identity();
                }
                else {
                    act = new RELU();
                }
                this.layers[i] = act;
            }
        }

    }

    n_fc_layers(): number {
        let n = 0;
        for (let i = 0; i < this.layers.length; i++) {
            if (this.layers[i] instanceof FullyConnected) {
                n++;
            }
        }
        return n;
    }
    n_hidden_fc_layers(): number {
        return this.n_fc_layers() - 2;
    }

    swap_fc_layers(position: number, new_layer: FullyConnected) {
        let n = 0;
        for (let i = 0; i < this.layers.length; i++) {
            let current_layer = this.layers[i];
            if (current_layer instanceof FullyConnected) {
                if (n === position) {
                    let min_dim = Math.min(current_layer.weights.shape[0], new_layer.weights.shape[0]);
                    let min_dim2 = Math.min(current_layer.weights.shape[1], new_layer.weights.shape[1]);
                    for (let j = 0; j < min_dim; j++) {
                        for (let k = 0; k < min_dim2; k++) {
                            new_layer.weights.data[j * new_layer.weights.shape[1] + k] = current_layer.weights.data[j * current_layer.weights.shape[1] + k];
                            new_layer.bias.data[j] = current_layer.bias.data[j];
                        }
                    }
                    this.layers[i] = new_layer;

                    return;
                }
                n++;
            }
        }
    }

    getParamsNorms(position: number): number[] | undefined {

        let params = this.layers[position].parameters()
        if(!params){
            return
        }
        let norms = new Array(params.length)
        for (let i = 0; i < params.length; i++) {
            norms[i] = params[i].norm()
        }
        return norms

    }

    trainableLayers(): Layer[] {
        let output = []
        for (let i = 0; i < this.layers.length; i++) {
            if (this.layers[i].parameters()) {
                output.push(this.layers[i])
            }
        }
        return output
    }
}