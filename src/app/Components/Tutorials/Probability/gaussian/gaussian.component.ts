import { Component } from '@angular/core';
import { color, ECharts, EChartsOption } from 'echarts';
import { det, not } from 'mathjs';
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
  dimension: string = '2d';
  marginalY: number = 0;
  MAX_2D_VALUE: number = 7;
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
      text: 'p(X, Y)',
    },
    xAxis3D: {
      type: 'value',
      name: 'X',
      nameTextStyle: {
        color: '#000000',
      },
    },
    yAxis3D: {
      type: 'value',
      name: 'Y',
      nameTextStyle: {
        color: '#000000',
      },
    },
    zAxis3D: {
      type: 'value',
    },
    grid3D: {},

    legend: {
      show: true,
      orient: 'horizontal',
      left: 'center',
      top: 30,
      textStyle: {
        fontSize: 14,
        color: '#ffffffff',
      },
    },

    series: [
      {
        wireframe: false,
        // Put the surface a bit transparent
        itemStyle: {
          opacity: 0.8,
        },
        name: 'Joint p(X, Y)', // Legend label
        type: 'surface',
        parametric: true,
        parametricEquation: {
          u: {
            min: -this.MAX_2D_VALUE,
            max: this.MAX_2D_VALUE,
            step: this.step,
          },
          v: {
            min: -this.MAX_2D_VALUE,
            max: this.MAX_2D_VALUE,
            step: this.step,
          },

          x: function (u: number, v: number) {
            return u;
          },
          y: function (u: number, v: number) {
            return v;
          },
          z: this.parametricEquationZ.bind(this),
        },
      },
      {
        type: 'line3D',
        data: [], // will fill dynamically
        lineStyle: { width: 2, color: '#d45066ff' },
        name: 'Conditional p(X|Y=y₀)', // Legend label
      },
      {
        type: 'line3D',
        data: [], // will fill dynamically
        lineStyle: { width: 2, color: '#9fe41eff' },
        name: 'Conditional p(X|Y=y₀)', // Legend label
      },
    ],
  };
  option1D_combined: any = {
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
  mean1D_Y: number = 0.5;
  stdDev1D_Y: number = 1;

  mean2D: number[] = [0, 0];
  stdDev2D: number[] = [1, 1];
  rho: number = 0;

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
    this.option1D_combined = {
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
    const data_combined: [number, number][] = [];
    const step = 0.1;
    for (let x = -this.MAX_2D_VALUE; x <= this.MAX_2D_VALUE; x += step) {
      if (this.operation === 'add') {
        const mean = this.mean1D + this.mean1D_Y;
        const stdDev = Math.sqrt(
          this.stdDev1D * this.stdDev1D + this.stdDev1D_Y * this.stdDev1D_Y
        );
        const y =
          (1 / (stdDev * Math.sqrt(2 * Math.PI))) *
          Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
        data_combined.push([x, y]);
        this.option1D_combined.title! = { text: 'p(X+Y)' };
      } else if (this.operation === 'multiply') {
        const y1 =
          (1 / (this.stdDev1D * Math.sqrt(2 * Math.PI))) *
          Math.exp(-0.5 * Math.pow((x - this.mean1D) / this.stdDev1D, 2));
        const y2 =
          (1 / (this.stdDev1D_Y * Math.sqrt(2 * Math.PI))) *
          Math.exp(-0.5 * Math.pow((x - this.mean1D_Y) / this.stdDev1D_Y, 2));
        data_combined.push([x, y1 * y2]);
        this.option1D_combined.title! = { text: 'p(X) * p(Y)' };
      }
    }
    if (this.operation === 'joint') {
      this.option1D_combined = {
        title: {
          text: 'p(X, Y)',
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
                min: -this.MAX_2D_VALUE,
                max: this.MAX_2D_VALUE,
                step: this.step,
              },
              v: {
                min: -this.MAX_2D_VALUE,
                max: this.MAX_2D_VALUE,
                step: this.step,
              },

              x: function (u: number, v: number) {
                return u;
              },
              y: function (u: number, v: number) {
                return v;
              },
              z: (u: number, v: number) => {
                const cov = [
                  [this.stdDev1D * this.stdDev1D, 0],
                  [0, this.stdDev1D_Y * this.stdDev1D_Y],
                ];

                const invCov = [
                  [1 / cov[0][0], 0],
                  [0, 1 / cov[1][1]],
                ];

                const mean2D = [this.mean1D, this.mean1D_Y];

                const dx = u - mean2D[0];
                const dy = v - mean2D[1];

                const exponent =
                  -0.5 * (dx * invCov[0][0] * dx + dy * invCov[1][1] * dy);

                return (
                  (1 / (2 * Math.PI * Math.sqrt(cov[0][0] * cov[1][1]))) *
                  Math.exp(exponent)
                );
              },
            },
          },
        ],
      };
    } else {
      this.option1D_combined.series = [
        {
          type: 'line',
          showSymbol: false,
          data: data_combined,
        },
      ];
    }

    this.chart1D_combined.setOption(this.option1D_combined, true);
  }

  generateGaussian2D() {
    this.updateConditionalLine(this.marginalY);
    if (this.chart2D) {
      this.chart2D.setOption(this.option2D);
    }
  }

  parametricEquationZ(u: number, v: number): number {
    let rho = Math.min(Math.max(this.rho, -0.999), 0.999);
    const cov = [
      [
        this.stdDev2D[0] * this.stdDev2D[0],
        rho * this.stdDev2D[0] * this.stdDev2D[1],
      ],
      [
        rho * this.stdDev2D[0] * this.stdDev2D[1],
        this.stdDev2D[1] * this.stdDev2D[1],
      ],
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
  plotConditional(event: any) {
    if (event.seriesType === 'surface' && event.seriesIndex === 0) {
      const y0 = event.value[1]; // hovered Y coordinate
      this.marginalY = event.value[1];
      this.updateConditionalLine(y0);
      this.generateGaussian2D();
    }
  }

  updateConditionalLine(y0: number) {
    const rho = Math.min(Math.max(this.rho, -0.999), 0.999);
    const sigmaX = this.stdDev2D[0];
    const sigmaY = this.stdDev2D[1];
    const muX = this.mean2D[0];
    const muY = this.mean2D[1];

    const cov = [
      [sigmaX ** 2, rho * sigmaX * sigmaY],
      [rho * sigmaX * sigmaY, sigmaY ** 2],
    ];
    const det = cov[0][0] * cov[1][1] - cov[0][1] * cov[1][0];
    const invCov = [
      [cov[1][1] / det, -cov[0][1] / det],
      [-cov[1][0] / det, cov[0][0] / det],
    ];
    const muXY = muX + (cov[0][1] / cov[1][1]) * (y0 - muY);
    const covXY = cov[0][0] - (cov[0][1] * cov[1][0]) / cov[1][1];
    const points: [number, number, number][] = [];
    const XYpoints: [number, number, number][] = [];

    // Compute joint slice and accumulate for normalization
    for (let u = -this.MAX_2D_VALUE; u <= this.MAX_2D_VALUE; u += this.step) {
      const dx = u - muX;
      const dy = y0 - muY;
      const exponent =
        -0.5 *
        (dx * (invCov[0][0] * dx + invCov[0][1] * dy) +
          dy * (invCov[1][0] * dx + invCov[1][1] * dy));
      const joint = (1 / (2 * Math.PI * Math.sqrt(det))) * Math.exp(exponent);
      points.push([u, y0, joint]); // temporarily store joint
      const conditional =
        (1 / Math.sqrt(2 * Math.PI * covXY)) *
        Math.exp((-0.5 * (u - muXY) ** 2) / covXY);
      XYpoints.push([u, y0, conditional + 0.01]);
    }

    // Normalize

    this.option2D.series[1].data = points;
    this.option2D.series[1].name = `p(X, y=${y0.toFixed(2)})`;
    this.option2D.series[2].data = XYpoints;
    this.option2D.series[2].name = `p(X | y=${y0.toFixed(2)})`;
  }
}
