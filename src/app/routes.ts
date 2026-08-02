import { Routes } from '@angular/router';

/**
 * Every tutorial is lazily loaded via `loadComponent`, so each one is emitted
 * as its own chunk and fetched only when its route is visited. This keeps the
 * initial bundle to the shell + router rather than every tutorial (plus
 * Three.js / ECharts / ONNX) up front.
 */
export const routeConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./Components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'fourierTransform',
    loadComponent: () =>
      import('./Components/Tutorials/Images/fast-fourier-transform/fast-fourier-transform.component').then(
        (m) => m.FastFourierTransformComponent
      ),
  },
  {
    path: 'spatialFiltering',
    loadComponent: () =>
      import('./Components/Tutorials/Images/spatial-filtering/spatial-filtering.component').then(
        (m) => m.SpatialFilteringComponent
      ),
  },
  {
    path: 'colorspaces',
    loadComponent: () =>
      import('./Components/Tutorials/Images/color-spaces/color-spaces.component').then(
        (m) => m.ColorSpacesComponent
      ),
  },
  {
    path: 'morphology',
    loadComponent: () =>
      import('./Components/Tutorials/Images/morpho-tools/morpho-tools.component').then(
        (m) => m.MorphoToolsComponent
      ),
  },
  {
    path: 'histogram',
    loadComponent: () =>
      import('./Components/Tutorials/Images/image-histogram/image-histogram.component').then(
        (m) => m.ImageHistogramComponent
      ),
  },
  {
    path: 'weightLoss',
    loadComponent: () =>
      import('./Components/Tutorials/MachineLearning/weights-loss/weights-loss.component').then(
        (m) => m.WeightsLossComponent
      ),
  },
  {
    path: 'sampling',
    loadComponent: () =>
      import('./Components/Tutorials/1D/sampling/sampling.component').then(
        (m) => m.SamplingComponent
      ),
  },
  {
    path: 'spectralFiltering',
    loadComponent: () =>
      import('./Components/Tutorials/Images/spectral-filtering/spectral-filtering.component').then(
        (m) => m.SpectralFilteringComponent
      ),
  },
  {
    path: 'PSNR',
    loadComponent: () =>
      import('./Components/Tutorials/Images/psnr/psnr.component').then((m) => m.PSNRComponent),
  },
  {
    path: 'gradientDescent',
    loadComponent: () =>
      import('./Components/Tutorials/MachineLearning/gradient-descent/gradient-descent.component').then(
        (m) => m.GradientDescentComponent
      ),
  },
  {
    path: 'CNN',
    loadComponent: () =>
      import('./Components/Tutorials/MachineLearning/cnn/cnn.component').then((m) => m.CNNComponent),
  },
  {
    path: 'bayesianRegression',
    loadComponent: () =>
      import('./Components/Tutorials/MachineLearning/bayesian-regression/bayesian-regression.component').then(
        (m) => m.BayesianRegressionComponent
      ),
  },
  {
    path: 'optimizer',
    loadComponent: () =>
      import('./Components/Tutorials/MachineLearning/optimizer/optimizer.component').then(
        (m) => m.OptimizerComponent
      ),
  },
  {
    path: 'regression',
    loadComponent: () =>
      import('./Components/Tutorials/MachineLearning/regression/regression.component').then(
        (m) => m.RegressionComponent
      ),
  },
  {
    path: 'autoencoder',
    loadComponent: () =>
      import('./Components/Tutorials/MachineLearning/autoencoder/autoencoder.component').then(
        (m) => m.AutoencoderComponent
      ),
  },
  {
    path: 'PCA',
    loadComponent: () =>
      import('./Components/Tutorials/MachineLearning/principal-component-analysis/principal-component-analysis.component').then(
        (m) => m.PrincipalComponentAnalysisComponent
      ),
  },
  {
    path: 'GaussianDistribution',
    loadComponent: () =>
      import('./Components/Tutorials/Probability/gaussian/gaussian.component').then(
        (m) => m.GaussianComponent
      ),
  },
  {
    path: 'houghTransform',
    loadComponent: () =>
      import('./Components/Tutorials/Images/hough-transform/hough-transform.component').then(
        (m) => m.HoughTransformComponent
      ),
  },
  {
    path: 'fisherDiscriminantAnalysis',
    loadComponent: () =>
      import('./Components/Tutorials/MachineLearning/fisher-discriminant/fisher-discriminant.component').then(
        (m) => m.FisherDiscriminantComponent
      ),
  },
  {
    path: 'linearClassifier',
    loadComponent: () =>
      import('./Components/Tutorials/MachineLearning/linear-classifier/linear-classifier.component').then(
        (m) => m.LinearClassifierComponent
      ),
  },
  {
    path: 'decisionTree3D',
    loadComponent: () =>
      import('./Components/Tutorials/MachineLearning/decision-tree3d/decision-tree3d.component').then(
        (m) => m.DecisionTree3dComponent
      ),
  },
  {
    path: 'svm',
    loadComponent: () =>
      import('./Components/Tutorials/MachineLearning/svmclassifier/svmclassifier.component').then(
        (m) => m.SVMClassifierComponent
      ),
  },
  {
    path: 'optimizerComparison',
    loadComponent: () =>
      import('./Components/Tutorials/MachineLearning/optimizer-comparison/optimizer-comparison.component').then(
        (m) => m.OptimizerComparisonComponent
      ),
  },
  {
    path: 'convolutionTutorial',
    loadComponent: () =>
      import('./Components/Tutorials/MachineLearning/convolution-tutorial/convolution-tutorial.component').then(
        (m) => m.ConvolutionTutorialComponent
      ),
  },
  {
    path: 'receptiveFieldTutorial',
    loadComponent: () =>
      import('./Components/Tutorials/MachineLearning/receptive-field-tutorial/receptive-field-tutorial.component').then(
        (m) => m.ReceptiveFieldTutorialComponent
      ),
  },
  {
    path: 'normalizationTutorial',
    loadComponent: () =>
      import('./Components/Tutorials/MachineLearning/normalization-tutorial/normalization-tutorial.component').then(
        (m) => m.NormalizationTutorialComponent
      ),
  },
  {
    path: 'kmeans',
    loadComponent: () =>
      import('./Components/Tutorials/MachineLearning/kmeans-tutorial/kmeans-tutorial.component').then(
        (m) => m.KMeansTutorialComponent
      ),
  },
  {
    path: 'transformerTutorial',
    loadComponent: () =>
      import('./Components/Tutorials/MachineLearning/transformer-tutorial/transformer-tutorial.component').then(
        (m) => m.TransformerTutorialComponent
      ),
  },
  {
    path: 'RNNTutorial',
    loadComponent: () =>
      import('./Components/Tutorials/MachineLearning/rnn-tutorial/rnn-tutorial.component').then(
        (m) => m.RnnTutorialComponent
      ),
  },
  {
    path: 'RNNCellTutorial',
    loadComponent: () =>
      import('./Components/Tutorials/MachineLearning/rnncell-tutorial/rnncell-tutorial.component').then(
        (m) => m.RNNCellTutorialComponent
      ),
  },
  {
    path: 'AutoregressiveModel',
    loadComponent: () =>
      import('./Components/Tutorials/MachineLearning/autoregressive-tutorial/autoregressive-tutorial.component').then(
        (m) => m.AutoregressiveTutorialComponent
      ),
  },
  {
    path: 'DensityEstimation',
    loadComponent: () =>
      import('./Components/Tutorials/MachineLearning/density-estimation/density-estimation.component').then(
        (m) => m.DensityEstimationComponent
      ),
  },
];
