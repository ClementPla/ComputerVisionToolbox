import { 
  Component, 
  ElementRef, 
  ViewChild, 
  AfterViewInit, 
  OnDestroy 
} from '@angular/core';
import {
  ClusterPoint,
  Centroid,
  KMeansStep,
  generateClusteredPoints,
  generateUniformPoints,
  initializeCentroidsRandom,
  assignPointsToCentroids,
  updateCentroids,
  interpolateCentroids,
  snapCentroidsToTarget,
  getClusterColor,
  computeWCSS,
  CLUSTER_COLORS
} from './kmeans';
import { TutorialTemplateComponent } from '../../../Toolbox/tutorial-template/tutorial-template.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { MatCheckbox } from '@angular/material/checkbox';

type DataDistribution = 'clustered' | 'uniform';

@Component({
    selector: 'app-kmeans-tutorial',
    templateUrl: './kmeans-tutorial.component.html',
    styleUrl: './kmeans-tutorial.component.scss',
    imports: [TutorialTemplateComponent, MatButton, MatIcon, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatSlider, MatSliderThumb, ReactiveFormsModule, FormsModule, MatButtonToggleGroup, MatButtonToggle, MatCheckbox]
})
export class KMeansTutorialComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  // Canvas size
  readonly width = 600;
  readonly height = 500;

  // Algorithm parameters
  k = 3;
  numPoints = 150;
  dataDistribution: DataDistribution = 'clustered';

  // State
  points: ClusterPoint[] = [];
  centroids: Centroid[] = [];
  currentStep: KMeansStep = 'init';
  iteration = 0;
  converged = false;
  assignmentsChanged = 0;
  wcss = 0;

  // Animation
  isPlaying = false;
  animationSpeed = 800; // ms per step
  private animationTimer: any = null;
  private animationFrame: number | null = null;
  private animationProgress = 0;
  private isAnimatingCentroids = false;

  // Visualization options
  showVoronoi = false;
  showConnections = true;
  showHistory = false;
  centroidHistory: { x: number; y: number; id: number }[][] = [];

  // Cluster colors for template
  readonly clusterColors = CLUSTER_COLORS;

  ngAfterViewInit(): void {
    this.reset();
  }

  ngOnDestroy(): void {
    this.stopAnimation();
  }

  // --- Reset & Initialize ---
  reset(): void {
    this.stopAnimation();
    
    // Generate points
    if (this.dataDistribution === 'clustered') {
      this.points = generateClusteredPoints(this.numPoints, this.k, this.width, this.height, 60);
    } else {
      this.points = generateUniformPoints(this.numPoints, this.width, this.height);
    }
    
    // Initialize centroids
    this.centroids = initializeCentroidsRandom(this.k, this.width, this.height);
    
    // Reset state
    this.currentStep = 'init';
    this.iteration = 0;
    this.converged = false;
    this.assignmentsChanged = 0;
    this.wcss = 0;
    this.centroidHistory = [];
    
    this.render();
  }

  // --- Step Execution ---
  nextStep(): void {
    if (this.converged || this.isAnimatingCentroids) return;

    switch (this.currentStep) {
      case 'init':
      case 'm-step':
        // Do E-step
        this.doEStep();
        break;
      case 'e-step':
        // Do M-step
        this.doMStep();
        break;
    }
  }

  private doEStep(): void {
    this.currentStep = 'e-step';
    this.assignmentsChanged = assignPointsToCentroids(this.points, this.centroids);
    this.wcss = computeWCSS(this.points, this.centroids);
    this.render();
  }

  private doMStep(): void {
    // Save current positions for history
    if (this.showHistory) {
      this.centroidHistory.push(
        this.centroids.map(c => ({ x: c.x, y: c.y, id: c.id }))
      );
    }

    const movement = updateCentroids(this.points, this.centroids);
    this.currentStep = 'm-step';
    this.iteration++;

    // Animate centroid movement
    this.animateCentroidMovement(() => {
      // Check convergence after animation
      if (movement < 0.5 || this.assignmentsChanged === 0) {
        this.converged = true;
        this.currentStep = 'converged';
      }
      this.render();
    });
  }

  private animateCentroidMovement(onComplete: () => void): void {
    this.isAnimatingCentroids = true;
    this.animationProgress = 0;
    const duration = this.animationSpeed * 0.6;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      this.animationProgress = Math.min(1, elapsed / duration);
      
      // Ease out cubic
      const t = 1 - Math.pow(1 - this.animationProgress, 3);
      interpolateCentroids(this.centroids, t === 1 ? 1 : t * 0.15);
      
      this.render();

      if (this.animationProgress < 1) {
        this.animationFrame = requestAnimationFrame(animate);
      } else {
        snapCentroidsToTarget(this.centroids);
        this.isAnimatingCentroids = false;
        this.render();
        onComplete();
      }
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  // --- Auto Play ---
  togglePlay(): void {
    if (this.isPlaying) {
      this.stopAnimation();
    } else {
      this.startAnimation();
    }
  }

  private startAnimation(): void {
    if (this.converged) return;
    this.isPlaying = true;
    
    this.animationTimer = setInterval(() => {
      if (!this.isAnimatingCentroids && !this.converged) {
        this.nextStep();
      }
      if (this.converged) {
        this.stopAnimation();
      }
    }, this.animationSpeed);
  }

  private stopAnimation(): void {
    this.isPlaying = false;
    if (this.animationTimer) {
      clearInterval(this.animationTimer);
      this.animationTimer = null;
    }
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  runToConvergence(): void {
    this.stopAnimation();
    
    // Run without animation
    while (!this.converged && this.iteration < 100) {
      assignPointsToCentroids(this.points, this.centroids);
      const movement = updateCentroids(this.points, this.centroids);
      snapCentroidsToTarget(this.centroids);
      this.iteration++;
      
      if (movement < 0.5) {
        this.converged = true;
        this.currentStep = 'converged';
      }
    }
    
    this.wcss = computeWCSS(this.points, this.centroids);
    this.render();
  }

  // --- Rendering ---
  private render(): void {
    const ctx = this.canvas.nativeElement.getContext('2d')!;
    
    // Clear
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, this.width, this.height);

    // Draw Voronoi if enabled
    if (this.showVoronoi && this.centroids.length > 0) {
      this.drawVoronoi(ctx);
    }

    // Draw centroid history
    if (this.showHistory) {
      this.drawCentroidHistory(ctx);
    }

    // Draw connections during E-step
    if (this.showConnections && this.currentStep === 'e-step') {
      this.drawConnections(ctx);
    }

    // Draw points
    this.drawPoints(ctx);

    // Draw centroids
    this.drawCentroids(ctx);
  }

  private drawVoronoi(ctx: CanvasRenderingContext2D): void {
    const imageData = ctx.createImageData(this.width, this.height);
    const data = imageData.data;

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let minDist = Infinity;
        let nearestId = 0;

        for (const centroid of this.centroids) {
          const dist = (x - centroid.x) ** 2 + (y - centroid.y) ** 2;
          if (dist < minDist) {
            minDist = dist;
            nearestId = centroid.id;
          }
        }

        const color = getClusterColor(nearestId);
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        const idx = (y * this.width + x) * 4;
        data[idx] = r;
        data[idx + 1] = g;
        data[idx + 2] = b;
        data[idx + 3] = 30; // Very transparent
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  private drawCentroidHistory(ctx: CanvasRenderingContext2D): void {
    for (const snapshot of this.centroidHistory) {
      for (const pos of snapshot) {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = getClusterColor(pos.id) + '40';
        ctx.fill();
      }
    }

    // Draw trails
    for (let i = 0; i < this.centroids.length; i++) {
      ctx.beginPath();
      ctx.strokeStyle = getClusterColor(i) + '60';
      ctx.lineWidth = 2;
      
      let started = false;
      for (const snapshot of this.centroidHistory) {
        const pos = snapshot.find(p => p.id === i);
        if (pos) {
          if (!started) {
            ctx.moveTo(pos.x, pos.y);
            started = true;
          } else {
            ctx.lineTo(pos.x, pos.y);
          }
        }
      }
      
      // Connect to current position
      const current = this.centroids[i];
      if (started && current) {
        ctx.lineTo(current.x, current.y);
      }
      
      ctx.stroke();
    }
  }

  private drawConnections(ctx: CanvasRenderingContext2D): void {
    ctx.lineWidth = 1;
    
    for (const point of this.points) {
      const centroid = this.centroids.find(c => c.id === point.clusterId);
      if (!centroid) continue;

      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(centroid.x, centroid.y);
      ctx.strokeStyle = getClusterColor(point.clusterId) + '40';
      ctx.stroke();
    }
  }

  private drawPoints(ctx: CanvasRenderingContext2D): void {
    for (const point of this.points) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = getClusterColor(point.clusterId);
      ctx.fill();
      
      // Subtle border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  private drawCentroids(ctx: CanvasRenderingContext2D): void {
    for (const centroid of this.centroids) {
      // Outer glow
      ctx.beginPath();
      ctx.arc(centroid.x, centroid.y, 16, 0, Math.PI * 2);
      ctx.fillStyle = getClusterColor(centroid.id) + '30';
      ctx.fill();

      // Main circle
      ctx.beginPath();
      ctx.arc(centroid.x, centroid.y, 12, 0, Math.PI * 2);
      ctx.fillStyle = getClusterColor(centroid.id);
      ctx.fill();
      
      // White border
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Cross marker
      ctx.beginPath();
      ctx.moveTo(centroid.x - 6, centroid.y);
      ctx.lineTo(centroid.x + 6, centroid.y);
      ctx.moveTo(centroid.x, centroid.y - 6);
      ctx.lineTo(centroid.x, centroid.y + 6);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  // --- Parameter Changes ---
  onParameterChange(): void {
    this.reset();
  }

  onVisualizationChange(): void {
    this.render();
  }

  // --- Helpers ---
  getStepLabel(): string {
    switch (this.currentStep) {
      case 'init': return 'Ready';
      case 'e-step': return 'E-Step (Assign)';
      case 'm-step': return 'M-Step (Update)';
      case 'converged': return 'Converged!';
    }
  }

  getStepDescription(): string {
    switch (this.currentStep) {
      case 'init': 
        return 'Centroids initialized randomly. Click Next to start.';
      case 'e-step': 
        return `Assigned each point to nearest centroid. ${this.assignmentsChanged} points changed cluster.`;
      case 'm-step': 
        return 'Moved centroids to the mean of their assigned points.';
      case 'converged': 
        return `Algorithm converged in ${this.iteration} iterations.`;
    }
  }

  getClusterSize(clusterId: number): number {
    return this.points.filter(p => p.clusterId === clusterId).length;
  }
}