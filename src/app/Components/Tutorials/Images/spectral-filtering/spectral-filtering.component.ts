import { Component, OnInit } from '@angular/core';
import { TutorialTemplateImagesComponent } from '../../../Toolbox/tutorial-template-images/tutorial-template-images.component';
import { TutorialImageClass } from '../../../Toolbox/tutorial-parents/tutorial-image';

declare var cv: any;


@Component({
  selector: 'app-spectral-filtering',
  templateUrl: './spectral-filtering.component.html',
  styleUrls: ['./spectral-filtering.component.scss']
})
export class SpectralFilteringComponent extends TutorialImageClass {

  width: number=256;

  updateFFT() {
    let src = cv.imread(this.drawCanvas.getCanvas());
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);

    // get optimal size of DFT
    let optimalRows = cv.getOptimalDFTSize(src.rows);
    let optimalCols = cv.getOptimalDFTSize(src.cols);
    let s0 = cv.Scalar.all(0);
    let padded = new cv.Mat();
    cv.copyMakeBorder(
      src,
      padded,
      0,
      optimalRows - src.rows,
      0,
      optimalCols - src.cols,
      cv.BORDER_CONSTANT,
      s0
    );

    // use cv.MatVector to distribute space for real part and imaginary part
    let plane0 = new cv.Mat();
    padded.convertTo(plane0, cv.CV_32F);
    let planes = new cv.MatVector();
    let complexI = new cv.Mat();
    let plane1 = new cv.Mat.zeros(padded.rows, padded.cols, cv.CV_32F);
    planes.push_back(plane0);
    planes.push_back(plane1);
    cv.merge(planes, complexI);

    // in-place dft transform
    cv.dft(complexI, complexI, cv.DFT_SCALE);

    // compute log(1 + sqrt(Re(DFT(img))**2 + Im(DFT(img))**2))
    cv.split(complexI, planes);
    cv.magnitude(planes.get(0), planes.get(1), planes.get(0));
    let mag = planes.get(0);
    let m1 = new cv.Mat.ones(mag.rows, mag.cols, mag.type());

    cv.add(mag, m1, mag);
    cv.log(mag, mag);

    // crop the spectrum, if it has an odd number of rows or columns
    let rect = new cv.Rect(0, 0, mag.cols & -2, mag.rows & -2);
    mag = mag.roi(rect);

    // rearrange the quadrants of Fourier image
    // so that the origin is at the image center
    let cx = mag.cols / 2;
    let cy = mag.rows / 2;
    let tmp = new cv.Mat();

    let rect0 = new cv.Rect(0, 0, cx, cy);
    let rect1 = new cv.Rect(cx, 0, cx, cy);
    let rect2 = new cv.Rect(0, cy, cx, cy);
    let rect3 = new cv.Rect(cx, cy, cx, cy);

    let q0 = mag.roi(rect0);
    let q1 = mag.roi(rect1);
    let q2 = mag.roi(rect2);
    let q3 = mag.roi(rect3);

    // exchange 1 and 4 quadrants
    q0.copyTo(tmp);
    q3.copyTo(q0);
    tmp.copyTo(q3);

    // exchange 2 and 3 quadrants
    q1.copyTo(tmp);
    q2.copyTo(q1);
    tmp.copyTo(q2);

    // The pixel value of cv.CV_32S type image ranges from 0 to 1.
    cv.normalize(mag, mag, 0, 1, cv.NORM_MINMAX);

    this.outputCanvas.drawMat(mag);
    src.delete();
    padded.delete();
    planes.delete();
    complexI.delete();
    m1.delete();
    tmp.delete();
  }

  updateIFFT(){
    let src = cv.imread(this.drawCanvas.getCanvas());
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);

    // get optimal size of DFT
    let optimalRows = cv.getOptimalDFTSize(src.rows);
    let optimalCols = cv.getOptimalDFTSize(src.cols);
    let s0 = cv.Scalar.all(0);
    let padded = new cv.Mat();
    cv.copyMakeBorder(
      src,
      padded,
      0,
      optimalRows - src.rows,
      0,
      optimalCols - src.cols,
      cv.BORDER_CONSTANT,
      s0
    );

    // use cv.MatVector to distribute space for real part and imaginary part
    let plane0 = new cv.Mat();
    padded.convertTo(plane0, cv.CV_32F);
    let planes = new cv.MatVector();
    let complexI = new cv.Mat();
    let plane1 = new cv.Mat.zeros(padded.rows, padded.cols, cv.CV_32F);
    planes.push_back(plane0);
    planes.push_back(plane1);
    cv.merge(planes, complexI);

    // in-place dft transform
    cv.dft(complexI, complexI);

    let mask = cv.imread(this.outputCanvas.getCanvas());
    cv.cvtColor(mask, mask, cv.COLOR_RGBA2GRAY, 0);

    let rect = new cv.Rect(0, 0, mask.cols & -2, mask.rows & -2);
    mask = mask.roi(rect);

    let cx = mask.cols / 2;
    let cy = mask.rows / 2;
    let tmp = new cv.Mat();

    let rect0 = new cv.Rect(0, 0, cx, cy);
    let rect1 = new cv.Rect(cx, 0, cx, cy);
    let rect2 = new cv.Rect(0, cy, cx, cy);
    let rect3 = new cv.Rect(cx, cy, cx, cy);

    let q0 = mask.roi(rect0);
    let q1 = mask.roi(rect1);
    let q2 = mask.roi(rect2);
    let q3 = mask.roi(rect3);

    // exchange 1 and 4 quadrants
    q0.copyTo(tmp);
    q3.copyTo(q0);
    tmp.copyTo(q3);

    // exchange 2 and 3 quadrants
    q1.copyTo(tmp);
    q2.copyTo(q1);
    tmp.copyTo(q2);

    let complexMask = new cv.Mat();
    cv.threshold(mask, complexMask, 0, 1, cv.THRESH_BINARY);
    complexMask.convertTo(complexMask, cv.CV_32F);
    cv.split(complexI, planes)
    console.log(complexI.type(), complexMask.type())
    cv.multiply(planes.get(0), complexMask, planes.get(0))
    cv.multiply(planes.get(1), complexMask, planes.get(1))

    cv.merge(planes, complexI);

    cv.dft(complexI, complexI, cv.DFT_INVERSE);
    cv.split(complexI, planes);
    cv.magnitude(planes.get(0), planes.get(1), planes.get(0));

    let mag = planes.get(0);
    cv.normalize(mag, mag, 0, 1, cv.NORM_MINMAX);
    this.drawCanvas.drawMat(mag);

  }
}
