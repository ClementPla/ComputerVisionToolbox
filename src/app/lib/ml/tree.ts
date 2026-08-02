/**
 * Decision tree classifier (CART).
 *
 * A generic axis-aligned decision tree over a feature matrix. The impurity
 * criteria (Gini, entropy) are exported for reuse. The tree structure is public
 * (`root`) so callers can traverse it for visualization — e.g. threading
 * spatial bounds to draw partitions — without re-implementing the algorithm.
 */
import { Matrix } from '../numpy';
import { Classifier, uniqueSorted } from './base';

export type Criterion = 'gini' | 'entropy';

/** Gini impurity of a class-count vector. */
export function giniImpurity(counts: number[]): number {
  const total = counts.reduce((a, b) => a + b, 0);
  if (total === 0) return 0;
  let sumSq = 0;
  for (const c of counts) {
    const p = c / total;
    sumSq += p * p;
  }
  return 1 - sumSq;
}

/** Shannon entropy (base 2) of a class-count vector. */
export function entropyImpurity(counts: number[]): number {
  const total = counts.reduce((a, b) => a + b, 0);
  if (total === 0) return 0;
  let entropy = 0;
  for (const c of counts) {
    if (c > 0) {
      const p = c / total;
      entropy -= p * Math.log2(p);
    }
  }
  return entropy;
}

export interface DecisionNode {
  isLeaf: boolean;
  /** Feature index used to split (null at leaves). */
  splitFeature: number | null;
  /** Split threshold: go left if x[splitFeature] <= threshold (null at leaves). */
  threshold: number | null;
  /** Majority class label at this node. */
  predictedClass: number;
  /** Class counts aligned with the classifier's `classes` array. */
  classCounts: number[];
  impurity: number;
  samples: number;
  left: DecisionNode | null;
  right: DecisionNode | null;
}

export class DecisionTreeClassifier implements Classifier {
  classes: number[] = [];
  root: DecisionNode | null = null;

  constructor(
    public maxDepth = 5,
    public minSamplesLeaf = 1,
    public criterion: Criterion = 'gini'
  ) {}

  private get impurityFn(): (counts: number[]) => number {
    return this.criterion === 'entropy' ? entropyImpurity : giniImpurity;
  }

  fit(X: Matrix, y: number[] = []): this {
    this.classes = uniqueSorted(y);
    this.root = this.build(X.toArray(), y, 0);
    return this;
  }

  /** Class counts (aligned with `this.classes`) for a set of labels. */
  private counts(labels: number[]): number[] {
    const index = new Map(this.classes.map((c, i) => [c, i]));
    const out = new Array<number>(this.classes.length).fill(0);
    for (const l of labels) out[index.get(l)!]++;
    return out;
  }

  private leaf(classCounts: number[], impurity: number, samples: number): DecisionNode {
    let best = 0;
    for (let i = 1; i < classCounts.length; i++) if (classCounts[i] > classCounts[best]) best = i;
    return {
      isLeaf: true,
      splitFeature: null,
      threshold: null,
      predictedClass: this.classes[best],
      classCounts,
      impurity,
      samples,
      left: null,
      right: null,
    };
  }

  private build(rows: number[][], labels: number[], depth: number): DecisionNode {
    const classCounts = this.counts(labels);
    const impurity = this.impurityFn(classCounts);

    if (depth >= this.maxDepth || labels.length < this.minSamplesLeaf * 2 || impurity === 0) {
      return this.leaf(classCounts, impurity, labels.length);
    }

    const split = this.bestSplit(rows, labels, impurity);
    if (!split) return this.leaf(classCounts, impurity, labels.length);

    const leftRows: number[][] = [];
    const leftLabels: number[] = [];
    const rightRows: number[][] = [];
    const rightLabels: number[] = [];
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][split.feature] <= split.threshold) {
        leftRows.push(rows[i]);
        leftLabels.push(labels[i]);
      } else {
        rightRows.push(rows[i]);
        rightLabels.push(labels[i]);
      }
    }

    return {
      isLeaf: false,
      splitFeature: split.feature,
      threshold: split.threshold,
      predictedClass: this.leaf(classCounts, impurity, labels.length).predictedClass,
      classCounts,
      impurity,
      samples: labels.length,
      left: this.build(leftRows, leftLabels, depth + 1),
      right: this.build(rightRows, rightLabels, depth + 1),
    };
  }

  /** Best (feature, threshold) by impurity gain, or null if none improves. */
  private bestSplit(
    rows: number[][],
    labels: number[],
    parentImpurity: number
  ): { feature: number; threshold: number; gain: number } | null {
    if (rows.length < 2) return null;
    const nFeatures = rows[0].length;
    let best: { feature: number; threshold: number; gain: number } | null = null;

    for (let f = 0; f < nFeatures; f++) {
      const sorted = rows.map((r) => r[f]).sort((a, b) => a - b);
      for (let i = 0; i < sorted.length - 1; i++) {
        if (sorted[i] === sorted[i + 1]) continue;
        const threshold = (sorted[i] + sorted[i + 1]) / 2;

        const leftLabels: number[] = [];
        const rightLabels: number[] = [];
        for (let k = 0; k < rows.length; k++) {
          if (rows[k][f] <= threshold) leftLabels.push(labels[k]);
          else rightLabels.push(labels[k]);
        }
        if (leftLabels.length === 0 || rightLabels.length === 0) continue;

        const weighted =
          (leftLabels.length * this.impurityFn(this.counts(leftLabels)) +
            rightLabels.length * this.impurityFn(this.counts(rightLabels))) /
          labels.length;
        const gain = parentImpurity - weighted;
        if (gain > 0 && (!best || gain > best.gain)) best = { feature: f, threshold, gain };
      }
    }
    return best;
  }

  predict(X: Matrix): number[] {
    return X.toArray().map((x) => this.predictRow(x));
  }

  private predictRow(x: number[]): number {
    let node = this.root;
    while (node && !node.isLeaf) {
      node = x[node.splitFeature!] <= node.threshold! ? node.left : node.right;
    }
    return node ? node.predictedClass : this.classes[0];
  }
}
