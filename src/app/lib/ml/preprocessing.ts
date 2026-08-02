/**
 * Feature preprocessing transformers.
 *
 * These replace the `featureMap` baked into the linear-classifier's
 * AbstractModel: fit them on the training data, then apply the same fitted
 * transform to any new points (e.g. the decision-boundary grid).
 */
import { Matrix, vec } from '../numpy';
import { Transformer } from './base';
import { KMeans } from './cluster';

/**
 * Polynomial feature expansion for 2D inputs. With `includeBias` the constant
 * term is prepended, so degree 1 yields [1, x, y] — the plain linear features.
 */
export class PolynomialFeatures implements Transformer {
  constructor(public degree = 2, public includeBias = true) {}

  fit(_X: Matrix): this {
    return this;
  }

  transform(X: Matrix): Matrix {
    const rows = X.toArray().map((p) => this.expand(p[0], p[1]));
    return Matrix.fromRows(rows);
  }

  private expand(x: number, y: number): number[] {
    const out = this.includeBias ? [1] : [];
    for (let i = 1; i <= this.degree; i++) {
      for (let j = 0; j <= i; j++) out.push(Math.pow(x, i - j) * Math.pow(y, j));
    }
    return out;
  }
}

/**
 * Radial basis function features: each output dimension is a Gaussian bump
 * centered at a landmark. Landmarks are chosen from the data, either at random
 * or as KMeans centroids.
 */
export class RBFSampler implements Transformer {
  centers: number[][] = [];

  constructor(
    public nComponents = 5,
    public sigma = 0.1,
    public mode: 'random' | 'kmeans' = 'random',
    public rng: () => number = Math.random
  ) {}

  fit(X: Matrix): this {
    const n = X.rows;
    const k = Math.min(this.nComponents, n);
    if (this.mode === 'kmeans') {
      this.centers = new KMeans(k, 10, this.rng).fit(X).centroids.toArray();
    } else {
      const idx = new Set<number>();
      while (idx.size < k) idx.add(Math.floor(this.rng() * n));
      const data = X.toArray();
      this.centers = Array.from(idx).map((i) => data[i].slice());
    }
    return this;
  }

  transform(X: Matrix): Matrix {
    const twoSigmaSq = 2 * this.sigma * this.sigma;
    const rows = X.toArray().map((x) =>
      this.centers.map((c) => Math.exp(-(vec.distance(x, c) ** 2) / twoSigmaSq))
    );
    return Matrix.fromRows(rows);
  }
}
