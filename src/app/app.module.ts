import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxEchartsModule } from 'ngx-echarts';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FastFourierTransformComponent } from './Components/Tutorials/fast-fourier-transform/fast-fourier-transform.component';
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
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {
  NgxMatColorPickerModule,
  MAT_COLOR_FORMATS,
  NGX_MAT_COLOR_FORMATS,
} from '@angular-material-components/color-picker';

import { MatSliderModule } from '@angular/material/slider';
import { HomeComponent } from './Components/home/home.component';
import { HomeCardComponent } from './Components/home-card/home-card.component';
import { SpatialFilteringComponent } from './Components/Tutorials/spatial-filtering/spatial-filtering.component';
import { KernelElementComponent } from './Components/Tutorials/spatial-filtering/kernel-element/kernel-element.component';
import { LabelledSlidersComponent } from './Components/labelled-sliders/labelled-sliders.component';
import { ColorSpacesComponent } from './Components/Tutorials/color-spaces/color-spaces.component';
import { MorphoToolsComponent } from './Components/Tutorials/morpho-tools/morpho-tools.component';
import { StructuralElementComponent } from './Components/Tutorials/morpho-tools/structural-element/structural-element.component';
import { TutorialTemplateImagesComponent } from './Components/Toolbox/tutorial-template-images/tutorial-template-images.component';
import { ImageHistogramComponent } from './Components/Tutorials/image-histogram/image-histogram.component';
import { WeightsLossComponent } from './Components/Tutorials/MachineLearning/weights-loss/weights-loss.component';
import { SamplingComponent } from './Components/Tutorials/OneDim/sampling/sampling.component';
import { TutorialTemplateComponent } from './Components/Toolbox/tutorial-template/tutorial-template.component';
import { LoadingButtonsComponent } from './Components/Toolbox/loading-buttons/loading-buttons.component';
import { ImagePresetsComponent } from './Components/Presets/image-presets/image-presets.component';
import { SpectralFilteringComponent } from './Components/Tutorials/spectral-filtering/spectral-filtering.component';


const openCVConfig: OpenCVConfig = {
  openCVDirPath: 'assets/opencv/',
};
@NgModule({
  declarations: [
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

  ],
  imports: [
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatButtonToggleModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    NgxMatColorPickerModule,
    MatExpansionModule,
    NgxOpenCVModule.forRoot(openCVConfig),
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
  providers: [{ provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }],
  bootstrap: [AppComponent],
})
export class AppModule {}
