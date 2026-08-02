import 'echarts-gl';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { NgxOpenCVModule, OpenCVConfig } from 'ngx-opencv';
import { NgxEchartsModule } from 'ngx-echarts';

import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import { ColorSketchModule } from 'ngx-color/sketch';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';

echarts.use([BarChart, GridComponent, CanvasRenderer]);

const openCVConfig: OpenCVConfig = {
  openCVDirPath: 'assets/opencv',
};

// Standalone components import their own Material/CommonModule pieces, so the
// only root-level providers we need are the router and the third-party module
// configs (ECharts + OpenCV). BrowserModule must NOT be imported here — its
// providers are supplied automatically by bootstrapApplication.
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      NgxEchartsModule.forRoot({ echarts }),
      ColorSketchModule,
      AppRoutingModule
    ),
    importProvidersFrom(NgxOpenCVModule.forRoot(openCVConfig)),
  ],
}).catch((err) => console.error(err));
