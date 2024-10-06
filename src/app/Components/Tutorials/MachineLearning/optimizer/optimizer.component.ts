import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TutorialClass } from 'src/app/Components/Toolbox/tutorial-parents/tutorial';
import { color, ECharts, EChartsOption } from 'echarts';
import { ToyModel } from './toy_model';
import { Adam, Optimizer, RMSProp, SGD } from '../NN/optim';
import { min } from 'rxjs';


@Component({
  selector: 'app-optimizer',
  templateUrl: './optimizer.component.html',
  styleUrls: ['./optimizer.component.scss']
})
export class OptimizerComponent extends TutorialClass implements OnInit, AfterViewInit {

  max_steps = 100;
  simu_speed = 50;
  max_history = 25;
  step_size = 0.02;
  current_step = 0;
  initial_xy = [0.5, 0.0]
  min = -1;
  max = 1;
  noisyGradient: boolean = false;
  isTraining: boolean = false;
  trainer: NodeJS.Timeout;
  lr: number = 0.01;
  wc: number = 0.1;
  echartInstance: ECharts;
  echartLossPlotInstance: ECharts;
  _isUpdating = false;

  optimizerType = 'sgd';

  history: number[][] = [];

  model: ToyModel = new ToyModel();
  optim: Optimizer;


  option: EChartsOption = {
    // backgroundColor: '#fff',
    grid: {},
    animation: false,
    visualMap: {
      show: false,
      dimension: 2,
      seriesIndex: [0, 2],
      min: this.min,
      max: this.max,
      inRange: {
        symbolSize: [0.5, 15],
        color: [
          '#313695',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#abd9e9',
          '#abd9e9',
          '#fee090',
          '#fdae61',
          '#f46d43',
          '#d73027',
          '#a50026'
        ],
        // colorAlpha: [0.25, 1.0]
      }
    },
    xAxis3D: {
      type: 'value',
      min: this.min,
      max: this.max,
    },
    yAxis3D: {
      type: 'value',
      min: this.min,
      max: this.max

    },
    zAxis3D: {
      type: 'value',
      show: false,
      min: -1,
      max: 1
    },
    grid3D: {
      show: true,
      postEffect: {
        enable: false
      },

    },

  };

  lossPlot: EChartsOption = {
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'line',
        data: []
      }
    ]

  }
  data: any = {
    series: [
      {
        type: 'line3D',
        data: this.history,
        // color: 'black',
        visualMap: true,
        lineStyle: {
          width: 2,
          border: 'black'
        },
      },
      {
        type: 'scatter3D',
        zlevel: 10,
        data: [
          this.model.currentXYZ()
        ],
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: {
          color: 'black',
          opacity: .5
        },
      },
      {
        type: 'surface',
        wireframe: {
          show: false
        },
        dataShape: [Math.round((this.max - this.min) / this.step_size), Math.round((this.max - this.min) / this.step_size)]
      }
    ]
  }
  constructor(private cdr: ChangeDetectorRef) {
    super();
    this.model.layer1.pos.data = [... this.initial_xy]
    this.changeOptimizer();

  }


  ngOnInit(): void {

  }
  ngAfterViewInit(): void {

  }

  onChartInit(ec: ECharts) {
    this.echartInstance = ec;
    let start = this.min;
    let stop = this.max;
    let step = this.step_size;
    let data: number[][] = [];
    for (let i = start; i < stop; i += step) {
      for (let j = start; j < stop; j += step) {
        data.push([i, j, this.model.equation(i, j)]);
      }
    }
    this.data.series[2].data = data;

    requestAnimationFrame(() => {
      this.updateOption();
    });

  }
  onLossChartInit(ec: ECharts) {
    this.echartLossPlotInstance = ec;
  }

  onChartClick(event: any) {
    if (this.isTraining) {
      this.pauseTraining();
    }

    if (event.seriesType === 'surface') {
      let x = event.value[0];
      let y = event.value[1];

      this.initial_xy = [x, y]
      this.resetToInitialPoint()

    }
    if (this.isTraining) {
      this.startTraining();
    }


  }
  changeLearningRate(event: any) {

    if (this.isTraining) {
      this.pauseTraining();
    }
    this.lr = event;
    this.optim = new SGD(this.model, this.lr, this.wc);
    if (this.isTraining) {
      this.startTraining();
    }
  }

  changeOptimizer() {
    if (this.isTraining) {
      this.pauseTraining();
    }
    if (this.optimizerType === 'sgd') {
      this.optim = new SGD(this.model, this.lr, this.wc);
    }
    else if (this.optimizerType === 'Adam') {
      this.optim = new Adam(this.model, this.lr, this.wc);
    }
    else {
      this.optim = new RMSProp(this.model, this.lr, this.wc);

    }
    this.optim.reset_momentums()
    if (this.isTraining) {
      this.startTraining();
    }
  }

  switchTraining() {
    this.isTraining = !this.isTraining;

    if (this.isTraining) {
      this.startTraining();
    } else {
      clearInterval(this.trainer);
    }
  }

  pauseTraining() {
    clearInterval(this.trainer);
  }

  startTraining() {
    this.trainer = setInterval(() => {
      this.runTraining();
    }, this.simu_speed);
  }

  runTraining() {
    if (!this.isTraining) {
      clearInterval(this.trainer);
      return;
    }

    this.step();
  }

  step() {
    if (this.current_step >= this.max_steps) {
      this.resetToInitialPoint()
      return
    }

    this.model.backward();
    if (this.noisyGradient) {
      this.model.noisify_gradient(5.0);
    }
    this.optim.step();
    this.model.bound_check(this.min, this.max)

    this.history.push(this.model.currentXYZ(0.05));

    this.current_step += 1
    this.updateOption();

  }

  resetToInitialPoint() {
    this.model.layer1.pos.data = [... this.initial_xy]
    this.optim.reset_momentums()
    this.current_step = 0
    this.history = []
    this.updateOption()

  }

  updateOption() {

    this.data.series[1].data = [this.model.currentXYZ(0.05)];

    let _history = []
    for (let i = this.history.length - this.max_history; i < this.history.length; i++) {
      _history.push(this.history[i])
    }
    this.data.series[0].data = _history;

    const series = {
      series: [this.data.series[0], this.data.series[1]]
    }

    let _lossData: number[][] = []
    this.history.forEach((value, index) =>{
      _lossData.push([index, value[2]])
    })
    this.echartInstance.setOption(series, {
      notMerge: false,
      lazyUpdate: true,
      silent: true
    });
    this.echartLossPlotInstance.setOption({series:[
      {
        data: _lossData
      }
    ]})




  }

}
