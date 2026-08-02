import { Datapoint } from "../linear-classifier.component";
export type PreprocessMode = 'None' | 'Polynomial' | 'RBF-Random' | 'RBF-KMeans';

export interface PreprocessConfig {
  mode: PreprocessMode;
  degree?: number; // For Polynomial
  dimensions?: number; // For RBF (max 10)
  sigma?: number; // RBF spread
}


export abstract class AbstractModel {
  protected centers: {x: number, y: number}[] = [];
  protected sigma: number = 50;

  abstract train(points: Datapoint[], config: PreprocessConfig): void;
  abstract predict(x: number, y: number, config: PreprocessConfig): number;

  /**
   * Transforms raw (x, y) into a higher-dimensional feature vector
   */
  protected featureMap(x: number, y: number, config: PreprocessConfig): number[] {
    switch (config.mode) {
      case 'Polynomial':
        // [1, x, y, x^2, xy, y^2] for degree 2
        return this.getPolynomialFeatures(x, y, config.degree || 2);
      
      case 'RBF-Random':
      case 'RBF-KMeans':
        // Radial Basis Function: exp(-||x - center||^2 / (2 * sigma^2))
        return this.centers.map(c => {
          const distSq = Math.pow(x - c.x, 2) + Math.pow(y - c.y, 2);
          return Math.exp(-distSq / (2 * Math.pow(this.sigma, 2)));
        });

      default:
        return [x / 512, y / 512, 1]; // Normalized raw
    }
  }

  private getPolynomialFeatures(x: number, y: number, degree: number): number[] {
    const nx = x / 512, ny = y / 512;
    const out = [1];
    for (let i = 1; i <= degree; i++) {
      for (let j = 0; j <= i; j++) {
        out.push(Math.pow(nx, i - j) * Math.pow(ny, j));
      }
    }
    return out;
  }

  protected runKMeans(points: Datapoint[], k: number): { x: number, y: number }[] {
  if (points.length <= k) {
    return points.map(p => ({ x: p.x, y: p.y }));
  }

  // 1. Initialize centers randomly from existing points
  let centers = points
    .sort(() => Math.random() - 0.5)
    .slice(0, k)
    .map(p => ({ x: p.x, y: p.y }));

  const iterations = 10;
  for (let iter = 0; iter < iterations; iter++) {
    // 2. Assign points to closest center
    const clusters: Datapoint[][] = Array.from({ length: k }, () => []);
    points.forEach(p => {
      let minDist = Infinity;
      let closestIdx = 0;
      centers.forEach((c, idx) => {
        const d = Math.pow(p.x - c.x, 2) + Math.pow(p.y - c.y, 2);
        if (d < minDist) {
          minDist = d;
          closestIdx = idx;
        }
      });
      clusters[closestIdx].push(p);
    });

    // 3. Move centers to the mean of their assigned points
    centers = centers.map((c, idx) => {
      const cluster = clusters[idx];
      if (cluster.length === 0) return c; // Don't move if empty
      return {
        x: cluster.reduce((sum, p) => sum + p.x, 0) / cluster.length,
        y: cluster.reduce((sum, p) => sum + p.y, 0) / cluster.length
      };
    });
  }
  return centers;
}
}