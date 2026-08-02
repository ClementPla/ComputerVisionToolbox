/**
 * Random Forest — an ensemble of decision trees.
 *
 * Each tree is trained on a bootstrap resample of the data and (optionally)
 * considers a random subset of features at each split; predictions are the
 * majority vote across trees. Builds on {@link DecisionTreeClassifier}.
 */
import { Matrix } from '../numpy';
import { Classifier, uniqueSorted } from './base';
import { DecisionTreeClassifier, Criterion } from './tree';

export class RandomForestClassifier implements Classifier {
  classes: number[] = [];
  trees: DecisionTreeClassifier[] = [];

  constructor(
    public nEstimators = 20,
    public maxDepth = 6,
    public minSamplesLeaf = 1,
    public criterion: Criterion = 'gini',
    /** Features considered per split; defaults to √(n_features). */
    public maxFeatures?: number,
    public rng: () => number = Math.random
  ) {}

  fit(X: Matrix, y: number[] = []): this {
    this.classes = uniqueSorted(y);
    const rows = X.toArray();
    const n = rows.length;
    const maxFeatures =
      this.maxFeatures ?? Math.max(1, Math.round(Math.sqrt(X.cols)));

    this.trees = [];
    for (let t = 0; t < this.nEstimators; t++) {
      // Bootstrap resample (sample n rows with replacement).
      const bootRows: number[][] = new Array(n);
      const bootY: number[] = new Array(n);
      for (let i = 0; i < n; i++) {
        const idx = Math.floor(this.rng() * n);
        bootRows[i] = rows[idx];
        bootY[i] = y[idx];
      }
      const tree = new DecisionTreeClassifier(
        this.maxDepth,
        this.minSamplesLeaf,
        this.criterion,
        maxFeatures,
        this.rng
      );
      tree.fit(Matrix.fromRows(bootRows), bootY);
      this.trees.push(tree);
    }
    return this;
  }

  predict(X: Matrix): number[] {
    return this.predictProba(X)
      .toArray()
      .map((row) => this.classes[argmax(row)]);
  }

  /** Fraction of trees voting for each class. */
  predictProba(X: Matrix): Matrix {
    const index = new Map(this.classes.map((c, i) => [c, i]));
    const votes = X.toArray().map(() => this.classes.map(() => 0));
    for (const tree of this.trees) {
      const preds = tree.predict(X);
      for (let i = 0; i < preds.length; i++) {
        const k = index.get(preds[i]);
        if (k !== undefined) votes[i][k]++;
      }
    }
    const total = this.trees.length || 1;
    return Matrix.fromRows(votes.map((row) => row.map((v) => v / total)));
  }
}

function argmax(a: number[]): number {
  let best = 0;
  for (let i = 1; i < a.length; i++) if (a[i] > a[best]) best = i;
  return best;
}
