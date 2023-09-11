import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ColorSpacesComponent } from './Components/Tutorials/color-spaces/color-spaces.component';
import { FastFourierTransformComponent } from './Components/Tutorials/fast-fourier-transform/fast-fourier-transform.component';
import { ImageHistogramComponent } from './Components/Tutorials/image-histogram/image-histogram.component';
import { WeightsLossComponent } from './Components/Tutorials/MachineLearning/weights-loss/weights-loss.component';
import { MorphoToolsComponent } from './Components/Tutorials/morpho-tools/morpho-tools.component';
import { SamplingComponent } from './Components/Tutorials/OneDim/sampling/sampling.component';
import { SpatialFilteringComponent } from './Components/Tutorials/spatial-filtering/spatial-filtering.component';
import { SpectralFilteringComponent } from './Components/Tutorials/spectral-filtering/spectral-filtering.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'fourierTransform', component:FastFourierTransformComponent},
  {path:'spatialFiltering', component:SpatialFilteringComponent},
  {path:'colorspaces', component:ColorSpacesComponent},
  {path:'morphology', component:MorphoToolsComponent},
  {path:'histogram', component:ImageHistogramComponent},
  {path:'weightLoss', component:WeightsLossComponent},
  {path:'sampling', component:SamplingComponent},
  {path:'spectralFiltering', component:SpectralFilteringComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
