import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
  NgZone,
} from '@angular/core';
import { TutorialClass } from '../../../Toolbox/tutorial-parents/tutorial';

import { ECharts, EChartsOption } from 'echarts';
import { ToyModel } from './toy_model';
import { Adam, Optimizer, RMSProp, SGD } from '../NN/optim';
import { TutorialTemplateComponent } from '../../../Toolbox/tutorial-template/tutorial-template.component';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/list';
import { LabelledSlidersComponent } from '../../../labelled-sliders/labelled-sliders.component';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { NgxEchartsDirective } from 'ngx-echarts';

type OptimizerType = 'sgd' | 'adam' | 'rmsprop';

@Component({
    selector: 'app-optimizer',
    templateUrl: './optimizer.component.html',
    styleUrls: ['./optimizer.component.scss'],
    imports: [
        TutorialTemplateComponent,
        MatButton,
        MatDivider,
        LabelledSlidersComponent,
        MatButtonToggleGroup,
        ReactiveFormsModule,
        FormsModule,
        MatButtonToggle,
        MatCheckbox,
        NgxEchartsDirective,
    ],
})
export class OptimizerComponent
  extends TutorialClass
  implements OnInit, AfterViewInit, OnDestroy
{
  // Configuration
  max_steps = 100;
  simu_speed = 50;
  max_history = 25;
  step_size = 0.02;
  min = -1;
  max = 1;

  // State
  current_step = 0;
  initial_xy = [0.5, 0.0];
  noisyGradient = false;
  isTraining = false;
  private isDestroyed = false;

  // Optimizer settings
  optimizerType: OptimizerType = 'sgd';
  lr = 0.01;
  wc = 0.1;

  // Model & Optimizer
  model: ToyModel = new ToyModel();
  optim: Optimizer;

  // Visualization
  history: number[][] = [];
  private echartInstance: ECharts | null = null;
  private echartLossPlotInstance: ECharts | null = null;
  private chartsReady = false;

  // Training loop
  private trainerId: number | null = null;

  // ECharts options
  option: EChartsOption = {
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
          '#313695', '#4575b4', '#74add1', '#abd9e9', '#abd9e9',
          '#abd9e9', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026',
        ],
      },
    },
    xAxis3D: { type: 'value', min: this.min, max: this.max },
    yAxis3D: { type: 'value', min: this.min, max: this.max },
    zAxis3D: { type: 'value', show: false, min: -1, max: 1 },
    grid3D: {
      show: true,
      postEffect: { enable: false },
    },
  };

  lossPlot: EChartsOption = {
    xAxis: { type: 'value' },
    yAxis: { type: 'value' },
    series: [{ type: 'line', data: [] }],
  };

  data: any = {
    series: [
      {
        type: 'line3D',
        data: this.history,
        visualMap: true,
        lineStyle: { width: 2, border: 'black' },
      },
      {
        type: 'scatter3D',
        zlevel: 10,
        data: [],
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: { color: 'black', opacity: 0.5 },
      },
      {
        type: 'surface',
        wireframe: { show: false },
        dataShape: [
          Math.round((this.max - this.min) / this.step_size),
          Math.round((this.max - this.min) / this.step_size),
        ],
      },
    ],
  };

  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    super();
    this.model.layer1.pos.data = [...this.initial_xy];
    this.initializeOptimizer();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.isDestroyed = true;
    this.stopTraining();
    this.disposeCharts();
  }

  // ==================== Optimizer ====================

  private initializeOptimizer(): void {
    switch (this.optimizerType) {
      case 'adam':
        this.optim = new Adam(this.model, this.lr, this.wc);
        break;
      case 'rmsprop':
        this.optim = new RMSProp(this.model, this.lr, this.wc);
        break;
      case 'sgd':
      default:
        this.optim = new SGD(this.model, this.lr, this.wc);
        break;
    }
    this.optim.reset();
  }

  changeOptimizer(): void {
    const wasTraining = this.isTraining;
    this.stopTraining();

    this.initializeOptimizer();

    if (wasTraining) {
      this.startTraining();
    }
  }

  changeLearningRate(value: number): void {
    this.lr = value;
    if (this.optim) {
      this.optim.lr = this.lr;
    }
  }

  changeWeightDecay(value: number): void {
    this.wc = value;
    if (this.optim) {
      this.optim.weight_decay = this.wc;
    }
  }

  // ==================== Charts ====================

  private disposeCharts(): void {
    this.chartsReady = false;

    if (this.echartInstance) {
      try {
        if (!this.echartInstance.isDisposed()) {
          this.echartInstance.dispose();
        }
      } catch (e) {
        // Ignore - context may be lost
      }
      this.echartInstance = null;
    }

    if (this.echartLossPlotInstance) {
      try {
        if (!this.echartLossPlotInstance.isDisposed()) {
          this.echartLossPlotInstance.dispose();
        }
      } catch (e) {
        // Ignore
      }
      this.echartLossPlotInstance = null;
    }
  }

  private canUpdateCharts(): boolean {
    if (this.isDestroyed || !this.chartsReady) return false;
    if (!this.echartInstance) return false;
    
    try {
      return !this.echartInstance.isDisposed();
    } catch {
      return false;
    }
  }

  onChartInit(ec: any): void {
    if (this.isDestroyed) return;

    this.echartInstance = ec;

    // Generate surface data
    const surfaceData: number[][] = [];
    for (let i = this.min; i < this.max; i += this.step_size) {
      for (let j = this.min; j < this.max; j += this.step_size) {
        surfaceData.push([i, j, this.model.equation(i, j)]);
      }
    }
    this.data.series[2].data = surfaceData;

    // Wait for next frame to ensure chart is ready
    requestAnimationFrame(() => {
      if (!this.isDestroyed) {
        this.checkChartsReady();
      }
    });
  }

  onLossChartInit(ec: any): void {
    if (this.isDestroyed) return;
    this.echartLossPlotInstance = ec;
    this.checkChartsReady();
  }

  private checkChartsReady(): void {
    if (this.echartInstance && this.echartLossPlotInstance && !this.isDestroyed) {
      this.chartsReady = true;
      this.updateVisualization();
    }
  }

  onChartClick(event: any): void {
    if (event.seriesType !== 'surface') return;

    const wasTraining = this.isTraining;
    this.stopTraining();

    this.initial_xy = [event.value[0], event.value[1]];
    this.resetToInitialPoint();

    if (wasTraining) {
      this.startTraining();
    }
  }

  // ==================== Training ====================

  switchTraining(): void {
    if (this.isTraining) {
      this.stopTraining();
    } else {
      this.startTraining();
    }
  }

  private stopTraining(): void {
    this.isTraining = false;
    if (this.trainerId !== null) {
      clearInterval(this.trainerId);
      this.trainerId = null;
    }
  }

  private startTraining(): void {
    if (this.isDestroyed) return;

    this.isTraining = true;

    // Run outside Angular zone for performance
    this.ngZone.runOutsideAngular(() => {
      this.trainerId = window.setInterval(() => {
        if (this.isDestroyed || !this.isTraining) {
          this.stopTraining();
          return;
        }
        this.runTrainingStep();
      }, this.simu_speed);
    });
  }

  private runTrainingStep(): void {
    if (this.current_step >= this.max_steps) {
      this.ngZone.run(() => this.resetToInitialPoint());
      return;
    }

    // Gradient computation
    this.model.backward();

    if (this.noisyGradient) {
      this.model.noisify_gradient(5.0);
    }

    // Optimizer step
    this.optim.step();
    this.model.bound_check(this.min, this.max);

    // Record history
    this.history.push(this.model.currentXYZ(0.05));
    this.current_step++;

    // Update visualization in Angular zone
    this.ngZone.run(() => this.updateVisualization());
  }

  step(): void {
    if (this.isDestroyed) return;

    if (this.current_step >= this.max_steps) {
      this.resetToInitialPoint();
      return;
    }

    this.model.backward();

    if (this.noisyGradient) {
      this.model.noisify_gradient(5.0);
    }

    this.optim.step();
    this.model.bound_check(this.min, this.max);

    this.history.push(this.model.currentXYZ(0.05));
    this.current_step++;

    this.updateVisualization();
  }

  resetToInitialPoint(): void {
    this.model.layer1.pos.data = [...this.initial_xy];
    this.optim.reset();
    this.current_step = 0;
    this.history = [];
    this.updateVisualization();
  }

  // ==================== Visualization ====================

  private updateVisualization(): void {
    if (!this.canUpdateCharts()) return;

    try {
      // Current position
      this.data.series[1].data = [this.model.currentXYZ(0.05)];

      // Recent history (last max_history points)
      const startIdx = Math.max(0, this.history.length - this.max_history);
      this.data.series[0].data = this.history.slice(startIdx);

      // Update 3D chart
      this.echartInstance!.setOption(
        { series: [this.data.series[0], this.data.series[1]] },
        { notMerge: false, lazyUpdate: true, silent: true }
      );

      // Update loss plot
      this.updateLossPlot();
    } catch (error) {
      // Skip this frame on error
      console.warn('Visualization update error:', error);
    }
  }

  private updateLossPlot(): void {
    if (!this.echartLossPlotInstance) return;

    try {
      if (this.echartLossPlotInstance.isDisposed()) return;

      const lossData = this.history.map((val, idx) => [idx, val[2]]);
      this.echartLossPlotInstance.setOption({
        series: [{ data: lossData }],
      });
    } catch {
      // Ignore
    }
  }

  // ==================== Settings ====================

  changeSimulationSpeed(value: number): void {
    this.simu_speed = value;

    if (this.isTraining) {
      this.stopTraining();
      this.startTraining();
    }
  }

  toggleNoisyGradient(): void {
    this.noisyGradient = !this.noisyGradient;
  }
}