import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ECharts, EChartsOption } from 'echarts';

import { PolynomialRegression } from '../../../../lib/ml';
import { arange, choice, linspace } from '../../../../utils/math';
import { TutorialTemplateComponent } from '../../../Toolbox/tutorial-template/tutorial-template.component';
import { LabelledSlidersComponent } from '../../../labelled-sliders/labelled-sliders.component';
import { MatButton } from '@angular/material/button';
import { NgxEchartsDirective } from 'ngx-echarts';

@Component({
    selector: 'app-regression',
    templateUrl: './regression.component.html',
    styleUrls: ['./regression.component.scss'],
    imports: [
        TutorialTemplateComponent,
        LabelledSlidersComponent,
        MatButton,
        NgxEchartsDirective,
    ],
})
export class RegressionComponent implements AfterViewInit {
  graphData: EChartsOption;
  histData: EChartsOption;
  charts: ECharts;
  histogram: ECharts;
  T: number = 2;
  degree: number = 3;
  polyCoefs: number[] = Array(this.degree + 1).fill(0);
  xs: number[] = linspace(-1, 1, 1000);
  equation: string;
  noise: number = 0.5;
  train_points: number = 5;
  xi: number[] = choice(this.xs, 50);
  yi: number[] = this.xi.map((x) => this.noisyTrueFunction(x));
  lambda: number = 0.5;
  q: number = 2;

  constructor() {
    this.graphData = {
      xAxis: {
        type: 'value',
        min: -1,
        max: 1,
      },
      yAxis: {
        type: 'value',
        min: -2,
        max: 2,
      },
      legend: {
        show: true,
        orient: 'vertical',
        backgroundColor: '#ccc',
        // textStyle: {
        //   color: '#ccc'
        // }
      },
      series: [
        {
          name: 'Polynomial regression',
          type: 'line',
          showSymbol: false,
          data: this.xs.map((x) => [
            x,
            this.evaluatePolynomial(x, this.polyCoefs),
          ]),
        },
        {
          name: 'True Function',
          type: 'line',
          showSymbol: false,
          // Remove symbol in the legend as well
          data: this.xs.map((x) => [x, this.trueFunction(x)]),
          lineStyle: {
            opacity: 0.5,
            type: 'dashed',
          },
        },
        {
          name: 'Data',
          type: 'scatter',
          data: this.xi.map((x, i) => [x, this.yi[i]]),
          animation: false,
        },
      ],
    };

    this.histData = {
      xAxis: {
        type: 'value',
        min: 0,
        max: this.degree + 1,
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 5,
      },
      series: [
        {
          name: 'Weights distribution',
          type: 'bar',
          data: this.polyCoefs.map((c, i) => [i, c]),
        },
      ],
    };

    this.equation = '';
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.resamplePoints();
    }, 10);
  }

  chartInit(e: any) {
    this.charts = e;
  }

  histInit(e: any) {
    this.histogram = e;
  }

  trueFunction(x: number): number {
    return Math.sin(x * Math.PI * this.T) / 2;
  }
  noisyTrueFunction(x: number): number {
    return this.trueFunction(x) + this.noise * (Math.random() - 0.5);
  }

  evaluatePolynomial(x: number, coefs: number[]): number {
    let y = 0;
    for (let i = 0; i < coefs.length; i++) {
      y += coefs[i] * Math.pow(x, i);
    }
    return y;
  }

  updatePolynomial() {
    this.polyCoefs = new PolynomialRegression(this.degree, this.lambda, this.q)
      .fit1d(this.xi, this.yi)
      .coef;
    if (Array.isArray(this.graphData.series)) {
      (this.graphData.series[0] as any).data = this.xs.map((x) => [
        x,
        this.evaluatePolynomial(x, this.polyCoefs),
      ]);
    }
    this.charts.setOption(this.graphData as any);
    let maxCoef = Math.max(...this.polyCoefs.map((c) => c));
    let minCoef = Math.min(...this.polyCoefs.map((c) => c));
    // Floor and ceil to nearest integer
    maxCoef = Math.ceil(maxCoef * 1.01);
    minCoef = Math.floor(minCoef * 1.01);
    this.histogram.setOption({
      xAxis: {
        min: 0,
        max: this.degree + 1,
      },
      yAxis: {
        min: minCoef,
        max: maxCoef,
      },
      series: [
        {
          data: this.polyCoefs.map((c, i) => [i, c]),
        },
      ],
    });

    let equation = this.polyCoefs
      .map((c, i) => {
        let string_c = Math.abs(c).toFixed(1);
        if (c === 0) {
          return '';
        }
        if (i === 0) {
          return `${c > 0 ? '' : '-'}${string_c}`;
        }
        if (i === 1) {
          return `${c > 0 ? '+' : '-'} ${string_c}x`;
        }
        return `${c > 0 ? '+' : '-'} ${string_c}x^${i}`;
      })
      .join(' ');

    this.equation = `y = ${equation}`;
  }

  resamplePoints() {
    this.xi = choice(this.xs, this.train_points);
    this.yi = this.xi.map((x) => this.noisyTrueFunction(x));
    if (Array.isArray(this.graphData.series)) {
      (this.graphData.series[2] as any).data = this.xi.map((x, i) => [
        x,
        this.yi[i],
      ]);
    }
    this.updatePolynomial();
  }

  rmse(): number {
    let y_pred = this.xs.map((x) => this.evaluatePolynomial(x, this.polyCoefs));
    let y_true = this.xs.map((x) => this.trueFunction(x));
    let sum = 0;
    for (let i = 0; i < y_pred.length; i++) {
      sum += Math.pow(y_pred[i] - y_true[i], 2);
    }
    return Math.sqrt(sum / y_pred.length);
  }

  training_rmse(): number {
    let y_pred = this.xi.map((x) => this.evaluatePolynomial(x, this.polyCoefs));
    let sum = 0;
    for (let i = 0; i < y_pred.length; i++) {
      sum += Math.pow(y_pred[i] - this.yi[i], 2);
    }
    return Math.sqrt(sum / y_pred.length);
  }
}
