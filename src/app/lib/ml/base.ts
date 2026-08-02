/**
 * ml/ — scikit-style estimator contracts.
 *
 * Every learning algorithm in the toolbox implements one of these interfaces so
 * components share a single, predictable surface: build an `X` matrix
 * (samples × features), call `fit`, then `predict` / `transform`. The estimators
 * carry no knowledge of components, canvases or chart types.
 */
import { Matrix } from '../numpy';

/** Anything that learns from data. `y` is optional for unsupervised estimators. */
export interface Estimator<Y = number[]> {
  fit(X: Matrix, y?: Y): this;
}

/** Supervised estimator producing predictions of type `Y`. */
export interface Predictor<Y = number[]> extends Estimator<Y> {
  predict(X: Matrix): Y;
}

/** Classifier with integer class labels and optional probability output. */
export interface Classifier extends Predictor<number[]> {
  /** Distinct class labels seen during fit, in prediction-column order. */
  readonly classes: number[];
  /** Class probabilities, samples × classes (columns aligned with `classes`). */
  predictProba?(X: Matrix): Matrix;
  /** Raw scores per class, samples × classes (pre-normalization). */
  decisionFunction?(X: Matrix): Matrix;
}

/** Regressor producing continuous predictions. */
export type Regressor = Predictor<number[]>;

/** Feature transform (PCA, scalers, ...). */
export interface Transformer extends Estimator {
  transform(X: Matrix): Matrix;
}

/** Convenience: fit then transform in one call. */
export function fitTransform(t: Transformer, X: Matrix, y?: number[]): Matrix {
  return t.fit(X, y).transform(X);
}

/** Distinct labels in sorted order — the canonical class ordering. */
export function uniqueSorted(y: number[]): number[] {
  return Array.from(new Set(y)).sort((a, b) => a - b);
}
