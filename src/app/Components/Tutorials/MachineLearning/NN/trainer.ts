import { Datapoint, Dataset } from "./dataset";
import { CrossEntropyLoss, MSELoss } from "./loss";
import { Network } from "./network";
import { Adam, Optimizer, RMSProp, SGD } from "./optim";
import { Tensor } from "./tensor";

export class Trainer {
    model: Network;
    dataset: Dataset;
    loss: MSELoss;
    optimizer: Optimizer;
    currentEpoch: number = 0;
    losses: number[] = [];
    trainTimeout: any;

    constructor(model: Network, loss: CrossEntropyLoss | MSELoss, optimizer: Optimizer) {
        this.model = model;
        this.loss = loss;
        this.optimizer = optimizer;
    }
    setDataset(dataset: Dataset) {
        this.dataset = dataset
    }
    train(batch_size: number) {
        if (!this.dataset) {
            return
        }
        let i = 0;
        let loss = 0

        this.trainTimeout = setInterval(() => {
            if (i < this.dataset.length() / batch_size) {
                let batch = this.dataset.getBatch(i, batch_size)
                loss += this.train_step(batch).data[0]
                i++
            }
            else {
                this.currentEpoch++
                this.losses.push(loss / i)
                loss = 0
                i = 0
            }
        }, 0)

    }

    train_step(batch: Tensor[]) {
        this.optimizer.zero_grad()
        let input = batch[0]
        let target = batch[1]


        let output = this.model.forward(input)
        let loss = this.loss.forward([output, target])
        let gradient = this.loss.backward()

        this.model.backward(gradient)

        this.optimizer.step()
        return loss

    }
    stopTraining() {
        if (this.trainTimeout) {
            clearInterval(this.trainTimeout)
        }
    }

    changeOptimizer(optimizer: string, lr: number, weight_decay: number) {
        if (optimizer === 'adam') {
            this.optimizer = new Adam(this.model, lr, weight_decay)
            
        }
        else if (optimizer === 'sgd') {
            this.optimizer = new SGD(this.model, lr, weight_decay)
        }
        else {
            this.optimizer = new RMSProp(this.model, lr, weight_decay)
        }
        this.optimizer.reset_momentums()
    }

    correctlyPredicted(): number {
        let correct = 0

        let batch = this.dataset.getBatch(0, this.dataset.length())
        let input = batch[0]
        let target = batch[1]
        let output = this.model.forward(input).argmax()


        let B = input.shape[0]
        for(let i=0; i<B; i++){
            if(output.at(i) == target.at(i)){
                correct++
            }
        }
        return correct
    }
    


}