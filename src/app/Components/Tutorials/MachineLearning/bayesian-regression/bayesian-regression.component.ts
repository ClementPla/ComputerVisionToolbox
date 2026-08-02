import 'echarts-gl';
import { AfterViewInit, Component } from '@angular/core';
import { TutorialClass } from 'src/app/Components/Toolbox/tutorial-parents/tutorial';
import { color, ECharts } from 'echarts';
import { Matrix } from 'src/app/lib/numpy';
import { BayesianLinearRegression } from 'src/app/lib/ml';
import { sampleGaussian2D } from 'src/app/utils/sampling';
import { TutorialTemplateComponent } from '../../../Toolbox/tutorial-template/tutorial-template.component';
import { LabelledSlidersComponent } from '../../../labelled-sliders/labelled-sliders.component';
import { MatButton } from '@angular/material/button';
import { NgxEchartsDirective } from 'ngx-echarts';
@Component({
    selector: 'app-bayesian-regression',
    templateUrl: './bayesian-regression.component.html',
    styleUrl: './bayesian-regression.component.scss',
    imports: [
        TutorialTemplateComponent,
        LabelledSlidersComponent,
        MatButton,
        NgxEchartsDirective,
    ],
})
export class BayesianRegressionComponent
  extends TutorialClass
  implements AfterViewInit
{
  a0: number = -0.5;
  a1: number = 0.5;
  nObservations: number = 1;
  maxObservations: number = 20;
  std_noise: number = 0.2;

  std_prior: number = 1.0;

  observations: number[][] = [];
  precomputedRandomObservation: number[] = [];
  targets: number[] = [];

  x_min: number = -2;
  x_max: number = 2;
  Mn: number[];
  Sn: number[][];

  priorInstance: ECharts;
  likelihoodInstance: ECharts;
  posteriorInstance: ECharts;
  dataSpaceInstance: ECharts;
  priorChart: any = this.getInitChart3D('Prior distribution');
  likelihoodChart: any = this.getInitChart3D(
    'Likelihood from the last observation'
  );
  posteriorChart: any = this.getInitChart3D('Posterior distribution');
  dataSpaceChart: any = this.getInitChart2D('Data Space');

  constructor() {
    super();
    this.priorChart['visualMap'] = this.getVisualMap(0, 0.3);
    this.likelihoodChart['visualMap'] = this.getVisualMap(0, 0.3);
    this.posteriorChart['visualMap'] = this.getVisualMap(0, 0.3);
    this.resampleObservations();
    this.updatePosteriorParameters();
  }
  private getVisualMap(min: number, max: number) {
    return {
      min: min,
      max: max,
      calculable: true,
      realtime: false,
      dimension: 2,
      inRange: {
        color: [
          '#313695',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#e0f3f8',
          '#ffffbf',
          '#fee090',
          '#fdae61',
          '#f46d43',
          '#d73027',
          '#a50026',
        ],
      },
    };
  }
  private getInitChart3D(title: string) {
    return {
      title: { text: title, textStyle: { color: 'white' } },
      xAxis3D: { axisLabel: { color: 'white' } },
      yAxis3D: { axisLabel: { color: 'white' } },
      zAxis3D: { axisLabel: { color: 'white' } },
      grid3D: {},
    };
  }
  private getInitChart2D(title: string) {
    return {
      title: {
        text: title,
        textStyle: { color: 'white' },
      },
      xAxis: {
        type: 'value',
        min: this.x_min,
        max: this.x_max,
        axisLabel: {
          color: 'white',
        },
      },
      yAxis: {
        type: 'value',
        min: this.x_min,
        max: this.x_max,
        axisLabel: {
          color: 'white',
        },
      },
    };
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateCharts(this.nObservations);
    }, 100);
  }

  getChartSeries(zFunc: (u: number, v: number) => number) {
    return {
      type: 'surface',
      parametric: true,
      parametricEquation: {
        u: {
          min: this.x_min,
          max: this.x_max,
          step: 0.05,
        },
        v: {
          min: this.x_min,
          max: this.x_max,
          step: 0.05,
        },
        x: function (u: number, v: number) {
          return u;
        },
        y: function (u: number, v: number) {
          return v;
        },
        z: zFunc,
      },
    };
  }
  onPriorChartInit(ec: any) {
    this.priorInstance = ec;
  }
  onLikelihoodChartInit(ec: any) {
    this.likelihoodInstance = ec;
  }
  onPosteriorChartInit(ec: any) {
    this.posteriorInstance = ec;
  }

  onDataSpaceChartInit(ec: any) {
    this.dataSpaceInstance = ec;
  }

  updatePrior() {
    if (!this.priorInstance) {
      return;
    }

    this.priorInstance.setOption(
      {
        series: [
          this.getChartSeries(
            ((std_prior) => {
              return function (u: number, v: number) {
                return (
                  Math.exp(-(u * u + v * v) / (2 * std_prior * std_prior)) /
                  (2 * Math.PI)
                );
              };
            })(this.std_prior)
          ),
        ],
      },
      { notMerge: false, lazyUpdate: true }
    );
  }

  changeStdPrior(event: number) {
    this.std_prior = event;
    this.updateCharts(this.nObservations);
  }

  computeLikelihood(w0: number, w1: number, start = 0): number {
    // Handle the case where std_noise is zero (no noise)
    if (this.std_noise === 0) {
      return 0;
    }
    let beta = (1 / this.std_noise) ** 2; // Precision of the noise
    let likelihood = 1;
    let error = 0;
    // Compute the log-likelihood of the data given parameters w0, w1
    for (let i = start; i < this.nObservations; i++) {
      let x = this.observations[i][1];
      let y = this.targets[i];
      let y_pred = w0 + w1 * x;
      let residual = y - y_pred;
      error += residual * residual;
    }
    likelihood *= Math.exp((-beta * error) / 2);

    // Add the normalization constant for the Gaussian likelihood
    likelihood *=
      Math.sqrt(beta / (2 * Math.PI)) ** (this.nObservations - start);
    // Return the actual likelihood (not log-likelihood)
    return likelihood;
  }

  updateLikelihood() {
    if (!this.likelihoodInstance) {
      return;
    }

    this.likelihoodInstance.setOption(
      {
        series: [
          this.getChartSeries(
            ((component) => {
              return function (u: number, v: number) {
                return component.computeLikelihood(
                  u,
                  v,
                  component.nObservations - 1
                );
              };
            })(this)
          ),
        ],
      },
      { notMerge: false, lazyUpdate: true }
    );
  }

  updatePosterior() {
    if (!this.posteriorInstance) {
      return;
    }
    this.updatePosteriorParameters();
    this.posteriorInstance.setOption(
      {
        series: [
          this.getChartSeries(
            ((component) => {
              return function (u: number, v: number) {
                // Likelihood multiplied by prior (both Gaussian)
                let likelihood = component.computeLikelihood(u, v);
                let prior =
                  Math.exp(-(u * u + v * v) / (2 * component.std_prior ** 2)) /
                  (2 * Math.PI * component.std_prior * component.std_prior);
                return likelihood * prior;
              };
            })(this)
          ),
        ],
      },
      { notMerge: false, lazyUpdate: true }
    );
  }

  updateCharts(event: number) {
    this.nObservations = event;
    this.updatePosteriorParameters();
    this.updatePrior();
    this.updateLikelihood();
    this.updatePosterior();
    this.updateDataSpace();
  }

  updatePosteriorParameters() {
    const beta = (1 / this.std_noise) ** 2; // noise precision
    const alpha = 1 / (this.std_prior * this.std_prior); // prior precision

    // Design matrix Φ (rows are [1, x]) and targets for the observed points.
    const n = this.nObservations;
    const Phi = new Matrix(n, 2);
    const y = new Array<number>(n);
    for (let i = 0; i < n; i++) {
      Phi.setRow(i, this.observations[i]);
      y[i] = this.targets[i];
    }

    const model = new BayesianLinearRegression(alpha, beta).fit(Phi, y);
    this.Mn = model.mean;
    this.Sn = model.cov.toArray();
  }

  updateDataSpace() {
    if (!this.dataSpaceInstance) {
      return;
    }

    let sampleLines = sampleGaussian2D(
      5,
      { x: this.Mn[0], y: this.Mn[1] },
      this.Sn
    );

    let series: any[] = [
      {
        type: 'scatter',
        data: this.observations
          .slice(0, this.nObservations)
          .map((obs, i) => [obs[1], this.targets[i]]),
        itemStyle: {
          color: 'red',
        },
        symbolSize: 10,
      },
      {
        type: 'line',
        data: [
          [this.x_min, this.a0 + this.a1 * this.x_min],
          [this.x_max, this.a0 + this.a1 * this.x_max],
        ],
        lineStyle: {
          width: 2,
          type: 'dashed',
          color: 'black',
        },
        smooth: true,
        showSymbol: false,
      },
    ];
    for (let line of sampleLines) {
      series.push({
        type: 'line',
        data: [
          [this.x_min, line.x + line.y * this.x_min],
          [this.x_max, line.x + line.y * this.x_max],
        ],
        lineStyle: {
          width: 2,
          opacity: 0.5,
          color: 'blue',
        },
        smooth: true,
        showSymbol: false,
      });
    }

    this.dataSpaceInstance.setOption(
      {
        series: series,
      },
      { notMerge: false, lazyUpdate: false }
    );
  }

  resampleData(event: number) {
    this.std_noise = event;
    this.observations = [];
    this.targets = [];
    for (let i = 0; i < this.maxObservations; i++) {
      let x = Math.random() * (this.x_max - this.x_min) + this.x_min;
      let noise = (Math.random() - 0.5) * this.std_noise * 2;
      let y = this.a0 + this.a1 * x + noise;
      this.observations.push([1, x]);
      this.targets.push(y);
    }
    this.updateCharts(this.nObservations);
  }

  resampleObservations() {
    this.observations = [];
    this.targets = [];
    for (let i = 0; i < this.maxObservations; i++) {
      let x = Math.random() * (this.x_max - this.x_min) + this.x_min;
      let noise = (Math.random() - 0.5) * this.std_noise * 2;
      let y = this.a0 + this.a1 * x + noise;
      this.observations.push([1, x]);
      this.targets.push(y);
    }
    this.updateCharts(this.nObservations);
  }
}
