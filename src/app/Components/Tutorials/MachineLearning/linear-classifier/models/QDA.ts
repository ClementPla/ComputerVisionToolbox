import { AbstractModel, PreprocessConfig } from './model';
import { Classes, Datapoint } from '../linear-classifier.component';

interface QDAClassStats {
  beta0: number;      // Constant term
  beta1: number[];    // Linear terms
  beta2: number[][];  // Quadratic terms (InvCov)
}

export class QDAClassifier extends AbstractModel {
  private classStats: Map<Classes, QDAClassStats> = new Map();
  private classList = [Classes.c1, Classes.c2, Classes.c3];

  constructor() {
    super();
  }

  train(points: Datapoint[], config: PreprocessConfig): void {
    const n = points.length;
    if (n < 5) return; // QDA needs more points to estimate class-specific covariances

    // 1. Handle RBF Center Initialization
    if (config.mode.includes('RBF')) {
      this.centers = config.mode === 'RBF-KMeans' 
        ? this.runKMeans(points, config.dimensions || 10)
        : points.sort(() => Math.random() - 0.5).slice(0, config.dimensions || 10).map(p => ({x: p.x, y: p.y}));
      this.sigma = config.sigma || 50;
    }

    // 2. Transform points to feature space
    const transformedData = points.map(p => ({
      features: this.featureMap(p.x, p.y, config),
      class: p.class
    }));

    const dim = transformedData[0].features.length;

    this.classList.forEach(c => {
      const group = transformedData.filter(d => d.class === c);
      if (group.length < dim + 1) return; // Need enough points to avoid singularity

      const prior = group.length / n;

      // 3. Calculate Class Mean
      const mu = new Array(dim).fill(0);
      group.forEach(d => d.features.forEach((val, i) => mu[i] += val / group.length));

      // 4. Calculate Class-Specific Covariance
      let cov = Array.from({ length: dim }, () => new Array(dim).fill(0));
      group.forEach(d => {
        for (let i = 0; i < dim; i++) {
          for (let j = 0; j < dim; j++) {
            cov[i][j] += (d.features[i] - mu[i]) * (d.features[j] - mu[j]);
          }
        }
      });

      // Regularization & Normalization
      const shrinkage = 1e-4;
      for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
          cov[i][j] = (cov[i][j] / (group.length - 1)) + (i === j ? shrinkage : 0);
        }
      }

      // 5. Invert and Determinant
      const invCov = this.invertMatrix(cov);
      const det = this.calculateDeterminant(cov);

      // 6. Store Quadratic Discriminant Components
      // Score_k(x) = -0.5*ln|Sigma_k| - 0.5*(x-mu).T * Sigma_inv * (x-mu) + ln(prior)
      this.classStats.set(c, {
        beta0: -0.5 * Math.log(Math.abs(det)) + Math.log(prior),
        beta1: mu, // Store mean to calculate (x - mu) during predict
        beta2: invCov
      });
    });
  }

  predict(x: number, y: number, config: PreprocessConfig): number {
    const features = this.featureMap(x, y, config);
    let bestClass = Classes.c1;
    let maxScore = -Infinity;

    this.classStats.forEach((stats, c) => {
      const diff = features.map((f, i) => f - stats.beta1[i]);
      
      // Compute Quadratic form: diff.T * invCov * diff
      let quadraticForm = 0;
      for (let i = 0; i < diff.length; i++) {
        let rowSum = 0;
        for (let j = 0; j < diff.length; j++) {
          rowSum += stats.beta2[i][j] * diff[j];
        }
        quadraticForm += diff[i] * rowSum;
      }

      const score = stats.beta0 - 0.5 * quadraticForm;

      if (score > maxScore) {
        maxScore = score;
        bestClass = c;
      }
    });

    return bestClass;
  }

  private calculateDeterminant(m: number[][]): number {
    // Basic LU decomposition or simpler for small matrices
    // For 2x2 or 3x3 it's easy, but since we go up to 10D, 
    // a simplified version of the Gaussian elimination used in invertMatrix works.
    let det = 1;
    let copy = m.map(row => [...row]);
    const n = copy.length;

    for (let i = 0; i < n; i++) {
      let pivot = copy[i][i];
      det *= pivot;
      if (Math.abs(det) < 1e-18) return 1e-18; // Avoid log(0)
      for (let k = i + 1; k < n; k++) {
        let factor = copy[k][i] / pivot;
        for (let j = i + 1; j < n; j++) {
          copy[k][j] -= factor * copy[i][j];
        }
      }
    }
    return det;
  }

  private invertMatrix(m: number[][]): number[][] {
    const n = m.length;
    const inv = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
    const copy = m.map(row => [...row]);

    for (let i = 0; i < n; i++) {
      let pivot = copy[i][i];
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