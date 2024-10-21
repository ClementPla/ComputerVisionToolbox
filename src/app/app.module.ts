import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxEchartsModule } from 'ngx-echarts';
import "@angular/compiler";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrawCanvasComponent } from './Components/Toolbox/draw-canvas/draw-canvas.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxOpenCVModule, OpenCVConfig } from 'ngx-opencv';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { ColorPickerModule } from 'ngx-color-picker';



import { MatSliderModule, MatSliderThumb } from '@angular/material/slider';
import { HomeComponent } from './Components/home/home.component';
import { HomeCardComponent } from './Components/home-card/home-card.component';
import { SpatialFilteringComponent } from './Components/Tutorials/Images/spatial-filtering/spatial-filtering.component';
import { KernelElementComponent } from './Components/Tutorials/Images/spatial-filtering/kernel-element/kernel-element.component';
import { LabelledSlidersComponent } from './Components/labelled-sliders/labelled-sliders.component';
import { ColorSpacesComponent } from './Components/Tutorials/Images/color-spaces/color-spaces.component';
import { MorphoToolsComponent } from './Components/Tutorials/Images/morpho-tools/morpho-tools.component';
import { StructuralElementComponent } from './Components/Tutorials/Images/morpho-tools/structural-element/structural-element.component';
import { TutorialTemplateImagesComponent } from './Components/Toolbox/tutorial-template-images/tutorial-template-images.component';
import { ImageHistogramComponent } from './Components/Tutorials/Images/image-histogram/image-histogram.component';
import { WeightsLossComponent } from './Components/Tutorials/MachineLearning/weights-loss/weights-loss.component';
import { SamplingComponent } from './Components/Tutorials/OneDim/sampling/sampling.component';
import { TutorialTemplateComponent } from './Components/Toolbox/tutorial-template/tutorial-template.component';
import { LoadingButtonsComponent } from './Components/Toolbox/loading-buttons/loading-buttons.component';
import { ImagePresetsComponent } from './Components/Presets/image-presets/image-presets.component';
import { SpectralFilteringComponent } from './Components/Tutorials/Images/spectral-filtering/spectral-filtering.component';
import { HandleComponent } from './Components/Toolbox/handle/handle.component';
import { ROIComponent } from './Components/Toolbox/roi/roi.component';
import { GradientDescentComponent } from './Components/Tutorials/MachineLearning/gradient-descent/gradient-descent.component';
import { PSNRComponent } from './Components/Tutorials/Images/psnr/psnr.component';

import { FastFourierTransformComponent } from './Components/Tutorials/Images/fast-fourier-transform/fast-fourier-transform.component';
import { OptimizerComponent } from './Components/Tutorials/MachineLearning/optimizer/optimizer.component';
import { PrincipalComponentAnalysisComponent } from './Components/Tutorials/MachineLearning/principal-component-analysis/principal-component-analysis.component';
import { RegressionComponent } from './Components/Tutorials/MachineLearning/regression/regression.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
const openCVConfig: OpenCVConfig = {
  openCVDirPath: 'assets/opencv',
};


@NgModule({
  declarations: [
    GradientDescentComponent, 
    AppComponent,
    FastFourierTransformComponent,
    DrawCanvasComponent,
    HomeComponent,
    HomeCardComponent,
    SpatialFilteringComponent,
    KernelElementComponent,
    LabelledSlidersComponent,
    ColorSpacesComponent,
    MorphoToolsComponent,
    StructuralElementComponent,
    TutorialTemplateImagesComponent,
    ImageHistogramComponent,
    WeightsLossComponent,
    SamplingComponent,
    TutorialTemplateComponent,
    LoadingButtonsComponent,
    ImagePresetsComponent,
    SpectralFilteringComponent,
    PSNRComponent,
    HandleComponent,
    ROIComponent,
    OptimizerComponent,
    PrincipalComponentAnalysisComponent,
    RegressionComponent,

  ],
  imports: [
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    // NgxOpenCVModule.forRoot(openCVConfig),
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSliderThumb,
    MatButtonToggleModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    ColorPickerModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatListModule,
    MatDividerModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonModule,
    MatGridListModule,
    MatToolbarModule,
    BrowserModule,
    MatIconModule,
    MatSliderModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [provideAnimationsAsync(), 
    importProvidersFrom(NgxOpenCVModule.forRoot(openCVConfig))

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}