import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { OpenCVState } from 'ngx-opencv';
import { __values } from 'tslib';
import { TutorialTemplateImagesComponent } from '../../Toolbox/tutorial-template-images/tutorial-template-images.component';
import { StructuralElement } from './structuralElement';

declare var cv: any;

@Component({
  selector: 'app-morpho-tools',
  templateUrl: './morpho-tools.component.html',
  styleUrls: ['./morpho-tools.component.scss'],
})
export class MorphoToolsComponent
  extends TutorialTemplateImagesComponent
  implements AfterViewInit
{
  @ViewChild('elementCanvasVisu', { static: true })
  private eltCanvasVisu: ElementRef<HTMLCanvasElement>;
  listKernels: Array<StructuralElement> = new Array<StructuralElement>();

  ksize: number = 3;
  structuralElementType?: string = 'circle';
  width: number = 256;

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.cleanFilterList();
    this.updateVisu();
  }

  updateVisu() {
    this.ngxOpenCv.cvState.subscribe((cvState: OpenCVState) => {
      // do something with the state string
      this.cvState = cvState.state;
      if (cvState.ready) {
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
        case 'skeletonize':{
          var skel  = new cv.Mat(this.width, this.width, cv.CV_8UC1, new cv.Scalar(0))
          var tmp = new cv.Mat()
          var eroded = new cv.Mat()
          var hasConverged = false
          var maxIter = 50;
          while(!(hasConverged) && (maxIter>0)){
            cv.erode(dst, eroded, M)
            cv.dilate(eroded, tmp, M)
            cv.subtract(dst, tmp, tmp)
            cv.bitwise_or(skel, tmp, skel)
            eroded.copyTo(dst)
            hasConverged = cv.norm(dst)==0
            maxIter--;
          }
          skel.copyTo(dst)
          skel.delete()
          tmp.delete()
          eroded.delete()
          break
        }
      }
      M.delete();
    });
    this.outputCanvas.drawMat(dst);
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
