import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Matrix } from 'src/app/lib/numpy';
import { KNeighborsClassifier } from 'src/app/lib/ml';
import { TutorialTemplateComponent } from '../../../Toolbox/tutorial-template/tutorial-template.component';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';

export enum Classes { c1 = 1, c2 = 2 }
interface Point { x: number; y: number; class: Classes }
interface Neighbor { point: Point; dist: number }

@Component({
  selector: 'app-knn',
  templateUrl: './knn.component.html',
  styleUrl: './knn.component.scss',
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
export class KNNComponent implements OnInit {
  @ViewChild('regionCanvas', { static: true }) regionCanvas!: ElementRef<HTMLCanvasElement>;

  readonly size = 460;
  readonly colors: Record<number, string> = { [Classes.c1]: '#3b82f6', [Classes.c2]: '#ef4444' };

  k = 5;
  classChoice: Classes = Classes.c1;
  points: Point[] = [];
  query = { x: 230, y: 230 };
  private dragging = false;

  get Classes() { return Classes; }

  ngOnInit(): void {
    this.seed();
    this.updateRegions();
  }

  // --- Mechanism the tutorial is about: the query's k nearest neighbours ---

  get neighbors(): Neighbor[] {
    return this.points
      .map((p) => ({ point: p, dist: Math.hypot(p.x - this.query.x, p.y - this.query.y) }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, Math.min(this.k, this.points.length));
  }

  /** Votes per class among the current neighbours. */
  get votes(): Record<number, number> {
    const tally: Record<number, number> = { [Classes.c1]: 0, [Classes.c2]: 0 };
    for (const n of this.neighbors) tally[n.point.class]++;
    return tally;
  }

  get predicted(): Classes {
    return this.votes[Classes.c1] >= this.votes[Classes.c2] ? Classes.c1 : Classes.c2;
  }

  /** Radius of the circle enclosing exactly the k nearest neighbours. */
  get neighborRadius(): number {
    const ns = this.neighbors;
    return ns.length ? ns[ns.length - 1].dist : 0;
  }

  // --- Interaction -------------------------------------------------------

  startDragQuery(event: MouseEvent): void {
    event.stopPropagation();
    this.dragging = true;
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.dragging) return;
    const p = this.toLocal(event);
    this.query = { x: clamp(p.x, 0, this.size), y: clamp(p.y, 0, this.size) };
  }

  onMouseUp(): void {
    this.dragging = false;
  }

  /** Click on empty space to add a training point of the selected class. */
  addPoint(event: MouseEvent): void {
    const p = this.toLocal(event);
    this.points.push({ x: p.x, y: p.y, class: this.classChoice });
    this.updateRegions();
  }

  clear(): void {
    this.points = [];
    this.updateRegions();
  }

  reset(): void {
    this.seed();
    this.updateRegions();
  }

  onKChange(): void {
    this.updateRegions();
  }

  // --- Background decision regions (the "global" view of the same vote) ---

  private updateRegions(): void {
    const ctx = this.regionCanvas.nativeElement.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, this.size, this.size);
    if (this.points.length === 0) return;

    const model = new KNeighborsClassifier(this.k).fit(
      Matrix.fromRows(this.points.map((p) => [p.x, p.y])),
      this.points.map((p) => p.class as number)
    );

    const step = 8;
    const coords: number[][] = [];
    for (let x = 0; x < this.size; x += step) {
      for (let y = 0; y < this.size; y += step) coords.push([x, y]);
    }
    const preds = model.predict(Matrix.fromRows(coords));
    let i = 0;
    for (let x = 0; x < this.size; x += step) {
      for (let y = 0; y < this.size; y += step) {
        ctx.fillStyle = preds[i++] === Classes.c1 ? 'rgba(59,130,246,0.10)' : 'rgba(239,68,68,0.10)';
        ctx.fillRect(x, y, step, step);
      }
    }
  }

  private toLocal(event: MouseEvent): { x: number; y: number } {
    const rect = (event.currentTarget as SVGElement).getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  private seed(): void {
    this.points = [];
    const blob = (cx: number, cy: number, cls: Classes) => {
      for (let i = 0; i < 8; i++) {
        this.points.push({
          x: cx + (Math.random() - 0.5) * 120,
          y: cy + (Math.random() - 0.5) * 120,
          class: cls,
        });
      }
    };
    blob(150, 160, Classes.c1);
    blob(320, 300, Classes.c2);
    this.query = { x: 230, y: 230 };
  }
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}
