import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { Kernel } from '../kernel';

@Component({
  selector: 'app-kernel-element',
  templateUrl: './kernel-element.component.html',
  styleUrls: ['./kernel-element.component.scss'],
})
export class KernelElementComponent implements OnInit {
  @Input() kernel: Kernel;

  @Output() updateFilters = new EventEmitter<boolean>();
  private width: number;
  private height: number;

  @ViewChild('canvas', { static: true })
  private canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  constructor() {}

  ngOnInit(): void {
    this.kernel.delete = false;
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext('2d')!;
    this.width = this.kernel.width;
    this.height = this.kernel.height;
    canvasEl.width = this.width;
    canvasEl.height = this.height;
    this.ctx.canvas.width = this.width;
    this.ctx.canvas.height = this.height;
    this.drawFilter(this.kernel.mat[0]);
  }
  delete(event: MouseEvent) {
    event.stopPropagation();
    this.kernel.delete = true;
    this.updateFilters.emit();
  }
  toggleActive(event: MouseEvent) {
    event.stopPropagation();
    this.kernel.active = !this.kernel.active;
    this.updateFilters.emit();
  }
  drawFilter(mat: Array<number>) {
    let image = new Uint8ClampedArray(4 * mat.length);
    let maxValue = mat.reduce(function (prev, current) {
      return prev > current ? prev : current;
    });

    let minValue = mat.reduce(function (prev, current) {
      return prev < current ? prev : current;
    });

    if (minValue == maxValue) {
      minValue = 0;
      maxValue = 1;
    }
    for (let i = 0; i < mat.length; i++) {
      const j = i * 4;
      const val = Math.round(
        (255 * (mat[i] - minValue)) / (maxValue - minValue)
      );
      image[j] = val;
      image[j + 1] = val;
      image[j + 2] = val;
      image[j + 3] = 255;
    }
    let imgData = new ImageData(image, this.kernel.width, this.kernel.height);
    this.ctx.putImageData(imgData, 0, 0);
  }
}
