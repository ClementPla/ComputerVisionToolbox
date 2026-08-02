import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { sampleGaussian2D } from 'src/app/utils/sampling';
import { Matrix } from 'src/app/lib/numpy';
import { RandomForestClassifier } from 'src/app/lib/ml';
import { TutorialTemplateComponent } from '../../../Toolbox/tutorial-template/tutorial-template.component';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';

export enum Classes { c1 = 1, c2 = 2, c3 = 3 }
export interface Datapoint { x: number; y: number; class: Classes; }
export interface Dataset { points: Datapoint[]; }

@Component({
  selector: 'app-random-forest',
  templateUrl: './random-forest.component.html',
  styleUrl: './random-forest.component.scss',
  imports: [
    TutorialTemplateComponent,
    FormsModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatButton,
    MatIcon,
    MatSlider,
    MatSliderThumb,
  ],
})
export class RandomForestComponent {
  @ViewChild('rfCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  classChoice: Classes = Classes.c1;
  dataset: Dataset = { points: [] };
  isDrawing = false;

  nTrees = 20;
  maxDepth = 6;

  get Classes() { return Classes; }

  startDraw() { this.isDrawing = true; }
  stopDraw() { this.isDrawing = false; }

  draw(event: MouseEvent) {
    if (!this.isDrawing) return;
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const points = sampleGaussian2D(2, { x, y }, [[10, 0], [0, 10]]);
    points.forEach((p) => this.dataset.points.push({ x: p.x, y: p.y, class: this.classChoice }));
    this.updateDecisionBoundaries();
  }

  retrain() { this.updateDecisionBoundaries(); }

  updateDecisionBoundaries() {
    if (this.dataset.points.length < 1) return;
    const canvasEl = this.canvas.nativeElement;
    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;

    const scale = canvasEl.width;
    const X = Matrix.fromRows(this.dataset.points.map((p) => [p.x / scale, p.y / scale]));
    const y = this.dataset.points.map((p) => p.class as number);
    const model = new RandomForestClassifier(this.nTrees, this.maxDepth).fit(X, y);
    if (model.classes.length === 0) return;

    const step = 6;
    const coords: number[][] = [];
    for (let px = 0; px < canvasEl.width; px += step) {
      for (let py = 0; py < canvasEl.height; py += step) coords.push([px / scale, py / scale]);
    }
    const predictions = model.predict(Matrix.fromRows(coords));

    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    let idx = 0;
    for (let px = 0; px < canvasEl.width; px += step) {
      for (let py = 0; py < canvasEl.height; py += step) {
        ctx.fillStyle = this.getLightColor(predictions[idx++] as Classes);
        ctx.fillRect(px, py, step, step);
      }
    }
  }

  clearPoints() {
    this.dataset.points = [];
    const ctx = this.canvas.nativeElement.getContext('2d');
    ctx?.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  private getLightColor(c: Classes): string {
    const colors: Record<number, string> = {
      [Classes.c1]: 'rgba(59, 130, 246, 0.25)',
      [Classes.c2]: 'rgba(34, 197, 94, 0.25)',
      [Classes.c3]: 'rgba(239, 68, 68, 0.25)',
    };
    return colors[c] || 'transparent';
  }
}
