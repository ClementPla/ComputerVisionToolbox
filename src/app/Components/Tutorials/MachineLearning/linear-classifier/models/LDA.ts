import { AbstractModel, PreprocessConfig } from './model';
import { Classes, Datapoint } from '../linear-classifier.component';

export class LDAClassifier extends AbstractModel {
  private weights: Map<Classes, { beta: number[], bias: number }> = new Map();
  private classList = [Classes.c1, Classes.c2, Classes.c3];

  constructor() {
    super();
  }

  train(points: Datapoint[], config: PreprocessConfig): void {
    const n = points.length;
    if (n < 3) return;

    // 1. Handle RBF Center Initialization
    if (config.mode === 'RBF-Random') {
      this.centers = points.sort(() => Math.random() - 0.5)
                           .slice(0, config.dimensions || 10)
                           .map(p => ({ x: p.x, y: p.y }));
      this.sigma = config.sigma || 50;
    } else if (config.mode === 'RBF-KMeans') {
      this.centers = this.runKMeans(points, config.dimensions || 10);
      this.sigma = config.sigma || 50;
    }

    // 2. Transform all points into feature vectors
    const transformedData = points.map(p => ({
      features: this.featureMap(p.x, p.y, config),
      class: p.class
    }));

    const featureCount = transformedData[0].features.length;

    // 3. Calculate Means per class in feature space
    const means = new Map<Classes, number[]>();
    const priors = new Map<Classes, number>();

    this.classList.forEach(c => {
      const group = transformedData.filter(d => d.class === c);
      priors.set(c, group.length / n);

      if (group.length > 0) {
        const mu = new Array(featureCount).fill(0);
        group.forEach(d => d.features.forEach((val, i) => mu[i] += val / group.length));
        means.set(c, mu);
      } else {
        means.set(c, new Array(featureCount).fill(0));
      }
    });

    // 4. Calculate Shared Covariance Matrix (Within-class)
    // Sigma = sum((x - mu)(x - mu).T) / (n - K)
    let sharedCov = Array.from({ length: featureCount }, () => new Array(featureCount).fill(0));
    
    transformedData.forEach(d => {
      const mu = means.get(d.class)!;
      for (let i = 0; i < featureCount; i++) {
        for (let j = 0; j < featureCount; j++) {
          sharedCov[i][j] += (d.features[i] - mu[i]) * (d.features[j] - mu[j]);
        }
      }
    });

    // Regularization (shrinkage) to ensure the matrix is invertible
    const shrinkage = 1e-6;
    for (let i = 0; i < featureCount; i++) {
      for (let j = 0; j < featureCount; j++) {
        sharedCov[i][j] /= (n - this.classList.length);
        if (i === j) sharedCov[i][j] += shrinkage; 
      }
    }

    // 5. Invert Covariance and calculate Discriminant Functions
    // This uses a simple Matrix Inversion (Note: for dim > 10, consider a library or SVD)
    const invCov = this.invertMatrix(sharedCov);

    // 6. Pre-calculate weights for each class
    // Beta_k = InvCov * mu_k
    // Bias_k = -0.5 * mu_k.T * InvCov * mu_k + ln(Prior_k)
    this.classList.forEach(c => {
      const mu = means.get(c)!;
      const prior = priors.get(c)!;
      
      if (prior === 0) return;

      const beta = new Array(featureCount).fill(0);
      for (let i = 0; i < featureCount; i++) {
        for (let j = 0; j < featureCount; j++) {
          beta[i] += invCov[i][j] * mu[j];
        }
      }

      let muTInvMu = 0;
      for (let i = 0; i < featureCount; i++) {
        muTInvMu += mu[i] * beta[i];
      }

      this.weights.set(c, {
        beta,
        bias: -0.5 * muTInvMu + Math.log(prior)
      });
    });
  }

  predict(x: number, y: number, config: PreprocessConfig): number {
    const features = this.featureMap(x, y, config);
    let bestClass = Classes.c1;
    let maxScore = -Infinity;

    this.weights.forEach((w, c) => {
      // Score = x.T * Beta + Bias
      const score = features.reduce((sum, feat, i) => sum + feat * w.beta[i], 0) + w.bias;
      if (score > maxScore) {
        maxScore = score;
        bestClass = c;
      }
    });

    return bestClass;
  }

  private invertMatrix(m: number[][]) {
    // Gauss-Jordan elimination for matrix inversion
    const n = m.length;
    const inv = Array.from({ length: n }, (_, i) => 
      Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
    );
    const copy = m.map(row => [...row]);

    for (let i = 0; i < n; i++) {
      let pivot = copy[i][i];
      if (Math.abs(pivot) < 1e-10) continue; 
      
      for (let j = 0; j < n; j++) {
        copy[i][j] /= pivot;
        inv[i][j] /= pivot;
      }
      for (let k = 0; k < n; k++) {
        if (k !== i) {
          let factor = copy[k][i];
          for (let j = 0; j < n; j++) {
            copy[k][j] -= factor * copy[i][j];
            inv[k][j] -= factor * inv[i][j];
          }
        }
      }
    }
    return inv;
  }
}