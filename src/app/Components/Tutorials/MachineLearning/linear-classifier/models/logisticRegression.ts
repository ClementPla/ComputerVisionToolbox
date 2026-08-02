import { AbstractModel, PreprocessConfig } from './model';
import { Classes, Datapoint } from '../linear-classifier.component';

export type LRMode = 'OVO' | 'OVA' | 'Softmax';

export class LogisticRegression extends AbstractModel {
  private weights: number[][] = []; // Stores weight vectors
  private classList = [Classes.c1, Classes.c2, Classes.c3];

  constructor(
    private mode: LRMode = 'Softmax',
    private n_iterations: number = 100,
    private weight_decay: number = 0.01,
    private learningRate: number = 0.1
  ) {
    super();
  }

  train(points: Datapoint[], config: PreprocessConfig): void {
    if (points.length === 0) return;

    // 1. Initialize Preprocessing (RBF Centers)
    if (config.mode.includes('RBF')) {
      this.centers = config.mode === 'RBF-KMeans'
        ? this.runKMeans(points, config.dimensions || 10)
        : points.sort(() => Math.random() - 0.5).slice(0, config.dimensions || 10).map(p => ({ x: p.x, y: p.y }));
      this.sigma = config.sigma || 50;
    }

    // 2. Transform points into the chosen feature space
    const transformedData = points.map(p => ({
      x: this.featureMap(p.x, p.y, config),
      y: p.class
    }));

    const numFeatures = transformedData[0].x.length;

    if (this.mode === 'Softmax') {
      this.trainSoftmax(transformedData, numFeatures);
    } else {
      this.trainOVA(transformedData, numFeatures);
    }
  }

  private trainSoftmax(data: { x: number[], y: Classes }[], numFeatures: number) {
    const K = this.classList.length;
    this.weights = Array.from({ length: K }, () => new Array(numFeatures).fill(0));

    for (let iter = 0; iter < this.n_iterations; iter++) {
      data.forEach(p => {
        // Calculate Logits & Softmax Probabilities
        const logits = this.weights.map(w => w.reduce((sum, val, i) => sum + val * p.x[i], 0));
        const maxLogit = Math.max(...logits);
        const exps = logits.map(l => Math.exp(l - maxLogit));
        const sumExps = exps.reduce((a, b) => a + b);
        const probs = exps.map(e => e / sumExps);

        // Update weights for each class
        for (let k = 0; k < K; k++) {
          const target = p.y === this.classList[k] ? 1 : 0;
          const error = probs[k] - target;
          
          for (let j = 0; j < numFeatures; j++) {
            const gradient = error * p.x[j] + this.weight_decay * this.weights[k][j];
            this.weights[k][j] -= this.learningRate * gradient;
          }
        }
      });
    }
  }

  private trainOVA(data: { x: number[], y: Classes }[], numFeatures: number) {
    this.weights = this.classList.map(targetClass => {
      let w = new Array(numFeatures).fill(0);
      for (let i = 0; i < this.n_iterations; i++) {
        data.forEach(p => {
          const target = p.y === targetClass ? 1 : 0;
          const z = w.reduce((sum, val, idx) => sum + val * p.x[idx], 0);
          const prediction = 1 / (1 + Math.exp(-z));
          const error = prediction - target;
          
          for (let j = 0; j < numFeatures; j++) {
            const gradient = error * p.x[j] + this.weight_decay * w[j];
            w[j] -= this.learningRate * gradient;
          }
        });
      }
      return w;
    });
  }

  public predict(x: number, y: number, config: PreprocessConfig): number {
    const features = this.featureMap(x, y, config);
    
    // Scores are just the dot product of features and weights
    const scores = this.weights.map(w => 
      w.reduce((sum, val, i) => sum + val * features[i], 0)
    );

    const maxIdx = scores.indexOf(Math.max(...scores));
    return this.classList[maxIdx];
  }
}