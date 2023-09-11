import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { Kernel, KernelGenerator } from './kernel';
import { TutorialTemplateImagesComponent } from '../../Toolbox/tutorial-template-images/tutorial-template-images.component';

declare var cv: any;


@Component({
  selector: 'app-spatial-filtering',
  templateUrl: './spatial-filtering.component.html',
  styleUrls: ['./spatial-filtering.component.scss'],
})
export class SpatialFilteringComponent extends TutorialTemplateImagesComponent implements AfterContentInit {

  listKernels: Array<Kernel>;

  updateFilters(){
    this.listKernels = this.listKernels.filter((value)=>{
      return !value.delete
    })
    this.applyFilter()
  }
  override ngAfterContentInit(): void {
    super.ngAfterContentInit()
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

  additiveFilter(value:number){
    this.listKernels.push(KernelGenerator.getAdditiveKernel(value))
    this.applyFilter()
  }

  multiplyFilter(value:number){
    this.listKernels.push(KernelGenerator.getMultiplicativeKernel(value))
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
        if(kernel.name=='Add'){
          dst.convertTo(dst, -1, 1, kernel.mat[0][0])
        }
        else if(kernel.name=='Multiply'){
          dst.convertTo(dst, -1, kernel.mat[0][0], 0)
        }
        else if (kernel.mat.length == 2) {
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
    cv.imshow(this.outputCanvas.getCanvas(), dst);
    mat.delete();
    dst.delete();
  }
}
