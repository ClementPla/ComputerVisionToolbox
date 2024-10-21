import { Component, OnInit } from '@angular/core';
import { ECharts, EChartsOption } from 'echarts';
import { polyfit } from 'src/app/utils/linalg';
import { arange, choice, linspace } from 'src/app/utils/math';
@Component({
  selector: 'app-regression',
  templateUrl: './regression.component.html',
  styleUrls: ['./regression.component.scss']
})
export class RegressionComponent implements OnInit {

  graphData: EChartsOption;
  charts: ECharts;
  T: number = 2
  degree: number = 5;
  polyCoefs: number[] = Array(this.degree+1).fill(0);
  xs: number[] = linspace(0, this.T*2*Math.PI, 1000);
  equation: string;
  noise: number = 0.5;
  xi: number[] = choice(this.xs, 50);
  yi: number[] = this.xi.map(x => this.noisyTrueFunction(x));
  constructor() {
    this.graphData = {
      xAxis: {
        type: 'value',
        min: 0,
        max: this.T*2*Math.PI

      },
      yAxis: {
        type: 'value',
        min: -2,
        max: 2
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
          data: this.xs.map(x => [x, this.evaluatePolynomial(x, this.polyCoefs)])
        },
        {
          name: 'True Function',
          type: 'line',
          showSymbol: false,
          // Remove symbol in the legend as well
          data: this.xs.map(x => [x, this.trueFunction(x)]),
          lineStyle: {
            opacity: 0.5,
            type: 'dashed'
          }
        },
        {
          name: 'Data',
          type: 'scatter',
          data: this.xi.map((x, i) => [x, this.yi[i]]),
          animation: false
        }
      ]
    }
   }

  ngOnInit(): void {
  }

  chartInit(e: any) {
    this.charts = e;
    this.updatePolynomial();
  }
  
  trueFunction(x: number): number {
    return Math.sin(x);
  }
  noisyTrueFunction(x: number): number {
    return this.trueFunction(x) + this.noise*(Math.random()-0.5);
  }

  evaluatePolynomial(x: number, coefs: number[]): number {
    let y = 0;
    for(let i = 0; i < coefs.length; i++){
      y += coefs[i] * Math.pow(x, i);
    }
    return y;
  }

  updatePolynomial(){

    this.polyCoefs = polyfit(this.xi, this.yi, this.degree);
    if (Array.isArray(this.graphData.series)) {
      (this.graphData.series[0] as any).data = this.xs.map(x => [x, this.evaluatePolynomial(x, this.polyCoefs)]);
    }
    this.charts.setOption(this.graphData as any);

    let equation = this.polyCoefs.map((c, i) => {
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
    }
    ).join(' ');
    this.equation = `y = ${equation}`; 

  }

  resamplePoints(){
    this.xi = choice(this.xs, 25);
    this.yi = this.xi.map(x => this.noisyTrueFunction(x));
    if (Array.isArray(this.graphData.series)) {
      (this.graphData.series[2] as any).data = this.xi.map((x, i) => [x, this.yi[i]]);
    }
    this.updatePolynomial();
  }

  rmse(): number {
    let y_pred = this.xs.map(x => this.evaluatePolynomial(x, this.polyCoefs));
    let y_true = this.xs.map(x => this.trueFunction(x));
    let sum = 0;
    for(let i = 0; i < y_pred.length; i++){
      sum += Math.pow(y_pred[i] - y_true[i], 2);
    }
    return Math.sqrt(sum / y_pred.length);

  }

  training_rmse(): number {
    let y_pred = this.xi.map(x => this.evaluatePolynomial(x, this.polyCoefs));
    let sum = 0;
    for(let i = 0; i < y_pred.length; i++){
      sum += Math.pow(y_pred[i] - this.yi[i], 2);
    }
    return Math.sqrt(sum / y_pred.length);

  }

}
