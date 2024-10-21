import { Component, OnInit, Input, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { HandleComponent } from '../handle/handle.component';
import { ROIProperty } from '../../../utils/interface';
import { Point2D } from '../../../utils/geometry';

@Component({
  selector: 'app-roi',
  templateUrl: './roi.component.html',
  styleUrls: ['./roi.component.scss']
})
export class ROIComponent implements OnInit, AfterViewInit{

  @Input() point1: Point2D = { x: 0, y: 0 };
  @Input() point2: Point2D = { x: 0, y: 0 };
  @Input() scale: number = 1;
  @Input() property: ROIProperty;

  
  @ViewChild('handle1') handle1: HandleComponent;
  @ViewChild('handle2') handle2: HandleComponent;

  @ViewChild('midHandle') midHandle: HandleComponent;
  labelPos: Point2D = { x: 0, y: 0 };

  midPoint: Point2D = { x: 0, y: 0 };

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.update()
    this.cdr.detectChanges();
  }
  getRectangleCoordinates() {
    const x1 = this.point1.x;
    const y1 = this.point1.y;
    const x2 = this.point2.x;
    const y2 = this.point2.y;

    return { x1: x1, y1: y1, x2: x2, y2: y2 };
  }
  getHandles() {
    return [this.handle1, this.handle2];
  }

  getMidHandle() {
    return this.midHandle;
  }
  update() {
    this.point1 = this.handle1.handlePos;
    this.point2 = this.handle2.handlePos;

    // this.midPoint = {
    //   x: Math.max(this.point1.x, this.point2.x) - this.midHandle.handleSize / 2,
    //   y: Math.min(this.point1.y, this.point2.y) + this.midHandle.handleSize / 2
    // };
    this.midPoint = {x: (this.point1.x + this.point2.x) / 2, y: (this.point1.y + this.point2.y) / 2};

    this.updateNamePosition();
  }

  updateNamePosition() {
    const y = Math.min(this.handle1.handlePos.y, this.handle2.handlePos.y);
    const x1 = this.handle1.handlePos.x;
    const x2 = this.handle2.handlePos.x;
    const x = (x1 + x2) / 2;
    this.labelPos = {y, x};
  }

}
