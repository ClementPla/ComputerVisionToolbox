import { Dataset } from './dataset';
import { CrossEntropyLoss, MSELoss } from './loss';
import { Network } from './network';
import { Adam, Optimizer, RMSProp, SGD } from './optim';
import { Tensor } from './tensor';

export interface TrainerConfig {
  batchesPerFrame?: number;  // How many batches to process per animation frame
  maxEpochs?: number;        // Optional max epochs limit
  earlyStopLoss?: number;    // Stop if loss goes below this
  shuffle?: boolean;         // Shuffle dataset each epoch
}

export class Trainer {
  model: Network;
  dataset: Dataset;
  loss: MSELoss | CrossEntropyLoss;
  optimizer: Optimizer;

  // Training state
  currentEpoch: number = 0;
  currentBatch: number = 0;
  epochLoss: number = 0;
  losses: number[] = [];
  accuracies: number[] = [];

  // Control
  private isTraining: boolean = false;
  private animationFrameId: number | null = null;
  private config: TrainerConfig;

  // Callbacks
  onEpochEnd?: (epoch: number, loss: number, accuracy?: number) => void;
  onBatchEnd?: (batch: number, loss: number) => void;
  onTrainingEnd?: () => void;

  constructor(
    model: Network,
    loss: CrossEntropyLoss | MSELoss,
    optimizer: Optimizer,
    config: TrainerConfig = {}
  ) {
    this.model = model;
    this.loss = loss;
    this.optimizer = optimizer;
    this.config = {
      batchesPerFrame: config.batchesPerFrame ?? 5,
      maxEpochs: config.maxEpochs,
      earlyStopLoss: config.earlyStopLoss,
      shuffle: config.shuffle ?? true
    };
  }

  setDataset(dataset: Dataset): void {
    this.dataset = dataset;
  }

  /**
   * Start training loop
   */
  train(batchSize: number): void {
    if (!this.dataset) {
      console.error('No dataset set. Call setDataset() first.');
      return;
    }

    if (this.isTraining) {
      console.warn('Already training. Call stopTraining() first.');
      return;
    }

    this.isTraining = true;
    const numBatches = Math.ceil(this.dataset.length() / batchSize);

    const trainLoop = (): void => {
      if (!this.isTraining) return;

      // Process multiple batches per frame for better performance
      for (let b = 0; b < this.config.batchesPerFrame!; b++) {
        if (!this.isTraining) break;

        if (this.currentBatch < numBatches) {
          // Train one batch
          const batch = this.dataset.getBatch(this.currentBatch, batchSize);
          const batchLoss = this.trainStep(batch);
          this.epochLoss += batchLoss.data[0];

          if (this.onBatchEnd) {
            this.onBatchEnd(this.currentBatch, batchLoss.data[0]);
          }

          this.currentBatch++;
        } else {
          // End of epoch
          const avgLoss = this.epochLoss / numBatches;
          this.losses.push(avgLoss);
          this.currentEpoch++;

          // Compute accuracy if classification
          const accuracy = this.computeAccuracy();
          if (accuracy !== null) {
            this.accuracies.push(accuracy);
          }

          if (this.onEpochEnd) {
            this.onEpochEnd(this.currentEpoch, avgLoss, accuracy ?? undefined);
          }

          // Check stopping conditions
          if (this.config.maxEpochs && this.currentEpoch >= this.config.maxEpochs) {
            this.stopTraining();
            return;
          }

          if (this.config.earlyStopLoss && avgLoss < this.config.earlyStopLoss) {
            this.stopTraining();
            return;
          }

          // Reset for next epoch
          this.epochLoss = 0;
          this.currentBatch = 0;

          // Shuffle dataset
          if (this.config.shuffle) {
            this.dataset.shuffle();
          }
        }
      }

      // Schedule next frame
      this.animationFrameId = requestAnimationFrame(trainLoop);
    };

    // Start training loop
    this.animationFrameId = requestAnimationFrame(trainLoop);
  }

  /**
   * Single training step
   */
  private trainStep(batch: Tensor[]): Tensor {
    this.optimizer.zero_grad();

    const input = batch[0];
    const target = batch[1];

    // Forward pass
    const output = this.model.forward(input);

    // Compute loss
    const lossValue = this.loss.forward([output, target]);

    // Backward pass
    const gradient = this.loss.backward();
    this.model.backward(gradient);

    // Update parameters
    this.optimizer.step();

    return lossValue;
  }

  /**
   * Stop training loop
   */
  stopTraining(): void {
    this.isTraining = false;

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.onTrainingEnd) {
      this.onTrainingEnd();
    }
  }

  /**
   * Check if currently training
   */
  isCurrentlyTraining(): boolean {
    return this.isTraining;
  }

  /**
   * Reset training state
   */
  reset(): void {
    this.stopTraining();
    this.currentEpoch = 0;
    this.currentBatch = 0;
    this.epochLoss = 0;
    this.losses = [];
    this.accuracies = [];
    this.optimizer.reset();
  }

  /**
   * Change optimizer
   */
  changeOptimizer(optimizerType: string, lr: number, weight_decay: number): void {
    const wasTraining = this.isTraining;
    this.stopTraining();

    switch (optimizerType.toLowerCase()) {
      case 'adam':
        this.optimizer = new Adam(this.model, lr, weight_decay);
        break;
      case 'rmsprop':
        this.optimizer = new RMSProp(this.model, lr, weight_decay);
        break;
      case 'sgd':
      default:
        this.optimizer = new SGD(this.model, lr, weight_decay, 0.9, true);
        break;
    }

    // Note: Don't automatically resume - let the caller decide
  }

  /**
   * Compute accuracy on full dataset (for classification)
   */
  computeAccuracy(): number | null {
    if (!this.dataset || this.model.is_regression) {
      return null;
    }

    const batch = this.dataset.getBatch(0, this.dataset.length());
    const input = batch[0];
    const target = batch[1];

    const output = this.model.forward(input);
    const predictions = output.argmax();

    const B = input.shape[0];
    let correct = 0;

    for (let i = 0; i < B; i++) {
      if (predictions.at(i) === target.at(i)) {
        correct++;
      }
    }

    return correct / B;
  }

  /**
   * Compute number of correctly predicted samples
   */
  correctlyPredicted(): number {
    const accuracy = this.computeAccuracy();
    if (accuracy === null) return 0;
    return Math.round(accuracy * this.dataset.length());
  }

  /**
   * Evaluate model on a batch
   */
  evaluate(batch: Tensor[]): { loss: number; accuracy?: number } {
    const input = batch[0];
    const target = batch[1];

    const output = this.model.forward(input);
    const lossValue = this.loss.forward([output, target]);

    const result: { loss: number; accuracy?: number } = {
      loss: lossValue.data[0]
    };

    if (!this.model.is_regression) {
      const predictions = output.argmax();
      const B = input.shape[0];
      let correct = 0;

      for (let i = 0; i < B; i++) {
        if (predictions.at(i) === target.at(i)) {
          correct++;
        }
      }
      result.accuracy = correct / B;
    }

    return result;
  }

  /**
   * Get current training progress
   */
  getProgress(): { epoch: number; batch: number; loss: number; accuracy?: number } {
    return {
      epoch: this.currentEpoch,
      batch: this.currentBatch,
      loss: this.losses.length > 0 ? this.losses[this.losses.length - 1] : 0,
      accuracy: this.accuracies.length > 0 ? this.accuracies[this.accuracies.length - 1] : undefined
    };
  }
}