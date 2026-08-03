import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Matrix } from 'src/app/lib/numpy';
import { GaussianNaiveBayes, normalPdf } from 'src/app/lib/ml';
import { TutorialTemplateComponent } from '../../../Toolbox/tutorial-template/tutorial-template.component';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

export enum Classes { c1 = 1, c2 = 2 }
interface Point { x: number; y: number; class: Classes }
interface Ellipse { cx: number; cy: number; rx: number; ry: number; color: string }
interface Row {
  cls: Classes;
  color: string;
  prior: number;
  lx: number;
  ly: number;
  posterior: number;
}

@Component({
  selector: 'app-naive-bayes',
  templateUrl: './naive-bayes.component.html',
  styleUrl: './naive-bayes.component.scss',
  imports: [TutorialTemplateComponent, FormsModule, MatButtonToggleGroup, MatButtonToggle, MatButton, MatIcon],
})
export class NaiveBayesComponent implements OnInit {
  @ViewChild('regionCanvas', { static: true }) regionCanvas!: ElementRef<HTMLCanvasElement>;

  readonly size = 460;
  readonly colors: Record<number, string> = { [Classes.c1]: '#3b82f6', [Classes.c2]: '#ef4444' };

  classChoice: Classes = Classes.c1;
  points: Point[] = [];
  query = { x: 250, y: 210 };
  private dragging = false;
  private clf: GaussianNaiveBayes | null = null;

  get Classes() { return Classes; }

  ngOnInit(): void {
    this.seed();
    this.fit();
  }

  // --- The model, made visible ------------------------------------------

  /** One axis-aligned ellipse per class per σ-level (naive ⇒ diagonal covariance). */
  get ellipses(): Ellipse[] {
    if (!this.clf) return [];
    const out: Ellipse[] = [];
    this.clf.classes.forEach((c, k) => {
      const [mx, my] = this.clf!.means[k];
      const [vx, vy] = this.clf!.variances[k];
      for (const s of [1, 2]) {
        out.push({ cx: mx, cy: my, rx: Math.sqrt(vx) * s, ry: Math.sqrt(vy) * s, color: this.colors[c] });
      }
    });
    return out;
  }

  /** The naive Bayes computation for the query point, one row per class. */
  get breakdown(): Row[] {
    if (!this.clf || this.clf.classes.length === 0) return [];
    const priors = this.clf.priors();
    const joints = this.clf.classes.map((c, k) => {
      const [mx, my] = this.clf!.means[k];
      const [vx, vy] = this.clf!.variances[k];
      const lx = normalPdf(this.query.x, mx, vx);
      const ly = normalPdf(this.query.y, my, vy);
      return { c, prior: priors[k], lx, ly, joint: priors[k] * lx * ly };
    });
    const total = joints.reduce((s, j) => s + j.joint, 0) || 1;
    return joints.map((j) => ({
      cls: j.c,
      color: this.colors[j.c],
      prior: j.prior,
      lx: j.lx,
      ly: j.ly,
      posterior: j.joint / total,
    }));
  }

  get predicted(): Classes {
    const b = this.breakdown;
    if (b.length === 0) return Classes.c1;
    return b.reduce((best, r) => (r.posterior > best.posterior ? r : best)).cls;
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
  onMouseUp(): void { this.dragging = false; }

  addPoint(event: MouseEvent): void {
    const p = this.toLocal(event);
    this.points.push({ x: p.x, y: p.y, class: this.classChoice });
    this.fit();
  }
  clear(): void { this.points = []; this.fit(); }
  reset(): void { this.seed(); this.fit(); }

  // --- Fit + decision regions -------------------------------------------

  private fit(): void {
    const ctx = this.regionCanvas.nativeElement.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, this.size, this.size);
    const classesPresent = new Set(this.points.map((p) => p.class));
    if (classesPresent.size < 2) { this.clf = null; return; }

    this.clf = new GaussianNaiveBayes().fit(
      Matrix.fromRows(this.points.map((p) => [p.x, p.y])),
      this.points.map((p) => p.class as number)
    );
    if (!ctx) return;

    const step = 8;
    const coords: number[][] = [];
    for (let x = 0; x < this.size; x += step) {
      for (let y = 0; y < this.size; y += step) coords.push([x, y]);
    }
    const preds = this.clf.predict(Matrix.fromRows(coords));
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
    const blob = (cx: number, cy: number, sx: number, sy: number, cls: Classes) => {
      for (let i = 0; i < 12; i++) {
        this.points.push({ x: cx + this.randn() * sx, y: cy + this.randn() * sy, class: cls });
      }
    };
    // Different per-axis spreads make the axis-aligned ellipses visibly elliptical.
    blob(150, 180, 55, 25, Classes.c1);
    blob(300, 290, 30, 55, Classes.c2);
    this.query = { x: 250, y: 210 };
  }
  private randn(): number {
    return Math.sqrt(-2 * Math.log(Math.random() + 1e-12)) * Math.cos(2 * Math.PI * Math.random());
  }
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}
