// ngx-opencv is a JIT-only NgModule, so the compiler must be present at runtime
// (this was previously imported in AppModule). Without it, bootstrapping the
// NgxOpenCVModule providers throws "needs to be compiled using the JIT compiler".
import '@angular/compiler';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { NgxOpenCVModule, OpenCVConfig } from 'ngx-opencv';
import { NgxEchartsModule } from 'ngx-echarts';

import { ColorSketchModule } from 'ngx-color/sketch';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';

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
      // Load the full echarts build lazily (its own chunk, fetched on first
      // chart render). This registers every chart type and component the
      // tutorials use — including the 3D types augmented by echarts-gl — so
      // there are no "component not imported" errors, while keeping the
      // initial bundle free of echarts.
      NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
      ColorSketchModule,
      AppRoutingModule
    ),
    importProvidersFrom(NgxOpenCVModule.forRoot(openCVConfig)),
  ],
}).catch((err) => console.error(err));
