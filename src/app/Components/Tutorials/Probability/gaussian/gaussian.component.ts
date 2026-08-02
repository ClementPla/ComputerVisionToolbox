import { Component } from '@angular/core';
import { color, ECharts, EChartsOption } from 'echarts';
import { Matrix } from 'src/app/lib/numpy';
import { normalPdf, MultivariateNormal } from 'src/app/lib/ml';
import { TutorialClass } from 'src/app/Components/Toolbox/tutorial-parents/tutorial';
import { TutorialTemplateComponent } from '../../../Toolbox/tutorial-template/tutorial-template.component';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { NgxEchartsDirective } from 'ngx-echarts';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { LabelledSlidersComponent } from '../../../labelled-sliders/labelled-sliders.component';
import { MatFormField, MatLabel } from '@angular/material/select';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'app-gaussian',
    templateUrl: './gaussian.component.html',
    styleUrl: './gaussian.component.scss',
    imports: [
        TutorialTemplateComponent,
        MatButtonToggleGroup,
        ReactiveFormsModule,
        FormsModule,
        MatButtonToggle,
        MatCheckbox,
        NgxEchartsDirective,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        LabelledSlidersComponent,
        MatFormField,
        MatLabel,
        MatInput,
    ],
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

  // Cached joint distribution for the 2D surface (rebuilt when params change),
  // so the covariance is inverted once per render rather than per grid point.
  private surfaceDist!: MultivariateNormal;

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
      const y = normalPdf(x, this.mean1D, this.stdDev1D * this.stdDev1D);
      data.push([x, y]);
      if (this.addSecondDistribution) {
        const y_Y = normalPdf(x, this.mean1D_Y, this.stdDev1D_Y * this.stdDev1D_Y);
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
        // Sum of independent Gaussians: means and variances add.
        const mean = this.mean1D + this.mean1D_Y;
        const variance =
          this.stdDev1D * this.stdDev1D + this.stdDev1D_Y * this.stdDev1D_Y;
        data_combined.push([x, normalPdf(x, mean, variance)]);
        this.option1D_combined.title! = { text: 'p(X+Y)' };
      } else if (this.operation === 'multiply') {
        const y1 = normalPdf(x, this.mean1D, this.stdDev1D * this.stdDev1D);
        const y2 = normalPdf(x, this.mean1D_Y, this.stdDev1D_Y * this.stdDev1D_Y);
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
                // Independent X, Y: joint is the product of the 1D marginals.
                return (
                  normalPdf(u, this.mean1D, this.stdDev1D * this.stdDev1D) *
                  normalPdf(v, this.mean1D_Y, this.stdDev1D_Y * this.stdDev1D_Y)
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
    this.surfaceDist = this.buildDist2D();
    this.updateConditionalLine(this.marginalY);
    if (this.chart2D) {
      this.chart2D.setOption(this.option2D);
    }
  }

  /** Joint N(mean2D, Σ(ρ)) for the current 2D parameters. */
  private buildDist2D(): MultivariateNormal {
    const rho = Math.min(Math.max(this.rho, -0.999), 0.999);
    const sx = this.stdDev2D[0];
    const sy = this.stdDev2D[1];
    const cov = Matrix.fromRows([
      [sx * sx, rho * sx * sy],
      [rho * sx * sy, sy * sy],
    ]);
    return new MultivariateNormal([this.mean2D[0], this.mean2D[1]], cov);
  }

  parametricEquationZ(u: number, v: number): number {
    return (this.surfaceDist ?? this.buildDist2D()).pdf([u, v]);
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

    const dist = this.surfaceDist ?? this.buildDist2D();

    // Conditional distribution p(X | Y = y0): mean shifts, variance shrinks.
    const c01 = rho * sigmaX * sigmaY;
    const c11 = sigmaY * sigmaY;
    const muXY = muX + (c01 / c11) * (y0 - muY);
    const covXY = sigmaX * sigmaX - (c01 * c01) / c11;
    const points: [number, number, number][] = [];
    const XYpoints: [number, number, number][] = [];

    for (let u = -this.MAX_2D_VALUE; u <= this.MAX_2D_VALUE; u += this.step) {
      const joint = dist.pdf([u, y0]);
      points.push([u, y0, joint]);
      const conditional = normalPdf(u, muXY, covXY);
      XYpoints.push([u, y0, conditional + 0.01]);
    }

    // Normalize

    this.option2D.series[1].data = points;
    this.option2D.series[1].name = `p(X, y=${y0.toFixed(2)})`;
    this.option2D.series[2].data = XYpoints;
    this.option2D.series[2].name = `p(X | y=${y0.toFixed(2)})`;
  }
}
