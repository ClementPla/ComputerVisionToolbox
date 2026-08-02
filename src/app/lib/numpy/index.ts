/**
 * numpy/ — the toolbox's linear-algebra core.
 *
 * A single canonical {@link Matrix} type plus vector helpers, solvers,
 * decompositions and statistics. Pure TypeScript, no external math library.
 * Everything numeric in the app should build on this.
 */
export { Matrix } from './matrix';
export { vec } from './vector';
export { luFactor, luSolve, solve, inv, det, cholesky, qr } from './solve';
export { eigSymmetric, svd } from './decomp';
export type { Eigen, SVD } from './decomp';
export { mean, variance, std, cov, corr, center, standardize } from './stats';
