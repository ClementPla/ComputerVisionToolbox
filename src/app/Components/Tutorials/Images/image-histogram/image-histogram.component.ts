import { AfterViewInit, Component } from '@angular/core';
import { EChartsOption, graphic } from 'echarts';
import { TutorialImageClass } from '../../../Toolbox/tutorial-parents/tutorial-image';
import { OpenCVState } from 'ngx-opencv';
declare var cv: any;

@Component({
  selector: 'app-image-histogram',
  templateUrl: './image-histogram.component.html',
  styleUrls: ['./image-histogram.component.scss'],
})
export class ImageHistogramComponent
  extends TutorialImageClass
  implements AfterViewInit
{
  inputHistoOptions: EChartsOption;
  outputHistoOptions: EChartsOption;

  tileGridSize:number=8;
  clipLimit:number=20;
  colorspace: string = 'LAB';


  updateHistogram() {
    let src = cv.imread(this.drawCanvas.getCanvas());
    this.outputCanvas.isBWChecked = this.drawCanvas.isBW()
    if (this.drawCanvas.isBW()) {
      cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY);
      var hists = this.getHistogramFromGrayMat(src);
    } else {
      var hists = this.getHistogramFromColorMat(src);
    }
    this.inputHistoOptions = this.updateHistoChart(hists);
    src.delete();

    let dst = cv.imread(this.outputCanvas.getCanvas());
    if (this.outputCanvas.isBW()) {
      cv.cvtColor(dst, dst, cv.COLOR_RGBA2GRAY);
      var hists = this.getHistogramFromGrayMat(dst);
    } else {
      var hists = this.getHistogramFromColorMat(dst);
    }
    this.outputHistoOptions = this.updateHistoChart(hists);
    dst.delete();

  }
  updateHistoChart(hists: Array<Array<number>>): EChartsOption {
    let option: EChartsOption = {
      legend: {
        data: ['Histogram'],
        align: 'left',
        textStyle: {
          color: 'white',
        },
      },
      tooltip: {},
      xAxis: {
        data: Array.from(Array(hists[0].length).keys()),
        silent: false,
        splitLine: { show: false },
      },
      yAxis: {},
      animationEasing: 'exponentialIn',
      animationDuration: 500,
    };

    if (hists.length == 1) {
      option.series = [
        {
          name: 'Histogram',
          type: 'line',
          symbol: 'none',
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(220, 220, 220)',
              },
              {
                offset: 1,
                color: 'rgb(150, 150, 150)',
              },
            ]),
          },
          data: hists[0],
          dimensions: ['R'],
          itemStyle: {
            color: 'rgb(220, 220, 220)',
          },
        },
      ];
    } else {
      option.legend = {
        data: ['R', 'G', 'B'],
        align: 'left',
        textStyle: {
          color: 'white',
        },
      };
      option.series = [
        {
          name: 'R',
          type: 'line',
          symbol: 'none',
          itemStyle: {
            color: 'rgb(220, 100, 100)',
          },
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 68, 100)',
              },
              {
                offset: 1,
                color: 'rgb(180, 68, 100)',
              },
            ]),
          },
          data: hists[0],
        },
        {
          name: 'G',
          type: 'line',
          symbol: 'none',
          itemStyle: {
            color: 'rgb(100, 220, 100)',
          },
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(68, 255, 100)',
              },
              {
                offset: 1,
                color: 'rgb(68, 180, 100)',
              },
            ]),
          },
          data: hists[1],
        },
        {
          name: 'B',
          type: 'line',
          symbol: 'none',
          itemStyle: {
            color: 'rgb(100, 100, 220)',
          },
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(68, 100, 255)',
              },
              {
                offset: 1,
                color: 'rgb(68, 100, 180)',
              },
            ]),
          },
          data: hists[2],
        },
      ];
    }
    return option;
  }
  getHistogramFromColorMat(mat: any): Array<Array<number>> {
    let output = new Array<Array<number>>();

    let srcVec = new cv.MatVector();

    cv.split(mat, srcVec);

    let histR = new cv.Mat();
    let histG = new cv.Mat();
    let histB = new cv.Mat();

    let histSize = [256];
    let ranges = [0, 255];
    let mask = new cv.Mat();
    cv.calcHist(srcVec, [0], mask, histR, histSize, ranges, false);
    cv.calcHist(srcVec, [1], mask, histG, histSize, ranges, false);
    cv.calcHist(srcVec, [2], mask, histB, histSize, ranges, false);

    output.push(histR.data32F);
    output.push(histG.data32F);
    output.push(histB.data32F);

    for (let c = 0; c < 3; c++) {
      for (let i = 0; i < 256; i++) {
        let tab = output[c];
        tab[i] /= mat.rows * mat.cols;

        output[c] = Array.from(tab);
      }
    }
    mask.delete();
    srcVec.delete();
    histR.delete();
    histG.delete();
    histB.delete();

    return output;
  }

  getHistogramFromGrayMat(mat: any): Array<Array<number>> {
    let output = new Array<Array<number>>();

    let srcVec = new cv.MatVector();

    srcVec.push_back(mat);
    let hist = new cv.Mat();

    let histSize = [256];
    let ranges = [0, 255];
    let mask = new cv.Mat();
    cv.calcHist(srcVec, [0], mask, hist, histSize, ranges, false);

    output.push(hist.data32F);

    for (let i = 0; i < 256; i++) {
      let tab = output[0];
      tab[i] /= mat.rows * mat.cols;

      output[0] = Array.from(tab);
    }
    mask.delete();
    srcVec.delete();
    hist.delete();

    return output;
  }

  equalizeHistogram(){
    let src = cv.imread(this.drawCanvas.getCanvas());
    if(this.drawCanvas.isBW()){
      cv.cvtColor(src, src, cv.COLOR_RGB2GRAY)
      cv.equalizeHist(src, src)
    }
    else{

    switch(this.colorspace){
      case('RGB'):{

        let vec = new cv.MatVector();
        cv.split(src, vec);

        cv.equalizeHist(vec.get(0), vec.get(0));
        cv.equalizeHist(vec.get(1), vec.get(1));
        cv.equalizeHist(vec.get(2), vec.get(2));

        cv.merge(vec, src)
        vec.delete()
        break;

      }
      case('LAB'):{
        cv.cvtColor(src, src, cv.COLOR_RGB2Lab)
        let vec = new cv.MatVector();
        cv.split(src, vec);
        cv.equalizeHist(vec.get(0), vec.get(0));
        cv.merge(vec, src)
        cv.cvtColor(src, src, cv.COLOR_Lab2RGB)

        vec.delete()
        break;
      }
      case('HSV'):{
        cv.cvtColor(src, src, cv.COLOR_RGB2HSV)
        let vec = new cv.MatVector();
        cv.split(src, vec);
        cv.equalizeHist(vec.get(2), vec.get(2));
        cv.merge(vec, src)
        cv.cvtColor(src, src, cv.COLOR_HSV2RGB)

        vec.delete()
        break;
      }

    }
  }

    this.outputCanvas.drawMat(src)
    this.updateHistogram()
    src.delete()
  }

  CLAHE(){
    let src = cv.imread(this.drawCanvas.getCanvas());
    let tileGridSize = new cv.Size(this.tileGridSize, this.tileGridSize);
    let clahe = new cv.CLAHE(this.clipLimit, tileGridSize);
    if(this.drawCanvas.isBW()){
      cv.cvtColor(src, src, cv.COLOR_RGB2GRAY)
      clahe.apply(src, src)
    }
    else{

    switch(this.colorspace){
      case('RGB'):{

        let vec = new cv.MatVector();
        cv.split(src, vec);

        clahe.apply(vec.get(0), vec.get(0));
        clahe.apply(vec.get(1), vec.get(1));
        clahe.apply(vec.get(2), vec.get(2));

        cv.merge(vec, src)
        vec.delete()
        break;

      }
      case('LAB'):{
        cv.cvtColor(src, src, cv.COLOR_RGB2Lab)
        let vec = new cv.MatVector();
        cv.split(src, vec);
        clahe.apply(vec.get(0), vec.get(0));
        cv.merge(vec, src)
        cv.cvtColor(src, src, cv.COLOR_Lab2RGB)

        vec.delete()
        break;
      }
      case('HSV'):{
        cv.cvtColor(src, src, cv.COLOR_RGB2HSV)
        let vec = new cv.MatVector();
        cv.split(src, vec);
        clahe.apply(vec.get(2), vec.get(2));
        cv.merge(vec, src)
        cv.cvtColor(src, src, cv.COLOR_HSV2RGB)

        vec.delete()
        break;
      }

    }
  }

    this.outputCanvas.drawMat(src)
    this.updateHistogram()
    src.delete()
    clahe.delete()
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.ngxOpenCv.cvState.subscribe((cvState: OpenCVState) => {
      this.cvState = cvState;
      if (cvState.ready) {
        this.updateHistogram();
      }
    });
  }


}
