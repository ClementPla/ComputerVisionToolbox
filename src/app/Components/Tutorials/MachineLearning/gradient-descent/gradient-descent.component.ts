import { AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TutorialClass } from 'src/app/Components/Toolbox/tutorial-parents/tutorial';

import { FullyConnected } from '../NN/fc';

import { Network } from '../NN/network';
import { Tensor } from '../NN/tensor';
import { Activation, Identity, RELU, Sigmoid, Softmax, TanH } from '../NN/activation';
import { ECharts, EChartsOption } from 'echarts';
import { Datapoint, Dataset } from '../NN/dataset';
import { Trainer } from '../NN/trainer';
import { CrossEntropyLoss, MSELoss } from '../NN/loss';
import { SGD } from '../NN/optim';
import { spectral } from 'src/app/utils/colormap';

interface Point {
  x: number;
  y: number;
  label: number;
}


@Component({
  selector: 'app-gradient-descent',
  templateUrl: './gradient-descent.component.html',
  styleUrls: ['./gradient-descent.component.scss'],
})
export class GradientDescentComponent extends TutorialClass implements OnInit, AfterViewInit {

  @ViewChild('heatmapCanvas') heatmapCanvas: ElementRef<HTMLCanvasElement>;

  paramsNormsEcharts: ECharts[] = []
  ctx: CanvasRenderingContext2D;

  model: Network;
  dataset: Dataset = new Dataset();
  gridResolution: number = 25;
  trainer: Trainer;
  correctlyClassified: number = 0;

  trainTimeout: NodeJS.Timeout;
  n_points = 150
  n_layers = 2
  n_neurons = 32

  allParamsNorms: EChartsOption[];

  datasetType = 'linear'
  optimizerType = 'sgd'
  currentActivation = 'relu'

  isTraining = false
  batch_size = Math.trunc(this.n_points / 2)
  heatmap: Datapoint[];

  lr: number = 0.1
  weight_decay: number = 0.001
  heatmapOptions: EChartsOption;
  lossOptions: EChartsOption;
  constructor(public cdr: ChangeDetectorRef) {
    super()
  }

  ngOnInit(): void {

    this.buildModel()
    let optimizer = new SGD(this.model, this.lr, 0.00001, 0.1, true)
    this.trainer = new Trainer(this.model, new CrossEntropyLoss(), optimizer)

  }
  buildModel(rebuildEcharts: boolean = true) {
    let network = new Network(false)
    network.addLayer(new FullyConnected(2, this.n_neurons))
    network.addLayer(new RELU())

    for (let i = 0; i < this.n_layers; i++) {
      network.addLayer(new FullyConnected(this.n_neurons, this.n_neurons))
      network.addLayer(new RELU())
    }
    network.addLayer(new FullyConnected(this.n_neurons, 2, true))
    this.model = network
    this.model.changeActivation(this.currentActivation)

    if (rebuildEcharts) {
      this.allParamsNorms = []


      for (let i = 0; i < this.n_layers + 2; i++) {
        this.allParamsNorms.push(
          {
            legend: {
              show: true,
              backgroundColor: 'rgba(255, 255, 255, 0.5)',

            },
            tooltip: {},
            xAxis: {
              type: 'value',
              name: 'Epochs',
              min: 0,
            },
            yAxis: {
              type: 'value',
              name: 'Norm'
            },
            series: [
              {
                data: [],
                type: 'line'
              }
            ]
          }

        )
      }
    }
  }

  ngAfterViewInit(): void {
    this.ctx = this.heatmapCanvas.nativeElement.getContext('2d')!
    this.resetDataset()
    this.updateParamsNormsView()
    setInterval(() => {
      if (this.isTraining) {
        this.updateChart()
      }
    }, 50)

    setInterval(() => {
      if (this.isTraining) {
        this.updateParamsNormsView()
      }
    }, 1000)

  }
  getClosestLayer(idx: number) {
    return Math.floor(idx / 2)
  }
  updateParamsNormsView() {
    if(!this.allParamsNorms){
      return
    }
    let trainableLayers = this.model.trainableLayers()
    let current_epoch = this.trainer.currentEpoch
    trainableLayers.forEach((layer, i) => {
      let params = layer.parameters()
      if (!params) {
        return
      }

      let echartParams: EChartsOption = this.allParamsNorms[i]
      if (!echartParams) {
        return
      }
      params.forEach((param, j) => {
        let norm = param.norm()

        if (!echartParams.series) {
          echartParams.series = [
            {
              data: [[current_epoch, norm]],
              type: 'line',
              name: j == 0 ? 'Weights' : 'Bias'
            }
          ]
        }
        else {

          if (Array.isArray(echartParams.series)) {
            if (echartParams.series.length <= j) {
              echartParams.series.push({
                data: [[current_epoch, norm]],
                type: 'line',
                name: j == 0 ? 'Weights' : 'Bias'

              })
            }
            else {
              let data = echartParams.series[j].data! as number[][]
              echartParams.series[j].name! = j == 0 ? 'Weights' : 'Bias'
              data.push([current_epoch, norm])

            }
          }

        }
      })
      let xAxis = echartParams.xAxis as any
      xAxis.max = current_epoch + 10
      this.allParamsNorms[i] = echartParams;
      if (this.paramsNormsEcharts[i]) {
        this.paramsNormsEcharts[i].setOption(echartParams)
      }



    })
    this.cdr.detectChanges()

  }

  changeNumberLayer() {
    if (!this.model) {
      return
    }
    if (this.isTraining) {
      this.trainer.stopTraining()
    }
    let current_layers = this.model.n_fc_layers() - 2
    if (this.model.n_fc_layers() == this.n_layers) {
      return
    }
    if (this.n_layers > current_layers) {
      for (let i = 0; i < this.n_layers - current_layers; i++) {
        this.allParamsNorms.push(
          {
            legend: {
              show: true,
              backgroundColor: 'rgba(255, 255, 255, 0.5)',

            },
            tooltip: {},
            xAxis: {
              type: 'value',
              name: 'Epochs',
              min: 0,
              max: this.trainer.currentEpoch + 10
            },
            yAxis: {
              type: 'value',
              name: 'Norm'
            },
            series: [
              {
                data: [[0, 0]],
                type: 'line'
              }
            ]
          }
        )
        this.model.addLayerAtPosition(new FullyConnected(this.n_neurons, this.n_neurons), -1)
        if (this.currentActivation == 'relu') {
          this.model.addLayerAtPosition(new RELU(), -1)
        }
        else if (this.currentActivation == 'sigmoid') {
          this.model.addLayerAtPosition(new Sigmoid(), -1)
        }
        else if (this.currentActivation == 'tanh') {
          this.model.addLayerAtPosition(new TanH(), -1)
        }
        else {
          this.model.addLayerAtPosition(new Identity(), -1)
        }
      }
    }
    else {
      let n_hidden_layers = this.model.n_hidden_fc_layers()
      while (n_hidden_layers > this.n_layers) {
        this.allParamsNorms.pop()
        this.paramsNormsEcharts.splice(-1, 1)
        this.model.removeLayerAtPosition(-2) // Remove FC
        this.model.removeLayerAtPosition(-2) // Remove Activation
        n_hidden_layers--
      }

    }

    this.trainer.optimizer.reset_momentums()

    if (this.isTraining) {
      this.trainer.train(this.batch_size)
    }

    this.cdr.detectChanges()
  }

  changeNumberNeurons() {
    if (!this.n_neurons) {
      return
    }
    if (!this.model) {
      return
    }
    this.pauseTraining()

    this.model.layers[0] = new FullyConnected(2, this.n_neurons)
    let hidden_layers = this.model.n_fc_layers() - 2
    for (let i = 0; i < hidden_layers; i++) {
      this.model.swap_fc_layers(i + 1, new FullyConnected(this.n_neurons, this.n_neurons))
    }

    this.model.swap_fc_layers(this.n_layers + 1, new FullyConnected(this.n_neurons, 2, true))

    this.trainer.optimizer.reset_momentums()
    if (this.isTraining) {
      this.trainer.train(this.batch_size)
    }
    this.cdr.detectChanges()

  }

  resetEchartsNorms() {
    this.allParamsNorms = []
    for (let i = 0; i < this.n_layers + 2; i++) {
      this.allParamsNorms.push(
        {
          legend: {
            show: true,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',

          },
          tooltip: {},
          xAxis: {
            type: 'value',
            name: 'Epochs',
            min: 0,
          },
          yAxis: {
            type: 'value',
            name: 'Norm'
          },
          series: [
            {
              data: [],
              type: 'line'
            }
          ]
        }
      )
      if(this.paramsNormsEcharts[i]){
        this.paramsNormsEcharts[i].setOption(this.allParamsNorms[i])
      }
    }
  
  }

  changeLearningRate() {

    this.trainer.optimizer.lr = this.lr

  }

  changeWeightDecay() {
    this.trainer.optimizer.weight_decay = this.weight_decay
  }

  changeOptimizer() {
    this.pauseTraining()
    this.trainer.changeOptimizer(this.optimizerType, this.lr, this.weight_decay)
    if (this.isTraining) {
      this.restartTraining()
    }


  }
  pauseTraining() {
    this.trainer.stopTraining()
  }
  restartTraining() {
    this.trainer.train(this.batch_size)
    this.isTraining = true
  }

  changeActivation() {
    if (!this.currentActivation) {
      return
    }
    if (!this.model) {
      return
    }
    this.pauseTraining()

    this.model.changeActivation(this.currentActivation)
    this.trainer.optimizer.reset_momentums()
    if (this.isTraining) {
      this.trainer.train(this.batch_size)
    }
    this.cdr.detectChanges()
  }

  addPoint(event: MouseEvent) {
    let isTraining = this.isTraining
    this.isTraining = false
    this.trainer.stopTraining()
    let rect = this.heatmapCanvas.nativeElement.getBoundingClientRect()
    let x = 2 * (event.clientX - rect.left) / rect.width - 1
    let y = 2 * (event.clientY - rect.top) / rect.height - 1
    let label = event.shiftKey ? 1 : 0
    this.dataset.data.push(new Datapoint(x, y, label))
    this.n_points++
    this.updateChart(false)
    if (this.isTraining) {
      this.trainer.train(this.batch_size)
    }
    this.isTraining = isTraining
    this.cdr.detectChanges()

  }

  removePoint(event: MouseEvent, idx: number) {
    if (!event.ctrlKey) {
      return
    }
    let isTraining = this.isTraining

    this.isTraining = false
    this.trainer.stopTraining()

    if (idx != -1) {
      this.dataset.data.splice(idx, 1)
      this.n_points--
      this.updateChart(false)
      if (this.isTraining) {
        this.trainer.train(this.batch_size)
      }
      this.isTraining = isTraining
      this.cdr.detectChanges()
    }
  }

  resetModel() {
    this.paramsNormsEcharts = []
    this.buildModel(true)
    this.resetEchartsNorms()
    let optimizer = new SGD(this.model, this.lr, 0.00001, 0.1, true)
    this.trainer = new Trainer(this.model, new CrossEntropyLoss(), optimizer)

    this.trainer.setDataset(this.dataset)
    this.updateChart()

  }

  evalMap(): Datapoint[] {
    this.pauseTraining()
    let data = []
    let input = new Tensor([this.gridResolution * this.gridResolution, 2], false)
    for (let i = 0; i < this.gridResolution; i++) {
      for (let j = 0; j < this.gridResolution; j++) {
        let x = (i / this.gridResolution) * 2 - 1
        let y = (j / this.gridResolution) * 2 - 1

        data.push([x, y])
      }
    }
    input.data = data.flat()
    let results = []
    let output = this.model.inference(input)
    let B = output.shape[0]
    for (let i = 0; i < B; i++) {
      let pred = output.data[i]
      let result: Datapoint = { x: data[i][0], y: data[i][1], label: pred }
      results.push(result)

    }
    if (this.isTraining) {
      this.restartTraining()
    }

    return results

  }

  updateBatchSize() {
    if (this.batch_size) {
      if (this.isTraining) {
        this.trainer.stopTraining()
        this.trainer.train(this.batch_size)
      }
    }
  }

  resetDataset() {
    if (this.n_points === undefined || this.batch_size === undefined) {
      return
    }
    let dataset = new Dataset()
    if (this.datasetType == 'circular') {
      dataset.createCircularPoints(this.n_points);
    }
    else if (this.datasetType == 'linear') {
      dataset.createLinearlySeparable(this.n_points);
    }
    else if (this.datasetType == 'spiral') {
      dataset.createSpiralPoints(this.n_points);
    }
    if (this.trainer) {
      this.trainer.stopTraining()
      this.trainer.setDataset(dataset)
      this.dataset = dataset
      if (this.isTraining) {
        this.trainer.train(this.batch_size)
      }
    }
    if (this.model) {
      this.updateChart()
    }
    this.cdr.detectChanges()
  }

  switchTraining() {
    if (this.isTraining) {
      this.isTraining = false
      this.trainer.stopTraining()
    }
    else {
      this.isTraining = true
      this.trainer.train(this.batch_size)
    }

  }

  colormap(x: number) {
    let l = spectral.length
    let idx = Math.floor(x * l)
    idx = Math.min(l - 1, idx)
    idx = Math.max(0, idx)
    let color = spectral[idx]
    return `rgb(${color[0] * 255}, ${color[1] * 255}, ${color[2] * 255})`
  }

  getDatasetLength() {
    if(!this.dataset){
      return 0
    }
    return this.dataset.data.length
  }


  updateChart(recompute: boolean = true) {
    if (recompute) {
      this.heatmap = this.evalMap()
      this.correctlyClassified = this.trainer.correctlyPredicted()
    }
    for (let i = 0; i < this.gridResolution; i++) {
      for (let j = 0; j < this.gridResolution; j++) {
        let val = this.heatmap[j * this.gridResolution + i].label
        this.ctx.fillStyle = this.colormap(val)
        this.ctx.fillRect(j, i, 1, 1)

      }
    }
    this.lossOptions = {
      xAxis: {
        type: 'value',
        name: 'Epochs',
        min: 0,
        max: this.trainer.losses.length + 10
      },
      yAxis: {
        type: 'value',
        name: 'Loss'
      },
      series: [
        {
          data: this.trainer.losses.map((x, i) => [i, x]),
          type: 'line'
        }
      ]
    }
    this.cdr.detectChanges()


  }

}
