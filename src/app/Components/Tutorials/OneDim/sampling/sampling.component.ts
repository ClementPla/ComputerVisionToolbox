import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EChartsOption, number } from 'echarts';
import { linspace } from 'src/app/utils/sampling';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

import { fft_spectrum } from 'src/app/utils/fft';

@Component({
  selector: 'app-sampling',
  templateUrl: './sampling.component.html',
  styleUrls: ['./sampling.component.scss']
})
export class SamplingComponent implements AfterViewInit {

  n_points = 1024
  t_start = 0
  t_stop = 8
  fe = 2
  y1: boolean = true
  y2: boolean = true
  y3: boolean = true

  y1Phase: number| null = 0
  y2Phase: number|null = 2
  y3Phase: number|null = 4



  original_data: Array<Array<number>> = Array(this.n_points)
  sampled_data: Array<Array<number>> = Array(this.n_points)
  original_fft: Array<Array<number>> = Array(this.n_points)
  sampled_fft: Array<Array<number>> = Array(this.n_points)

  original_graph: EChartsOption
  sampled_graph: EChartsOption
  original_fft_graph: EChartsOption
  sampled_fft_graph: EChartsOption


  echartInstanceSampledGraph: any
  echartsInstanceOriginalGraph: any
  echartsInstanceOriginalFFTGraph: any
  echartsInstanceSampledFFTGraph: any
  

  constructor(private formBuilder: FormBuilder) {
    this.createData()
    this.update_fft_chart()

    this.initialize_echarts()

  }
  ngAfterViewInit(): void {
    this.update_fe(this.fe)


    this.update_fft_chart()
  }

  initialize_echarts() {
    let template_option: EChartsOption = {
      xAxis: {
        min: this.t_start,
        max: this.t_stop,
      },
      yAxis: {
        min: -7,
        max: 7.
      },
    }
    this.original_graph = Object.assign({}, template_option)
    this.original_graph.series = [{
      data: this.original_data,
      type: 'line',
      showSymbol: false,
      animation: false,
    },
    {
      data: this.sampled_data,
      type: 'bar',
      barWidth: 2,
    }
    ]
    this.original_graph.title = {
      text: 'Original Signal'
    }

    this.sampled_graph = Object.assign({}, template_option)
    this.sampled_graph.title = {
      text: 'Sampled Signal'
    }
    this.sampled_graph.series = [{
      data: this.sampled_data,
      type: 'line',
      showSymbol: true,
    }]
    this.sampled_fft_graph = Object.assign({}, template_option)
    this.sampled_fft_graph.title = {
      text: 'Sampled Signal FFT'
    }
    this.original_fft_graph = Object.assign({}, template_option)
    this.original_fft_graph.title = {
      text: 'Original Signal FFT'
    }
  }
  createData() {
    const t_basis = linspace(this.t_start, this.t_stop, this.n_points)
    this.original_data = new Array(this.n_points)
    for (let i = 0; i < this.n_points; i++) {
      const t = t_basis[i]
      this.original_data[i] = [t, this.signal(t)]
    }
    this.resample_signal()
    if (this.original_graph) {
      if (Array.isArray(this.original_graph.series)) {
        this.original_graph.series[0].data = this.original_data
        this.echartsInstanceOriginalGraph?.setOption(this.original_graph)
      }
    }

    this.update_fft_chart()
  }

  resample_signal() {
    let Te = 1 / this.fe
    let N = Math.round(this.t_stop / Te)
    let t_resampled = linspace(this.t_start, this.t_stop, N + 1)
    this.sampled_data = new Array(N + 1)
    for (let i = 0; i <= N; i++) {
      let t = t_resampled[i]
      this.sampled_data[i] = [t, this.signal(t)]
    }
  }
  recompute(){
    this.createData()
    this.update_fe(this.fe)
  }
  signal(t: number): number {
    const y0 = this.y1 ? Math.sin(2 * Math.PI * 0.5 * t - this.y1Phase!) * 4 : 0
    const y1 = this.y2 ? Math.sin(2 * Math.PI * 1 * t + 2 - this.y2Phase!) * 2 : 0
    const y2 = this.y3 ? Math.sin(2 * Math.PI * 4 * t + 4 - this.y3Phase!) * 1 : 0
    return y0 + y1 + y2

  }


  update_fft_chart() {
    let spectrum = fft_spectrum(this.original_data.map(x => x[1]))

    let fe = this.n_points / (this.t_stop - this.t_start)

    let graphOptions: EChartsOption = {

      xAxis: {
        min: 0,
        max: 5,
      },
      yAxis: {
        min: 0,
        max: 5.
      },
      series: [{
        data: spectrum.map((x, i) => [i * fe / this.n_points, x]),
        type: 'bar',
      }]
    }

    this.original_fft_graph = Object.assign({}, graphOptions)
    this.original_fft_graph.title = {
      text: 'Fourier Transform of the original signal'
    }
    this.echartsInstanceOriginalFFTGraph?.setOption(this.original_fft_graph)
    this.update_sampled_fft_chart()
  }

  update_sampled_fft_chart() {
    if(this.sampled_data.length == 0) {
      return
    }
    let interpolated_sampled_signal = new Array(this.n_points)
    let real_fe = this.n_points / (this.t_stop - this.t_start)
    let N = this.sampled_data.length
    let Te = 1 / this.fe
    for(let i = 0; i < this.n_points; i++) {

      let x1 = N / this.n_points * i
      let x0 = Math.floor(x1)

      if(x0 == N - 1) {
        interpolated_sampled_signal[i] = this.sampled_data[N - 1]
      } else {
        let t = x1 - x0
        interpolated_sampled_signal[i] = [this.t_start + i / real_fe, (1 - t) * this.sampled_data[x0][1] + t * this.sampled_data[x0 + 1][1]]
      }

    }
    let spectrum = fft_spectrum(interpolated_sampled_signal.map(x => x[1]))

    
    let fe = spectrum.length / (this.t_stop - this.t_start)
    let graphOptions: EChartsOption = {

      xAxis: {
        min: 0,
        max: 5,
      },
      yAxis: {
        min: 0,
        max: 5.
      },
      series: [{
        data: spectrum.map((x, i) => [i * fe / spectrum.length, x]),
        type: 'bar',
      }]
    }

    this.sampled_fft_graph = Object.assign({}, graphOptions)
    this.sampled_fft_graph.title = {
      text: 'Fourier Transform of the sampled signal'
    }
    this.echartsInstanceSampledFFTGraph?.setOption(this.sampled_fft_graph)


  }


  onSampledChartInit(evt: any) {
    this.echartInstanceSampledGraph = evt
  }
  onOriginalChartInit(evt: any) {
    this.echartsInstanceOriginalGraph = evt
  }
  onFFTChartInit(evt: any) {
    this.echartsInstanceOriginalFFTGraph = evt
  }
  onSampledFFTChartInit(evt: any) {
    this.echartsInstanceSampledFFTGraph = evt
  }
  update_fe(value: number | null) {
    if (value) {
      this.fe = value
      this.resample_signal()

      if (Array.isArray(this.sampled_graph.series)) {
        this.sampled_graph.series[0].data = this.sampled_data
        this.sampled_graph.title = {
          text: `Sampled Signal fe = ${this.fe}, N = ${this.sampled_data.length}`
        }
        this.echartInstanceSampledGraph?.setOption(this.sampled_graph)
        

        if (Array.isArray(this.original_graph.series)) {
          this.original_graph.series[1].data = this.sampled_data
          this.echartsInstanceOriginalGraph?.setOption(this.original_graph)
        
        }

      }
      this.update_fft_chart()
    }
  }


}
