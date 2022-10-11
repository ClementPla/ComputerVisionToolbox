import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ColorSpacesComponent } from './Components/Tutorials/color-spaces/color-spaces.component';
import { FastFourierTransformComponent } from './Components/Tutorials/fast-fourier-transform/fast-fourier-transform.component';
import { MorphoToolsComponent } from './Components/Tutorials/morpho-tools/morpho-tools.component';
import { SpatialFilteringComponent } from './Components/Tutorials/spatial-filtering/spatial-filtering.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'fourierTransform', component:FastFourierTransformComponent},
  {path:'spatialFiltering', component:SpatialFilteringComponent},
  {path:'colorspaces', component:ColorSpacesComponent},
  {path:'morphology', component:MorphoToolsComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
