import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Matrix } from 'src/app/lib/numpy';
import { RandomForestClassifier, DecisionTreeClassifier } from 'src/app/lib/ml';
import { TutorialTemplateComponent } from '../../../Toolbox/tutorial-template/tutorial-template.component';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';

export enum Classes { c1 = 1, c2 = 2 }
interface Point { x: number; y: number; class: Classes }

const THUMBS = 6;

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
export class RandomForestComponent implements OnInit, AfterViewInit {
  @ViewChild('mainCanvas', { static: true }) mainCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChildren('treeCanvas') treeCanvases!: QueryList<ElementRef<HTMLCanvasElement>>;

  readonly size = 360;
  readonly thumbSize = 104;
  readonly thumbIndices = Array.from({ length: THUMBS }, (_, i) => i);
  readonly colors: Record<number, string> = { [Classes.c1]: '#3b82f6', [Classes.c2]: '#ef4444' };

  nTrees = 20;
  maxDepth = 5;
  classChoice: Classes = Classes.c1;
  points: Point[] = [];
  query = { x: 180, y: 180 };
  // Cached vote read-out for ✚ (updated on drag/refit, not on every CD pass).
  voteBlue = 0;
  voteRed = 0;
  predicted: Classes = Classes.c1;
  private dragging = false;
  private forest: RandomForestClassifier | null = null;

  get Classes() { return Classes; }

  ngOnInit(): void {
    // Fit the model early so the template's bindings are stable on the first
    // change-detection pass (avoids ExpressionChanged errors).
    this.seed();
    this.fitModel();
    this.updateVote();
  }

  ngAfterViewInit(): void {
    // Canvases (esp. the tree thumbnails via ViewChildren) exist only now.
    this.render();
  }

  /** Recompute the cached tree-vote tally for the current query point. */
  private updateVote(): void {
    if (!this.forest || this.forest.classes.length === 0) {
      this.voteBlue = 0;
      this.voteRed = 0;
      this.predicted = Classes.c1;
      return;
    }
    const proba = this.forest.predictProba(Matrix.fromRows([[this.query.x, this.query.y]])).toArray()[0];
    const idx = new Map(this.forest.classes.map((c, i) => [c, i]));
    this.voteBlue = Math.round((proba[idx.get(Classes.c1) ?? -1] ?? 0) * this.nTrees);
    this.voteRed = this.nTrees - this.voteBlue;
    this.predicted = this.voteBlue >= this.voteRed ? Classes.c1 : Classes.c2;
  }

  // --- Interaction -------------------------------------------------------

  startDragQuery(e: MouseEvent): void { e.stopPropagation(); this.dragging = true; }
  onMouseMove(e: MouseEvent): void {
    if (!this.dragging) return;
    const p = this.toLocal(e);
    this.query = { x: clamp(p.x, 0, this.size), y: clamp(p.y, 0, this.size) };
    this.updateVote();
  }
  onMouseUp(): void { this.dragging = false; }
  addPoint(e: MouseEvent): void {
    const p = this.toLocal(e);
    this.points.push({ x: p.x, y: p.y, class: this.classChoice });
    this.recompute();
  }
  clear(): void { this.points = []; this.recompute(); }
  reset(): void { this.seed(); this.recompute(); }
  onParamChange(): void { this.recompute(); }

  // --- Fit + render ------------------------------------------------------

  private recompute(): void {
    this.fitModel();
    this.updateVote();
    this.render();
  }

  /** (Re)fit the forest from the current points. No DOM access. */
  private fitModel(): void {
    if (new Set(this.points.map((p) => p.class)).size < 2) { this.forest = null; return; }
    this.forest = new RandomForestClassifier(this.nTrees, this.maxDepth).fit(
      Matrix.fromRows(this.points.map((p) => [p.x, p.y])),
      this.points.map((p) => p.class as number)
    );
  }

  /** Paint the aggregate boundary and the individual-tree thumbnails. */
  private render(): void {
    const mainCtx = this.mainCanvas.nativeElement.getContext('2d');
    if (mainCtx) mainCtx.clearRect(0, 0, this.size, this.size);
    this.clearThumbs();
    if (!this.forest) return;

    // Aggregate boundary: alpha encodes how confident the ensemble is (vote margin).
    if (mainCtx) this.drawRegions(mainCtx, this.forest, this.size, 6, true);

    // Small multiples: the first few individual trees — each jagged and different.
    const thumbs = this.treeCanvases.toArray();
    for (let i = 0; i < THUMBS && i < this.forest.trees.length; i++) {
      const ctx = thumbs[i]?.nativeElement.getContext('2d');
      if (ctx) this.drawRegions(ctx, this.forest.trees[i], this.thumbSize, 6, false);
    }
  }

  private drawRegions(
    ctx: CanvasRenderingContext2D,
    model: RandomForestClassifier | DecisionTreeClassifier,
    dim: number,
    step: number,
    proba: boolean
  ): void {
    // Map thumbnail pixels back to the full data coordinate space.
    const toData = this.size / dim;
    const coords: number[][] = [];
    for (let x = 0; x < dim; x += step) {
      for (let y = 0; y < dim; y += step) coords.push([x * toData, y * toData]);
    }
    const X = Matrix.fromRows(coords);
    const labels = model.predict(X);
    const conf = proba ? (model as RandomForestClassifier).predictProba(X).toArray() : null;
    const cIdx = new Map(model.classes.map((c, i) => [c, i]));

    let i = 0;
    for (let x = 0; x < dim; x += step) {
      for (let y = 0; y < dim; y += step) {
        const c = labels[i] as Classes;
        let alpha = 0.18;
        if (conf) {
          const margin = Math.abs((conf[i][cIdx.get(c) ?? 0] ?? 0.5) - 0.5) * 2; // 0..1
          alpha = 0.05 + 0.3 * margin;
        }
        const rgb = c === Classes.c1 ? '59,130,246' : '239,68,68';
        ctx.fillStyle = `rgba(${rgb},${alpha})`;
        ctx.fillRect(x, y, step, step);
        i++;
      }
    }
  }

  private clearThumbs(): void {
    this.treeCanvases?.forEach((c) => {
      const ctx = c.nativeElement.getContext('2d');
      ctx?.clearRect(0, 0, this.thumbSize, this.thumbSize);
    });
  }

  private toLocal(e: MouseEvent): { x: number; y: number } {
    const rect = (e.currentTarget as SVGElement).getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  private seed(): void {
    this.points = [];
    // Interleaved-ish blobs so a single deep tree visibly overfits.
    const blob = (cx: number, cy: number, cls: Classes) => {
      for (let i = 0; i < 14; i++) {
        this.points.push({ x: cx + this.randn() * 45, y: cy + this.randn() * 45, class: cls });
      }
    };
    blob(120, 130, Classes.c1);
    blob(240, 240, Classes.c1);
    blob(240, 120, Classes.c2);
    blob(120, 250, Classes.c2);
    this.query = { x: 180, y: 180 };
  }
  private randn(): number {
    return Math.sqrt(-2 * Math.log(Math.random() + 1e-12)) * Math.cos(2 * Math.PI * Math.random());
  }
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}
