import { Tensor } from "./tensor";

export abstract class Layer{

    ctx: Array<Tensor>;
    name: string;
    constructor() {
        this.ctx = [];
    }
    abstract forward(input: Tensor | Tensor[]): Tensor;

    abstract backward(gradient: Tensor): Tensor;

    parameters(): Tensor[] | null{
        return null;
    };

    getName(): string{
        return this.name;
    }

    description(): string[]{
        return [];
    };

}
