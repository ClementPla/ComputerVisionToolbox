/**
 * K-Means Clustering — step-by-step execution for the interactive tutorial.
 *
 * This module owns the *animation* layer (E-step / M-step / centroid
 * interpolation with target positions). The batch algorithm used elsewhere in
 * the app lives in `lib/ml` (KMeans); both share the same Euclidean metric
 * from `lib/numpy` (`vec.distance`).
 */
import { vec } from '../../../../lib/numpy';

export interface Point2D {
  x: number;
  y: number;
}

export interface ClusterPoint extends Point2D {
  clusterId: number;
  previousClusterId: number;
}

export interface Centroid extends Point2D {
  id: number;
  targetX: number; // For animation
  targetY: number;
}

export type KMeansStep = 'init' | 'e-step' | 'm-step' | 'converged';

export interface KMeansState {
  points: ClusterPoint[];
  centroids: Centroid[];
  step: KMeansStep;
  iteration: number;
  converged: boolean;
  assignmentsChanged: number; // Number of points that changed cluster
}

/**
 * Generate random points in clusters (for demo)
 */
export function generateClusteredPoints(
  numPoints: number,
  numClusters: number,
  width: number,
  height: number,
  spread: number = 50
): ClusterPoint[] {
  const points: ClusterPoint[] = [];
  const padding = 80;
  
  // Generate cluster centers
  const centers: Point2D[] = [];
  for (let i = 0; i < numClusters; i++) {
    centers.push({
      x: padding + Math.random() * (width - 2 * padding),
      y: padding + Math.random() * (height - 2 * padding)
    });
  }
  
  // Generate points around centers
  const pointsPerCluster = Math.floor(numPoints / numClusters);
  
  for (let c = 0; c < numClusters; c++) {
    const count = c === numClusters - 1 ? numPoints - points.length : pointsPerCluster;
    
    for (let i = 0; i < count; i++) {
      // Gaussian-like distribution around center
      const angle = Math.random() * Math.PI * 2;
      const radius = (Math.random() + Math.random()) * spread; // Sum for more central distribution
      
      points.push({
        x: centers[c].x + Math.cos(angle) * radius,
        y: centers[c].y + Math.sin(angle) * radius,
        clusterId: -1,
        previousClusterId: -1
      });
    }
  }
  
  return points;
}

/**
 * Generate uniform random points
 */
export function generateUniformPoints(
  numPoints: number,
  width: number,
  height: number
): ClusterPoint[] {
  const padding = 40;
  const points: ClusterPoint[] = [];
  
  for (let i = 0; i < numPoints; i++) {
    points.push({
      x: padding + Math.random() * (width - 2 * padding),
      y: padding + Math.random() * (height - 2 * padding),
      clusterId: -1,
      previousClusterId: -1
    });
  }
  
  return points;
}

/**
 * Initialize centroids randomly from data points
 */
export function initializeCentroids(
  points: ClusterPoint[],
  k: number
): Centroid[] {
  const centroids: Centroid[] = [];
  const usedIndices = new Set<number>();
  
  // K-means++ inspired: pick random points as initial centroids
  for (let i = 0; i < k; i++) {
    let idx: number;
    do {
      idx = Math.floor(Math.random() * points.length);
    } while (usedIndices.has(idx));
    
    usedIndices.add(idx);
    centroids.push({
      id: i,
      x: points[idx].x,
      y: points[idx].y,
      targetX: points[idx].x,
      targetY: points[idx].y
    });
  }
  
  return centroids;
}

/**
 * Initialize centroids at random positions
 */
export function initializeCentroidsRandom(
  k: number,
  width: number,
  height: number
): Centroid[] {
  const padding = 60;
  const centroids: Centroid[] = [];
  
  for (let i = 0; i < k; i++) {
    const x = padding + Math.random() * (width - 2 * padding);
    const y = padding + Math.random() * (height - 2 * padding);
    centroids.push({
      id: i,
      x, y,
      targetX: x,
      targetY: y
    });
  }
  
  return centroids;
}

/**
 * E-step: Assign each point to the nearest centroid
 */
export function assignPointsToCentroids(
  points: ClusterPoint[],
  centroids: Centroid[]
): number {
  let changed = 0;
  
  for (const point of points) {
    point.previousClusterId = point.clusterId;
    
    let minDist = Infinity;
    let nearestId = 0;
    
    for (const centroid of centroids) {
      const dist = distance(point, centroid);
      if (dist < minDist) {
        minDist = dist;
        nearestId = centroid.id;
      }
    }
    
    if (point.clusterId !== nearestId) {
      changed++;
    }
    point.clusterId = nearestId;
  }
  
  return changed;
}

/**
 * M-step: Update centroid positions to mean of assigned points
 * Returns the total movement of centroids
 */
export function updateCentroids(
  points: ClusterPoint[],
  centroids: Centroid[]
): number {
  let totalMovement = 0;
  
  for (const centroid of centroids) {
    const assigned = points.filter(p => p.clusterId === centroid.id);
    
    if (assigned.length > 0) {
      const newX = assigned.reduce((sum, p) => sum + p.x, 0) / assigned.length;
      const newY = assigned.reduce((sum, p) => sum + p.y, 0) / assigned.length;
      
      totalMovement += distance({ x: centroid.x, y: centroid.y }, { x: newX, y: newY });
      
      centroid.targetX = newX;
      centroid.targetY = newY;
    }
  }
  
  return totalMovement;
}

/**
 * Apply centroid movement (for animation interpolation)
 */
export function interpolateCentroids(
  centroids: Centroid[],
  t: number // 0 to 1
): void {
  for (const centroid of centroids) {
    centroid.x = centroid.x + (centroid.targetX - centroid.x) * t;
    centroid.y = centroid.y + (centroid.targetY - centroid.y) * t;
  }
}

/**
 * Snap centroids to their targets
 */
export function snapCentroidsToTarget(centroids: Centroid[]): void {
  for (const centroid of centroids) {
    centroid.x = centroid.targetX;
    centroid.y = centroid.targetY;
  }
}

/**
 * Euclidean distance (single metric source: numpy vec.distance).
 */
export function distance(a: Point2D, b: Point2D): number {
  return vec.distance([a.x, a.y], [b.x, b.y]);
}

/**
 * Compute within-cluster sum of squares (WCSS / Inertia)
 */
export function computeWCSS(points: ClusterPoint[], centroids: Centroid[]): number {
  let wcss = 0;
  
  for (const point of points) {
    const centroid = centroids.find(c => c.id === point.clusterId);
    if (centroid) {
      wcss += distance(point, centroid) ** 2;
    }
  }
  
  return wcss;
}

/**
 * Cluster colors palette
 */
export const CLUSTER_COLORS = [
  '#ef4444', // red
  '#3b82f6', // blue
  '#22c55e', // green
  '#f59e0b', // amber
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#f97316', // orange
];

export function getClusterColor(clusterId: number): string {
  if (clusterId < 0) return '#64748b'; // gray for unassigned
  return CLUSTER_COLORS[clusterId % CLUSTER_COLORS.length];
}