import { AfterViewInit, Component } from '@angular/core';
import { TutorialImageClass } from 'src/app/Components/Toolbox/tutorial-parents/tutorial-image';
import { getColorValueToHex } from 'src/app/utils/colormap';
import { SVGElementInterface } from 'src/app/utils/interface';
import { TutorialTemplateImagesComponent } from '../../../Toolbox/tutorial-template-images/tutorial-template-images.component';
import { LabelledSlidersComponent } from '../../../labelled-sliders/labelled-sliders.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';
import { DrawCanvasComponent } from '../../../Toolbox/draw-canvas/draw-canvas.component';
declare var cv: any;

@Component({
    selector: 'app-hough-transform',
    templateUrl: './hough-transform.component.html',
    styleUrl: './hough-transform.component.scss',
    imports: [TutorialTemplateImagesComponent, LabelledSlidersComponent, MatCheckbox, MatButton, DrawCanvasComponent]
})
export class HoughTransformComponent extends TutorialImageClass implements AfterViewInit {

  detectionThreshold: number = 100;
  num_thetas = 180;
  max_dist = Math.ceil(Math.hypot(256, 256)) * 2;
  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.drawCanvas.clearCanvas();
    this.outputCanvas.width = Math.ceil(this.max_dist);
    this.outputCanvas.height = 180;
  }


  updateHough(){
    let src = cv.imread(this.drawCanvas.getCanvas());
    let dst = new cv.Mat.zeros(src.rows, src.cols, src.type());
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
    cv.Canny(src, src, 50, 200, 3);
    // Get the array of edges and manually compute the Hough Transform
    cv.imshow(this.outputCanvas.getCanvas(),src);
    let data = this.outputCanvas.getCanvas().getContext('2d')?.getImageData(0, 0, src.cols, src.rows).data;
    if (!data) {
      console.error('Failed to get image data from canvas');
      return;
    }
    let width = src.cols;
    let height = src.rows;
    let angleStep = 1;
    let accumulator = new Array(this.max_dist).fill(0).map(() => new Array(this.num_thetas).fill(0));
    let max_accum = 0;
    let svgLineElements: Array<SVGElementInterface> = [];
    let svgCircleElements: Array<SVGElementInterface> = [];
    let elementIndex = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let index = (y * width + x) * 4;
        if (data[index] > 250) {
          for (let angleIndex = 0; angleIndex < this.num_thetas; angleIndex++) {
            let theta = angleIndex * angleStep * Math.PI / 180 - Math.PI / 2;
            let rho = Math.round(x * Math.cos(theta) + y * Math.sin(theta)) + this.max_dist / 2;
            accumulator[rho][angleIndex]++;
            if (accumulator[rho][angleIndex] > max_accum) {
              max_accum = accumulator[rho][angleIndex];
            }
            if (accumulator[rho][angleIndex] > this.detectionThreshold) {
              // Create SVG line element for detected line
              let a = Math.cos(theta);
              let b = Math.sin(theta);
              let x0 = a * (rho - this.max_dist / 2);
              let y0 = b * (rho - this.max_dist / 2);
              let lineLength = 1000;
              let x1 = x0 + lineLength * (-b);
              let y1 = y0 + lineLength * (a);
              let x2 = x0 - lineLength * (-b);
              let y2 = y0 - lineLength * (a);


              svgLineElements.push({
                id: elementIndex++,
                type: 'line',
                attributes: {
                  x1: x1.toString(),
                  y1: y1.toString(),
                  x2: x2.toString(),
                  y2: y2.toString(),
                  stroke: getColorValueToHex(elementIndex),
                  'stroke-width': '0.5'
                }
              });
              
              
            }
          }
        }
      }
    }
    this.drawCanvas.setSVGElements(svgLineElements);
    // Draw the accumulator
    let accumImage = new cv.Mat.zeros(this.max_dist, this.num_thetas, cv.CV_8UC1);
    for (let r = 0; r < this.max_dist; r++) {
      for (let t = 0; t < this.num_thetas; t++) {
        accumImage.ucharPtr(r, t)[0] = accumulator[r][t] / max_accum * 255;
      }
    }
    cv.imshow(this.outputCanvas.getCanvas(), accumImage);
    src.delete(); dst.delete(); accumImage.delete();
  }

  autoDrawLines(){
    // Use a timer and draw a line every 100ms
    let linesDrawn = 0;
    this.drawCanvas.clearCanvas();
    let interval = setInterval(() => {
      if (linesDrawn >= 10) {
        clearInterval(interval);
        return;
      }
      linesDrawn++;

      const ctx = this.drawCanvas.getCanvas().getContext('2d');
      if (!ctx) {
        console.error('Failed to get canvas context');
        return;
      }
      ctx.strokeStyle = "black";
      ctx.lineWidth = this.drawCanvas.brushRadius!;
      // We divide the circle into equal segments
      const angle = (linesDrawn / 10) * Math.PI;
      const centerX = this.drawCanvas.getCanvas().width / 2;
      const centerY = this.drawCanvas.getCanvas().height / 2;
      const length = Math.min(this.drawCanvas.getCanvas().width, this.drawCanvas.getCanvas().height) / 2;
      const x1 = centerX + length * Math.cos(angle);
      const y1 = centerY + length * Math.sin(angle);
      const x2 = centerX - length * Math.cos(angle);
      const y2 = centerY - length * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      this.updateHough();
    }, 1000);
  }
}
