import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ColorSpacesComponent } from './Components/Tutorials/Images/color-spaces/color-spaces.component';
import { FastFourierTransformComponent } from './Components/Tutorials/Images/fast-fourier-transform/fast-fourier-transform.component';
import { ImageHistogramComponent } from './Components/Tutorials/Images/image-histogram/image-histogram.component';
import { WeightsLossComponent } from './Components/Tutorials/MachineLearning/weights-loss/weights-loss.component';
import { MorphoToolsComponent } from './Components/Tutorials/Images/morpho-tools/morpho-tools.component';
import { SamplingComponent } from './Components/Tutorials/1D/sampling/sampling.component';
import { SpatialFilteringComponent } from './Components/Tutorials/Images/spatial-filtering/spatial-filtering.component';
import { SpectralFilteringComponent } from './Components/Tutorials/Images/spectral-filtering/spectral-filtering.component';
import { PSNRComponent } from './Components/Tutorials/Images/psnr/psnr.component';
import { GradientDescentComponent } from './Components/Tutorials/MachineLearning/gradient-descent/gradient-descent.component';
import { OptimizerComponent } from './Components/Tutorials/MachineLearning/optimizer/optimizer.component';
import { CNNComponent } from './Components/Tutorials/MachineLearning/cnn/cnn.component';
import { BayesianRegressionComponent } from './Components/Tutorials/MachineLearning/bayesian-regression/bayesian-regression.component';
import { RegressionComponent } from './Components/Tutorials/MachineLearning/regression/regression.component';
import { AutoencoderComponent } from './Components/Tutorials/MachineLearning/autoencoder/autoencoder.component';
import { PrincipalComponentAnalysisComponent } from './Components/Tutorials/MachineLearning/principal-component-analysis/principal-component-analysis.component';
import { GaussianComponent } from './Components/Tutorials/Probability/gaussian/gaussian.component';
import { HoughTransformComponent } from './Components/Tutorials/Images/hough-transform/hough-transform.component';
import { FisherDiscriminantComponent } from './Components/Tutorials/MachineLearning/fisher-discriminant/fisher-discriminant.component';
import { LinearClassifierComponent } from './Components/Tutorials/MachineLearning/linear-classifier/linear-classifier.component';
import { DecisionTree3dComponent } from './Components/Tutorials/MachineLearning/decision-tree3d/decision-tree3d.component';
import { SVMClassifierComponent } from './Components/Tutorials/MachineLearning/svmclassifier/svmclassifier.component';
import { OptimizerComparisonComponent } from './Components/Tutorials/MachineLearning/optimizer-comparison/optimizer-comparison.component';
import { ConvolutionTutorialComponent } from './Components/Tutorials/MachineLearning/convolution-tutorial/convolution-tutorial.component';
import { ReceptiveFieldTutorialComponent } from './Components/Tutorials/MachineLearning/receptive-field-tutorial/receptive-field-tutorial.component';
import { NormalizationTutorialComponent } from './Components/Tutorials/MachineLearning/normalization-tutorial/normalization-tutorial.component';
import { KMeansTutorialComponent } from './Components/Tutorials/MachineLearning/kmeans-tutorial/kmeans-tutorial.component';
import { TransformerTutorialComponent } from './Components/Tutorials/MachineLearning/transformer-tutorial/transformer-tutorial.component';
import { RnnTutorialComponent } from './Components/Tutorials/MachineLearning/rnn-tutorial/rnn-tutorial.component';
import { RNNCellTutorialComponent } from './Components/Tutorials/MachineLearning/rnncell-tutorial/rnncell-tutorial.component';
import { AutoregressiveTutorialComponent } from './Components/Tutorials/MachineLearning/autoregressive-tutorial/autoregressive-tutorial.component';
import {  DensityEstimationComponent } from './Components/Tutorials/MachineLearning/density-estimation/density-estimation.component';
export const routeConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'fourierTransform', component: FastFourierTransformComponent },
  { path: 'spatialFiltering', component: SpatialFilteringComponent },
  { path: 'colorspaces', component: ColorSpacesComponent },
  { path: 'morphology', component: MorphoToolsComponent },
  { path: 'histogram', component: ImageHistogramComponent },
  { path: 'weightLoss', component: WeightsLossComponent },
  { path: 'sampling', component: SamplingComponent },
  { path: 'spectralFiltering', component: SpectralFilteringComponent },
  { path: 'PSNR', component: PSNRComponent },
  { path: 'gradientDescent', component: GradientDescentComponent },
  { path: 'CNN', component: CNNComponent },
  { path: 'bayesianRegression', component: BayesianRegressionComponent },
  { path: 'optimizer', component: OptimizerComponent },
  { path: 'regression', component: RegressionComponent },
  { path: 'autoencoder', component: AutoencoderComponent },
  {path: "PCA", component: PrincipalComponentAnalysisComponent},
  {path: "GaussianDistribution", component: GaussianComponent},
  {path: "houghTransform", component: HoughTransformComponent},
  {path: "fisherDiscriminantAnalysis", component: FisherDiscriminantComponent},
  {path: "linearClassifier", component: LinearClassifierComponent},
  {path: "decisionTree3D", component: DecisionTree3dComponent},
  {path: "svm", component: SVMClassifierComponent},
  {path: "optimizerComparison", component: OptimizerComparisonComponent},
  {path: "convolutionTutorial", component: ConvolutionTutorialComponent},
  {path:"receptiveFieldTutorial", component: ReceptiveFieldTutorialComponent},
  {path:"normalizationTutorial", component: NormalizationTutorialComponent},
  {path: "kmeans", component: KMeansTutorialComponent},
  {path: "transformerTutorial", component: TransformerTutorialComponent},
  {path: "RNNTutorial", component: RnnTutorialComponent},
  {path: "RNNCellTutorial", component: RNNCellTutorialComponent},
  {path: "AutoregressiveModel", component: AutoregressiveTutorialComponent},
  {path: "DensityEstimation", component: DensityEstimationComponent}

];
