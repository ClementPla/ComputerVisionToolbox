import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { NgxOpenCVService, OpenCVState } from 'ngx-opencv';
import { __values } from 'tslib';
import { DrawCanvasComponent } from '../../Toolbox/draw-canvas/draw-canvas.component';
import { Base2DTutorialComponent } from '../base2-dtutorial/base2-dtutorial.component';
import { StructuralElement } from './structuralElement';

declare var cv: any;

@Component({
  selector: 'app-morpho-tools',
  templateUrl: './morpho-tools.component.html',
  styleUrls: ['./morpho-tools.component.scss'],
})
export class MorphoToolsComponent
  extends Base2DTutorialComponent
  implements OnInit, AfterViewInit
{
  @ViewChild('resultCanvas') filterCanvas: DrawCanvasComponent;
  @ViewChild('elementCanvasVisu', { static: true })
  private eltCanvasVisu: ElementRef<HTMLCanvasElement>;
  listKernels: Array<StructuralElement>;

  ksize: number = 11;
  profileOptions: any;
  structuralElementType?: string = 'circle';
  private ctx: CanvasRenderingContext2D;

  override ngOnInit(): void {
    super.ngOnInit();
  }
  ngAfterViewInit(): void {
    this.cleanFilterList();
    this.updateVisu();
  }

  updateProfile() {
    const yData = this.filterCanvas.getProfile();
    this.profileOptions = {
      legend: {
        data: ['Profile'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: Array.from(Array(yData.length).keys()),
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'profile',
          type: 'line',
          areaStyle: {},
          data: yData,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
  }

  updateVisu() {
    this.ngxOpenCv.cvState.subscribe((cvState: OpenCVState) => {
      // do something with the state string
      this.cvState = cvState.state;
      if (cvState.error) {
        // handle errors
      } else if (cvState.loading) {
        // e.g. show loading indicator
      } else if (cvState.ready) {
        let mat = this.getStructuringMat(
          this.ksize,
          this.structuralElementType!
        );
        cv.convertScaleAbs(mat, mat, 255);
        let border = 32 - this.ksize;
        cv.copyMakeBorder(
          mat,
          mat,
          border,
          border,
          border,
          border,
          cv.BORDER_CONSTANT
        );
        cv.imshow(this.eltCanvasVisu.nativeElement, mat);
        mat.delete();
      }
    });
  }

  applyFilter() {
    let src = cv.imread(this.drawCanvas.getCanvas());

    let anchor = new cv.Point(-1, -1);
    let dst = new cv.Mat();
    cv.cvtColor(src, dst, cv.COLOR_RGB2GRAY);

    this.listKernels.forEach((kernel) => {
      if (!kernel.active) {
        return;
      }
      const size = kernel.size;
      let M = cv.matFromArray(size, size, cv.CV_8UC1, kernel.element);
      switch (kernel.morphOp) {
        case 'erosion': {
          cv.erode(
            dst,
            dst,
            M,
            anchor,
            1,
            cv.BORDER_CONSTANT,
            cv.morphologyDefaultBorderValue()
          );
          break;
        }
        case 'dilation': {
          cv.dilate(
            dst,
            dst,
            M,
            anchor,
            1,
            cv.BORDER_CONSTANT,
            cv.morphologyDefaultBorderValue()
          );
          break;
        }
        case 'opening': {
          cv.morphologyEx(
            dst,
            dst,
            cv.MORPH_OPEN,
            M,
            anchor,
            1,
            cv.BORDER_CONSTANT,
            cv.morphologyDefaultBorderValue()
          );
          break;
        }
        case 'closing': {
          cv.morphologyEx(dst, dst, cv.MORPH_CLOSE, M);
          break;
        }
        case 'gradient': {
          cv.morphologyEx(dst, dst, cv.MORPH_GRADIENT, M);
          break;
        }
        case 'tophat': {
          cv.morphologyEx(dst, dst, cv.MORPH_TOPHAT, M);
          break;
        }
      }
      M.delete();
    });
    this.filterCanvas.drawMat(dst);
    dst.delete();
    src.delete();
  }
  updateFilters() {
    this.listKernels = this.listKernels.filter((value) => {
      return !value.delete;
    });
    this.applyFilter();
  }
  cleanFilterList() {
    this.listKernels = new Array<StructuralElement>();
  }
  getStructuringMat(size: number, type: string) {
    let ksize = new cv.Size(size, size);

    switch (type) {
      case 'circle': {
        var mat = cv.getStructuringElement(cv.MORPH_ELLIPSE, ksize);
        break;
      }
      case 'square': {
        var mat = cv.getStructuringElement(cv.MORPH_RECT, ksize);
        break;
      }
      case 'cross': {
        var mat = cv.getStructuringElement(cv.MORPH_CROSS, ksize);
        break;
      }
    }
    return mat;
  }

  addFilter() {
    let mat = this.getStructuringMat(this.ksize, this.structuralElementType!);
    cv.convertScaleAbs(mat, mat, 255);
    let type = 'erosion';
    let n = this.listKernels.length;
    if (n > 0) {
      type = this.listKernels[n - 1].morphOp;
    }
    const element = new Uint8ClampedArray(mat.data, mat.cols, mat.rows);
    let elt: StructuralElement = {
      morphOp: type,
      size: this.ksize,
      element: element,
      active: true,
      delete: false,
    };
    this.listKernels.push(elt);
    mat.delete();
    this.updateFilters();
  }
}
