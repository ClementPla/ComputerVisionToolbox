import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { Optimizer, OptimizerType, createOptimizer, Point2D, GradientResult } from './optimizers';
import { TestFunction, FunctionType, getTestFunction } from './test-functions';

interface TracePoint extends Point2D {
  iteration: number;
}

interface OptimizerState {
  type: OptimizerType;
  optimizer: Optimizer;
  position: Point2D;
  trace: TracePoint[];
  color: string;
  enabled: boolean;
}

@Component({
  selector: 'app-optimizer-comparison',
  templateUrl: './optimizer-comparison.component.html',
  styleUrl: './optimizer-comparison.component.scss',
  standalone: false
})
export class OptimizerComparisonComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  // Function settings
  functionType: FunctionType = 'himmelblau';
  testFunction: TestFunction = getTestFunction('himmelblau');

  // Starting point
  startPoint: Point2D = { x: -4, y: 4 };

  // Animation state
  isRunning = false;
  currentIteration = 0;
  maxIterations = 500;
  animationSpeed = 50; // ms per iteration

  // Gradient noise
  noiseEnabled = false;
  noiseScale = 0.5;

  // Hyperparameters
  learningRate = 0.01;
  momentum = 0.9;
  beta1 = 0.9;
  beta2 = 0.999;

  // Optimizer states
  optimizers: OptimizerState[] = [];

  // Available optimizers
  readonly optimizerOptions: { type: OptimizerType; name: string; color: string }[] = [
    { type: 'sgd', name: 'SGD', color: '#ef4444' },
    { type: 'momentum', name: 'Momentum', color: '#f97316' },
    { type: 'nesterov', name: 'Nesterov', color: '#eab308' },
    { type: 'adagrad', name: 'AdaGrad', color: '#22c55e' },
    { type: 'rmsprop', name: 'RMSProp', color: '#06b6d4' },
    { type: 'adadelta', name: 'Adadelta', color: '#3b82f6' },
    { type: 'adam', name: 'Adam', color: '#8b5cf6' }
  ];

  readonly functionOptions: { type: FunctionType; name: string }[] = [
    { type: 'himmelblau', name: 'Himmelblau (4 minima)' },
    { type: 'rosenbrock', name: 'Rosenbrock (banana)' },
    { type: 'beale', name: 'Beale (flat valley)' },
    { type: 'booth', name: 'Booth (simple)' },
    { type: 'matyas', name: 'Matyas (shallow)' }
  ];

  // Canvas
  readonly size = 512;
  private contourCache: ImageData | null = null;
  private animationFrame: number | null = null;
  private lastUpdateTime = 0;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.initOptimizers();
    this.renderContours();
    this.render();
  }

  ngOnDestroy(): void {
    this.stopAnimation();
  }

  // --- Initialization ---
  private initOptimizers(): void {
    this.optimizers = this.optimizerOptions.map(opt => ({
      type: opt.type,
      optimizer: createOptimizer(opt.type, this.getOptimizerConfig()),
      position: { ...this.startPoint },
      trace: [{ ...this.startPoint, iteration: 0 }],
      color: opt.color,
      enabled: opt.type === 'sgd' || opt.type === 'adam' // Enable SGD and Adam by default
    }));
  }

  private getOptimizerConfig() {
    return {
      learningRate: this.learningRate,
      momentum: this.momentum,
      beta1: this.beta1,
      beta2: this.beta2
    };
  }

  // --- Optimizer Management ---
  toggleOptimizer(type: OptimizerType): void {
    const opt = this.optimizers.find(o => o.type === type);
    if (opt) {
      opt.enabled = !opt.enabled;
      this.render();
    }
  }

  isOptimizerEnabled(type: OptimizerType): boolean {
    return this.optimizers.find(o => o.type === type)?.enabled ?? false;
  }

  updateHyperparameters(): void {
    const config = this.getOptimizerConfig();
    this.optimizers.forEach(opt => {
      opt.optimizer.updateConfig(config);
    });
  }

  // --- Function Management ---
  onFunctionChange(): void {
    this.testFunction = getTestFunction(this.functionType);
    this.contourCache = null;
    this.resetSimulation();
    this.renderContours();
    this.render();
  }

  // --- Simulation Control ---
  startAnimation(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastUpdateTime = performance.now();
    
    this.ngZone.runOutsideAngular(() => {
      this.animationLoop();
    });
  }

  stopAnimation(): void {
    this.isRunning = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  toggleAnimation(): void {
    if (this.isRunning) {
      this.stopAnimation();
    } else {
      this.startAnimation();
    }
  }

  resetSimulation(): void {
    this.stopAnimation();
    this.currentIteration = 0;
    
    this.optimizers.forEach(opt => {
      opt.position = { ...this.startPoint };
      opt.trace = [{ ...this.startPoint, iteration: 0 }];
      opt.optimizer.reset();
      opt.optimizer.updateConfig(this.getOptimizerConfig());
    });
    
    this.render();
  }

  private animationLoop(): void {
    if (!this.isRunning) return;

    const now = performance.now();
    if (now - this.lastUpdateTime >= this.animationSpeed) {
      this.lastUpdateTime = now;
      this.step();
    }

    this.animationFrame = requestAnimationFrame(() => this.animationLoop());
  }

  private step(): void {
    this.currentIteration++;

    // Check if we need to reset
    if (this.currentIteration > this.maxIterations) {
      this.currentIteration = 0;
      this.optimizers.forEach(opt => {
        opt.position = { ...this.startPoint };
        opt.trace = [{ ...this.startPoint, iteration: 0 }];
        opt.optimizer.reset();
      });
      this.ngZone.run(() => {}); // Trigger change detection
      this.render();
      return;
    }

    // Update each enabled optimizer
    this.optimizers.forEach(opt => {
      if (!opt.enabled) return;

      // Compute gradient
      let grad = this.testFunction.grad(opt.position.x, opt.position.y);

      // Add noise if enabled
      if (this.noiseEnabled) {
        grad = this.addNoise(grad);
      }

      // Take optimization step
      const newPos = opt.optimizer.step(opt.position, grad);

      // Clamp to domain
      newPos.x = Math.max(this.testFunction.xMin, Math.min(this.testFunction.xMax, newPos.x));
      newPos.y = Math.max(this.testFunction.yMin, Math.min(this.testFunction.yMax, newPos.y));

      opt.position = newPos;
      opt.trace.push({ ...newPos, iteration: this.currentIteration });

      // Limit trace length for performance
      if (opt.trace.length > this.maxIterations + 10) {
        opt.trace = opt.trace.slice(-this.maxIterations - 10);
      }
    });

    this.render();
  }

  private addNoise(grad: GradientResult): GradientResult {
    const magnitude = Math.sqrt(grad.gx * grad.gx + grad.gy * grad.gy);
    const noise = this.noiseScale * magnitude;
    return {
      gx: grad.gx + (Math.random() - 0.5) * 2 * noise,
      gy: grad.gy + (Math.random() - 0.5) * 2 * noise
    };
  }

  // --- Canvas Interaction ---
  onCanvasClick(event: MouseEvent): void {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;

    // Convert to function coordinates
    const { xMin, xMax, yMin, yMax } = this.testFunction;
    this.startPoint = {
      x: xMin + (px / this.size) * (xMax - xMin),
      y: yMin + (py / this.size) * (yMax - yMin)
    };

    this.resetSimulation();
  }

  // --- Rendering ---
  private renderContours(): void {
    const ctx = this.canvas.nativeElement.getContext('2d')!;
    const { xMin, xMax, yMin, yMax, f } = this.testFunction;

    // Compute function values
    const values: number[][] = [];
    let minVal = Infinity, maxVal = -Infinity;

    for (let py = 0; py < this.size; py++) {
      values[py] = [];
      for (let px = 0; px < this.size; px++) {
        const x = xMin + (px / this.size) * (xMax - xMin);
        const y = yMin + (py / this.size) * (yMax - yMin);
        const v = f(x, y);
        values[py][px] = v;
        if (v < minVal) minVal = v;
        if (v > maxVal) maxVal = v;
      }
    }

    // Use log scale for better visualization
    const logMin = Math.log(minVal + 1);
    const logMax = Math.log(maxVal + 1);

    // Create image
    const imageData = ctx.createImageData(this.size, this.size);
    const data = imageData.data;

    for (let py = 0; py < this.size; py++) {
      for (let px = 0; px < this.size; px++) {
        const v = values[py][px];
        const logV = Math.log(v + 1);
        const t = (logV - logMin) / (logMax - logMin);

        // Color gradient: dark blue (low) to yellow (high)
        const idx = (py * this.size + px) * 4;
        
        // Viridis-like colormap
        const r = Math.round(255 * Math.min(1, 0.267 + 2.2 * t - 1.8 * t * t));
        const g = Math.round(255 * Math.min(1, 0.004 + 1.4 * t - 0.4 * t * t));
        const b = Math.round(255 * Math.max(0, 0.329 + 0.4 * t - 1.2 * t * t + 0.5 * t * t * t));

        data[idx] = r;
        data[idx + 1] = g;
        data[idx + 2] = b;
        data[idx + 3] = 255;
      }
    }

    this.contourCache = imageData;
  }

  private render(): void {
    const ctx = this.canvas.nativeElement.getContext('2d')!;

    // Draw contours
    if (this.contourCache) {
      ctx.putImageData(this.contourCache, 0, 0);
    }

    // Draw minima markers
    this.drawMinima(ctx);

    // Draw traces and current positions
    this.optimizers.forEach(opt => {
      if (!opt.enabled || opt.trace.length < 2) return;
      this.drawTrace(ctx, opt);
    });

    // Draw start point
    this.drawStartPoint(ctx);
  }

  private drawMinima(ctx: CanvasRenderingContext2D): void {
    const { xMin, xMax, yMin, yMax } = this.testFunction;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 2;

    this.testFunction.minima.forEach(m => {
      const px = ((m.x - xMin) / (xMax - xMin)) * this.size;
      const py = ((m.y - yMin) / (yMax - yMin)) * this.size;

      // Draw star marker
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        ctx.moveTo(px, py);
        ctx.lineTo(px + Math.cos(angle) * 8, py + Math.sin(angle) * 8);
      }
      ctx.stroke();
    });
  }

  private drawTrace(ctx: CanvasRenderingContext2D, opt: OptimizerState): void {
    const { xMin, xMax, yMin, yMax } = this.testFunction;
    const trace = opt.trace;

    // Convert to pixel coordinates
    const toPixel = (p: Point2D) => ({
      x: ((p.x - xMin) / (xMax - xMin)) * this.size,
      y: ((p.y - yMin) / (yMax - yMin)) * this.size
    });

    // Draw trace line
    ctx.beginPath();
    ctx.strokeStyle = opt.color;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    const start = toPixel(trace[0]);
    ctx.moveTo(start.x, start.y);

    for (let i = 1; i < trace.length; i++) {
      const p = toPixel(trace[i]);
      ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();

    // Draw current position
    const current = toPixel(opt.position);
    ctx.beginPath();
    ctx.arc(current.x, current.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = opt.color;
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  private drawStartPoint(ctx: CanvasRenderingContext2D): void {
    const { xMin, xMax, yMin, yMax } = this.testFunction;
    const px = ((this.startPoint.x - xMin) / (xMax - xMin)) * this.size;
    const py = ((this.startPoint.y - yMin) / (yMax - yMin)) * this.size;

    // Draw crosshair
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(px - 10, py);
    ctx.lineTo(px + 10, py);
    ctx.moveTo(px, py - 10);
    ctx.lineTo(px, py + 10);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
  }

  // --- Helpers ---
  getOptimizerColor(type: OptimizerType): string {
    return this.optimizerOptions.find(o => o.type === type)?.color ?? '#888';
  }

  getOptimizerName(type: OptimizerType): string {
    return this.optimizerOptions.find(o => o.type === type)?.name ?? type;
  }

  getCurrentValue(type: OptimizerType): number {
    const opt = this.optimizers.find(o => o.type === type);
    if (!opt) return 0;
    return this.testFunction.f(opt.position.x, opt.position.y);
  }
}