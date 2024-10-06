import { Network } from "../NN/network";
import { Layer } from "../NN/layer";
import { Tensor } from "../NN/tensor";


class ToyLayer extends Layer {
    pos: Tensor = new Tensor([2]);
    out: Tensor = new Tensor([1]);

    constructor() {
        super();
        this.name = "ToyLayer";
        this.pos.data = [0., 0]
    }

    forward() {

        let x = this.pos.data[0];
        let y = this.pos.data[1];
        let z = this.equation(x, y);
        this.out.data[0] = z;
        return this.out;
    }
    backward() {
        let x = this.pos.data[0];
        let y = this.pos.data[1];
        let dx = this.derivative_x(x, y)
        let dy = this.derivative_y(x, y)
        
        this.pos.grad[0] = dx;
        this.pos.grad[1] = dy;
        return this.pos;
    }
    override parameters(): Tensor[] {
        return [this.pos];
        
    }

    equation(x: number, y: number) {
        return Math.sin(x * 3) * Math.cos(y * 3);
    }
    derivative_x(x: number, y: number) {
        return 3 * Math.cos(x * 3) * Math.cos(y * 3);
    }
    derivative_y(x: number, y: number) {
        return -3 * Math.sin(x * 3) * Math.sin(y * 3);
    }
}

export class ToyModel extends Network {
    layer1: ToyLayer = new ToyLayer();
    constructor() {
        super();
        this.layers.push(this.layer1);
    }
    override forward() {
        return this.layer1.forward();
    }
    override backward() {
        return this.layer1.backward();
    }

    currentXY():number[] {
        return this.layer1.pos.data;
    }
    currentZ():number {
        return this.forward().data[0];
        
    }

    currentXYZ(offset:number=0):number[] {
        let xy = this.currentXY();
        let z = this.currentZ();
        z += offset;

        return [xy[0], xy[1], z];
    }
    noisify_gradient(magnitude:number=0.1) {
        this.layer1.pos.grad[0] += Math.random() * magnitude - magnitude / 2;
        this.layer1.pos.grad[1] += Math.random() * magnitude - magnitude / 2;
    }
    equation(x: number, y: number) {
        return this.layer1.equation(x, y);
    }
    override parameters(): Tensor[] {
        return this.layer1.parameters();
    }

    bound_check(min=-1, max=1) {
        let x = this.layer1.pos.data[0];
        let y = this.layer1.pos.data[1];


        this.layer1.pos.data[0] = Math.min(max, Math.max(min, x));
        this.layer1.pos.data[1] = Math.min(max, Math.max(min, y));
        

    }
}
