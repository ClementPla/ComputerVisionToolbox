import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { normalPdf, isotropicNormalPdf } from 'src/app/lib/ml';

type TabType = 'gmm' | 'kde';
type DimensionType = '1d' | '2d';

interface Point {
  x: number;
  y: number;
}

interface GaussianComponent {
  mean: number | Point;
  variance: number;
  weight: number;
  color: string;
}

@Component({
  selector: 'app-density-estimation-tutorial',
  templateUrl: './density-estimation.component.html',
  styleUrls: ['./density-estimation.component.scss'],
  standalone: false,
})
export class DensityEstimationComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas1d', { static: false }) canvas1dRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas2d', { static: false }) canvas2dRef!: ElementRef<HTMLCanvasElement>;

  currentTab: TabType = 'gmm';
  currentDimension: DimensionType = '1d';

  // GMM parameters
  numComponents = 3;
  readonly maxComponents = 5;

  // KDE parameters
  bandwidth = 0.3;
  readonly minBandwidth = 0.05;
  readonly maxBandwidth = 1.0;

  // Data
  dataPoints1D: number[] = [];
  dataPoints2D: Point[] = [];

  // Gaussian components for GMM
  gmmComponents: GaussianComponent[] = [];

  // Colors for components
  readonly componentColors = ['#64B5F6', '#81C784', '#FFB74D', '#E57373', '#CE93D8'];

  // Canvas dimensions
  readonly canvasWidth = 600;
  readonly canvasHeight1D = 300;
  readonly canvasHeight2D = 400;

  // Plot margins
  readonly margin = { top: 20, right: 20, bottom: 40, left: 50 };

  ngOnInit(): void {
    this.generateData();
    this.initializeGMMComponents();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.draw(), 0);
  }

  setTab(tab: TabType): void {
    this.currentTab = tab;
    this.draw();
  }

  setDimension(dim: DimensionType): void {
    this.currentDimension = dim;
    this.generateData();
    this.initializeGMMComponents();
    setTimeout(() => this.draw(), 0);
  }

  onNumComponentsChange(value: number): void {
    this.numComponents = value;
    this.initializeGMMComponents();
    this.draw();
  }

  onBandwidthChange(value: number): void {
    this.bandwidth = value;
    this.draw();
  }

  regenerateData(): void {
    this.generateData();
    this.draw();
  }

  private generateData(): void {
    if (this.currentDimension === '1d') {
      // Generate 1D data from a mixture
      this.dataPoints1D = [];
      const centers = [-1.5, 0.5, 2.0];
      const stds = [0.4, 0.6, 0.3];
      const counts = [15, 25, 20];

      for (let i = 0; i < centers.length; i++) {
        for (let j = 0; j < counts[i]; j++) {
          this.dataPoints1D.push(this.randomGaussian(centers[i], stds[i]));
        }
      }
    } else {
      // Generate 2D data
      this.dataPoints2D = [];
      const centers: Point[] = [
        { x: -1.0, y: -0.5 },
        { x: 1.0, y: 1.0 },
        { x: 0.0, y: -1.0 },
      ];
      const stds = [0.4, 0.5, 0.3];
      const counts = [20, 25, 15];

      for (let i = 0; i < centers.length; i++) {
        for (let j = 0; j < counts[i]; j++) {
          this.dataPoints2D.push({
            x: this.randomGaussian(centers[i].x, stds[i]),
            y: this.randomGaussian(centers[i].y, stds[i]),
          });
        }
      }
    }
  }

  private initializeGMMComponents(): void {
    this.gmmComponents = [];

    if (this.currentDimension === '1d') {
      // Spread components across data range
      const positions = [-1.5, -0.5, 0.5, 1.5, 2.5];
      for (let i = 0; i < this.numComponents; i++) {
        this.gmmComponents.push({
          mean: positions[i],
          variance: 0.3 + Math.random() * 0.3,
          weight: 1 / this.numComponents,
          color: this.componentColors[i],
        });
      }
    } else {
      // 2D components
      const positions: Point[] = [
        { x: -1.0, y: -0.5 },
        { x: 1.0, y: 0.8 },
        { x: 0.0, y: -1.0 },
        { x: -0.5, y: 1.0 },
        { x: 1.5, y: -0.5 },
      ];
      for (let i = 0; i < this.numComponents; i++) {
        this.gmmComponents.push({
          mean: positions[i],
          variance: 0.3 + Math.random() * 0.2,
          weight: 1 / this.numComponents,
          color: this.componentColors[i],
        });
      }
    }
  }

  private randomGaussian(mean: number, std: number): number {
    // Box-Muller transform
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return mean + z * std;
  }

  private gaussian1D(x: number, mean: number, variance: number): number {
    return normalPdf(x, mean, variance);
  }

  private gaussian2D(x: number, y: number, meanX: number, meanY: number, variance: number): number {
    return isotropicNormalPdf([x, y], [meanX, meanY], variance);
  }

  draw(): void {
    if (this.currentDimension === '1d') {
      this.draw1D();
    } else {
      this.draw2D();
    }
  }

  private draw1D(): void {
    const canvas = this.canvas1dRef?.nativeElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = this.canvasWidth;
    const height = this.canvasHeight1D;
    const plotWidth = width - this.margin.left - this.margin.right;
    const plotHeight = height - this.margin.top - this.margin.bottom;

    // Clear
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, width, height);

    // Data range
    const xMin = -3;
    const xMax = 4;
    const xScale = (x: number) => this.margin.left + ((x - xMin) / (xMax - xMin)) * plotWidth;
    const yScale = (y: number, maxY: number) => height - this.margin.bottom - (y / maxY) * plotHeight;

    // Compute density values
    const numPoints = 200;
    const xs: number[] = [];
    const densities: number[] = [];

    for (let i = 0; i < numPoints; i++) {
      const x = xMin + (i / (numPoints - 1)) * (xMax - xMin);
      xs.push(x);

      if (this.currentTab === 'gmm') {
        // GMM density
        let density = 0;
        for (const comp of this.gmmComponents) {
          density += comp.weight * this.gaussian1D(x, comp.mean as number, comp.variance);
        }
        densities.push(density);
      } else {
        // KDE density
        let density = 0;
        const h = this.bandwidth;
        for (const xi of this.dataPoints1D) {
          density += this.gaussian1D(x, xi, h * h);
        }
        density /= this.dataPoints1D.length;
        densities.push(density);
      }
    }

    const maxDensity = Math.max(...densities) * 1.1;

    // Draw axes
    ctx.strokeStyle = '#404040';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.margin.left, this.margin.top);
    ctx.lineTo(this.margin.left, height - this.margin.bottom);
    ctx.lineTo(width - this.margin.right, height - this.margin.bottom);
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = '#a0a0a0';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    for (let x = -3; x <= 4; x++) {
      ctx.fillText(x.toString(), xScale(x), height - this.margin.bottom + 20);
    }
    ctx.textAlign = 'right';
    ctx.fillText('0', this.margin.left - 10, yScale(0, maxDensity));
    ctx.fillText(maxDensity.toFixed(2), this.margin.left - 10, yScale(maxDensity, maxDensity) + 5);

    // Draw individual components (GMM only)
    if (this.currentTab === 'gmm') {
      for (const comp of this.gmmComponents) {
        ctx.strokeStyle = comp.color;
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();

        for (let i = 0; i < numPoints; i++) {
          const x = xs[i];
          const y = comp.weight * this.gaussian1D(x, comp.mean as number, comp.variance);
          const px = xScale(x);
          const py = yScale(y, maxDensity);

          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    }

    // Draw total density
    ctx.strokeStyle = this.currentTab === 'gmm' ? '#e0e0e0' : '#64B5F6';
    ctx.lineWidth = 3;
    ctx.beginPath();

    for (let i = 0; i < numPoints; i++) {
      const px = xScale(xs[i]);
      const py = yScale(densities[i], maxDensity);

      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();

    // Fill under curve
    ctx.fillStyle = this.currentTab === 'gmm' ? 'rgba(255,255,255,0.1)' : 'rgba(100,181,246,0.15)';
    ctx.beginPath();
    ctx.moveTo(xScale(xs[0]), yScale(0, maxDensity));
    for (let i = 0; i < numPoints; i++) {
      ctx.lineTo(xScale(xs[i]), yScale(densities[i], maxDensity));
    }
    ctx.lineTo(xScale(xs[numPoints - 1]), yScale(0, maxDensity));
    ctx.closePath();
    ctx.fill();

    // Draw data points
    ctx.fillStyle = '#FFB74D';
    for (const xi of this.dataPoints1D) {
      const px = xScale(xi);
      const py = height - this.margin.bottom - 5;
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Legend
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    if (this.currentTab === 'gmm') {
      ctx.fillStyle = '#e0e0e0';
      ctx.fillText('Total density (sum)', this.margin.left + 10, this.margin.top + 15);
      ctx.fillStyle = '#a0a0a0';
      ctx.fillText('Individual components (dashed)', this.margin.left + 10, this.margin.top + 32);
    } else {
      ctx.fillStyle = '#64B5F6';
      ctx.fillText(`KDE (h = ${this.bandwidth.toFixed(2)})`, this.margin.left + 10, this.margin.top + 15);
    }
  }

  private draw2D(): void {
    const canvas = this.canvas2dRef?.nativeElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = this.canvasWidth;
    const height = this.canvasHeight2D;
    const plotWidth = width - this.margin.left - this.margin.right;
    const plotHeight = height - this.margin.top - this.margin.bottom;

    // Clear
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, width, height);

    // Data range
    const xMin = -2.5;
    const xMax = 2.5;
    const yMin = -2.5;
    const yMax = 2.5;

    const xScale = (x: number) => this.margin.left + ((x - xMin) / (xMax - xMin)) * plotWidth;
    const yScale = (y: number) => this.margin.top + ((yMax - y) / (yMax - yMin)) * plotHeight;

    // Compute density grid
    const gridSize = 50;
    const densityGrid: number[][] = [];
    let maxDensity = 0;

    for (let i = 0; i < gridSize; i++) {
      densityGrid[i] = [];
      const y = yMax - (i / (gridSize - 1)) * (yMax - yMin);

      for (let j = 0; j < gridSize; j++) {
        const x = xMin + (j / (gridSize - 1)) * (xMax - xMin);

        let density = 0;
        if (this.currentTab === 'gmm') {
          for (const comp of this.gmmComponents) {
            const mean = comp.mean as Point;
            density += comp.weight * this.gaussian2D(x, y, mean.x, mean.y, comp.variance);
          }
        } else {
          const h = this.bandwidth;
          for (const pt of this.dataPoints2D) {
            density += this.gaussian2D(x, y, pt.x, pt.y, h * h);
          }
          density /= this.dataPoints2D.length;
        }

        densityGrid[i][j] = density;
        maxDensity = Math.max(maxDensity, density);
      }
    }

    // Draw heatmap
    const cellWidth = plotWidth / gridSize;
    const cellHeight = plotHeight / gridSize;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const intensity = densityGrid[i][j] / maxDensity;
        const color = this.getHeatmapColor(intensity);
        ctx.fillStyle = color;
        ctx.fillRect(
          this.margin.left + j * cellWidth,
          this.margin.top + i * cellHeight,
          cellWidth + 1,
          cellHeight + 1
        );
      }
    }

    // Draw contour lines
    const contourLevels = [0.1, 0.3, 0.5, 0.7, 0.9];
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1;

    for (const level of contourLevels) {
      this.drawContour(ctx, densityGrid, level * maxDensity, gridSize, xMin, xMax, yMin, yMax, xScale, yScale);
    }

    // Draw axes
    ctx.strokeStyle = '#606060';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.margin.left, this.margin.top);
    ctx.lineTo(this.margin.left, height - this.margin.bottom);
    ctx.lineTo(width - this.margin.right, height - this.margin.bottom);
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = '#a0a0a0';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    for (let x = -2; x <= 2; x++) {
      ctx.fillText(x.toString(), xScale(x), height - this.margin.bottom + 15);
    }
    ctx.textAlign = 'right';
    for (let y = -2; y <= 2; y++) {
      ctx.fillText(y.toString(), this.margin.left - 8, yScale(y) + 4);
    }

    // Draw data points
    ctx.fillStyle = '#FFB74D';
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;
    for (const pt of this.dataPoints2D) {
      const px = xScale(pt.x);
      const py = yScale(pt.y);
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }

    // Draw component centers (GMM only)
    if (this.currentTab === 'gmm') {
      for (const comp of this.gmmComponents) {
        const mean = comp.mean as Point;
        const px = xScale(mean.x);
        const py = yScale(mean.y);

        ctx.fillStyle = comp.color;
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        // Draw variance circle
        const radius = Math.sqrt(comp.variance) * (plotWidth / (xMax - xMin));
        ctx.strokeStyle = comp.color;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // Color bar
    this.drawColorBar(ctx, width, height, maxDensity);
  }

  private getHeatmapColor(intensity: number): string {
    // Blue-purple-red colormap
    const r = Math.floor(intensity * 200 + 30);
    const g = Math.floor(intensity * 50 + 20);
    const b = Math.floor((1 - intensity) * 150 + 80);
    return `rgb(${r},${g},${b})`;
  }

  private drawContour(
    ctx: CanvasRenderingContext2D,
    grid: number[][],
    level: number,
    size: number,
    xMin: number,
    xMax: number,
    yMin: number,
    yMax: number,
    xScale: (x: number) => number,
    yScale: (y: number) => number
  ): void {
    // Simple marching squares for contours
    for (let i = 0; i < size - 1; i++) {
      for (let j = 0; j < size - 1; j++) {
        const v00 = grid[i][j] >= level ? 1 : 0;
        const v01 = grid[i][j + 1] >= level ? 1 : 0;
        const v10 = grid[i + 1][j] >= level ? 1 : 0;
        const v11 = grid[i + 1][j + 1] >= level ? 1 : 0;
        const code = v00 + v01 * 2 + v10 * 4 + v11 * 8;

        if (code === 0 || code === 15) continue;

        const x0 = xMin + (j / (size - 1)) * (xMax - xMin);
        const x1 = xMin + ((j + 1) / (size - 1)) * (xMax - xMin);
        const y0 = yMax - (i / (size - 1)) * (yMax - yMin);
        const y1 = yMax - ((i + 1) / (size - 1)) * (yMax - yMin);

        // Draw line segment based on marching squares case
        ctx.beginPath();
        if (code === 1 || code === 14) {
          ctx.moveTo(xScale(x0), yScale((y0 + y1) / 2));
          ctx.lineTo(xScale((x0 + x1) / 2), yScale(y0));
        } else if (code === 2 || code === 13) {
          ctx.moveTo(xScale((x0 + x1) / 2), yScale(y0));
          ctx.lineTo(xScale(x1), yScale((y0 + y1) / 2));
        } else if (code === 4 || code === 11) {
          ctx.moveTo(xScale(x0), yScale((y0 + y1) / 2));
          ctx.lineTo(xScale((x0 + x1) / 2), yScale(y1));
        } else if (code === 8 || code === 7) {
          ctx.moveTo(xScale((x0 + x1) / 2), yScale(y1));
          ctx.lineTo(xScale(x1), yScale((y0 + y1) / 2));
        } else if (code === 3 || code === 12) {
          ctx.moveTo(xScale(x0), yScale((y0 + y1) / 2));
          ctx.lineTo(xScale(x1), yScale((y0 + y1) / 2));
        } else if (code === 6 || code === 9) {
          ctx.moveTo(xScale((x0 + x1) / 2), yScale(y0));
          ctx.lineTo(xScale((x0 + x1) / 2), yScale(y1));
        }
        ctx.stroke();
      }
    }
  }

  private drawColorBar(ctx: CanvasRenderingContext2D, width: number, height: number, maxDensity: number): void {
    const barWidth = 15;
    const barHeight = 100;
    const barX = width - this.margin.right + 10;
    const barY = this.margin.top + 20;

    // Draw gradient
    for (let i = 0; i < barHeight; i++) {
      const intensity = 1 - i / barHeight;
      ctx.fillStyle = this.getHeatmapColor(intensity);
      ctx.fillRect(barX, barY + i, barWidth, 1);
    }

    // Border
    ctx.strokeStyle = '#606060';
    ctx.strokeRect(barX, barY, barWidth, barHeight);

    // Labels
    ctx.fillStyle = '#a0a0a0';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(maxDensity.toFixed(2), barX + barWidth + 5, barY + 5);
    ctx.fillText('0', barX + barWidth + 5, barY + barHeight);
  }
}