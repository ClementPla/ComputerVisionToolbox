import { Component, OnInit } from '@angular/core';
import { EChartsOption, number } from 'echarts';
import { linspace } from 'src/app/utils/sampling';
@Component({
  selector: 'app-sampling',
  templateUrl: './sampling.component.html',
  styleUrls: ['./sampling.component.scss']
})
export class SamplingComponent implements OnInit {

  n_points = 1000
  t_start = 0
  t_stop = 10
  t_basis = linspace(this.t_start, this.t_stop, this.n_points)
  fe = 1

  original_data: Array<Array<number>> = Array(this.n_points)
  sampled_data: Array<Array<number>> = Array(this.n_points)
  original_fft: Array<Array<number>> = Array(this.n_points)
  sampled_fft: Array<Array<number>> = Array(this.n_points)

  original_graph: EChartsOption
  sampled_graph: EChartsOption
  echartInstanceSampledGraph: any
  original_fft_graph: EChartsOption
  sampled_fft_graph: EChartsOption

  constructor() { }

  ngOnInit(): void {
    this.fillData()

    let template_option: EChartsOption = {
      xAxis: {
        min: this.t_start,
        max: this.t_stop,
      },
      yAxis: {min:-3,
      max:5.5},
    }
    this.original_graph = Object.assign({}, template_option)
    this.original_graph.series = [{
      data:this.original_data,
      type: 'line',
      showSymbol: false,
    },
    {
      data:this.sampled_data,
      type: 'line',
      showSymbol: false,
    }
  ]

    this.sampled_graph = Object.assign({}, template_option)
    this.sampled_graph.series = [{
      data:this.sampled_data,
      type: 'line',
      showSymbol: true,
    }]

  }
  fillData(){
    for(let i=0; i<this.n_points; i++){
      let t = this.t_basis[i]
      this.original_data[i] = [t, this.signal(t)]
    }
    this.resample_signal()
  }

  resample_signal(){
    let Te = 1/this.fe
    let N = Math.round(this.t_stop/Te)
    let t_resampled = linspace(this.t_start, this.t_stop, N+1)
    this.sampled_data = new Array(N+1)
    for(let i=0; i<= N; i++){
      let t = t_resampled[i]
      this.sampled_data[i] = [t, this.signal(t)]
    }
  }

  signal(t:number):number{
    return (Math.sin(t)*5 + Math.sin(5*t) + 0.5 * Math.sin(25*t))*Math.exp(-t*0.2)
  }

  update_fe(value:number|null){
    if(value){
      this.fe = value
      this.resample_signal()

      if(Array.isArray(this.sampled_graph.series)){
        this.sampled_graph.series[0].data = this.sampled_data
        this.echartInstanceSampledGraph?.setOption(this.sampled_graph)
      }
    }
  }

  onSampledChartInit(evt:any){
    this.echartInstanceSampledGraph = evt
  }
}
