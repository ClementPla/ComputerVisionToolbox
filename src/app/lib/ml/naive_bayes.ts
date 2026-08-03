/**
 * Gaussian Naive Bayes.
 *
 * A generative classifier that models each feature, per class, as an
 * independent 1D Gaussian. Prediction maximizes the log-posterior
 * (log-prior + summed per-feature log-likelihoods). Variances are floored by a
 * smoothing term (scikit-style: `varSmoothing × max feature variance`).
 */
import { Matrix, mean, variance as featureVariance, vec } from '../numpy';
import { Classifier, uniqueSorted } from './base';

export class GaussianNaiveBayes implements Classifier {
  classes: number[] = [];
  /** Per-class feature means, `[K][d]` (aligned with `classes`). */
  means: number[][] = [];
  /** Per-class feature variances, `[K][d]`. */
  variances: number[][] = [];
  private logPriors: number[] = [];

  constructor(public varSmoothing = 1e-9) {}

  fit(X: Matrix, y: number[] = []): this {
    this.classes = uniqueSorted(y);
    const n = X.rows;
    const epsilon = this.varSmoothing * Math.max(...featureVariance(X, 0), 0);

    this.means = [];
    this.variances = [];
    this.logPriors = [];
    for (const c of this.classes) {
      const rows = X.toArray().filter((_, i) => y[i] === c);
      const Xc = Matrix.fromRows(rows);
      this.means.push(mean(Xc, 0));
      this.variances.push(featureVariance(Xc, 0).map((v) => v + epsilon));
      this.logPriors.push(Math.log(rows.length / n));
    }
    return this;
  }

  /** Class priors P(class), aligned with `classes`. */
  priors(): number[] {
    return this.logPriors.map(Math.exp);
  }

  /** Unnormalized log-posterior per class for each row of X. */
  decisionFunction(X: Matrix): Matrix {
    return Matrix.fromRows(X.toArray().map((x) => this.jointLogLikelihood(x)));
  }

  predict(X: Matrix): number[] {
    return X.toArray().map((x) => this.classes[vec.argmax(this.jointLogLikelihood(x))]);
  }

  predictProba(X: Matrix): Matrix {
    return Matrix.fromRows(
      this.decisionFunction(X).toArray().map((row) => {
        const m = Math.max(...row);
        const exps = row.map((v) => Math.exp(v - m));
        const sum = exps.reduce((a, b) => a + b, 0);
        return exps.map((e) => e / sum);
      })
    );
  }

  private jointLogLikelihood(x: number[]): number[] {
    return this.classes.map((_, k) => {
      let logLik = this.logPriors[k];
      for (let f = 0; f < x.length; f++) {
        const v = this.variances[k][f];
        const diff = x[f] - this.means[k][f];
        logLik += -0.5 * Math.log(2 * Math.PI * v) - (diff * diff) / (2 * v);
      }
      return logLik;
    });
  }
}
