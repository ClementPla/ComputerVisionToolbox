import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { SVMClassifier, SVMDatapoint, SVMResult, SVMKernel } from './model';

export enum SVMClasses {
  Positive = 1,
  Negative = -1,
}

export interface Datapoint {
  x: number;
  y: number;
  class: SVMClasses;
}

@Component({
  selector: 'app-svm-classifier',
  templateUrl: './svmclassifier.component.html',
  styleUrl: './svmclassifier.component.scss',
  standalone: false,
})
export class SVMClassifierComponent implements AfterViewInit, OnDestroy {
  @ViewChild('svmCanvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  // State
  classChoice: SVMClasses = SVMClasses.Positive;
  points: Datapoint[] = [];
  isDrawing = false;
  svmResult: SVMResult | null = null;
  isTraining = false;

  // SVM Configuration
  kernelChoice: SVMKernel = 'linear';
  gamma = 0.005;

  cExponent = 0;

  // Visualization options
  showMargin = true;
  showSupportVectors = true;
  showViolations = true;
  showDecisionRegions = true;

  displayC = (exponent: number): string => {
    const value = Math.pow(10, exponent);
    return value >= 1 ? value.toFixed(0) : value.toFixed(2);
  };

  // Internals
  private classifier: SVMClassifier | null = null;
  private debounceTimer: any = null;
  private decisionCache: Float32Array | null = null;

  readonly size = 512;
  readonly step = 8; // Grid resolution

  public get SVMClasses() {
    return SVMClasses;
  }

  constructor() {}

  get C(): number {
    return Math.pow(10, this.cExponent);
  }

  ngAfterViewInit(): void {
    this.clearCanvas();
  }

  ngOnDestroy(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
  }

  // --- Drawing ---
  startDraw(): void {
    this.isDrawing = true;
  }

  stopDraw(): void {
    if (this.isDrawing) {
      this.isDrawing = false;
      this.scheduleTraining();
    }
  }

  draw(event: MouseEvent): void {
    if (!this.isDrawing) return;

    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Throttle: skip if too close to last point
    if (this.points.length > 0) {
      const last = this.points[this.points.length - 1];
      if ((x - last.x) ** 2 + (y - last.y) ** 2 < 144) return; // 12px min distance
    }

    this.points.push({
      x: Math.max(5, Math.min(this.size - 5, x + (Math.random() - 0.5) * 4)),
      y: Math.max(5, Math.min(this.size - 5, y + (Math.random() - 0.5) * 4)),
      class: this.classChoice,
    });

    this.decisionCache = null;
    this.renderEmpty();
  }

  onClick(event: MouseEvent): void {
    if (this.isDrawing) return;

    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.points.push({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      class: this.classChoice,
    });

    this.decisionCache = null;
    this.scheduleTraining();
  }

  private scheduleTraining(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.trainAndRender();
    }, 100);
  }

  // --- Training & Rendering ---
  private trainAndRender(): void {
    const hasPos = this.points.some((p) => p.class === SVMClasses.Positive);
    const hasNeg = this.points.some((p) => p.class === SVMClasses.Negative);

    if (!hasPos || !hasNeg || this.points.length < 4) {
      this.renderEmpty();
      return;
    }

    this.isTraining = true;

    // Train
    this.classifier = new SVMClassifier({
      kernel: this.kernelChoice,
      C: this.C,
      gamma: this.gamma,
    });

    const svmPoints: SVMDatapoint[] = this.points.map((p) => ({
      x: p.x,
      y: p.y,
      label: p.class,
    }));

    this.svmResult = this.classifier.train(svmPoints);
    this.decisionCache = null;

    this.render();
    this.isTraining = false;
  }

  private renderEmpty(): void {
    const ctx = this.canvas.nativeElement.getContext('2d')!;
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, this.size, this.size);
    this.renderPoints(ctx);
    this.svmResult = null;
  }

  private render(): void {
    const ctx = this.canvas.nativeElement.getContext('2d')!;

    // 1. Decision regions
    if (this.showDecisionRegions && this.classifier) {
      this.renderDecisionRegions(ctx);
    } else {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, this.size, this.size);
    }

    // 2. Decision boundary and margins
    if (this.classifier) {
      this.renderBoundary(ctx);
    }

    // 3. Points
    this.renderPoints(ctx);
  }

  private renderDecisionRegions(ctx: CanvasRenderingContext2D): void {
    if (!this.classifier) return;

    const gridSize = Math.ceil(this.size / this.step) + 1;

    // Compute or use cached decision values
    if (!this.decisionCache) {
      this.decisionCache = new Float32Array(gridSize * gridSize);
      let idx = 0;
      for (let gy = 0; gy < gridSize; gy++) {
        for (let gx = 0; gx < gridSize; gx++) {
          this.decisionCache[idx++] = this.classifier.decisionFunction({
            x: gx * this.step,
            y: gy * this.step,
          });
        }
      }
    }

    // Render using ImageData
    const imageData = ctx.createImageData(this.size, this.size);
    const data = imageData.data;

    for (let py = 0; py < this.size; py++) {
      for (let px = 0; px < this.size; px++) {
        const gx = Math.min(Math.floor(px / this.step), gridSize - 2);
        const gy = Math.min(Math.floor(py / this.step), gridSize - 2);

        // Bilinear interpolation
        const fx = px / this.step - gx;
        const fy = py / this.step - gy;

        const i00 = gy * gridSize + gx;
        const i10 = i00 + 1;
        const i01 = i00 + gridSize;
        const i11 = i01 + 1;

        const d =
          this.decisionCache[i00] * (1 - fx) * (1 - fy) +
          this.decisionCache[i10] * fx * (1 - fy) +
          this.decisionCache[i01] * (1 - fx) * fy +
          this.decisionCache[i11] * fx * fy;

        const idx = (py * this.size + px) * 4;
        const intensity = Math.min(Math.abs(d) * 0.5, 1);

        if (d >= 0) {
          // Blue region
          data[idx] = 59;
          data[idx + 1] = 130;
          data[idx + 2] = 246;
        } else {
          // Amber region
          data[idx] = 245;
          data[idx + 1] = 158;
          data[idx + 2] = 11;
        }
        data[idx + 3] = Math.round((0.08 + intensity * 0.17) * 255);
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  private renderBoundary(ctx: CanvasRenderingContext2D): void {
    if (!this.classifier || !this.decisionCache) return;

    const gridSize = Math.ceil(this.size / this.step) + 1;

    const drawContour = (
      threshold: number,
      color: string,
      lineWidth: number,
      dash: number[],
    ) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.setLineDash(dash);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();

      for (let gy = 0; gy < gridSize - 1; gy++) {
        for (let gx = 0; gx < gridSize - 1; gx++) {
          const i = gy * gridSize + gx;
          const v = [
            this.decisionCache![i] - threshold,
            this.decisionCache![i + 1] - threshold,
            this.decisionCache![i + gridSize + 1] - threshold,
            this.decisionCache![i + gridSize] - threshold,
          ];

          const x = gx * this.step;
          const y = gy * this.step;

          // Marching squares config
          const config =
            (v[0] > 0 ? 8 : 0) |
            (v[1] > 0 ? 4 : 0) |
            (v[2] > 0 ? 2 : 0) |
            (v[3] > 0 ? 1 : 0);
          if (config === 0 || config === 15) continue;

          // Interpolation helper
          const lerp = (a: number, b: number) =>
            Math.abs(b - a) < 1e-10 ? 0.5 : -a / (b - a);

          // Edge midpoints
          const top = { x: x + lerp(v[0], v[1]) * this.step, y: y };
          const right = {
            x: x + this.step,
            y: y + lerp(v[1], v[2]) * this.step,
          };
          const bottom = {
            x: x + lerp(v[3], v[2]) * this.step,
            y: y + this.step,
          };
          const left = { x: x, y: y + lerp(v[0], v[3]) * this.step };

          // Draw line segments based on config
          const segments: { x: number; y: number }[][] = [];
          switch (config) {
            case 1:
            case 14:
              segments.push([left, bottom]);
              break;
            case 2:
            case 13:
              segments.push([bottom, right]);
              break;
            case 3:
            case 12:
              segments.push([left, right]);
              break;
            case 4:
            case 11:
              segments.push([top, right]);
              break;
            case 5:
              segments.push([left, top], [bottom, right]);
              break;
            case 6:
            case 9:
              segments.push([top, bottom]);
              break;
            case 7:
            case 8:
              segments.push([left, top]);
              break;
            case 10:
              segments.push([top, right], [left, bottom]);
              break;
          }

          for (const seg of segments) {
            ctx.moveTo(seg[0].x, seg[0].y);
            ctx.lineTo(seg[1].x, seg[1].y);
          }
        }
      }
      ctx.stroke();
      ctx.setLineDash([]);
    };

    // Margins first (behind)
    if (this.showMargin) {
      drawContour(1, 'rgba(59, 130, 246, 0.5)', 1.5, [4, 3]);
      drawContour(-1, 'rgba(245, 158, 11, 0.5)', 1.5, [4, 3]);
    }

    // Decision boundary (f=0)
    drawContour(0, '#1e293b', 2, []);
  }

  private renderPoints(ctx: CanvasRenderingContext2D): void {
    const svIndices = new Set(this.svmResult?.supportVectorIndices ?? []);
    const violationIndices = new Set(this.svmResult?.violations ?? []);

    this.points.forEach((p, i) => {
      const isSV = this.showSupportVectors && svIndices.has(i);
      const isViolation = this.showViolations && violationIndices.has(i);

      // Outer ring for support vectors
      if (isSV) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 12, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(15, 23, 42, 0.4)';
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 2]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Violation ring
      if (isViolation) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 14, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(220, 38, 38, 0.6)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Main point
      ctx.beginPath();
      ctx.arc(p.x, p.y, isSV ? 7 : 5, 0, Math.PI * 2);
      ctx.fillStyle = p.class === SVMClasses.Positive ? '#2563eb' : '#d97706';
      ctx.fill();
      ctx.strokeStyle = isViolation ? '#dc2626' : isSV ? '#0f172a' : '#fff';
      ctx.lineWidth = isSV ? 2.5 : 1.5;
      ctx.stroke();
    });
  }

  // --- UI ---
  retrainModel(): void {
    this.decisionCache = null;
    this.scheduleTraining();
  }

  clearPoints(): void {
    this.points = [];
    this.svmResult = null;
    this.decisionCache = null;
    this.clearCanvas();
  }

  private clearCanvas(): void {
    const ctx = this.canvas.nativeElement.getContext('2d')!;
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, this.size, this.size);
  }

  // Stats
  get supportVectorCount(): number {
    return this.svmResult?.supportVectorIndices.length ?? 0;
  }

  get violationCount(): number {
    return this.svmResult?.violations.length ?? 0;
  }

  get positiveCount(): number {
    return this.points.filter((p) => p.class === SVMClasses.Positive).length;
  }

  get negativeCount(): number {
    return this.points.filter((p) => p.class === SVMClasses.Negative).length;
  }

  get hasEnoughData(): boolean {
    return this.positiveCount >= 2 && this.negativeCount >= 2;
  }
}
