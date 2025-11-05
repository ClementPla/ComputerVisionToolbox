import { AfterViewInit, Component, ElementRef, OnInit, viewChild, ViewChild } from '@angular/core';
import { TutorialClass } from '../../../Toolbox/tutorial-parents/tutorial';
import mnist_data from '../../../../../assets/autoencoder/mnist_encoded_2D.json'
import { ECharts, EChartsOption } from 'echarts';


declare global {
  interface Window {
    ort: any; // ou mieux : typeof import('onnxruntime-web') si tu veux le typage
  }
}
const ort = window.ort;


@Component({
  selector: 'app-autoencoder',
  standalone: false,
  templateUrl: './autoencoder.component.html',
  styleUrl: './autoencoder.component.scss'
})
export class AutoencoderComponent extends TutorialClass implements OnInit, AfterViewInit {
  @ViewChild('reconstructionCanvas') reconstructionCanvas: ElementRef<HTMLCanvasElement>;
  ctxCanvas: CanvasRenderingContext2D;
  session: any;
  isready: boolean = false;
  // each row: [x, y, label]
  mnistData: Array<[number, number, number]> = mnist_data as Array<[number, number, number]>;

  scatterChartOptions: EChartsOption = {
      xAxis: { type: 'value', min: -150, max: 150 },
      yAxis: { type: 'value', min: -150, max: 150 },
      series: [{
        type: 'scatter',
        data: [],
      }],
      dataZoom: [
            {
                type: 'inside', // Enables zooming and panning with mouse wheel/pinch gestures
                xAxisIndex: [0], // Applies to the first xAxis
                start: 0, // Initial start percentage of the data range
                end: 100 // Initial end percentage of the data range
            },
            {
                type: 'slider', // Provides a visual slider for zooming and panning
                xAxisIndex: [0], // Applies to the first xAxis
                start: 0,
                end: 100
            }
        ]
    };
  scatterChartInstance: ECharts;
  

  // colors for labels 0..9 (choose any palette you prefer)
  labelColors = [
    '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
    '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
  ];

  async ngOnInit(): Promise<void> {
    await this.load_sessions();
  }
  ngAfterViewInit(): void {
    this.ctxCanvas = this.reconstructionCanvas.nativeElement.getContext('2d', {alpha: false})!;
    this.ctxCanvas.imageSmoothingEnabled = false;
  }
  async load_sessions() {
    this.session = await window.ort.InferenceSession.create(
      'assets/autoencoder/autoencoder_decoder.onnx'
    );
    this.isready = true;
    this.updateScatterPlot();
  }


  onScatterChartInit(instance: any) {
    this.scatterChartInstance = instance as ECharts;
    this.updateScatterPlot();
  }

  updateScatterPlot() {
    if (!this.scatterChartInstance) return;

    const seriesData = this.mnistData.map(([x, y, label]) => {
      const lbl = Math.max(0, Math.min(9, Math.floor(label))); // ensure valid index
      return {
        value: [x, y, lbl],
        itemStyle: {
          color: this.labelColors[lbl]
        }
      };
    });

    this.scatterChartOptions.series = [{
        type: 'scatter',
        data: seriesData,
        symbolSize: 4
      }],
    this.scatterChartInstance.setOption(this.scatterChartOptions);
  }


  onChartMouseOver(event: MouseEvent) { 
    if (!this.scatterChartInstance || !this.isready) return;

    
    // Map the event value to data point on the chart
    const dataPoint = [event.offsetX, event.offsetY] as [number, number];
    // Map into the coordinates of the echarts
    const pointInGrid = this.scatterChartInstance.convertFromPixel({ seriesIndex: 0 }, dataPoint) as [number, number];
    this.inference(pointInGrid);
  }

  inference(dataPoint: [number, number]) {
    if (!this.isready) {
      return;
    }
    const float32Array = new Float32Array(dataPoint);

    const tensor = new ort.Tensor('float32', float32Array, [1, 2]);
    this.session.run({ 'encoded_input': tensor }).then((output: any) => {
      const reconstructed = output['reconstructed_output'].data;
      
      // Draw reconstructed image on canvas
      const imageData = this.ctxCanvas.createImageData(28, 28);
      for (let i = 0; i < reconstructed.length; i++) {
        const pixelValue = Math.min(255, Math.max(0, Math.floor(reconstructed[i] * 255)));
        imageData.data[i * 4] = pixelValue;
        imageData.data[i * 4 + 1] = pixelValue;
        imageData.data[i * 4 + 2] = pixelValue;
        imageData.data[i * 4 + 3] = 255; // alpha channel
      }
      this.ctxCanvas.putImageData(imageData, 0, 0);
    });
  }
}
