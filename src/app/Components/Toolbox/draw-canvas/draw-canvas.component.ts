import {
  Component,
  ElementRef,
  OnInit,
  Input,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { Point2D } from 'src/app/utils/geometry';
import { switchMap, takeUntil, pairwise, mapTo } from 'rxjs/operators';

import { getLine } from 'src/app/utils/bresenham';

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

  @Input() width = 256;
  height = this.width;

  @Input() brushRadius: number | null = 10;
  @Input() drawColor = 'white';
  @Input() drawable = true;
  @Input() title = '';
  @Input() BWOption: boolean = false;
  @Input() OnlyBW: boolean = false;
  @Output() profileChanged = new EventEmitter<boolean>();
  @Input() profileOption:boolean = false

  profile:boolean = false

  isBWChecked = false;
  cursorPosition: Point2D = { x: 0, y: 0 };
  startDrawing: boolean = false;
  initialPos: Point2D;

  profileHandle1Drag = false;
  profileHandle2Drag = false;
  profileHandle1Pos: Point2D = { x: 50, y: 50 };
  profileHandle2Pos: Point2D = { x: 500, y: 500 };

  profileArray: Array<number>;

  constructor() {}

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
    canvasElUI.width = this.width;
    canvasElUI.height = this.height;

    if (this.drawable) {
      this.captureEvents(canvasEl);
    }
    this.ctx.fillRect(0, 0, this.width, this.height);
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

    if (this.profile) {
      this.updateCanvasUI();
    }
    this.drawingEnded.emit();
  }

  drawMat(mat: any) {
    cv.imshow(this.getCanvas(), mat);
    this.updateCanvasUI();
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

    if (this.profile) {
      this.updateCanvasUI();
    }
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

    if (this.profile) {
      this.updateCanvasUI();
    }
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

  startHandleDrag(event: MouseEvent, handle: number) {
    if (handle == 1) {
      this.profileHandle1Drag = true;
      this.profileHandle2Drag = false;
    } else {
      this.profileHandle1Drag = false;
      this.profileHandle2Drag = true;
    }
  }
  stopHandleDrag() {
    this.profileHandle1Drag = false;
    this.profileHandle2Drag = false;
  }

  updateHandleDragPos(event: MouseEvent) {
    const canvas = this.ctxUI.canvas;
    const rect = canvas.getBoundingClientRect();
    var pos = this.getClientPosition(event);

    if (this.profileHandle1Drag) {
      this.profileHandle1Pos.x = pos.clientX - rect.left;
      this.profileHandle1Pos.y = pos.clientY - rect.top;
      this.updateCanvasUI();
    } else if (this.profileHandle2Drag) {
      this.profileHandle2Pos.x = pos.clientX - rect.left;
      this.profileHandle2Pos.y = pos.clientY - rect.top;
      this.updateCanvasUI();
    }
  }

  updateCanvasUI() {
    console.log('here')
    if (this.profile) {
      this.ctxUI.beginPath();

      let point1 = this.scaleCoordinates(this.profileHandle1Pos);
      let point2 = this.scaleCoordinates(this.profileHandle2Pos);

      this.ctxUI.moveTo(point1.x, point1.y);
      this.ctxUI.lineTo(point2.x, point2.y);

      this.ctxUI.lineWidth = 1;
      this.ctxUI.strokeStyle = 'blue';
      this.ctxUI.globalCompositeOperation = 'copy';
      this.ctxUI.setLineDash([2, 4]);
      this.ctxUI.stroke();

      this.updateProfile(point1, point2);
      this.profileChanged.emit();
    }
  }

  scaleCoordinates(point: Point2D): Point2D {
    const canvas = this.ctxUI.canvas;
    const rect = canvas.getBoundingClientRect();

    let scaleX = this.width / rect.width;
    let scaleY = this.height / rect.height;
    return { x: point.x * scaleX, y: point.y * scaleY };
  }
  getHandlePos(handle:number):Point2D{
    if(handle==1){
      return this.scaleCoordinates(this.profileHandle1Pos)
    }
    else{
      return this.scaleCoordinates(this.profileHandle2Pos)

    }
  }

  getProfile() {
    return this.profileArray;
  }
  updateProfile(point1: Point2D, point2: Point2D) {
    let array: Array<Point2D> = getLine(point1, point2);
    this.profileArray = new Array<number>();

    let data = this.getArray();

    array.forEach((point) => {
      let row = point.y;
      let col = point.x;
      let index = (this.width * row + col) * 4;
      this.profileArray.push(data[index]);
    });
  }
}
