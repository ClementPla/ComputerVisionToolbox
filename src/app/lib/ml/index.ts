/**
 * ml/ — scikit-style estimators built on the numpy/ core.
 *
 * Components build an X matrix (samples × features), then fit / predict /
 * transform. Estimators are component-agnostic and share the contracts in
 * ./base.
 */
export type { Estimator, Predictor, Classifier, Regressor, Transformer } from './base';
export { fitTransform, uniqueSorted } from './base';
export { accuracy, mse, rmse, r2Score, confusionMatrix } from './metrics';
export {
  Ridge,
  LinearRegression,
  PolynomialRegression,
  BayesianLinearRegression,
} from './linear';
export { PCA } from './decomposition';
export { FisherDiscriminant } from './discriminant';
