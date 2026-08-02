import 'echarts-gl';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TutorialClass } from '../../../Toolbox/tutorial-parents/tutorial';
import mnist_data_autoencoder from '../../../../../assets/autoencoder/mnist_encoded_2D.json';
import mnist_data_sparse from '../../../../../assets/autoencoder/mnist_sparse_encoded_2D.json';
import { ECharts, EChartsOption } from 'echarts';
import { linspace } from 'src/app/utils/sampling';
import { TutorialTemplateComponent } from '../../../Toolbox/tutorial-template/tutorial-template.component';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LabelledSlidersComponent } from '../../../labelled-sliders/labelled-sliders.component';
import { NgxEchartsDirective } from 'ngx-echarts';
declare global {
  interface Window {
    ort: any; // ou mieux : typeof import('onnxruntime-web') si tu veux le typage
  }
}
const ort = window.ort;

@Component({
    selector: 'app-autoencoder',
    templateUrl: './autoencoder.component.html',
    styleUrl: './autoencoder.component.scss',
    imports: [
        TutorialTemplateComponent,
        MatButtonToggleGroup,
        ReactiveFormsModule,
        FormsModule,
        MatButtonToggle,
        LabelledSlidersComponent,
        NgxEchartsDirective,
    ],
})
export class AutoencoderComponent
  extends TutorialClass
  implements OnInit, AfterViewInit
{
  @ViewChild('reconstructionCanvas')
  reconstructionCanvas: ElementRef<HTMLCanvasElement>;
  ctxCanvas: CanvasRenderingContext2D;
  conditional: number = 0;
  session: any;
  isready: boolean = false;
  modelType: string = 'regular';
  // each row: [x, y, label]
  mnistData: Array<[number, number, number]> = mnist_data_autoencoder as Array<
    [number, number, number]
  >;
  mnistDataSparse: Array<[number, number, number]> = mnist_data_sparse as Array<
    [number, number, number]
  >;
  scatterChartOptions: EChartsOption = {
    xAxis: { type: 'value', min: -75, max: 75 },
    yAxis: { type: 'value', min: -75, max: 75 },
    series: [
      {
        type: 'scatter',
        data: [],
      },
    ],
    dataZoom: [
      {
        type: 'inside', // Enables zooming and panning with mouse wheel/pinch gestures
        xAxisIndex: [0], // Applies to the first xAxis
        start: 0, // Initial start percentage of the data range
        end: 100, // Initial end percentage of the data range
      },
      {
        type: 'slider', // Provides a visual slider for zooming and panning
        xAxisIndex: [0], // Applies to the first xAxis
        start: 0,
        end: 100,
      },
    ],
  };
  scatterChartInstance: ECharts;
  gaussianDensityData = this.create2DGaussianDensityData();

  densityChartOptions: any = 
{
  xAxis3D: {
    type: 'value'
  },
  yAxis3D: {
    type: 'value'
  },
  zAxis3D: {
    type: 'value'
  },
  grid3D: {
    viewControl: {
      projection: 'orthographic'
    }
  },
  series: [{
    type: 'surface',
    wireframe: {
      show: true
    },
    data: this.gaussianDensityData,
  }]
};

  densityChartInstance: ECharts;
  // colors for labels 0..9 (choose any palette you prefer)
  labelColors = [
    '#1f77b4',
    '#ff7f0e',
    '#2ca02c',
    '#d62728',
    '#9467bd',
    '#8c564b',
    '#e377c2',
    '#7f7f7f',
    '#bcbd22',
    '#17becf',
  ];

  async ngOnInit(): Promise<void> {
    await this.load_sessions();
  }

  create2DGaussianDensityData() {
    let data: Array<[number, number, number]> = [];
    for (let x of linspace(-5, 5, 100)) {
      for (let y of linspace(-5, 5, 100)) {
        const g =
          (1 / (2 * Math.PI)) *
          Math.exp(-(Math.pow(x, 2) / 2 + Math.pow(y, 2) / 2));
        data.push([x, y, g]);
      }
    }
    return data;
  }
  ngAfterViewInit(): void {
    this.ctxCanvas = this.reconstructionCanvas.nativeElement.getContext('2d', {
      alpha: false,
    })!;
    this.ctxCanvas.imageSmoothingEnabled = false;
  }
  async load_sessions() {
    switch (this.modelType) {
      case 'sparse':
        this.session = await window.ort.InferenceSession.create(
          'assets/autoencoder/sparse_autoencoder_decoder.onnx'
        );
        break;
      case 'regular':
        this.session = await window.ort.InferenceSession.create(
          'assets/autoencoder/autoencoder_decoder.onnx'
        );
        break;
      case 'variational':
        this.session = await window.ort.InferenceSession.create(
          'assets/autoencoder/variational_autoencoder_decoder.onnx'
        );
        break;
      case 'cvae':
        this.session = await window.ort.InferenceSession.create(
          'assets/autoencoder/conditional_vae_decoder.onnx'
        );
        break;
      default:
        this.session = await window.ort.InferenceSession.create(
          'assets/autoencoder/autoencoder_decoder.onnx'
        );
        break;
    }

    this.isready = true;
    this.updateScatterPlot();
  }

  onScatterChartInit(instance: any) {
    this.scatterChartInstance = instance as ECharts;
    this.updateScatterPlot();
    this.load_sessions();
  }

  updateScatterPlot() {
    if (!this.scatterChartInstance) return;

    const seriesData = this.mnistData.map(([x, y, label]) => {
      const lbl = Math.max(0, Math.min(9, Math.floor(label))); // ensure valid index
      return {
        value: [x, y, lbl],
        itemStyle: {
          color: this.labelColors[lbl],
        },
      };
    });

    (this.scatterChartOptions.series = [
      {
        type: 'scatter',
        data: seriesData,
        symbolSize: 4,
      },
    ]),
      this.scatterChartInstance.setOption(this.scatterChartOptions);
  }

  onChartMouseOver(event: MouseEvent) {
    if (!this.scatterChartInstance || !this.isready) return;

    // Map the event value to data point on the chart
    const dataPoint = [event.offsetX, event.offsetY] as [number, number];
    // Map into the coordinates of the echarts
    const pointInGrid = this.scatterChartInstance.convertFromPixel(
      { seriesIndex: 0 },
      dataPoint
    ) as [number, number];
    this.inference(pointInGrid);
  }

  inference(dataPoint: [number, number]) {
    if (!this.isready) {
      return;
    }
    let float32Array: Float32Array;
    if (this.modelType === 'cvae') {
      // One-Hot encode the conditional label
      const oneHot = new Array(10).fill(0);
      const condIndex = Math.max(0, Math.min(9, Math.floor(this.conditional)));
      oneHot[condIndex] = 1;
      float32Array = new Float32Array([
        dataPoint[0],
        dataPoint[1],
        ...oneHot,
      ]);
    } else {
      float32Array = new Float32Array(dataPoint);
    }
    const tensor = new ort.Tensor('float32', float32Array, [1, float32Array.length]);
    try {
    this.session.run({ encoded_input: tensor }).then((output: any) => {
      const reconstructed = output['reconstructed_output'].data;

      // Draw reconstructed image on canvas
      const imageData = this.ctxCanvas.createImageData(28, 28);
      for (let i = 0; i < reconstructed.length; i++) {
        const pixelValue = Math.min(
          255,
          Math.max(0, Math.floor(reconstructed[i] * 255))
        );
        imageData.data[i * 4] = pixelValue;
        imageData.data[i * 4 + 1] = pixelValue;
        imageData.data[i * 4 + 2] = pixelValue;
        imageData.data[i * 4 + 3] = 255; // alpha channel
      }
      this.ctxCanvas.putImageData(imageData, 0, 0);
    });
  } catch (error) {
    console.error('Error during inference:', error);
    this.load_sessions();
  }
  }

  onModelChange(event: any) {
    if (event === 'sparse') {
      this.mnistData = this.mnistDataSparse;
    } else {
      this.mnistData = mnist_data_autoencoder as Array<
        [number, number, number]
      >;
    }
    this.load_sessions();
  }
  onDensityChartInit(instance: any) {
    this.densityChartInstance = instance as ECharts;
    this.updateDensityChart();
    this.load_sessions();
  }
  onDensityMouseOver(event: any) {
    this.inference([event.value[0], event.value[1]]);
  }
  updateDensityChart() {
    if (!this.densityChartInstance) return;

    this.densityChartInstance.setOption(this.densityChartOptions);
  }

  onChartTouchMove(event: any) {
    if (!this.scatterChartInstance || !this.isready) return;
    const pointInGrid = this.scatterChartInstance.convertFromPixel(
      { seriesIndex: 0 },
      [event.offsetX, event.offsetY]
    ) as [number, number];
    this.inference(pointInGrid);
  }
  
}
