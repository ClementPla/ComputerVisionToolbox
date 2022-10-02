import { Component, OnInit, ViewChild } from '@angular/core';
import { DrawCanvasComponent } from '../../Toolbox/draw-canvas/draw-canvas.component';
import { Kernel, KernelGenerator } from './kernel';
import { NgxOpenCVService, OpenCVState} from 'ngx-opencv';

declare var cv: any;


@Component({
  selector: 'app-spatial-filtering',
  templateUrl: './spatial-filtering.component.html',
  styleUrls: ['./spatial-filtering.component.scss'],
})
export class SpatialFilteringComponent implements OnInit {
  @ViewChild('drawingCanvas') drawCanvas: DrawCanvasComponent;
  @ViewChild('resultCanvas') filterCanvas: DrawCanvasComponent;

  listKernels: Array<Kernel>;
  cvState: string;
  constructor(private ngxOpenCv: NgxOpenCVService) {

  }
  updateFilters(){
    this.listKernels = this.listKernels.filter((value)=>{
      return !value.delete
    })
    this.applyFilter()
  }
  ngOnInit(): void {
    this.listKernels = new Array<Kernel>();
  }

  laplacianFilter(){
    this.listKernels.push(KernelGenerator.getLaplacianKernel())
    this.applyFilter()

  }

  gaussianBlur(width: number, stdX: number, stdY: number) {
    this.listKernels.push(
      KernelGenerator.getGaussianKernel(width, width, stdX, stdY)
    );
    this.applyFilter()
  }
  meanFilter(size:number){
    this.listKernels.push(KernelGenerator.getMeanKernel(size, size))
    this.applyFilter()
  }
  prewittFilter() {
    this.listKernels.push(KernelGenerator.getPrewittKernels());
    this.applyFilter()
  }
  sobelFilter() {
    this.listKernels.push(KernelGenerator.getSobelKernels());
    this.applyFilter()
  }
  cleanFilterList() {
    this.listKernels = new Array<Kernel>();
    this.applyFilter()
  }

  applyFilter() {
    let mat = cv.imread(this.drawCanvas.getCanvas());
    let dst = new cv.Mat();

    mat.convertTo(dst, cv.CV_32F, 1/255.)
    cv.cvtColor(dst, dst, cv.COLOR_RGB2GRAY);

    this.listKernels.forEach((kernel) => {
      if (kernel.active) {
        if (kernel.mat.length == 2) {
          let matKernel = cv.matFromArray(
            kernel.width,
            kernel.height,
            cv.CV_32F,
            kernel.mat[0]
          );
          let localdst = new cv.Mat();
          cv.filter2D(dst, localdst, -1, matKernel);
          cv.pow(localdst, 2, localdst)
          matKernel = cv.matFromArray(
            kernel.width,
            kernel.height,
            cv.CV_32F,
            kernel.mat[1]
          );
          let localdst2 = new cv.Mat();
          cv.filter2D(dst, localdst2, -1, matKernel);
          cv.pow(localdst2, 2, localdst2)
          cv.add(localdst, localdst2, dst)
          cv.pow(dst, 0.5, dst)
          matKernel.delete();
          localdst.delete()
          localdst2.delete()

        }
        else {
          let matKernel = cv.matFromArray(
            kernel.width,
            kernel.height,
            cv.CV_32F,
            kernel.mat[0]
          );
          cv.filter2D(dst, dst, -1, matKernel);
          matKernel.delete();
        }
      }
    });
    cv.convertScaleAbs(dst, dst, 255)
    cv.imshow(this.filterCanvas.getCanvas(), dst);
    mat.delete();
    dst.delete();
  }

  loadSelectedFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          this.drawCanvas.drawImage(img);
        };
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
