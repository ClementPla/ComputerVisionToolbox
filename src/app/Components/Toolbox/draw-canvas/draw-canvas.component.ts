import {
  Component,
  ElementRef,
  OnInit,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  ViewChildren,
  QueryList,
  HostListener,
} from '@angular/core';
import { fromEvent, merge } from 'rxjs';

import { Point2D } from '../../../utils/geometry';

import { getLine } from '../../../utils/bresenham';
import { ROIProperty } from '../../../utils/interface';
import { switchMap, takeUntil, pairwise, mapTo } from 'rxjs/operators';

import { HandleComponent } from '../handle/handle.component';
import { ROIComponent } from '../roi/roi.component';

declare var cv: any;

@Component({
  selector: 'app-draw-canvas',
  templateUrl: './draw-canvas.component.html',
  styleUrls: ['./draw-canvas.component.scss'],
})
export class DrawCanvasComponent implements OnInit {
  @Output() drawingEnded = new EventEmitter<boolean>();

  @ViewChild('canvas', { static: true })
  private canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  @ViewChild('canvasUI', { static: true })
  private canvasUI: ElementRef<HTMLCanvasElement>;
  private ctxUI: CanvasRenderingContext2D;


  @ViewChildren('handleProfile') handles: QueryList<HandleComponent>;

  @ViewChildren('ROI') ROIs: QueryList<ROIComponent>;

  @Input() width = 256;
  height = this.width;

  UIwidth = 1024

  @Input() roi: Array<ROIProperty> = [];
  @Input() brushRadius: number | null = 10;
  @Input() drawColor = 'white';
  @Input() drawable = true;
  @Input() title = '';
  @Input() BWOption: boolean = false;
  @Input() OnlyBW: boolean = false;
  @Input() profileOption: boolean = false

  @Output() BWSet = new EventEmitter<boolean>();
  @Output() profileChanged = new EventEmitter<boolean>();

  @Output() roiChanged = new EventEmitter<ROIProperty>();

  profile: boolean = false

  isBWChecked = false;
  cursorPosition: Point2D = { x: 0, y: 0 };
  startDrawing: boolean = false;
  initialPos: Point2D;


  profileArray: Array<number>;

  constructor() { }

  ngOnInit(): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext('2d', { alpha: false })!;

    this.ctx.imageSmoothingEnabled = false;
    this.height = this.width;
    canvasEl.width = this.width;
    canvasEl.height = this.height;
    this.ctx.canvas.width = this.width;
    this.ctx.canvas.height = this.height;

    const canvasElUI: HTMLCanvasElement = this.canvasUI.nativeElement;
    this.ctxUI = canvasElUI.getContext('2d', { alpha: true })!;
    canvasElUI.width = this.UIwidth;
    canvasElUI.height = this.UIwidth;

    if (this.drawable) {
      this.captureEvents(canvasEl);
    }
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  BWToggle() {
    this.BWSet.emit()
  }

  ngAfterViewInit(): void {
    this.updateCanvasUI();
  }
  setCanvasDimensions(width: number, height: number) {
    this.height = height;
    this.width = width;
    this.ctx.canvas.width = width;
    this.ctx.canvas.height = height;
  }
  getArray(): Uint8ClampedArray {
    return this.ctx.getImageData(0, 0, this.width, this.height).data;
  }

  getCanvas(): HTMLCanvasElement {
    return this.ctx.canvas;
  }
  getCtx(): CanvasRenderingContext2D {
    return this.ctx;
  }

  clearCanvas(): void {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.drawingEnded.emit();
  }

  drawImage(image: CanvasImageSource) {
    this.ctx.drawImage(image, 0, 0, this.width, this.height);

    this.updateCanvasUI();

    this.drawingEnded.emit();
  }

  drawMat(mat: any) {
    cv.imshow(this.getCanvas(), mat);
    this.updateCanvasUI();
  }
  drawMatWithoutEvent(mat: any) {
    cv.imshow(this.getCanvas(), mat);
  }

  drawArray(
    data: Uint8ClampedArray,
    width: number = this.width,
    height: number = this.height,
    x: number = 0,
    y: number = 0
  ) {
    var image = new ImageData(data, width, height);
    this.ctx.putImageData(image, x, y);

    this.updateCanvasUI();

    this.drawingEnded.emit();
  }

  drawCroppedArray(
    data: Uint8ClampedArray,
    width: number = this.width,
    height: number = this.height,
    x: number = 0,
    y: number = 0,
    dirtyX: number = 0,
    dirtyY: number = 0,
    dirtyWidth: number = width,
    dirtyHeight: number = height
  ) {
    var image = new ImageData(data, width, height);
    this.ctx.putImageData(image, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight);

    this.updateCanvasUI();

    this.drawingEnded.emit();
  }

  private draw(previousPos: Point2D, nextPosition: Point2D | null = null) {
    this.ctx.beginPath();
    this.ctx.moveTo(previousPos.x, previousPos.y);
    if (nextPosition) {
      this.ctx.lineTo(nextPosition.x, nextPosition.y);
    } else {
      this.ctx.lineTo(previousPos.x, previousPos.y);
    }
    this.ctx.lineWidth = this.brushRadius!;
    this.ctx.strokeStyle = this.drawColor;
    this.ctx.lineCap = 'round';
    this.ctx.stroke();
  }

  private draw_callback() {
    this.drawingEnded.emit(true);
  }
  private captureEvents(canvas: HTMLCanvasElement) {
    const touchStartEvents = fromEvent<TouchEvent>(canvas, 'touchstart');
    const mouseStartEvents = fromEvent<MouseEvent>(canvas, 'mousedown');
    const mouseMoveEvents = fromEvent<MouseEvent>(canvas, 'mousemove');

    const startEvents = merge(touchStartEvents, mouseStartEvents);
    const touchMoveEvents = fromEvent<TouchEvent>(canvas, 'touchmove');
    const moveEvents = merge(touchMoveEvents, mouseMoveEvents);
    const touchEndEvents = fromEvent<TouchEvent>(canvas, 'touchend');
    const mouseUpEvents = fromEvent<MouseEvent>(canvas, 'mouseup');
    const mouseLeaveEvents = fromEvent<MouseEvent>(canvas, 'mouseleave');

    const endEvents = merge(touchEndEvents, mouseLeaveEvents, mouseUpEvents);
    let hasChanged = false;
    moveEvents.subscribe({
      next: (event: MouseEvent | TouchEvent) => {
        const rect = canvas.getBoundingClientRect();
        var pos = this.getClientPosition(event);
        this.cursorPosition.x = pos.clientX - rect.left;
        this.cursorPosition.y = pos.clientY - rect.top;
      },
    });
    startEvents
      .pipe(
        switchMap((e) => {
          const rect = canvas.getBoundingClientRect();
          const pos = this.getCoord(e, rect);
          hasChanged = true;
          this.initialPos = pos;
          this.startDrawing = true;
          this.draw(pos);
          this.draw_callback();
          return moveEvents.pipe(takeUntil(endEvents), pairwise());
        })
      )
      .subscribe({
        next: (res: [MouseEvent | TouchEvent, MouseEvent | TouchEvent]) => {
          const rect = canvas.getBoundingClientRect();
          var prevPos = this.getCoord(res[0], rect);
          const currentPos = this.getCoord(res[1], rect);
          if (this.startDrawing) {
            this.startDrawing = false;
            prevPos = this.initialPos;
          }
          this.draw(prevPos, currentPos);
          this.draw_callback();
        },
      });
    endEvents.subscribe((e) => {
      if (hasChanged) {
        this.updateCanvasUI();
        this.draw_callback();
      }
      hasChanged = false;
    });
  }

  getClientPosition(event: TouchEvent | MouseEvent) {
    event.preventDefault();
    if ('touches' in event) {
      return {
        clientX: event.touches[0].clientX,
        clientY: event.touches[0].clientY,
      };
    } else {
      return { clientX: event.clientX, clientY: event.clientY };
    }
  }
  getCoord(event: MouseEvent | TouchEvent, rect: DOMRect) {
    var pt = this.getClientPosition(event);
    return {
      x: (pt.clientX - rect.left) * (this.width / rect.width),
      y: (pt.clientY - rect.top) * (this.height / rect.height),
    };
  }

  getCursorTransform(): number {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    let scaleFactor = (rect.width / this.width) * this.brushRadius!;
    return scaleFactor;
  }

  updateHandleDragPos(event: MouseEvent) {
    const canvas = this.ctxUI.canvas;
    const rect = canvas.getBoundingClientRect();
    var pos = this.getClientPosition(event);

    let handles = this.handles.toArray();
    let rois = this.ROIs.toArray();
    
    const x = pos.clientX - rect.left;
    const y = pos.clientY - rect.top;
    let redrawNeeded = false;
    const outOfBounds = x >= rect.width || x <= 0 || y >= rect.height || y <= 0
    handles.forEach((handle) => {
      handle.handleDrag = outOfBounds ? false : handle.handleDrag;
      if (handle.handleDrag) {
        handle.moveTo(x, y, rect.width ,  rect.height);
        redrawNeeded = true;
      }

    });
    rois.forEach((roi) => {
      let roiHandles = roi.getHandles();
      roiHandles.forEach((handle) => {
        handle.handleDrag = outOfBounds ? false : handle.handleDrag;
        if (handle.handleDrag) {
          handle.moveTo(x, y, rect.width, rect.height);
          roi.update();
          redrawNeeded = true;
        }
      });
      let midHandle = roi.getMidHandle();
      midHandle.handleDrag = outOfBounds ? false : midHandle.handleDrag;
      if (midHandle.handleDrag) {
        let offsetX = x - midHandle.handlePos.x
        let offsetY = y - midHandle.handlePos.y
        roiHandles.forEach((handle) => {
          handle.moveTo(handle.handlePos.x + offsetX, handle.handlePos.y + offsetY, rect.width, rect.height);
          roi.update();
          redrawNeeded = true;
        })
        
      }
    
    })


      this.updateCanvasUI();


  }

  @HostListener('window:resize', ['$event'])
  updateCanvasUI() {
    this.ctxUI.clearRect(0, 0, this.UIwidth, this.UIwidth);
    // this.ctxUI.globalCompositeOperation = 'copy';
    
      requestAnimationFrame(() => { // We use setTimeout to be sure handles exist (wait for next frame)
        
        if (this.ROIs.length > 0) {
          this.updateROI();

        }
        if (this.profile) {
          this.updateProfile();

        }

      });

      

  }

  transformCoordinatesFromScreenToUISpace(point: Point2D): Point2D {
    const canvas = this.ctxUI.canvas;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = point.x * (this.UIwidth / width);
    const y = point.y * (this.UIwidth / height);
    return { x, y };
  }
  transformCoordinatesFromScreenToCanvas(point: Point2D): Point2D {
    const canvas = this.ctx.canvas;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = point.x * (this.width / width);
    const y = point.y * (this.height / height);
    return { x, y };
  }

  getScreenToCanvasScale(): number {

    const canvas = this.ctx.canvas;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    return this.width / width;

  }
  getProfile(): Array<number> {
    return this.profileArray;
  }

  updateProfile() {
    this.ctxUI.beginPath();
    let handles = this.handles.toArray();

    const pointCanvas1 = this.transformCoordinatesFromScreenToCanvas(handles[0].handlePos);
    const pointCanvas2 = this.transformCoordinatesFromScreenToCanvas(handles[1].handlePos);

    const pointUI1 = this.transformCoordinatesFromScreenToUISpace(handles[0].handlePos);
    const pointUI2 = this.transformCoordinatesFromScreenToUISpace(handles[1].handlePos);

    this.ctxUI.moveTo(pointUI1.x, pointUI1.y);
    this.ctxUI.lineTo(pointUI2.x, pointUI2.y);

    this.ctxUI.lineWidth = 3;
    this.ctxUI.strokeStyle = 'blue';
    this.ctxUI.setLineDash([10, 20]);
    this.ctxUI.stroke();

    this.recomputeProfile(pointCanvas1, pointCanvas2);

  }
  updateROI() {
    let rois = this.ROIs.toArray();
    this.ctxUI.setLineDash([5, 5]);
    this.ctxUI.lineWidth = 2;

    rois.forEach((roi) => {

      const handles = roi.getHandles();
      const pointUI1 = this.transformCoordinatesFromScreenToUISpace(handles[0].handlePos);
      const pointUI2 = this.transformCoordinatesFromScreenToUISpace(handles[1].handlePos);
      this.ctxUI.beginPath();
      this.ctxUI.strokeStyle = roi.property.color;
      this.ctxUI.fillStyle = roi.property.color;
      this.ctxUI.strokeRect(pointUI1.x, pointUI1.y, pointUI2.x - pointUI1.x, pointUI2.y - pointUI1.y);
      this.ctxUI.globalAlpha = 0.3;
      this.ctxUI.fillRect(pointUI1.x, pointUI1.y, pointUI2.x - pointUI1.x, pointUI2.y - pointUI1.y);
      this.ctxUI.fill()
      this.ctxUI.globalAlpha = 1;
      this.ctxUI.stroke();
      this.recomputeROI(roi);
    });

  }
  recomputeProfile
    (point1: Point2D, point2: Point2D) {
    let array: Array<Point2D> = getLine(point1, point2);
    this.profileArray = new Array<number>();

    let data = this.getArray();

    array.forEach((point) => {
      let row = point.y;
      let col = point.x;
      let index = (this.width * row + col) * 4;
      this.profileArray.push(data[index]);
    });
    this.profileChanged.emit();
  }

  recomputeROI(roi: ROIComponent) {
    let handles = roi.getHandles();
    let point1 = this.transformCoordinatesFromScreenToCanvas(handles[0].handlePos);
    let point2 = this.transformCoordinatesFromScreenToCanvas(handles[1].handlePos);
    let x = Math.min(point1.x, point2.x);
    let y = Math.min(point1.y, point2.y);

    let w = Math.abs(point1.x - point2.x);
    let h = Math.abs(point1.y - point2.y);
    let square = this.ctx.getImageData(x, y, w, h)
    roi.property.data = square;
    this.roiChanged.emit(roi.property);
  }

  isBW() {
    return this.isBWChecked;
  }

  getValueAtSquare(x: number, y: number, w: number, h: number): Uint8ClampedArray {
    let square = this.ctx.getImageData(x, y, w, h).data;
    return square;

  }
}
