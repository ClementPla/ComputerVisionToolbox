/**
 * Simplified SVM for interactive visualization
 * Uses SMO algorithm on dual problem
 */

export type SVMKernel = 'linear' | 'rbf';

export interface SVMConfig {
  kernel: SVMKernel;
  C: number;
  gamma: number;
}

export interface SVMDatapoint {
  x: number;
  y: number;
  label: number; // +1 or -1
}

export interface SVMResult {
  supportVectorIndices: number[];
  alphas: number[];
  bias: number;
  violations: number[]; // indices of points with slack > 0
}

export class SVMClassifier {
  private alphas: number[] = [];
  private bias: number = 0;
  private data: SVMDatapoint[] = [];
  private config: SVMConfig;
  private kernelMatrix: number[][] = [];

  // Canvas size for coordinate normalization
  private readonly canvasSize = 512;
  // Normalization factor for linear kernel to keep values in a reasonable range for C
  private readonly linearScale = this.canvasSize / 16; // = 32

  constructor(config: Partial<SVMConfig> = {}) {
    this.config = {
      kernel: config.kernel ?? 'rbf',
      C: config.C ?? 1.0,
      gamma: config.gamma ?? 0.01,
    };
  }

  private computeKernel(p1: SVMDatapoint, p2: SVMDatapoint): number {
    if (this.config.kernel === 'linear') {
      // Normalize coordinates so kernel values are compatible with typical C range [0.01, 100]
      const scale = this.linearScale * this.linearScale;
      return (p1.x * p2.x + p1.y * p2.y) / scale;
    }
    // RBF - gamma controls the scale directly
    const distSq = (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2;
    return Math.exp(-this.config.gamma * distSq);
  }

  /**
   * Decision function: f(x) = Σ αᵢyᵢK(xᵢ,x) + b
   */
  public decisionFunction(point: { x: number; y: number }): number {
    if (this.data.length === 0) return 0;

    let sum = 0;
    for (let i = 0; i < this.data.length; i++) {
      if (this.alphas[i] > 1e-8) {
        const d = this.data[i];
        const k = this.computeKernelPoint(point, d);
        sum += this.alphas[i] * d.label * k;
      }
    }
    return sum + this.bias;
  }

  private computeKernelPoint(p1: { x: number; y: number }, p2: SVMDatapoint): number {
    if (this.config.kernel === 'linear') {
      const scale = this.linearScale * this.linearScale;
      return (p1.x * p2.x + p1.y * p2.y) / scale;
    }
    const distSq = (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2;
    return Math.exp(-this.config.gamma * distSq);
  }

  public predict(x: number, y: number): number {
    return this.decisionFunction({ x, y }) >= 0 ? 1 : -1;
  }

  /**
   * Train using SMO algorithm
   */
  public train(points: SVMDatapoint[]): SVMResult {
    const n = points.length;
    if (n < 2) return this.emptyResult();

    const hasPos = points.some((p) => p.label === 1);
    const hasNeg = points.some((p) => p.label === -1);
    if (!hasPos || !hasNeg) return this.emptyResult();

    this.data = points;
    this.alphas = new Array(n).fill(0);
    this.bias = 0;

    // Pre-compute kernel matrix
    this.kernelMatrix = [];
    for (let i = 0; i < n; i++) {
      this.kernelMatrix[i] = [];
      for (let j = 0; j < n; j++) {
        this.kernelMatrix[i][j] = this.computeKernel(points[i], points[j]);
      }
    }

    const { C } = this.config;
    const maxIter = Math.min(1000, 100 + n * 10);
    const tol = 1e-3;

    // SMO algorithm - update pairs to maintain Σαᵢyᵢ = 0
    for (let iter = 0; iter < maxIter; iter++) {
      let numChanged = 0;

      for (let i = 0; i < n; i++) {
        const Ei = this.computeError(i);
        const yi = points[i].label;

        // Check KKT violation
        if (
          (yi * Ei < -tol && this.alphas[i] < C) ||
          (yi * Ei > tol && this.alphas[i] > 0)
        ) {
          // Find j with maximum |Ei - Ej|
          let j = (i + 1) % n;
          let maxDiff = 0;
          for (let k = 0; k < n; k++) {
            if (k === i) continue;
            const Ek = this.computeError(k);
            if (Math.abs(Ei - Ek) > maxDiff) {
              maxDiff = Math.abs(Ei - Ek);
              j = k;
            }
          }

          const Ej = this.computeError(j);
          const yj = points[j].label;

          const alphaIOld = this.alphas[i];
          const alphaJOld = this.alphas[j];

          // Compute bounds L and H
          let L: number, H: number;
          if (yi !== yj) {
            L = Math.max(0, alphaJOld - alphaIOld);
            H = Math.min(C, C + alphaJOld - alphaIOld);
          } else {
            L = Math.max(0, alphaIOld + alphaJOld - C);
            H = Math.min(C, alphaIOld + alphaJOld);
          }

          if (Math.abs(L - H) < 1e-10) continue;

          // Compute eta
          const eta =
            2 * this.kernelMatrix[i][j] -
            this.kernelMatrix[i][i] -
            this.kernelMatrix[j][j];

          if (eta >= 0) continue;

          // Update alpha_j
          let alphaJNew = alphaJOld - (yj * (Ei - Ej)) / eta;
          alphaJNew = Math.max(L, Math.min(H, alphaJNew));

          if (Math.abs(alphaJNew - alphaJOld) < 1e-8) continue;

          // Update alpha_i to maintain constraint Σαᵢyᵢ = 0
          const alphaINew = alphaIOld + yi * yj * (alphaJOld - alphaJNew);

          this.alphas[i] = alphaINew;
          this.alphas[j] = alphaJNew;

          // Update bias
          this.updateBias(i, j, Ei, Ej, alphaIOld, alphaJOld, alphaINew, alphaJNew, yi, yj, C);

          numChanged++;
        }
      }

      if (numChanged === 0) break;
    }

    return this.getResult();
  }

  private computeError(i: number): number {
    return this.decisionFunctionFromIndex(i) - this.data[i].label;
  }

  private decisionFunctionFromIndex(i: number): number {
    let sum = 0;
    for (let j = 0; j < this.data.length; j++) {
      sum += this.alphas[j] * this.data[j].label * this.kernelMatrix[i][j];
    }
    return sum + this.bias;
  }

  private updateBias(
    i: number, j: number,
    Ei: number, Ej: number,
    alphaIOld: number, alphaJOld: number,
    alphaINew: number, alphaJNew: number,
    yi: number, yj: number,
    C: number
  ): void {
    const b1 = this.bias - Ei
      - yi * (alphaINew - alphaIOld) * this.kernelMatrix[i][i]
      - yj * (alphaJNew - alphaJOld) * this.kernelMatrix[i][j];

    const b2 = this.bias - Ej
      - yi * (alphaINew - alphaIOld) * this.kernelMatrix[i][j]
      - yj * (alphaJNew - alphaJOld) * this.kernelMatrix[j][j];

    if (alphaINew > 0 && alphaINew < C) {
      this.bias = b1;
    } else if (alphaJNew > 0 && alphaJNew < C) {
      this.bias = b2;
    } else {
      this.bias = (b1 + b2) / 2;
    }
  }

  private getResult(): SVMResult {
    const tol = 1e-6;
    const supportVectorIndices: number[] = [];
    const violations: number[] = [];

    for (let i = 0; i < this.data.length; i++) {
      if (this.alphas[i] > tol) {
        supportVectorIndices.push(i);
      }

      const yf = this.data[i].label * this.decisionFunction(this.data[i]);
      if (yf < 1 - tol) {
        violations.push(i);
      }
    }

    return {
      supportVectorIndices,
      alphas: [...this.alphas],
      bias: this.bias,
      violations,
    };
  }

  private emptyResult(): SVMResult {
    return {
      supportVectorIndices: [],
      alphas: [],
      bias: 0,
      violations: [],
    };
  }

  public updateConfig(config: Partial<SVMConfig>): void {
    this.config = { ...this.config, ...config };
  }
}