/**
 * Linear regression models.
 *
 * Replaces the `polyfit` / `polyfit_ridge` / `polyfit_gradientDescent` family
 * and the inline 2×2 Bayesian posterior that lived in the components.
 */
import { Matrix, solve, inv, vec } from '../numpy';
import { Classifier, Regressor, uniqueSorted } from './base';

/** Solve the (optionally ridge-regularized) normal equations DᵀD w = Dᵀy. */
function solveNormalEquations(D: Matrix, y: number[], alpha: number): number[] {
  const Dt = D.T();
  let DtD = Dt.matmul(D);
  if (alpha > 0) DtD = DtD.add(Matrix.eye(DtD.rows).scale(alpha));
  const Dty = Dt.matvec(y);
  return solve(DtD, Dty);
}

/** Design matrix [1, x, x², …, x^degree] for scalar inputs. */
function vandermonde(x: number[], degree: number): Matrix {
  const phi = new Matrix(x.length, degree + 1);
  for (let i = 0; i < x.length; i++) {
    let p = 1;
    for (let j = 0; j <= degree; j++) {
      phi.set(i, j, p);
      p *= x[i];
    }
  }
  return phi;
}

/**
 * Ordinary / ridge least squares over a feature matrix (samples × features).
 * `alpha` is the L2 penalty strength (0 = ordinary least squares).
 */
export class Ridge implements Regressor {
  coef: number[] = [];
  intercept = 0;

  constructor(public alpha = 0, public fitIntercept = true) {}

  fit(X: Matrix, y: number[] = []): this {
    const D = this.fitIntercept ? prependOnes(X) : X;
    const w = solveNormalEquations(D, y, this.alpha);
    if (this.fitIntercept) {
      this.intercept = w[0];
      this.coef = w.slice(1);
    } else {
      this.intercept = 0;
      this.coef = w;
    }
    return this;
  }

  predict(X: Matrix): number[] {
    return X.matvec(this.coef).map((v) => v + this.intercept);
  }
}

/** Ordinary least squares (Ridge with alpha = 0). */
export class LinearRegression extends Ridge {
  constructor(fitIntercept = true) {
    super(0, fitIntercept);
  }
}

/**
 * Polynomial regression of a single scalar variable, with optional L_q
 * regularization. `q = 2` uses the ridge closed form; other `q` (e.g. lasso,
 * q = 1) fall back to gradient descent. `coef[i]` multiplies xⁱ (bias included).
 */
export class PolynomialRegression implements Regressor {
  coef: number[] = [];

  constructor(public degree = 3, public alpha = 0, public q = 2) {}

  /** Fit from a samples × 1 matrix. */
  fit(X: Matrix, y: number[] = []): this {
    return this.fit1d(X.col(0), y);
  }

  /** Convenience fit from a plain 1D array of inputs. */
  fit1d(x: number[], y: number[]): this {
    if (this.alpha === 0) {
      this.coef = this.leastSquares(x, y);
    } else if (this.q === 2) {
      this.coef = this.ridge(x, y);
    } else {
      this.coef = this.gradientDescent(x, y);
    }
    return this;
  }

  predict(X: Matrix): number[] {
    return this.predict1d(X.col(0));
  }

  predict1d(x: number[]): number[] {
    return x.map((xi) => this.evalAt(xi));
  }

  /** Evaluate the fitted polynomial at a single point. */
  evalAt(x: number): number {
    let y = 0;
    let p = 1;
    for (let i = 0; i < this.coef.length; i++) {
      y += this.coef[i] * p;
      p *= x;
    }
    return y;
  }

  private leastSquares(x: number[], y: number[]): number[] {
    return solveNormalEquations(vandermonde(x, this.degree), y, 0);
  }

  private ridge(x: number[], y: number[]): number[] {
    return solveNormalEquations(vandermonde(x, this.degree), y, this.alpha);
  }

  /** Gradient descent for general L_q penalties, seeded from the OLS fit. */
  private gradientDescent(
    x: number[],
    y: number[],
    learningRate = 1e-3,
    iterations = 100
  ): number[] {
    const phi = vandermonde(x, this.degree);
    let w = this.leastSquares(x, y);
    const epsilon = 1e-7;
    const q = this.q;
    const lambda = this.alpha;
    let lr = learningRate;
    let prevLoss = Infinity;

    for (let iter = 0; iter < iterations; iter++) {
      const residual = vec.sub(phi.matvec(w), y);
      const penalty = w.reduce((s, wi) => s + Math.pow(Math.abs(wi) + epsilon, q), 0);
      const loss = vec.dot(residual, residual) + lambda * penalty;
      if (Math.abs(prevLoss - loss) < 1e-6) break;
      lr = loss > prevLoss ? lr * 0.5 : lr * 1.05;
      prevLoss = loss;

      // grad = 2 Φᵀ residual + λ q sign(w) |w|^(q-1)
      let grad = phi.T().matvec(residual).map((g) => 2 * g);
      grad = grad.map(
        (g, i) => g + lambda * q * Math.sign(w[i]) * Math.pow(Math.abs(w[i]) + epsilon, q - 1)
      );

      const gradNorm = vec.norm(grad);
      if (gradNorm > 1e3) grad = vec.scale(grad, 1e3 / gradNorm);

      w = vec.sub(w, vec.scale(grad, lr));
    }
    return w;
  }
}

/**
 * Bayesian linear regression with an isotropic Gaussian prior N(0, α⁻¹I) on the
 * weights and Gaussian noise of precision β. Fits the posterior over weights
 * (mean `mean`, covariance `cov`) in closed form. Works for any feature
 * dimension — this replaces the hand-written 2×2 posterior + `inverse2x2`.
 */
export class BayesianLinearRegression {
  /** Posterior mean of the weights. */
  mean: number[] = [];
  /** Posterior covariance of the weights. */
  cov: Matrix = new Matrix(0, 0);

  /**
   * @param alpha prior precision (1 / prior variance)
   * @param beta  noise precision (1 / noise variance)
   */
  constructor(public alpha: number, public beta: number) {}

  /** Fit from a design matrix Φ (samples × features) and targets. */
  fit(Phi: Matrix, y: number[]): this {
    const d = Phi.cols;
    const priorPrecision = Matrix.eye(d).scale(this.alpha);
    const posteriorPrecision = priorPrecision.add(
      Phi.T().matmul(Phi).scale(this.beta)
    );
    this.cov = inv(posteriorPrecision);
    const PhiTy = Phi.T().matvec(y);
    this.mean = this.cov.matvec(vec.scale(PhiTy, this.beta));
    return this;
  }

  /** Posterior predictive mean at design rows of Φ. */
  predict(Phi: Matrix): number[] {
    return Phi.matvec(this.mean);
  }
}

export type LogisticMode = 'softmax' | 'ova';

/**
 * Multinomial (softmax) or one-vs-all logistic regression, trained by
 * stochastic gradient descent with L2 weight decay. No intercept is added
 * here — include a bias column via preprocessing if you want one. Replaces the
 * component-coupled LogisticRegression model.
 */
export class LogisticRegression implements Classifier {
  classes: number[] = [];
  private weights: number[][] = []; // one weight vector per class

  constructor(
    public mode: LogisticMode = 'softmax',
    public nIterations = 200,
    public weightDecay = 0.01,
    public learningRate = 0.1
  ) {}

  fit(X: Matrix, y: number[] = []): this {
    this.classes = uniqueSorted(y);
    const data = X.toArray();
    const d = X.cols;
    this.weights =
      this.mode === 'softmax'
        ? this.trainSoftmax(data, y, d)
        : this.trainOneVsAll(data, y, d);
    return this;
  }

  private trainSoftmax(data: number[][], y: number[], d: number): number[][] {
    const K = this.classes.length;
    const W = this.classes.map(() => vec.zeros(d));
    for (let iter = 0; iter < this.nIterations; iter++) {
      for (let i = 0; i < data.length; i++) {
        const x = data[i];
        const logits = W.map((w) => vec.dot(w, x));
        const maxLogit = Math.max(...logits);
        const exps = logits.map((l) => Math.exp(l - maxLogit));
        const sum = exps.reduce((a, b) => a + b, 0);
        const probs = exps.map((e) => e / sum);
        for (let k = 0; k < K; k++) {
          const target = y[i] === this.classes[k] ? 1 : 0;
          const error = probs[k] - target;
          for (let j = 0; j < d; j++) {
            W[k][j] -= this.learningRate * (error * x[j] + this.weightDecay * W[k][j]);
          }
        }
      }
    }
    return W;
  }

  private trainOneVsAll(data: number[][], y: number[], d: number): number[][] {
    return this.classes.map((c) => {
      const w = vec.zeros(d);
      for (let iter = 0; iter < this.nIterations; iter++) {
        for (let i = 0; i < data.length; i++) {
          const x = data[i];
          const target = y[i] === c ? 1 : 0;
          const pred = 1 / (1 + Math.exp(-vec.dot(w, x)));
          const error = pred - target;
          for (let j = 0; j < d; j++) {
            w[j] -= this.learningRate * (error * x[j] + this.weightDecay * w[j]);
          }
        }
      }
      return w;
    });
  }

  decisionFunction(X: Matrix): Matrix {
    return Matrix.fromRows(X.toArray().map((x) => this.weights.map((w) => vec.dot(w, x))));
  }

  predict(X: Matrix): number[] {
    return this.decisionFunction(X)
      .toArray()
      .map((scores) => this.classes[vec.argmax(scores)]);
  }
}

/** Prepend a column of ones (bias term) to a feature matrix. */
function prependOnes(X: Matrix): Matrix {
  const out = new Matrix(X.rows, X.cols + 1);
  for (let i = 0; i < X.rows; i++) {
    out.set(i, 0, 1);
    for (let j = 0; j < X.cols; j++) out.set(i, j + 1, X.get(i, j));
  }
  return out;
}
