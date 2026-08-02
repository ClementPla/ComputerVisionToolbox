import { Component, OnDestroy, OnInit } from '@angular/core';
import { TutorialTemplateComponent } from '../../../Toolbox/tutorial-template/tutorial-template.component';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

interface GridCell {
  row: number;
  col: number;
  isActive: boolean;      // Currently under kernel
  isPadding: boolean;     // Padding cell
  isDilationGap: boolean; // Gap due to dilation (not sampled)
  isKernelSample: boolean; // Actually sampled by kernel (considering dilation)
}

interface OutputCell {
  row: number;
  col: number;
  isActive: boolean;      // Currently being computed
  isComputed: boolean;    // Already computed
}

@Component({
    selector: 'app-convolution-tutorial',
    templateUrl: './convolution-tutorial.component.html',
    styleUrl: './convolution-tutorial.component.scss',
    imports: [TutorialTemplateComponent, MatIconButton, MatIcon, MatButton, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatSlider, MatSliderThumb, ReactiveFormsModule, FormsModule]
})
export class ConvolutionTutorialComponent implements OnInit, OnDestroy {
  
  // Convolution parameters
  inputSize = 7;
  kernelSize = 3;
  stride = 1;
  padding = 0;
  dilation = 1;

  // Animation state
  currentStep = 0;
  totalSteps = 0;
  isPlaying = false;
  animationSpeed = 500; // ms

  // Grids
  inputGrid: GridCell[][] = [];
  outputGrid: OutputCell[][] = [];

  // Computed sizes
  paddedSize = 0;
  outputSize = 0;
  effectiveKernelSize = 0;

  // Current kernel position (in padded coordinates)
  kernelRow = 0;
  kernelCol = 0;

  // Animation timer
  private animationTimer: any = null;

  // Color palette for visual linking
  readonly activeColor = '#3b82f6'; // blue-500
  readonly kernelSampleColor = '#8b5cf6'; // violet-500
  readonly outputActiveColor = '#3b82f6';
  readonly computedColor = '#22c55e'; // green-500

  ngOnInit(): void {
    this.computeGrids();
  }

  ngOnDestroy(): void {
    this.stopAnimation();
  }

  // --- Parameter Changes ---
  onParameterChange(): void {
    this.stopAnimation();
    this.computeGrids();
    this.currentStep = 0;
    this.updateKernelPosition();
  }

  // --- Grid Computation ---
  private computeGrids(): void {
    // Effective kernel size with dilation: k + (k-1)*(d-1) = k*d - d + 1 = d*(k-1) + 1
    this.effectiveKernelSize = this.dilation * (this.kernelSize - 1) + 1;
    
    // Padded input size
    this.paddedSize = this.inputSize + 2 * this.padding;

    // Output size formula
    // out = floor((in + 2p - d(k-1) - 1) / s) + 1
    const numerator = this.paddedSize - this.effectiveKernelSize;
    if (numerator < 0) {
      this.outputSize = 0;
    } else {
      this.outputSize = Math.floor(numerator / this.stride) + 1;
    }

    // Total steps = outputSize^2 (for square grids)
    this.totalSteps = this.outputSize * this.outputSize;

    // Build input grid (with padding visualization)
    this.inputGrid = [];
    for (let r = 0; r < this.paddedSize; r++) {
      const row: GridCell[] = [];
      for (let c = 0; c < this.paddedSize; c++) {
        const isPadding = r < this.padding || r >= this.paddedSize - this.padding ||
                          c < this.padding || c >= this.paddedSize - this.padding;
        row.push({
          row: r,
          col: c,
          isActive: false,
          isPadding,
          isDilationGap: false,
          isKernelSample: false
        });
      }
      this.inputGrid.push(row);
    }

    // Build output grid
    this.outputGrid = [];
    for (let r = 0; r < this.outputSize; r++) {
      const row: OutputCell[] = [];
      for (let c = 0; c < this.outputSize; c++) {
        row.push({
          row: r,
          col: c,
          isActive: false,
          isComputed: false
        });
      }
      this.outputGrid.push(row);
    }

    this.updateKernelPosition();
  }

  // --- Navigation ---
  nextStep(): void {
    if (this.currentStep < this.totalSteps - 1) {
      this.currentStep++;
      this.updateKernelPosition();
    } else {
      // Loop back to start
      this.resetToStart();
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
      // Unmark the current output cell as computed
      this.updateKernelPosition();
    }
  }

  resetToStart(): void {
    this.currentStep = 0;
    // Reset all computed flags
    this.outputGrid.forEach(row => row.forEach(cell => {
      cell.isComputed = false;
      cell.isActive = false;
    }));
    this.updateKernelPosition();
  }

  goToEnd(): void {
    this.currentStep = this.totalSteps - 1;
    // Mark all as computed
    this.outputGrid.forEach(row => row.forEach(cell => {
      cell.isComputed = true;
    }));
    this.updateKernelPosition();
  }

  // --- Animation ---
  toggleAnimation(): void {
    if (this.isPlaying) {
      this.stopAnimation();
    } else {
      this.startAnimation();
    }
  }

  private startAnimation(): void {
    if (this.totalSteps === 0) return;
    this.isPlaying = true;
    this.animationTimer = setInterval(() => {
      this.nextStep();
      if (this.currentStep === 0) {
        // We looped, optionally stop or continue
      }
    }, this.animationSpeed);
  }

  private stopAnimation(): void {
    this.isPlaying = false;
    if (this.animationTimer) {
      clearInterval(this.animationTimer);
      this.animationTimer = null;
    }
  }

  // --- Kernel Position Update ---
  private updateKernelPosition(): void {
    if (this.outputSize === 0 || this.totalSteps === 0) {
      this.kernelRow = 0;
      this.kernelCol = 0;
      return;
    }

    // Convert step to output grid position
    const outRow = Math.floor(this.currentStep / this.outputSize);
    const outCol = this.currentStep % this.outputSize;

    // Convert to input (padded) coordinates
    this.kernelRow = outRow * this.stride;
    this.kernelCol = outCol * this.stride;

    // Update input grid highlighting
    this.updateInputHighlighting();

    // Update output grid highlighting
    this.updateOutputHighlighting(outRow, outCol);
  }

  private updateInputHighlighting(): void {
    // Reset all cells
    this.inputGrid.forEach(row => row.forEach(cell => {
      cell.isActive = false;
      cell.isDilationGap = false;
      cell.isKernelSample = false;
    }));

    // Highlight cells under the effective kernel area
    for (let kr = 0; kr < this.effectiveKernelSize; kr++) {
      for (let kc = 0; kc < this.effectiveKernelSize; kc++) {
        const r = this.kernelRow + kr;
        const c = this.kernelCol + kc;

        if (r >= 0 && r < this.paddedSize && c >= 0 && c < this.paddedSize) {
          const cell = this.inputGrid[r][c];
          cell.isActive = true;

          // Check if this is an actual kernel sample point (considering dilation)
          const isKernelPoint = (kr % this.dilation === 0) && (kc % this.dilation === 0);
          if (isKernelPoint) {
            cell.isKernelSample = true;
          } else {
            cell.isDilationGap = true;
          }
        }
      }
    }
  }

  private updateOutputHighlighting(outRow: number, outCol: number): void {
    // Reset active state, keep computed state for cells before current
    this.outputGrid.forEach((row, ri) => {
      row.forEach((cell, ci) => {
        cell.isActive = false;
        const cellStep = ri * this.outputSize + ci;
        cell.isComputed = cellStep < this.currentStep;
      });
    });

    // Highlight current output cell
    if (outRow < this.outputSize && outCol < this.outputSize) {
      this.outputGrid[outRow][outCol].isActive = true;
    }
  }

  // --- Helpers ---
  get outputSizeFormula(): string {
    return `⌊(${this.inputSize} + 2×${this.padding} - ${this.dilation}×(${this.kernelSize}-1) - 1) / ${this.stride}⌋ + 1`;
  }

  get outputSizeCalculation(): string {
    const num = this.inputSize + 2 * this.padding - this.dilation * (this.kernelSize - 1) - 1;
    return `⌊${num} / ${this.stride}⌋ + 1 = ${this.outputSize}`;
  }

  get currentPosition(): string {
    if (this.totalSteps === 0) return '—';
    const outRow = Math.floor(this.currentStep / this.outputSize);
    const outCol = this.currentStep % this.outputSize;
    return `(${outRow}, ${outCol})`;
  }

  getInputCellClass(cell: GridCell): string {
    const classes: string[] = ['cell'];
    
    if (cell.isPadding) {
      classes.push('padding');
    }
    
    if (cell.isKernelSample) {
      classes.push('kernel-sample');
    } else if (cell.isDilationGap) {
      classes.push('dilation-gap');
    } else if (cell.isActive) {
      classes.push('active');
    }
    
    return classes.join(' ');
  }

  getOutputCellClass(cell: OutputCell): string {
    const classes: string[] = ['cell'];
    
    if (cell.isActive) {
      classes.push('output-active');
    } else if (cell.isComputed) {
      classes.push('computed');
    }
    
    return classes.join(' ');
  }

  // Range helper for template
  range(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }
}