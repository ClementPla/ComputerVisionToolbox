import { Component, ElementRef, ViewChild } from '@angular/core';
import { sampleGaussian2D } from 'src/app/utils/sampling';
import { LDAClassifier } from './models/LDA';
import { QDAClassifier } from './models/QDA';
import { AbstractModel } from './models/model';
import { LogisticRegression, LRMode } from './models/logisticRegression';

// --- Types for Preprocessing ---
export type PreprocessMode = 'None' | 'Polynomial' | 'RBF-Random' | 'RBF-KMeans';

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

    // 1. Instantiate and TRAIN the model first
    const model = this.getModel();
    model.train(this.dataset.points, this.prepConfig);
    
    // 2. Clear canvas and draw background
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    const step = 6; // Resolution (higher = better performance)

    for (let x = 0; x < canvasEl.width; x += step) {
      for (let y = 0; y < canvasEl.height; y += step) {
        const predictedClass = model.predict(x, y, this.prepConfig);
        ctx.fillStyle = this.getLightColor(predictedClass);
        ctx.fillRect(x, y, step, step);
      }
    }
  }

  getModel(): AbstractModel {
    switch(this.modelChoice) {
      case Model.LDA: return new LDAClassifier();
      case Model.QDA: return new QDAClassifier();
      case Model.LogisticRegression: 
        return new LogisticRegression(this.lrMode, this.nIterations, this.weightDecay, this.learningRate);
      default: return new LDAClassifier();
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