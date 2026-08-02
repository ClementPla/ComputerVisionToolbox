import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import { TutorialClass } from 'src/app/Components/Toolbox/tutorial-parents/tutorial';

import { FullyConnected } from '../NN/fc';
import { Network } from '../NN/network';
import { Tensor } from '../NN/tensor';
import { Identity, RELU, Sigmoid, TanH } from '../NN/activation';
import { EChartsOption } from 'echarts';
import { Datapoint, Dataset } from '../NN/dataset';
import { Trainer, TrainerConfig } from '../NN/trainer';
import { CrossEntropyLoss } from '../NN/loss';
import { SGD, Adam, RMSProp } from '../NN/optim';
import { spectral } from 'src/app/utils/colormap';
import { TutorialTemplateComponent } from '../../../Toolbox/tutorial-template/tutorial-template.component';
import { MatButton } from '@angular/material/button';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LabelledSlidersComponent } from '../../../labelled-sliders/labelled-sliders.component';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';

@Component({
    selector: 'app-gradient-descent',
    templateUrl: './gradient-descent.component.html',
    styleUrls: ['./gradient-descent.component.scss'],
    imports: [
        TutorialTemplateComponent,
        MatButton,
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        MatButtonToggleGroup,
        ReactiveFormsModule,
        FormsModule,
        MatButtonToggle,
        LabelledSlidersComponent,
        NgFor,
        NgIf,
        NgxEchartsDirective,
        NgStyle,
    ],
})
export class GradientDescentComponent
  extends TutorialClass
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('heatmapCanvas') heatmapCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('legendHeatmap') legendHeatmap: ElementRef<HTMLCanvasElement>;
  
  paramsNormsEcharts: any[] = [];
  ctx: CanvasRenderingContext2D;

  model: Network;
  dataset: Dataset = new Dataset();
  gridResolution: number = 15;
  trainer: Trainer;
  correctlyClassified: number = 0;
  inputData: Tensor;

  // Visualization update interval (fallback)
  private visualizationInterval: number | null = null;

  n_points = 150;
  n_layers = 1;
  n_neurons = 16;

  allParamsNorms: EChartsOption[];

  datasetType = 'linear';
  optimizerType = 'sgd';
  currentActivation = 'relu';

  isTraining = false;
  batch_size: number;
  heatmap: Datapoint[];

  lr: number = 0.1;
  weight_decay: number = 0.001;
  heatmapOptions: EChartsOption;
  lossOptions: EChartsOption;

  // Trainer configuration for better performance
  private readonly trainerConfig: TrainerConfig = {
    batchesPerFrame: 5,  // Process multiple batches per animation frame
    shuffle: true,
  };

  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    super();
    this.batch_size = Math.trunc(this.n_points / 2);
    this.initializeInputGrid();
  }

  /**
   * Initialize the input grid for heatmap visualization
   */
  private initializeInputGrid(): void {
    this.inputData = new Tensor(
      [this.gridResolution * this.gridResolution, 2],
      false
    );
    
    const data: number[] = [];
    for (let i = 0; i < this.gridResolution; i++) {
      for (let j = 0; j < this.gridResolution; j++) {
        const x = (i / this.gridResolution) * 2 - 1;
        const y = (j / this.gridResolution) * 2 - 1;
        data.push(x, y);
      }
    }
    this.inputData.data = data;
  }

  ngOnInit(): void {
    this.buildModel();
    this.initializeTrainer();
  }

  /**
   * Initialize the trainer with proper callbacks
   */
  private initializeTrainer(): void {
    const optimizer = this.createOptimizer();
    this.trainer = new Trainer(
      this.model,
      new CrossEntropyLoss(),
      optimizer,
      this.trainerConfig
    );
    this.setupTrainerCallbacks();
  }

  /**
   * Create optimizer based on current selection
   */
  private createOptimizer() {
    switch (this.optimizerType.toLowerCase()) {
      case 'adam':
        return new Adam(this.model, this.lr, this.weight_decay);
      case 'rmsprop':
        return new RMSProp(this.model, this.lr, this.weight_decay);
      case 'sgd':
      default:
        return new SGD(this.model, this.lr, this.weight_decay, 0.9, true);
    }
  }

  /**
   * Setup trainer callbacks for UI updates
   */
  private setupTrainerCallbacks(): void {
    this.trainer.onEpochEnd = (epoch: number, loss: number, accuracy?: number) => {
      // Run inside Angular zone for change detection
      this.ngZone.run(() => {
        this.updateLossChart();
        
        // Update params norms less frequently for performance
        if (epoch % 5 === 0) {
          this.updateParamsNormsView();
        }
        
        // Update heatmap periodically
        if (epoch % 3 === 0) {
          this.refreshVisualization();
        }
      });
    };

    this.trainer.onTrainingEnd = () => {
      this.ngZone.run(() => {
        this.isTraining = false;
        this.refreshVisualization();
        this.cdr.detectChanges();
      });
    };
  }

  /**
   * Build the neural network model
   */
  buildModel(rebuildEcharts: boolean = true): void {
    const network = new Network(false);
    
    // Input layer
    network.addLayer(new FullyConnected(2, this.n_neurons));
    network.addLayer(this.createActivationLayer());

    // Hidden layers
    for (let i = 0; i < this.n_layers; i++) {
      network.addLayer(new FullyConnected(this.n_neurons, this.n_neurons));
      network.addLayer(this.createActivationLayer());
    }
    
    // Output layer
    network.addLayer(new FullyConnected(this.n_neurons, 2, true));
    
    this.model = network;
    this.model.changeActivation(this.currentActivation);

    if (rebuildEcharts) {
      this.initializeNormCharts();
    }
  }

  /**
   * Create activation layer based on current selection
   */
  private createActivationLayer() {
    switch (this.currentActivation) {
      case 'sigmoid':
        return new Sigmoid();
      case 'tanh':
        return new TanH();
      case 'identity':
        return new Identity();
      case 'relu':
      default:
        return new RELU();
    }
  }

  /**
   * Initialize ECharts for parameter norms
   */
  private initializeNormCharts(): void {
    this.allParamsNorms = [];
    for (let i = 0; i < this.n_layers + 2; i++) {
      this.allParamsNorms.push(this.createEmptyNormChart());
    }
  }

  /**
   * Create an empty norm chart configuration
   */
  private createEmptyNormChart(maxEpoch: number = 10): EChartsOption {
    return {
      legend: {
        show: true,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      },
      tooltip: {},
      xAxis: {
        type: 'value',
        name: 'Epochs',
        min: 0,
        max: maxEpoch,
      },
      yAxis: {
        type: 'value',
        name: 'Norm',
      },
      series: [
        { data: [], type: 'line', name: 'Weights' },
        { data: [], type: 'line', name: 'Bias' },
      ],
    };
  }

  ngAfterViewInit(): void {
    this.ctx = this.heatmapCanvas.nativeElement.getContext('2d')!;
    this.buildHeatmapLegend();
    this.resetDataset();
    this.updateParamsNormsView();
    
    // Fallback visualization update interval
    this.ngZone.runOutsideAngular(() => {
      this.visualizationInterval = window.setInterval(() => {
        if (this.isTraining) {
          this.ngZone.run(() => this.refreshVisualization());
        }
      }, 150);
    });
  }

  getClosestLayer(idx: number): number {
    return Math.floor(idx / 2);
  }

  /**
   * Build the heatmap color legend
   */
  buildHeatmapLegend(): void {
    const ctx = this.legendHeatmap.nativeElement.getContext('2d')!;
    for (let i = 0; i < this.gridResolution; i++) {
      ctx.fillStyle = this.colormap(i / this.gridResolution);
      ctx.fillRect(i, 0, 1, 1);
    }
  }

  /**
   * Update parameter norms visualization
   */
  updateParamsNormsView(): void {
    if (!this.allParamsNorms || !this.trainer) return;

    const trainableLayers = this.model.trainableLayers();
    const currentEpoch = this.trainer.currentEpoch;

    trainableLayers.forEach((layer, layerIdx) => {
      const params = layer.parameters();
      if (!params) return;

      const echartOptions = this.allParamsNorms[layerIdx];
      if (!echartOptions) return;

      params.forEach((param, paramIdx) => {
        const norm = param.norm();

        if (!echartOptions.series) {
          echartOptions.series = [
            {
              data: [[currentEpoch, norm]],
              type: 'line',
              name: paramIdx === 0 ? 'Weights' : 'Bias',
            },
          ];
        } else if (Array.isArray(echartOptions.series)) {
          if (echartOptions.series.length <= paramIdx) {
            echartOptions.series.push({
              data: [[currentEpoch, norm]],
              type: 'line',
              name: paramIdx === 0 ? 'Weights' : 'Bias',
            });
          } else {
            const data = echartOptions.series[paramIdx].data as number[][];
            echartOptions.series[paramIdx].name = paramIdx === 0 ? 'Weights' : 'Bias';
            data.push([currentEpoch, norm]);
            
            // Limit data points for performance
            if (data.length > 500) {
              data.shift();
            }
          }
        }
      });

      // Update x-axis range
      const xAxis = echartOptions.xAxis as any;
      xAxis.max = currentEpoch + 10;

      this.allParamsNorms[layerIdx] = echartOptions;
      
      if (this.paramsNormsEcharts[layerIdx]) {
        this.paramsNormsEcharts[layerIdx].setOption(echartOptions);
      }
    });
  }

  /**
   * Handle number of layers change
   */
  changeNumberLayer(): void {
    if (!this.model) return;

    const wasTraining = this.isTraining;
    this.pauseTraining();

    const currentLayers = this.model.n_fc_layers() - 2;
    if (currentLayers === this.n_layers) return;

    if (this.n_layers > currentLayers) {
      // Add layers
      for (let i = 0; i < this.n_layers - currentLayers; i++) {
        this.allParamsNorms.push(
          this.createEmptyNormChart(this.trainer.currentEpoch + 10)
        );
        
        // Insert before output layer
        const insertPos = this.model.layers.length - 1;
        this.model.addLayerAtPosition(
          new FullyConnected(this.n_neurons, this.n_neurons),
          insertPos
        );
        this.model.addLayerAtPosition(
          this.createActivationLayer(),
          insertPos + 1
        );
      }
    } else {
      // Remove layers
      let nHiddenLayers = this.model.n_hidden_fc_layers();
      while (nHiddenLayers > this.n_layers) {
        this.allParamsNorms.pop();
        this.paramsNormsEcharts.splice(-1, 1);
        
        // Remove activation then FC
        this.model.removeLayerAtPosition(-2);
        this.model.removeLayerAtPosition(-2);
        nHiddenLayers--;
      }
    }

    this.trainer.optimizer.reset();

    if (wasTraining) {
      this.restartTraining();
    }
  }

  /**
   * Handle number of neurons change
   */
  changeNumberNeurons(): void {
    if (!this.n_neurons || !this.model) return;

    const wasTraining = this.isTraining;
    this.pauseTraining();

    // Rebuild input layer
    this.model.layers[0] = new FullyConnected(2, this.n_neurons);
    
    // Rebuild hidden layers
    const hiddenLayers = this.model.n_fc_layers() - 2;
    for (let i = 0; i < hiddenLayers; i++) {
      this.model.swap_fc_layers(
        i + 1,
        new FullyConnected(this.n_neurons, this.n_neurons)
      );
    }

    // Rebuild output layer
    this.model.swap_fc_layers(
      this.n_layers + 1,
      new FullyConnected(this.n_neurons, 2, true)
    );

    this.trainer.optimizer.reset();

    if (wasTraining) {
      this.restartTraining();
    }
  }

  /**
   * Reset all norm charts
   */
  resetEchartsNorms(): void {
    this.allParamsNorms = [];
    for (let i = 0; i < this.n_layers + 2; i++) {
      const chart = this.createEmptyNormChart();
      this.allParamsNorms.push(chart);
      
      if (this.paramsNormsEcharts[i]) {
        this.paramsNormsEcharts[i].setOption(chart);
      }
    }
  }

  /**
   * Handle learning rate change
   */
  changeLearningRate(): void {
    if (this.trainer?.optimizer) {
      this.trainer.optimizer.lr = this.lr;
    }
  }

  /**
   * Handle weight decay change
   */
  changeWeightDecay(): void {
    if (this.trainer?.optimizer) {
      this.trainer.optimizer.weight_decay = this.weight_decay;
    }
  }

  /**
   * Handle optimizer change
   */
  changeOptimizer(): void {
    const wasTraining = this.isTraining;
    this.pauseTraining();
    
    this.trainer.changeOptimizer(
      this.optimizerType,
      this.lr,
      this.weight_decay
    );
    
    if (wasTraining) {
      this.restartTraining();
    }
  }

  /**
   * Pause training
   */
  pauseTraining(): void {
    this.trainer?.stopTraining();
    this.isTraining = false;
  }

  /**
   * Restart training
   */
  restartTraining(): void {
    this.trainer.train(this.batch_size);
    this.isTraining = true;
  }

  /**
   * Handle activation function change
   */
  changeActivation(): void {
    if (!this.currentActivation || !this.model) return;

    const wasTraining = this.isTraining;
    this.pauseTraining();

    this.model.changeActivation(this.currentActivation);
    this.trainer.optimizer.reset();

    if (wasTraining) {
      this.restartTraining();
    }
  }

  /**
   * Add a data point on canvas click
   */
  addPoint(event: MouseEvent): void {
    const wasTraining = this.isTraining;
    this.pauseTraining();

    const rect = this.heatmapCanvas.nativeElement.getBoundingClientRect();
    const x = (2 * (event.clientX - rect.left)) / rect.width - 1;
    const y = (2 * (event.clientY - rect.top)) / rect.height - 1;
    const label = event.shiftKey ? 1 : 0;

    this.dataset.data.push(new Datapoint(x, y, label));
    this.n_points++;
    this.updateChart(false);

    if (wasTraining) {
      this.restartTraining();
    }
  }

  /**
   * Remove a data point on ctrl+click
   */
  removePoint(event: MouseEvent, idx: number): void {
    if (!event.ctrlKey || idx === -1) return;

    const wasTraining = this.isTraining;
    this.pauseTraining();

    this.dataset.data.splice(idx, 1);
    this.n_points--;
    this.updateChart(false);

    if (wasTraining) {
      this.restartTraining();
    }
  }

  /**
   * Reset the model completely
   */
  resetModel(): void {
    this.pauseTraining();
    this.paramsNormsEcharts = [];
    
    this.buildModel(true);
    this.resetEchartsNorms();
    this.initializeTrainer();
    this.trainer.setDataset(this.dataset);
    
    this.updateChart();
  }

  /**
   * Evaluate the model on the input grid for visualization
   */
  evalMap(): Datapoint[] {
    const results: Datapoint[] = [];
    const output = this.model.inference(this.inputData);
    const B = output.shape[0];

    for (let i = 0; i < B; i++) {
      results.push({
        x: this.inputData.data[i * 2],
        y: this.inputData.data[i * 2 + 1],
        label: output.data[i],
      });
    }

    return results;
  }

  /**
   * Handle batch size change
   */
  updateBatchSize(): void {
    if (!this.batch_size) return;

    if (this.isTraining) {
      this.pauseTraining();
      setTimeout(() => this.restartTraining(), 10);
    }
  }

  /**
   * Reset the dataset
   */
  resetDataset(): void {
    if (this.n_points === undefined || this.batch_size === undefined) return;

    this.batch_size = Math.min(this.n_points, this.batch_size);

    const dataset = new Dataset();
    
    switch (this.datasetType) {
      case 'circular':
        dataset.createCircularPoints(this.n_points);
        break;
      case 'spiral':
        dataset.createSpiralPoints(this.n_points);
        break;
      case 'linear':
      default:
        dataset.createLinearlySeparable(this.n_points);
        break;
    }

    if (this.trainer) {
      const wasTraining = this.isTraining;
      this.pauseTraining();
      
      this.trainer.setDataset(dataset);
      this.dataset = dataset;
      
      if (wasTraining) {
        this.restartTraining();
      }
    } else {
      this.dataset = dataset;
    }

    if (this.model) {
      this.updateChart();
    }
  }

  /**
   * Toggle training on/off
   */
  switchTraining(): void {
    if (this.isTraining) {
      this.pauseTraining();
    } else {
      this.restartTraining();
    }
  }

  /**
   * Map value to color
   */
  colormap(x: number): string {
    if (isNaN(x)) x = 0;

    const l = spectral.length;
    let idx = Math.floor(x * l);
    idx = Math.max(0, Math.min(l - 1, idx));

    const color = spectral[idx];
    return `rgb(${color[0] * 255}, ${color[1] * 255}, ${color[2] * 255})`;
  }

  /**
   * Get dataset length
   */
  getDatasetLength(): number {
    return this.dataset?.data?.length ?? 0;
  }

  /**
   * Refresh visualization (heatmap and accuracy)
   */
  private refreshVisualization(): void {
    this.heatmap = this.evalMap();
    this.correctlyClassified = this.trainer.correctlyPredicted();
    this.renderHeatmap();
  }

  /**
   * Render the heatmap to canvas
   */
  private renderHeatmap(): void {
    if (!this.heatmap || !this.ctx) return;

    for (let i = 0; i < this.gridResolution; i++) {
      for (let j = 0; j < this.gridResolution; j++) {
        const val = this.heatmap[j * this.gridResolution + i]?.label ?? 0;
        this.ctx.fillStyle = this.colormap(val);
        this.ctx.fillRect(j, i, 1, 1);
      }
    }
  }

  /**
   * Update loss chart
   */
  private updateLossChart(): void {
    this.lossOptions = {
      xAxis: {
        type: 'value',
        name: 'Epochs',
        min: 0,
        max: this.trainer.losses.length + 10,
      },
      yAxis: {
        type: 'value',
        name: 'Loss',
      },
      series: [
        {
          data: this.trainer.losses.map((loss, i) => [i, loss]),
          type: 'line',
        },
      ],
    };
  }

  /**
   * Update all charts
   */
  updateChart(recompute: boolean = true): void {
    if (recompute) {
      this.refreshVisualization();
    } else {
      this.renderHeatmap();
    }
    this.updateLossChart();
  }

  ngOnDestroy(): void {
    this.pauseTraining();
    
    if (this.visualizationInterval !== null) {
      clearInterval(this.visualizationInterval);
      this.visualizationInterval = null;
    }
  }
}