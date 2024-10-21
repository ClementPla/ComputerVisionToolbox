import { Component, Input } from '@angular/core';
import { Point2D } from '../../../utils/geometry';

@Component({
  selector: 'app-handle',
  templateUrl: './handle.component.html',
  styleUrls: ['./handle.component.scss']
})
export class HandleComponent{

  handleDrag = false;
  @Input() handleSize = 16;
  @Input() handlePos: Point2D = { x: 256, y: -50};
  @Input() handleColor = '#7dafff';
  @Input() scale = 1;
  @Input() showCoordinates = true;

  @Input() isAnchor = false;
  

  constructor() { }


  startHandleDrag(event: MouseEvent|TouchEvent, handle: number) {
    this.handleDrag = true;
  }
  stopHandleDrag() {
    this.handleDrag = false;
  }

  moveTo(x: number, y: number, maxX:number, maxY: number) {

    x = Math.min(Math.max(x, this.handleSize / 2), maxX - this.handleSize / 2);
    y = Math.min(Math.max(y, this.handleSize / 2), maxY - this.handleSize / 2);

    this.handlePos = { x, y };
  }

  getLabelCoordinates() {

    const x = this.handlePos.x * this.scale;
    const y = this.handlePos.y * this.scale;

    return { x: x.toFixed(0), y: y.toFixed(0) };
  }
}
