import { Component, OnInit } from '@angular/core';
import { EChartsOption, ECharts } from 'echarts';

import { TutorialClass } from '../../../Toolbox/tutorial-parents/tutorial';
import { sample_randn_2D } from '../../../../utils/sampling';
import { PCA } from '../../../../utils/linalg';


@Component({
  selector: 'app-principal-component-analysis',
  templateUrl: './principal-component-analysis.component.html',
  styleUrls: ['./principal-component-analysis.component.scss']
})
export class PrincipalComponentAnalysisComponent extends TutorialClass implements OnInit {
  echartInstance: ECharts
  // distribution: Distribution = MultivariateNormal([0, 0], [[1, 0.5], [0.5, 1]])
  distribution: any = null
  option: any| EChartsOption = {

    xAxis: {
      type: 'value',
      min: -1,
      max: 1
    },
    yAxis: {
      type: 'value',
      min: -1,
      max: 1
    },
    series: [{}]

  }
  covariance: number = 1;
  constructor() { 
    super();
  }

  ngOnInit(): void {

  }

  onChartInit(e: any) {
    this.echartInstance = e;
    this.generateData()

  }

  generateData() {
    console.log(this.covariance)

    let data = sample_randn_2D(1000, { x: 0, y: 0 }, 
      [[1, this.covariance],
      [this.covariance, 1]])
    

    let pca = PCA(data.map(d => [d.x, d.y]))

    let min = 0
    let max = 0
    data.forEach(d => {
      min = Math.min(min, d.x, d.y)
      max = Math.max(max, d.x, d.y)
    })
    let offset = Math.max(Math.abs(min), Math.abs(max))
    this.option.xAxis = {
      type: 'value',
      min: -offset,
      max: offset
    }
    this.option.yAxis = {
      type: 'value',
      min: -offset,
      max: offset
    }
    this.option.series = [{
      type: 'scatter',
      data: data.map(d => [d.x, d.y]),
      symbolSize: 5
    },
    {
      type: 'line',
      data: [[0, 0], [pca.U[0][0], pca.U[0][1]]],
    },
    {
      type: 'line',
      data: [[0, 0], [pca.U[1][0], pca.U[1][1]]],
    }
  ]

    this.echartInstance.setOption(this.option)
  }


}
