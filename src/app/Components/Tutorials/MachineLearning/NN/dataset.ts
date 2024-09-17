import { Tensor } from "./tensor";

export class Datapoint{
    constructor(public x: number, public y: number, public label: number){}
}

export class Dataset{
    data: Datapoint[] = [];
    class1Color = "#313695";
    class2Color = "#a50026";
    constructor(){}
    get(index: number){     
        return this.data[index]
    }
    length(){
        return this.data.length
    }
    shuffle(){
        this.data = this.data.sort(() => Math.random() - 0.5)
    }
    getBatch(index:number, batchSize: number): Tensor[]{
        let batch = []        
        for (let i = 0; i < batchSize; i++) {
            if (index * batchSize + i >= this.data.length){
                index = 0
            }
            batch.push(this.data[index * batchSize + i])
        }
        let input = new Tensor([batchSize, 2], false)
        input.data = batch.map(d => [d.x, d.y]).flat()

        let target = new Tensor([batchSize, 1], false)
        target.data = batch.map(d => d.label)

        return	[input, target]
    }

    getCSSForPoint(i: number ){
        let x = (this.data[i].x + 1) / 2 * 100
        let y = (this.data[i].y + 1) / 2 * 100
        let output = {'left': x + '%', 'top': y + '%', 'background-color': this.data[i].label ? this.class1Color : this.class2Color};
        return output

    }
    createLinearlySeparable(n: number){
        let data = []
        for (let i = 0; i < n; i++) {
            let x = Math.random() * 2 - 1
            let y = Math.random() * 2 - 1
            let label = x > y ? 1 : 0
            data.push(new Datapoint(x, y, label))
        }
        this.data = data
    }
    createSpiralPoints(n: number, alpha: number = 1){
        let data = []
        for (let i = 0; i < n/2; i++) {
            let r = i / (n/2) //* alpha
            let t1 = alpha * i / n * 4 * Math.PI
            let t2 = alpha * i / n * 4 * Math.PI + Math.PI
            let x = r * Math.sin(t1) + Math.random() * 0.25
            let y = r * Math.cos(t1) + Math.random() * 0.25
            x = Math.max(Math.min(1, x),-1)
            y = Math.max(Math.min(1, y),-1)

            let label = 1
            data.push(new Datapoint(x, y, label))

            x = r * Math.sin(t2) + Math.random() * 0.25
            y = r * Math.cos(t2) + Math.random() * 0.25
            x = Math.max(Math.min(1, x),-1)
            y = Math.max(Math.min(1, y),-1)
            label = 0
            data.push(new Datapoint(x, y, label))
        }
        this.data = data
    }

    createCircularPoints(n: number){
        let data = []
        for (let i = 0; i < n; i++) {
            
            let x = Math.random() * 2 - 1
            let y = Math.random() * 2 - 1
            let label = Math.sqrt(x*x + y*y) < 0.5 ? 1 : 0
            data.push(new Datapoint(x, y, label))
        }
        this.data = data
    }
}