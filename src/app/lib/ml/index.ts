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
  LogisticRegression,
} from './linear';
export type { LogisticMode } from './linear';
export { PCA } from './decomposition';
export {
  FisherDiscriminant,
  LinearDiscriminantAnalysis,
  QuadraticDiscriminantAnalysis,
} from './discriminant';
export { KMeans } from './cluster';
export { PolynomialFeatures, RBFSampler } from './preprocessing';
export { SVMClassifier } from './svm';
export type { SVMConfig, SVMDatapoint, SVMResult, SVMKernel } from './svm';
export {
  normalPdf,
  isotropicNormalPdf,
  MultivariateNormal,
  multivariateNormalPdf,
} from './distributions';
export { DecisionTreeClassifier, giniImpurity, entropyImpurity } from './tree';
export type { Criterion, DecisionNode } from './tree';
export { KNeighborsClassifier } from './neighbors';
export { GaussianNaiveBayes } from './naive_bayes';
export { RandomForestClassifier } from './ensemble';
export { TSNE } from './manifold';
export type { TSNEOptions } from './manifold';
