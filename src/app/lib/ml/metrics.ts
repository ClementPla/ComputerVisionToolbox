/**
 * Common scoring metrics shared across tutorials.
 */

/** Fraction of correct predictions. */
export function accuracy(yTrue: number[], yPred: number[]): number {
  if (yTrue.length === 0) return 0;
  let correct = 0;
  for (let i = 0; i < yTrue.length; i++) if (yTrue[i] === yPred[i]) correct++;
  return correct / yTrue.length;
}

/** Mean squared error. */
export function mse(yTrue: number[], yPred: number[]): number {
  if (yTrue.length === 0) return 0;
  let s = 0;
  for (let i = 0; i < yTrue.length; i++) {
    const d = yTrue[i] - yPred[i];
    s += d * d;
  }
  return s / yTrue.length;
}

/** Root mean squared error. */
export function rmse(yTrue: number[], yPred: number[]): number {
  return Math.sqrt(mse(yTrue, yPred));
}

/** Coefficient of determination R². */
export function r2Score(yTrue: number[], yPred: number[]): number {
  const n = yTrue.length;
  if (n === 0) return 0;
  const mean = yTrue.reduce((a, b) => a + b, 0) / n;
  let ssRes = 0;
  let ssTot = 0;
  for (let i = 0; i < n; i++) {
    ssRes += (yTrue[i] - yPred[i]) ** 2;
    ssTot += (yTrue[i] - mean) ** 2;
  }
  return ssTot > 0 ? 1 - ssRes / ssTot : 0;
}

/** Confusion matrix `C[i][j]` = count of true class i predicted as class j. */
export function confusionMatrix(
  yTrue: number[],
  yPred: number[],
  labels: number[]
): number[][] {
  const index = new Map(labels.map((l, i) => [l, i]));
  const C = labels.map(() => labels.map(() => 0));
  for (let i = 0; i < yTrue.length; i++) {
    const ti = index.get(yTrue[i]);
    const pi = index.get(yPred[i]);
    if (ti !== undefined && pi !== undefined) C[ti][pi]++;
  }
  return C;
}
