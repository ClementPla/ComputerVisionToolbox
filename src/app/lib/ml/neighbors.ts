/**
 * k-Nearest Neighbors classification.
 *
 * A lazy, instance-based classifier: `fit` just stores the training set;
 * `predict` labels a point by majority vote of its k nearest neighbours
 * (Euclidean distance).
 */
import { Matrix, vec } from '../numpy';
import { Classifier, uniqueSorted } from './base';

export class KNeighborsClassifier implements Classifier {
  classes: number[] = [];
  private points: number[][] = [];
  private labels: number[] = [];

  constructor(public k = 5) {}

  fit(X: Matrix, y: number[] = []): this {
    this.points = X.toArray();
    this.labels = y;
    this.classes = uniqueSorted(y);
    return this;
  }

  predict(X: Matrix): number[] {
    return X.toArray().map((x) => this.classes[vec.argmax(this.classDistribution(x))]);
  }

  /** Class probabilities = fraction of the k neighbours in each class. */
  predictProba(X: Matrix): Matrix {
    return Matrix.fromRows(X.toArray().map((x) => this.classDistribution(x)));
  }

  /** Indices of the k nearest training points to `x`. */
  private nearestIndices(x: number[]): number[] {
    const dists = this.points.map((p, i) => ({ i, d: vec.distance(x, p) }));
    dists.sort((a, b) => a.d - b.d);
    return dists.slice(0, Math.min(this.k, dists.length)).map((o) => o.i);
  }

  /** Vote distribution over `classes` from the k nearest neighbours. */
  private classDistribution(x: number[]): number[] {
    const index = new Map(this.classes.map((c, i) => [c, i]));
    const counts = this.classes.map(() => 0);
    const idx = this.nearestIndices(x);
    for (const i of idx) counts[index.get(this.labels[i])!]++;
    const total = idx.length || 1;
    return counts.map((c) => c / total);
  }
}
