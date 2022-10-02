import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DrawCanvasComponent } from '../../Toolbox/draw-canvas/draw-canvas.component';
var lib = require('ml-fft');
var FFTUtils = lib.FFTUtils;

import { NgxOpenCVService, OpenCVState } from 'ngx-opencv';
declare var cv: any;

@Component({
  selector: 'app-fast-fourier-transform',
  templateUrl: './fast-fourier-transform.component.html',
  styleUrls: ['./fast-fourier-transform.component.scss'],
})
export class FastFourierTransformComponent implements OnInit {
  angle: number | null = 0;
  frequency: number | null = 25;
  magLog: boolean = true;
  brushSize: number = 10;
  gaussStdX: number | null = 10;
  gaussStdY: number | null = 10;
  @ViewChild('drawingCanvas') drawCanvas: DrawCanvasComponent;
  @ViewChild('fftCanvas') fftCanvas: DrawCanvasComponent;

  constructor(private ngxOpenCv: NgxOpenCVService) {}
  ngOnInit(): void {}

  drawGaussian() {
    var width = this.drawCanvas.width;
    var height = this.drawCanvas.height;
    var image = new Uint8ClampedArray(width * height * 4);
    for (let col = 0; col < height; col++) {
      for (let row = 0; row < width; row++) {
        const r = (col * width + row) * 4;
        let val =
          255 *
          Math.exp(
            -Math.pow(
              (row - height / 2) / (Math.sqrt(2) * this.gaussStdY!),
              2
            ) +
              -Math.pow((col - width / 2) / (Math.sqrt(2) * this.gaussStdX!), 2)
          );
        image[r] = val;
        image[r + 1] = val;
        image[r + 2] = val;
        image[r + 3] = 255;
      }
    }
    this.drawCanvas.drawArray(image);
  }

  drawSin() {
    var width = this.drawCanvas.width;
    var height = this.drawCanvas.height;
    var image = new Uint8ClampedArray(width * height * 4);

    for (let col = 0; col < height; col++) {
      for (let row = 0; row < width; row++) {
        const r = (col * width + row) * 4;
        const angle = (Math.PI * this.angle!) / 180;
        const direction =
          (col * Math.cos(angle) * this.frequency!) / height +
          (row * Math.sin(angle) * this.frequency!) / width;
        const val = Math.round((1 + Math.sin(Math.PI * 2 * direction)) * 127);
        image[r] = val;
        image[r + 1] = val;
        image[r + 2] = val;
        image[r + 3] = 255;
      }
    }
    this.drawCanvas.drawArray(image);
  }
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

    cv.imshow(this.fftCanvas.getCanvas(), mag);
    src.delete();
    padded.delete();
    planes.delete();
    complexI.delete();
    m1.delete();
    tmp.delete();
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
