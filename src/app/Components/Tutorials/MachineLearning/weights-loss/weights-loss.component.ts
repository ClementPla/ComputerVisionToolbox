import { Component, OnInit } from '@angular/core';
import { Point2D } from 'src/app/utils/geometry';
import { sample_randn_2D } from 'src/app/utils/sampling';
import { EChartsOption, SeriesOption} from 'echarts';
import 'echarts-gl';
import { MatSliderChange } from '@angular/material/slider';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { clamp } from 'src/app/utils/math';

@Component({
  selector: 'app-weights-loss',
  templateUrl: './weights-loss.component.html',
  styleUrls: ['./weights-loss.component.scss']
})
export class WeightsLossComponent implements OnInit {
  x_range = [-10, 10];
  y_range = [-10, 10];
  w_max = 5
  w_min = 0
  b_max = 20
  b_min = -20
  lin_separability = true;

  positiveBorder: Array<Array<number>> = [
    [this.x_range[0], this.y_range[0]],
    [this.x_range[1], this.y_range[1]],
    [this.x_range[1], this.y_range[0]],
    [this.x_range[0], this.y_range[0]],
  ]

  negativeBorder: Array<Array<number>> = [
    [this.x_range[0], this.y_range[0]],
    [this.x_range[1], this.y_range[1]],
    [this.x_range[1], this.y_range[1]],
    [this.x_range[0], this.y_range[1]],
    [this.x_range[0], this.y_range[0]]
  ]

  w: number = 1;
  b: number = 0;
  echartInstance: any
  echartInstance3D: any

  loss_3d_data: Array<Array<number>>;

  data_chart: EChartsOption = {

    legend: {
      align: 'left',
    },
    tooltip: {},
    xAxis: {
      min:this.x_range[0],
      max:this.x_range[1]
    },
    yAxis: {
      min:this.y_range[0],
      max:this.y_range[1],
    },
    series: [
      {
        type: 'scatter',
        encode: { tooltip: [0, 1] },
        symbolSize: 5,
        color: 'green'

      },
      {
        type: 'scatter',
        encode: { tooltip: [0, 1] },
        symbolSize: 5,
        color: 'red'

      },
      {
        type:'line',
        data: this.positiveBorder,
        showSymbol: false,
        areaStyle: {
          color: 'green',
          opacity: 0.3,
        },
        color: 'black',
        z: -1,
      },
      {
        type:'line',
        data: this.negativeBorder,
        showSymbol: false,
        areaStyle: {
          color: 'red',
          opacity: 0.3,
        },
        lineStyle:{
          width: 0
        },
        z: -1,
      }
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: (idx: number) => idx,
  };


  option_3d_graph: any = {
    tooltip: {},
    visualMap: {
      show: true,
      dimension: 2,
      min: 0,
      max: 75,
      inRange: {
        color: [
          '#313695',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#fee090',
          '#fdae61',
          '#f46d43',
          '#d73027',
          '#a50026'
        ]
      }
    },
    xAxis3D: {
      type: 'value',
      name: 'W',

    },
    yAxis3D: {
      type: 'value',
      name: 'b'

    },
    zAxis3D: {
      type: 'value',
      name: 'loss',
      axisLabel: {
        show:false
      }
    },
    grid3D: {
      viewControl: {
        projection: 'orthographic'
      }
    },
    series: [
      {
        type: 'surface',
        tooltip:{
          show: false,
        },
        wireframe: {
          show: true,
        },
        data: []
      },
      {
        type:'scatter3D',
        data: [[this.w, this.b, this.compute_loss(this.w, this.b)]],
        symbolSize: 20,
      }
    ]
  };

  ptClass1 : Array<Point2D>
  ptClass2 : Array<Point2D>
  nPoints: number = 100;

  constructor() { }
  ngOnInit(): void {
    this.distribute_points()
    this.update_fx()
  }

  distribute_points(){

    if(this.lin_separability){
      this.ptClass1 = sample_randn_2D(this.nPoints, {x:5, y:-5}, {x:4, y:4})
      this.ptClass2 = sample_randn_2D(this.nPoints, {x:-5, y:5}, {x:4, y:4})

    }
    else{
      this.ptClass1 = sample_randn_2D(this.nPoints, {x:0, y:0}, {x:1, y:1})
      this.ptClass2 = sample_randn_2D(this.nPoints, {x:0, y:0}, {x:0.1, y:0.1})
      this.ptClass2.forEach((p) =>{

        let norm = Math.sqrt(p.x*p.x + p.y*p.y)
        p.x = p.x*(5+5/norm)
        p.y = p.y*(5+5/norm)
      } )

    }
    let serie1: SeriesOption = {
      data: this.ptClass1.map((p) => ({
          value: [clamp(p.x, this.x_range[0], this.x_range[1]), clamp(p.y, this.y_range[0], this.y_range[1])],
        }))
    }
    let serie2: SeriesOption = {
      data: this.ptClass2.map((p) => ({
        value: [clamp(p.x, this.x_range[0], this.x_range[1]), clamp(p.y, this.y_range[0], this.y_range[1])],
      }))
    }
    if(Array.isArray(this.data_chart.series)){
      this.data_chart.series[0].data = serie1.data
      this.data_chart.series[1].data = serie2.data
    }

    this.loss_3d_data = this.get_3D_data()
    this.option_3d_graph.series[0].data = this.loss_3d_data
    this.update_charts()
  }
  update_charts(){
      this.echartInstance?.setOption(this.data_chart)
      this.echartInstance3D?.setOption(this.option_3d_graph)

  }
  get_3D_data():Array<Array<number>>{
    let data = new Array<Array<number>>()
    let sampling = 50
    for(let i=0; i<=sampling; i++){
      for(let j=0; j<=sampling; j++){
        let w = this.w_min + i*(this.w_max-this.w_min) / sampling
        let b = this.b_min + j*(this.b_max-this.b_min) / sampling
        let l = this.compute_loss(w, b)
        data.push([w, b, l])
      }
    }

    return data;
  }
  onChartInit(ec:any){
    this.echartInstance = ec
  }

  onChartInit3D(ec:any){
    this.echartInstance3D = ec
  }

  update_b(event: MatSliderChange){
    if(event.value)
      this.b = event.value
    this.update_fx()
  }
  update_w(event: MatSliderChange){
    if(event.value)
      this.w = event.value
    this.update_fx()
  }
  update_fx(){

    let pA = [this.x_range[0], this.w * this.x_range[0] + this.b]
    let pB = [this.x_range[1], this.w * this.x_range[1] + this.b]
    this.positiveBorder[0] = pA
    this.positiveBorder[1] = pB
    this.negativeBorder[0] = pA
    this.negativeBorder[1] = pB

    this.option_3d_graph.series[1].data = [[this.w, this.b, this.compute_loss(this.w, this.b)]]
    this.update_charts()
  }

  compute_loss_v2(w:number, b:number):number{
    let loss = 0;
    let norm_w = Math.sqrt(1+w*w)
    for(let i=0; i<this.nPoints; i++){
      let pt1 = this.ptClass1[i]
      let pt2 = this.ptClass2[i]
      loss += Math.abs(pt1.y + pt1.x * w + b ) / norm_w
      loss += Math.abs(pt2.y + pt2.x * w + b ) / norm_w
    }
    return loss / this.nPoints
  }
  compute_loss(w:number, b:number):number{
    let misclassified = 0;
    let norm_w = Math.sqrt(1+w*w)
    for(let i=0; i<this.nPoints; i++){
      let pt1 = this.ptClass1[i]
      let pt2 = this.ptClass2[i]
      misclassified += +((pt1.y - pt1.x * w -b)>0)
      misclassified += +((pt2.y - pt2.x * w - b)<0)
    }
    return 100*misclassified / (this.nPoints*2)

  }

  change_points_distributions(event: MatButtonToggleChange){
    this.lin_separability = event.value == 'linear'
    this.distribute_points()
    this.update_fx()
  }


}
