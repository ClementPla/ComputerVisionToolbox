/**
 * K-Means clustering (Lloyd's algorithm).
 *
 * The single k-means implementation for the toolbox: it powers the clustering
 * tutorial and the RBF feature sampler, replacing the copy in the
 * linear-classifier's AbstractModel.
 */
import { Matrix, vec } from '../numpy';
import { Estimator } from './base';

export class KMeans implements Estimator {
  /** Cluster centers (k × n_features). */
  centroids: Matrix = new Matrix(0, 0);
  /** Cluster index assigned to each training sample. */
  labels: number[] = [];
  /** Within-cluster sum of squared distances at convergence. */
  inertia = 0;

  constructor(
    public k = 3,
    public maxIter = 100,
    public rng: () => number = Math.random
  ) {}

  fit(X: Matrix): this {
    const n = X.rows;
    const k = Math.min(this.k, n);
    const data = X.toArray();

    // Initialize centers from k distinct random samples.
    const chosen = new Set<number>();
    while (chosen.size < k) chosen.add(Math.floor(this.rng() * n));
    let centers = Array.from(chosen).map((i) => data[i].slice());

    let labels = new Array<number>(n).fill(0);
    for (let iter = 0; iter < this.maxIter; iter++) {
      // Assignment step.
      let changed = false;
      for (let i = 0; i < n; i++) {
        const c = nearest(data[i], centers);
        if (c !== labels[i]) changed = true;
        labels[i] = c;
      }

      // Update step (empty clusters keep their previous center).
      const sums = centers.map(() => vec.zeros(X.cols));
      const counts = new Array<number>(k).fill(0);
      for (let i = 0; i < n; i++) {
        const c = labels[i];
        counts[c]++;
        for (let j = 0; j < X.cols; j++) sums[c][j] += data[i][j];
      }
      centers = centers.map((center, c) =>
        counts[c] > 0 ? sums[c].map((s) => s / counts[c]) : center
      );

      if (!changed && iter > 0) break;
    }

    this.centroids = Matrix.fromRows(centers);
    this.labels = labels;
    this.inertia = data.reduce((s, x, i) => s + vec.distance(x, centers[labels[i]]) ** 2, 0);
    return this;
  }

  /** Assign each row of X to the nearest fitted centroid. */
  predict(X: Matrix): number[] {
    const centers = this.centroids.toArray();
    return X.toArray().map((x) => nearest(x, centers));
  }
}

/** Index of the nearest center to point `x`. */
function nearest(x: number[], centers: number[][]): number {
  let best = 0;
  let bestDist = Infinity;
  for (let c = 0; c < centers.length; c++) {
    const d = vec.distance(x, centers[c]);
    if (d < bestDist) {
      bestDist = d;
      best = c;
    }
  }
  return best;
}
