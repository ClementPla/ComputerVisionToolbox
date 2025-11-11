import { AfterViewInit, Component } from '@angular/core';
import { TutorialImageClass } from 'src/app/Components/Toolbox/tutorial-parents/tutorial-image';
declare var cv: any;

@Component({
  selector: 'app-hough-transform',
  standalone: false,
  templateUrl: './hough-transform.component.html',
  styleUrl: './hough-transform.component.scss'
})
export class HoughTransformComponent extends TutorialImageClass implements AfterViewInit {
  detectionThreshold: number = 50;
  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.drawCanvas.clearCanvas();
  }


  updateHough(){
    let src = cv.imread(this.drawCanvas.getCanvas());
    let dst = new cv.Mat.zeros(src.rows, src.cols, src.type());
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
    cv.Canny(src, src, 50, 200, 3);
    let lines = new cv.Mat();
    cv.HoughLinesP(src, lines, 1, Math.PI / 180, this.detectionThreshold, 0, 0);
    cv.cvtColor(src, src, cv.COLOR_GRAY2RGBA, 0);
    for (let i = 0; i < lines.rows; ++i) {
      let x1 = lines.data32S[i * 4];
      let y1 = lines.data32S[i * 4 + 1];
      let x2 = lines.data32S[i * 4 + 2];
      let y2 = lines.data32S[i * 4 + 3];
      let random_r = Math.round(Math.random() * 255);
      let random_g = Math.round(Math.random() * 255);
      let random_b = Math.round(Math.random() * 255);
      cv.line(src, new cv.Point(x1, y1), new cv.Point(x2, y2), [random_r, random_g, random_b, 255], 1);
    }
    cv.imshow(this.outputCanvas.getCanvas(),src);
    src.delete();
    dst.delete();
    lines.delete();
  }



}
