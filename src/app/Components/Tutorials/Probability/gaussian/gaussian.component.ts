import { Component } from '@angular/core';
import { ECharts, EChartsOption } from 'echarts';
import { title } from 'process';
import { TutorialClass } from 'src/app/Components/Toolbox/tutorial-parents/tutorial';

@Component({
  selector: 'app-gaussian',
  standalone: false,
  templateUrl: './gaussian.component.html',
  styleUrl: './gaussian.component.scss',
})
export class GaussianComponent extends TutorialClass {
  step = 0.25;
  dimension: string = '1d';
  option1D: EChartsOption = {
    title: {
      text: 'p(X)',
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'line',
        showSymbol: false,
        data: [],
      },
      {
        type: 'line',
        showSymbol: false,
        data: [],
      },
    ],
  };
  option2D: any = {
    title: {
      text: 'p(X)',
    },
    xAxis3D: {},
    yAxis3D: {},
    zAxis3D: {},
    grid3D: {},
    series: [
      {
        type: 'surface',
        parametric: true,
        parametricEquation: {
          u: {
            min: -7.5,
            max: 7.5,
            step: this.step,
          },
          v: {
            min: -7.5,
            max: 7.5,
            step: this.step,
          },

          x: function (u: number, v: number) {
            return u;
          },
          y: function (u: number, v: number) {
            return v;
          },
          z: this.parametricEquationZ.bind(this)
        },
      },
    ],
  };
  option1D_combined: EChartsOption = {
    title: {
      text: 'p(X, Y)',
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'value',
    },
  };
  chart1D: ECharts;
  chart2D: ECharts;

  chart1D_combined: ECharts;
  chart2D_combined: ECharts;

  mean1D: number = 0;
  stdDev1D: number = 1;
  mean1D_Y: number = 0;
  stdDev1D_Y: number = 1;

  mean2D: number[] = [0, 0];
  stdDev2D: number[] = [1, 0, 0, 1];

  mean2D_Y: number[] = [0, 0];
  stdDev2D_Y: number[] = [1, 0, 0, 1];

  addSecondDistribution: boolean = false;
  operation: string = 'add';
  constructor() {
    super();
  }
  onChartInit1D(e: any, which: string = 'main') {
    if (which === 'combined') {
      this.chart1D_combined = e;
    } else {
      this.chart1D = e;
    }

    this.generateGaussian1D();
  }

  onChartInit2D(e: any) {
    this.chart2D = e;
    this.generateGaussian2D();
  }

  generateGaussian1D() {
    const data: [number, number][] = [];
    const data_Y: [number, number][] = [];
    const step = 0.1;
    for (let x = -15; x <= 15; x += step) {
      const y =
        (1 / (this.stdDev1D * Math.sqrt(2 * Math.PI))) *
        Math.exp(-0.5 * Math.pow((x - this.mean1D) / this.stdDev1D, 2));
      data.push([x, y]);
      if (this.addSecondDistribution) {
        const y_Y =
          (1 / (this.stdDev1D_Y * Math.sqrt(2 * Math.PI))) *
          Math.exp(-0.5 * Math.pow((x - this.mean1D_Y) / this.stdDev1D_Y, 2));
        data_Y.push([x, y_Y]);
      }
    }
    if (this.addSecondDistribution) {
      this.option1D.title! = { text: 'p(X); p(Y)' };
    }

    const series = this.option1D.series;
    if (Array.isArray(series) && series[0]) {
      (series[0] as any).data = data;
      if (this.addSecondDistribution && series.length > 1) {
        (series[1] as any).data = data_Y;
      }
    } else if (series && !Array.isArray(series)) {
      (series as any).data = data;
    } else {
      return;
    }

    if (this.chart1D) {
      this.chart1D.setOption(this.option1D);
    }
    if (this.addSecondDistribution) {
      this.computeCombined1D();
    }
  }

  computeCombined1D() {
    if (!this.chart1D_combined) return;
    const data_combined: [number, number][] = [];
    const step = 0.1;
    for (let x = -15; x <= 15; x += step) {
      if (this.operation === 'add') {
        const mean = this.mean1D + this.mean1D_Y;
        const stdDev = Math.sqrt(
          this.stdDev1D * this.stdDev1D + this.stdDev1D_Y * this.stdDev1D_Y
        );
        const y =
          (1 / (stdDev * Math.sqrt(2 * Math.PI))) *
          Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
        data_combined.push([x, y]);
      } else if (this.operation === 'multiply') {
        const y1 =
          (1 / (this.stdDev1D * Math.sqrt(2 * Math.PI))) *
          Math.exp(-0.5 * Math.pow((x - this.mean1D) / this.stdDev1D, 2));
        const y2 =
          (1 / (this.stdDev1D_Y * Math.sqrt(2 * Math.PI))) *
          Math.exp(-0.5 * Math.pow((x - this.mean1D_Y) / this.stdDev1D_Y, 2));
        data_combined.push([x, y1 * y2]);
      } else if (this.operation === 'condition') {
      }
    }
    this.option1D_combined.series = [
      {
        type: 'line',
        showSymbol: false,
        data: data_combined,
      },
    ];
    this.chart1D_combined.setOption(this.option1D_combined);
  }

  generateGaussian2D() {
    if (this.chart2D) {
      this.chart2D.setOption(this.option2D);
    }
  }

  parametricEquationZ(u: number, v: number): number {
    const cov = [
      [this.stdDev2D[0] * this.stdDev2D[0], this.stdDev2D[1]],
      [this.stdDev2D[2], this.stdDev2D[3] * this.stdDev2D[3]],
    ];
    const det = cov[0][0] * cov[1][1] - cov[0][1] * cov[1][0];
    const invCov = [
      [cov[1][1] / det, -cov[0][1] / det],
      [-cov[1][0] / det, cov[0][0] / det],
    ];
    const mean2D = this.mean2D;
    return (
      (1 / (2 * Math.PI * Math.sqrt(det))) *
      Math.exp(
        -0.5 *
          ((u - mean2D[0]) *
            (invCov[0][0] * (u - mean2D[0]) + invCov[0][1] * (v - mean2D[1])) +
            (v - mean2D[1]) *
              (invCov[1][0] * (u - mean2D[0]) + invCov[1][1] * (v - mean2D[1])))
      )
    );
  }
}
