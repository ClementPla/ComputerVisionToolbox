/**
 * t-SNE (t-distributed Stochastic Neighbor Embedding).
 *
 * Embeds high-dimensional points into 2D so that neighbourhood structure is
 * preserved: perplexity-calibrated Gaussian affinities in the input space are
 * matched, via KL-divergence gradient descent, to a Student-t distribution in
 * the embedding. Supports incremental `step()` so a UI can animate the layout.
 *
 * Follows van der Maaten & Hinton (2008): symmetric P with early exaggeration,
 * momentum, and adaptive per-parameter gains. O(n²) per step — intended for a
 * few hundred points.
 */
import { Matrix, vec } from '../numpy';

export interface TSNEOptions {
  perplexity?: number;
  learningRate?: number;
  nIter?: number;
  earlyExaggeration?: number;
  rng?: () => number;
}

export class TSNE {
  perplexity: number;
  learningRate: number;
  nIter: number;
  earlyExaggeration: number;
  private rng: () => number;

  iter = 0;
  private n = 0;
  private P: number[][] = [];
  private Y: number[][] = [];
  private velocity: number[][] = [];
  private gains: number[][] = [];

  constructor(opts: TSNEOptions = {}) {
    this.perplexity = opts.perplexity ?? 30;
    this.learningRate = opts.learningRate ?? 200;
    this.nIter = opts.nIter ?? 500;
    this.earlyExaggeration = opts.earlyExaggeration ?? 12;
    this.rng = opts.rng ?? Math.random;
  }

  /** Current 2D embedding as an n×2 matrix. */
  get embedding(): Matrix {
    return Matrix.fromRows(this.Y);
  }

  /** Compute affinities and initialize the embedding (does no gradient steps). */
  initialize(X: Matrix): this {
    const rows = X.toArray();
    this.n = rows.length;
    this.P = symmetrizeAffinities(pairwiseAffinities(rows, this.perplexity));
    // Small random init.
    this.Y = rows.map(() => [this.randn() * 1e-2, this.randn() * 1e-2]);
    this.velocity = rows.map(() => [0, 0]);
    this.gains = rows.map(() => [1, 1]);
    this.iter = 0;
    return this;
  }

  /** Run one gradient-descent step; returns the updated embedding. */
  step(): Matrix {
    const n = this.n;
    const exaggeration = this.iter < 100 ? this.earlyExaggeration : 1;
    const momentum = this.iter < 250 ? 0.5 : 0.8;

    // Student-t affinities Q (unnormalized `num`, normalizer `sum`).
    const num: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
    let sum = 0;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const dx = this.Y[i][0] - this.Y[j][0];
        const dy = this.Y[i][1] - this.Y[j][1];
        const q = 1 / (1 + dx * dx + dy * dy);
        num[i][j] = q;
        num[j][i] = q;
        sum += 2 * q;
      }
    }
    sum = Math.max(sum, 1e-12);

    // Gradient: 4 Σ_j (P_ij·exagg − Q_ij) · num_ij · (y_i − y_j).
    // Compute all gradients against the current (fixed) embedding first, then
    // apply the updates — updating y in-place mid-loop would feed moved points
    // back into later gradients and diverge.
    const gradX = new Array<number>(n).fill(0);
    const gradY = new Array<number>(n).fill(0);
    for (let i = 0; i < n; i++) {
      let gx = 0;
      let gy = 0;
      for (let j = 0; j < n; j++) {
        if (i === j) continue;
        const q = num[i][j] / sum;
        const mult = (this.P[i][j] * exaggeration - q) * num[i][j];
        gx += mult * (this.Y[i][0] - this.Y[j][0]);
        gy += mult * (this.Y[i][1] - this.Y[j][1]);
      }
      gradX[i] = 4 * gx;
      gradY[i] = 4 * gy;
    }
    for (let i = 0; i < n; i++) {
      this.applyUpdate(i, 0, gradX[i], momentum);
      this.applyUpdate(i, 1, gradY[i], momentum);
    }

    this.center();
    this.iter++;
    return this.embedding;
  }

  /** Initialize and run to completion. */
  fitTransform(X: Matrix): Matrix {
    this.initialize(X);
    for (let i = 0; i < this.nIter; i++) this.step();
    return this.embedding;
  }

  /** Adaptive-gain + momentum update of one coordinate. */
  private applyUpdate(i: number, d: number, grad: number, momentum: number): void {
    const sameSign = Math.sign(grad) === Math.sign(this.velocity[i][d]);
    this.gains[i][d] = Math.max(0.01, sameSign ? this.gains[i][d] * 0.8 : this.gains[i][d] + 0.2);
    this.velocity[i][d] =
      momentum * this.velocity[i][d] - this.learningRate * this.gains[i][d] * grad;
    this.Y[i][d] += this.velocity[i][d];
  }

  /** Recenter the embedding on the origin. */
  private center(): void {
    const mean = [0, 0];
    for (const y of this.Y) {
      mean[0] += y[0];
      mean[1] += y[1];
    }
    mean[0] /= this.n;
    mean[1] /= this.n;
    for (const y of this.Y) {
      y[0] -= mean[0];
      y[1] -= mean[1];
    }
  }

  /** Standard normal sample (Box–Muller). */
  private randn(): number {
    return Math.sqrt(-2 * Math.log(this.rng() + 1e-12)) * Math.cos(2 * Math.PI * this.rng());
  }
}

/** Conditional Gaussian affinities P_{j|i}, perplexity-calibrated per row. */
function pairwiseAffinities(rows: number[][], perplexity: number): number[][] {
  const n = rows.length;
  const D2 = squaredDistances(rows);
  const P: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  const logU = Math.log(perplexity);

  for (let i = 0; i < n; i++) {
    let betaMin = -Infinity;
    let betaMax = Infinity;
    let beta = 1;
    let row = new Array(n).fill(0);

    for (let tries = 0; tries < 50; tries++) {
      let sumP = 0;
      let sumDP = 0;
      for (let j = 0; j < n; j++) {
        if (j === i) continue;
        const p = Math.exp(-D2[i][j] * beta);
        row[j] = p;
        sumP += p;
        sumDP += D2[i][j] * p;
      }
      sumP = Math.max(sumP, 1e-12);
      // Shannon entropy of the row.
      const H = Math.log(sumP) + (beta * sumDP) / sumP;
      const diff = H - logU;
      if (Math.abs(diff) < 1e-5) break;
      if (diff > 0) {
        betaMin = beta;
        beta = betaMax === Infinity ? beta * 2 : (beta + betaMax) / 2;
      } else {
        betaMax = beta;
        beta = betaMin === -Infinity ? beta / 2 : (beta + betaMin) / 2;
      }
    }

    let sumP = 0;
    for (let j = 0; j < n; j++) sumP += row[j];
    sumP = Math.max(sumP, 1e-12);
    for (let j = 0; j < n; j++) P[i][j] = row[j] / sumP;
  }
  return P;
}

/** Symmetrize and normalize: P = (P + Pᵀ) / (2n), floored. */
function symmetrizeAffinities(P: number[][]): number[][] {
  const n = P.length;
  const out: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      out[i][j] = Math.max((P[i][j] + P[j][i]) / (2 * n), 1e-12);
    }
  }
  return out;
}

function squaredDistances(rows: number[][]): number[][] {
  const n = rows.length;
  const D2: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const d = vec.distance(rows[i], rows[j]);
      D2[i][j] = d * d;
      D2[j][i] = D2[i][j];
    }
  }
  return D2;
}
