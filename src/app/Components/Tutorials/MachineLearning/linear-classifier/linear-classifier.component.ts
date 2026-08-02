import { Component, ElementRef, ViewChild } from '@angular/core';
import { sampleGaussian2D } from 'src/app/utils/sampling';
import { Matrix } from 'src/app/lib/numpy';
import {
  Classifier,
  Transformer,
  LinearDiscriminantAnalysis,
  QuadraticDiscriminantAnalysis,
  LogisticRegression,
  PolynomialFeatures,
  RBFSampler,
} from 'src/app/lib/ml';

// --- Types for Preprocessing ---
export type PreprocessMode = 'None' | 'Polynomial' | 'RBF-Random' | 'RBF-KMeans';
export type LRMode = 'OVO' | 'OVA' | 'Softmax';

export interface PreprocessConfig {
  mode: PreprocessMode;
  degree: number;
  dimensions: number;
  sigma: number;
}

export enum Classes { c1 = 1, c2 = 2, c3 = 3 }
export interface Datapoint { x: number; y: number; class: Classes; }
export interface Dataset { points: Datapoint[]; }
export enum Model {
  LDA = 'LDA',
  QDA = 'QDA',
  LogisticRegression = 'Logistic Regression'
}

@Component({
  selector: 'app-linear-classifier',
  templateUrl: './linear-classifier.component.html',
  styleUrl: './linear-classifier.component.scss',
  standalone: false
})
export class LinearClassifierComponent {
  @ViewChild('linearClassifier', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  // State
  classChoice: Classes = Classes.c1;
  modelChoice: Model = Model.LDA;
  dataset: Dataset = { points: [] };
  isDrawing: boolean = false;

  // Hyperparameters
  nIterations: number = 200;
  learningRate: number = 0.1;
  weightDecay: number = 0.01;
  lrMode: LRMode = 'Softmax';

  // Preprocessing Config
  prepConfig: PreprocessConfig = {
    mode: 'None',
    degree: 2,
    dimensions: 5,
    sigma: 50
  };

  // Enums for Template
  public get Classes() { return Classes; }
  public get Model() { return Model; }

  // --- Drawing Logic ---
  startDraw() { this.isDrawing = true; }
  stopDraw() { this.isDrawing = false; }

  draw(event: MouseEvent) {
    if (!this.isDrawing) return;

    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const points = sampleGaussian2D(2, { x, y }, [[10, 0], [0, 10]]);

    points.forEach(p => {
      this.dataset.points.push({ x: p.x, y: p.y, class: this.classChoice });
    });

    this.updateDecisionBoundaries();
  }

  updateDecisionBoundaries() {
    if (this.dataset.points.length < 3) return;

    const canvasEl = this.canvas.nativeElement;
    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;

    // 1. Build the (normalized) training matrix and labels.
    const scale = canvasEl.width;
    const X = Matrix.fromRows(this.dataset.points.map(p => [p.x / scale, p.y / scale]));
    const y = this.dataset.points.map(p => p.class as number);

    // 2. Fit preprocessing, then the classifier, in the transformed space.
    const transformer = this.buildTransformer(scale).fit(X);
    const model = this.buildClassifier().fit(transformer.transform(X), y);
    if (model.classes.length === 0) return;

    // 3. Predict the whole decision grid in one batch, then paint it.
    const step = 6;
    const coords: number[][] = [];
    for (let px = 0; px < canvasEl.width; px += step) {
      for (let py = 0; py < canvasEl.height; py += step) {
        coords.push([px / scale, py / scale]);
      }
    }
    const grid = transformer.transform(Matrix.fromRows(coords));
    const predictions = model.predict(grid);

    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    let idx = 0;
    for (let px = 0; px < canvasEl.width; px += step) {
      for (let py = 0; py < canvasEl.height; py += step) {
        ctx.fillStyle = this.getLightColor(predictions[idx++] as Classes);
        ctx.fillRect(px, py, step, step);
      }
    }
  }

  /** Feature preprocessing pipeline for the current config (in normalized units). */
  private buildTransformer(scale: number): Transformer {
    switch (this.prepConfig.mode) {
      case 'Polynomial':
        return new PolynomialFeatures(this.prepConfig.degree);
      case 'RBF-Random':
        return new RBFSampler(this.prepConfig.dimensions, this.prepConfig.sigma / scale, 'random');
      case 'RBF-KMeans':
        return new RBFSampler(this.prepConfig.dimensions, this.prepConfig.sigma / scale, 'kmeans');
      default:
        return new PolynomialFeatures(1); // [1, x, y] — plain linear features
    }
  }

  private buildClassifier(): Classifier {
    switch (this.modelChoice) {
      case Model.QDA:
        return new QuadraticDiscriminantAnalysis();
      case Model.LogisticRegression:
        return new LogisticRegression(
          this.lrMode === 'Softmax' ? 'softmax' : 'ova',
          this.nIterations,
          this.weightDecay,
          this.learningRate
        );
      case Model.LDA:
      default:
        return new LinearDiscriminantAnalysis();
    }
  }

  // --- UI Helpers ---
  get isModelComplex(): boolean {
    const pCount = this.dataset.points.length;
    if (this.prepConfig.mode === 'Polynomial' && this.prepConfig.degree > 2 && pCount < 20) return true;
    if (this.prepConfig.mode.includes('RBF') && pCount < this.prepConfig.dimensions * 3) return true;
    if (this.modelChoice === Model.QDA && pCount < 15) return true;
    return false;
  }

  retrainModel() { this.updateDecisionBoundaries(); }

  clearPoints() {
    this.dataset.points = [];
    const ctx = this.canvas.nativeElement.getContext('2d');
    ctx?.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  private getLightColor(c: Classes): string {
    const colors: Record<number, string> = {
      [Classes.c1]: 'rgba(59, 130, 246, 0.25)', // Blue
      [Classes.c2]: 'rgba(34, 197, 94, 0.25)',  // Green
      [Classes.c3]: 'rgba(239, 68, 68, 0.25)'   // Red
    };
    return colors[c] || 'transparent';
  }
}
