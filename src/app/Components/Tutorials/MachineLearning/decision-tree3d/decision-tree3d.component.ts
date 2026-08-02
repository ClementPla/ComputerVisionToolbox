import { Component, OnInit, OnDestroy } from '@angular/core';
import { ECharts } from 'echarts';
import 'echarts-gl';

// ============================================
// TYPES
// ============================================

interface DataPoint {
  position: [number, number, number];
  label: number; // 0, 1, 2, or 3
}

interface TreeNode {
  // Split information (null for leaf nodes)
  splitAxis: number | null;  // 0=X, 1=Y, 2=Z
  splitValue: number | null;
  
  // Leaf information
  isLeaf: boolean;
  predictedClass: number;
  classCounts: number[];
  impurity: number;
  
  // Children
  left: TreeNode | null;
  right: TreeNode | null;
  
  // Bounds of this node's region
  bounds: {
    min: [number, number, number];
    max: [number, number, number];
  };
  
  // For visualization
  depth: number;
  samples: number;
}

interface Partition {
  bounds: {
    min: [number, number, number];
    max: [number, number, number];
  };
  predictedClass: number;
  impurity: number;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Generate 3D Gaussian samples
 */
function sampleGaussian3D(
  n: number,
  mean: [number, number, number],
  stdDev: number
): [number, number, number][] {
  const samples: [number, number, number][] = [];
  
  for (let i = 0; i < n; i++) {
    const point: [number, number, number] = [0, 0, 0];
    for (let j = 0; j < 3; j++) {
      // Box-Muller transform
      const u1 = Math.random();
      const u2 = Math.random();
      const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      point[j] = mean[j] + z * stdDev;
    }
    samples.push(point);
  }
  return samples;
}

/**
 * Compute Gini impurity
 */
function giniImpurity(classCounts: number[]): number {
  const total = classCounts.reduce((a, b) => a + b, 0);
  if (total === 0) return 0;
  
  let sumSquaredProbs = 0;
  for (const count of classCounts) {
    const p = count / total;
    sumSquaredProbs += p * p;
  }
  return 1 - sumSquaredProbs;
}

/**
 * Compute Cross-entropy (negative log likelihood)
 */
function crossEntropy(classCounts: number[]): number {
  const total = classCounts.reduce((a, b) => a + b, 0);
  if (total === 0) return 0;
  
  let entropy = 0;
  for (const count of classCounts) {
    if (count > 0) {
      const p = count / total;
      entropy -= p * Math.log2(p);
    }
  }
  return entropy;
}

/**
 * Count classes in a set of data points
 */
function countClasses(data: DataPoint[], numClasses: number): number[] {
  const counts = new Array(numClasses).fill(0);
  for (const point of data) {
    counts[point.label]++;
  }
  return counts;
}

/**
 * Find the best split for a node
 */
function findBestSplit(
  data: DataPoint[],
  numClasses: number,
  impurityFn: (counts: number[]) => number
): { axis: number; value: number; gain: number } | null {
  if (data.length < 2) return null;
  
  const parentCounts = countClasses(data, numClasses);
  const parentImpurity = impurityFn(parentCounts);
  
  let bestGain = 0;
  let bestAxis = 0;
  let bestValue = 0;
  
  // Try each axis
  for (let axis = 0; axis < 3; axis++) {
    // Get unique values and sort
    const values = data.map(p => p.position[axis]).sort((a, b) => a - b);
    
    // Try splits between consecutive unique values
    for (let i = 0; i < values.length - 1; i++) {
      if (values[i] === values[i + 1]) continue;
      
      const splitValue = (values[i] + values[i + 1]) / 2;
      
      // Partition data
      const leftData = data.filter(p => p.position[axis] <= splitValue);
      const rightData = data.filter(p => p.position[axis] > splitValue);
      
      if (leftData.length === 0 || rightData.length === 0) continue;
      
      // Compute impurity reduction
      const leftCounts = countClasses(leftData, numClasses);
      const rightCounts = countClasses(rightData, numClasses);
      
      const leftImpurity = impurityFn(leftCounts);
      const rightImpurity = impurityFn(rightCounts);
      
      const weightedImpurity = 
        (leftData.length * leftImpurity + rightData.length * rightImpurity) / data.length;
      
      const gain = parentImpurity - weightedImpurity;
      
      if (gain > bestGain) {
        bestGain = gain;
        bestAxis = axis;
        bestValue = splitValue;
      }
    }
  }
  
  if (bestGain <= 0) return null;
  
  return { axis: bestAxis, value: bestValue, gain: bestGain };
}

/**
 * Build decision tree recursively
 */
function buildTree(
  data: DataPoint[],
  numClasses: number,
  impurityFn: (counts: number[]) => number,
  maxDepth: number,
  minSamplesLeaf: number,
  bounds: { min: [number, number, number]; max: [number, number, number] },
  currentDepth: number = 0
): TreeNode {
  const classCounts = countClasses(data, numClasses);
  const impurity = impurityFn(classCounts);
  const predictedClass = classCounts.indexOf(Math.max(...classCounts));
  
  // Check stopping conditions
  const shouldStop = 
    currentDepth >= maxDepth ||
    data.length < minSamplesLeaf * 2 ||
    impurity === 0;
  
  if (shouldStop) {
    return {
      splitAxis: null,
      splitValue: null,
      isLeaf: true,
      predictedClass,
      classCounts,
      impurity,
      left: null,
      right: null,
      bounds,
      depth: currentDepth,
      samples: data.length
    };
  }
  
  // Find best split
  const split = findBestSplit(data, numClasses, impurityFn);
  
  if (!split) {
    return {
      splitAxis: null,
      splitValue: null,
      isLeaf: true,
      predictedClass,
      classCounts,
      impurity,
      left: null,
      right: null,
      bounds,
      depth: currentDepth,
      samples: data.length
    };
  }
  
  // Partition data
  const leftData = data.filter(p => p.position[split.axis] <= split.value);
  const rightData = data.filter(p => p.position[split.axis] > split.value);
  
  // Compute child bounds
  const leftBounds = {
    min: [...bounds.min] as [number, number, number],
    max: [...bounds.max] as [number, number, number]
  };
  leftBounds.max[split.axis] = split.value;
  
  const rightBounds = {
    min: [...bounds.min] as [number, number, number],
    max: [...bounds.max] as [number, number, number]
  };
  rightBounds.min[split.axis] = split.value;
  
  // Recursively build children
  const leftChild = buildTree(
    leftData, numClasses, impurityFn, maxDepth, minSamplesLeaf, 
    leftBounds, currentDepth + 1
  );
  const rightChild = buildTree(
    rightData, numClasses, impurityFn, maxDepth, minSamplesLeaf, 
    rightBounds, currentDepth + 1
  );
  
  return {
    splitAxis: split.axis,
    splitValue: split.value,
    isLeaf: false,
    predictedClass,
    classCounts,
    impurity,
    left: leftChild,
    right: rightChild,
    bounds,
    depth: currentDepth,
    samples: data.length
  };
}

/**
 * Extract leaf partitions from tree for visualization
 */
function extractPartitions(node: TreeNode): Partition[] {
  if (node.isLeaf) {
    return [{
      bounds: node.bounds,
      predictedClass: node.predictedClass,
      impurity: node.impurity
    }];
  }
  
  const partitions: Partition[] = [];
  if (node.left) partitions.push(...extractPartitions(node.left));
  if (node.right) partitions.push(...extractPartitions(node.right));
  return partitions;
}

/**
 * Extract split planes from tree for visualization
 */
function extractSplitPlanes(
  node: TreeNode, 
  planes: { axis: number; value: number; bounds: { min: [number, number, number]; max: [number, number, number] }; depth: number }[] = []
): typeof planes {
  if (node.isLeaf || node.splitAxis === null || node.splitValue === null) {
    return planes;
  }
  
  planes.push({
    axis: node.splitAxis,
    value: node.splitValue,
    bounds: node.bounds,
    depth: node.depth
  });
  
  if (node.left) extractSplitPlanes(node.left, planes);
  if (node.right) extractSplitPlanes(node.right, planes);
  
  return planes;
}

/**
 * Compute tree accuracy
 */
function computeAccuracy(tree: TreeNode, data: DataPoint[]): number {
  let correct = 0;
  
  for (const point of data) {
    let node = tree;
    while (!node.isLeaf && node.splitAxis !== null && node.splitValue !== null) {
      if (point.position[node.splitAxis] <= node.splitValue) {
        node = node.left!;
      } else {
        node = node.right!;
      }
    }
    if (node.predictedClass === point.label) {
      correct++;
    }
  }
  
  return (correct / data.length) * 100;
}

/**
 * Count tree nodes
 */
function countNodes(node: TreeNode): { total: number; leaves: number } {
  if (node.isLeaf) {
    return { total: 1, leaves: 1 };
  }
  
  const leftCount = node.left ? countNodes(node.left) : { total: 0, leaves: 0 };
  const rightCount = node.right ? countNodes(node.right) : { total: 0, leaves: 0 };
  
  return {
    total: 1 + leftCount.total + rightCount.total,
    leaves: leftCount.leaves + rightCount.leaves
  };
}

/**
 * Generate wireframe box lines for a partition
 */
function generateBoxLines(bounds: { min: [number, number, number]; max: [number, number, number] }): number[][][] {
  const [x0, y0, z0] = bounds.min;
  const [x1, y1, z1] = bounds.max;
  
  // 12 edges of a box
  return [
    // Bottom face
    [[x0, y0, z0], [x1, y0, z0]],
    [[x1, y0, z0], [x1, y1, z0]],
    [[x1, y1, z0], [x0, y1, z0]],
    [[x0, y1, z0], [x0, y0, z0]],
    // Top face
    [[x0, y0, z1], [x1, y0, z1]],
    [[x1, y0, z1], [x1, y1, z1]],
    [[x1, y1, z1], [x0, y1, z1]],
    [[x0, y1, z1], [x0, y0, z1]],
    // Vertical edges
    [[x0, y0, z0], [x0, y0, z1]],
    [[x1, y0, z0], [x1, y0, z1]],
    [[x1, y1, z0], [x1, y1, z1]],
    [[x0, y1, z0], [x0, y1, z1]]
  ];
}

/**
 * Generate plane surface points
 */
function generatePlaneSurface(
  axis: number,
  value: number,
  bounds: { min: [number, number, number]; max: [number, number, number] },
  resolution: number = 2
): number[][] {
  const points: number[][] = [];
  
  if (axis === 0) { // YZ plane at X = value
    for (let i = 0; i <= resolution; i++) {
      for (let j = 0; j <= resolution; j++) {
        const y = bounds.min[1] + (bounds.max[1] - bounds.min[1]) * (i / resolution);
        const z = bounds.min[2] + (bounds.max[2] - bounds.min[2]) * (j / resolution);
        points.push([value, y, z]);
      }
    }
  } else if (axis === 1) { // XZ plane at Y = value
    for (let i = 0; i <= resolution; i++) {
      for (let j = 0; j <= resolution; j++) {
        const x = bounds.min[0] + (bounds.max[0] - bounds.min[0]) * (i / resolution);
        const z = bounds.min[2] + (bounds.max[2] - bounds.min[2]) * (j / resolution);
        points.push([x, value, z]);
      }
    }
  } else { // XY plane at Z = value
    for (let i = 0; i <= resolution; i++) {
      for (let j = 0; j <= resolution; j++) {
        const x = bounds.min[0] + (bounds.max[0] - bounds.min[0]) * (i / resolution);
        const y = bounds.min[1] + (bounds.max[1] - bounds.min[1]) * (j / resolution);
        points.push([x, y, value]);
      }
    }
  }
  
  return points;
}

// ============================================
// COMPONENT
// ============================================

@Component({
  selector: 'app-decision-tree-3d',
  templateUrl: './decision-tree3d.component.html',
  styleUrls: ['./decision-tree3d.component.scss'],
  standalone: false
})
export class DecisionTree3dComponent implements OnInit, OnDestroy {
  // Chart instances
  chart3D: ECharts | null = null;
  chartTree: ECharts | null = null;

  // Class colors
  readonly classColors = ['#5470c6', '#91cc75', '#fac858', '#ee6666'];
  readonly classNames = ['Class A', 'Class B', 'Class C', 'Class D'];

  // Data configuration
  dataPreset: 'separated' | 'overlapping' | 'xor' | 'custom' = 'separated';
  nSamplesPerClass: number = 50;
  clusterSpread: number = 0.8;

  // Custom class positions (used when preset is 'custom')
  classPositions: [number, number, number][] = [
    [-2, -2, -2],
    [2, 2, -2],
    [-2, 2, 2],
    [2, -2, 2]
  ];

  // Tree parameters
  maxDepth: number = 3;
  minSamplesLeaf: number = 5;
  lossFunction: 'gini' | 'entropy' = 'gini';

  // Visualization options
  showPartitions: boolean = true;
  showSplitPlanes: boolean = true;
  partitionOpacity: number = 0.15;

  // Generated data and tree
  data: DataPoint[] = [];
  tree: TreeNode | null = null;
  partitions: Partition[] = [];
  splitPlanes: { axis: number; value: number; bounds: any; depth: number }[] = [];

  // Metrics
  accuracy: number = 0;
  totalNodes: number = 0;
  leafNodes: number = 0;

  // Chart options
  option3D: any = {};
  optionTree: any = {};

  // Chart state
  private chart3DInitialized = false;
  private chartTreeInitialized = false;
  private axisRange: number = 5;

  constructor() {}

  ngOnInit(): void {
    this.generateData();
    this.buildDecisionTree();
  }

  ngOnDestroy(): void {
    this.chart3D?.dispose();
    this.chartTree?.dispose();
  }

  onChart3DInit(chart: any): void {
    this.chart3D = chart;
    this.initialize3DChart();
  }

  onChartTreeInit(chart: any): void {
    this.chartTree = chart;
    this.initializeTreeChart();
  }

  generateData(): void {
    this.data = [];
    
    let positions: [number, number, number][];
    
    switch (this.dataPreset) {
      case 'separated':
        // Well-separated clusters at corners of a cube
        positions = [
          [-2.5, -2.5, -2.5],
          [2.5, 2.5, -2.5],
          [-2.5, 2.5, 2.5],
          [2.5, -2.5, 2.5]
        ];
        break;
      
      case 'overlapping':
        // Overlapping clusters near center
        positions = [
          [-1, -1, 0],
          [1, 1, 0],
          [-1, 1, 0],
          [1, -1, 0]
        ];
        break;
      
      case 'xor':
        // XOR-like pattern (not linearly separable in any single dimension)
        positions = [
          [-2, -2, -2],
          [2, 2, 2],
          [-2, 2, -2],
          [2, -2, 2]
        ];
        break;
      
      case 'custom':
        positions = this.classPositions;
        break;
      
      default:
        positions = this.classPositions;
    }
    
    // Generate samples for each class
    for (let classIdx = 0; classIdx < 4; classIdx++) {
      const samples = sampleGaussian3D(
        this.nSamplesPerClass,
        positions[classIdx],
        this.clusterSpread
      );
      
      for (const pos of samples) {
        this.data.push({
          position: pos,
          label: classIdx
        });
      }
    }
    
    // Compute axis range
    let maxVal = 0;
    for (const point of this.data) {
      maxVal = Math.max(maxVal, 
        Math.abs(point.position[0]),
        Math.abs(point.position[1]),
        Math.abs(point.position[2])
      );
    }
    this.axisRange = Math.ceil(maxVal * 1.2);
    
    this.buildDecisionTree();
  }

  buildDecisionTree(): void {
    const impurityFn = this.lossFunction === 'gini' ? giniImpurity : crossEntropy;
    
    const bounds = {
      min: [-this.axisRange, -this.axisRange, -this.axisRange] as [number, number, number],
      max: [this.axisRange, this.axisRange, this.axisRange] as [number, number, number]
    };
    
    this.tree = buildTree(
      this.data,
      4,
      impurityFn,
      this.maxDepth,
      this.minSamplesLeaf,
      bounds
    );
    
    // Extract visualization data
    this.partitions = extractPartitions(this.tree);
    this.splitPlanes = extractSplitPlanes(this.tree);
    
    // Compute metrics
    this.accuracy = computeAccuracy(this.tree, this.data);
    const nodeCounts = countNodes(this.tree);
    this.totalNodes = nodeCounts.total;
    this.leafNodes = nodeCounts.leaves;
    
    // Update charts
    if (this.chart3D && this.chart3DInitialized) {
      this.update3DChartData();
    }
    if (this.chartTree && this.chartTreeInitialized) {
      this.updateTreeChartData();
    }
  }

  onParameterChange(): void {
    this.buildDecisionTree();
  }

  onDataPresetChange(): void {
    this.generateData();
  }

  onVisualizationChange(): void {
    this.update3DChartData();
  }

  private initialize3DChart(): void {
    if (!this.chart3D) return;

    this.option3D = {
      tooltip: {},
      legend: {
        data: this.classNames,
        top: 10
      },
      xAxis3D: { type: 'value', min: -this.axisRange, max: this.axisRange, name: 'X' },
      yAxis3D: { type: 'value', min: -this.axisRange, max: this.axisRange, name: 'Y' },
      zAxis3D: { type: 'value', min: -this.axisRange, max: this.axisRange, name: 'Z' },
      grid3D: {
        viewControl: {
          autoRotate: false,
          distance: 250
        },
        boxWidth: 100,
        boxHeight: 100,
        boxDepth: 100
      },
      series: this.build3DSeries()
    };

    this.chart3D.setOption(this.option3D);
    this.chart3DInitialized = true;
  }

  private build3DSeries(): any[] {
    const series: any[] = [];
    
    // Add scatter series for each class
    for (let classIdx = 0; classIdx < 4; classIdx++) {
      const classData = this.data
        .filter(p => p.label === classIdx)
        .map(p => p.position);
      
      series.push({
        name: this.classNames[classIdx],
        type: 'scatter3D',
        coordinateSystem: 'cartesian3D',
        grid3DIndex: 0,
        data: classData,
        symbolSize: 8,
        itemStyle: {
          color: this.classColors[classIdx],
          opacity: 0.8
        }
      });
    }
    
    // Add partition boxes (wireframes)
    if (this.showPartitions) {
      for (let i = 0; i < this.partitions.length; i++) {
        const partition = this.partitions[i];
        const color = this.classColors[partition.predictedClass];
        const boxLines = generateBoxLines(partition.bounds);
        
        for (let j = 0; j < boxLines.length; j++) {
          series.push({
            name: `Partition ${i} Edge ${j}`,
            type: 'line3D',
            coordinateSystem: 'cartesian3D',
            grid3DIndex: 0,
            data: boxLines[j],
            lineStyle: {
              color: color,
              width: 2,
              opacity: 0.6
            },
            silent: true
          });
        }
      }
    }
    
    // Add split planes
    if (this.showSplitPlanes) {
      for (let i = 0; i < this.splitPlanes.length; i++) {
        const plane = this.splitPlanes[i];
        const planePoints = generatePlaneSurface(plane.axis, plane.value, plane.bounds, 2);
        
        // Determine plane color based on axis
        const axisColors = ['#ff6b6b', '#4ecdc4', '#ffe66d']; // X=red, Y=cyan, Z=yellow
        
        series.push({
          name: `Split Plane ${i}`,
          type: 'scatter3D',
          coordinateSystem: 'cartesian3D',
          grid3DIndex: 0,
          data: planePoints,
          symbolSize: 15,
          symbol: 'rect',
          itemStyle: {
            color: axisColors[plane.axis],
            opacity: this.partitionOpacity
          },
          silent: true
        });
      }
    }
    
    return series;
  }

  private update3DChartData(): void {
    if (!this.chart3D || !this.chart3DInitialized) return;

    // Simple update - ECharts will merge with existing options
    // The key is to NOT use clear() and NOT use the 'true' flag
    this.chart3D.setOption({
      xAxis3D: { min: -this.axisRange, max: this.axisRange },
      yAxis3D: { min: -this.axisRange, max: this.axisRange },
      zAxis3D: { min: -this.axisRange, max: this.axisRange },
      series: this.build3DSeries()
    });
  }

  private initializeTreeChart(): void {
    if (!this.chartTree) return;
    this.updateTreeChartData();
    this.chartTreeInitialized = true;
  }

  private updateTreeChartData(): void {
    if (!this.chartTree || !this.tree) return;

    // Build tree data for ECharts tree visualization
    const treeData = this.buildTreeData(this.tree);
    
    this.chartTree.setOption({
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          const data = params.data;
          if (data.isLeaf) {
            return `<b>Leaf Node</b><br/>
                    Predicted: ${this.classNames[data.predictedClass]}<br/>
                    Samples: ${data.samples}<br/>
                    Impurity: ${data.impurity.toFixed(3)}`;
          } else {
            const axisName = ['X', 'Y', 'Z'][data.splitAxis];
            return `<b>Split Node</b><br/>
                    ${axisName} ≤ ${data.splitValue.toFixed(2)}<br/>
                    Samples: ${data.samples}<br/>
                    Impurity: ${data.impurity.toFixed(3)}`;
          }
        }
      },
      series: [{
        type: 'tree',
        data: [treeData],
        top: '5%',
        left: '10%',
        bottom: '5%',
        right: '10%',
        symbolSize: 20,
        orient: 'vertical',
        label: {
          position: 'top',
          verticalAlign: 'middle',
          fontSize: 10,
          formatter: (params: any) => {
            const data = params.data;
            if (data.isLeaf) {
              return this.classNames[data.predictedClass].replace('Class ', '');
            } else {
              const axisName = ['X', 'Y', 'Z'][data.splitAxis];
              return `${axisName}≤${data.splitValue.toFixed(1)}`;
            }
          }
        },
        leaves: {
          label: {
            position: 'bottom',
            verticalAlign: 'middle'
          }
        },
        itemStyle: {
          color: '#333',
          borderColor: '#333'
        },
        lineStyle: {
          color: '#999',
          width: 1.5
        },
        emphasis: {
          focus: 'descendant'
        },
        expandAndCollapse: false,
        animationDuration: 550,
        animationDurationUpdate: 750
      }]
    });
  }

  private buildTreeData(node: TreeNode): any {
    const data: any = {
      name: node.isLeaf ? this.classNames[node.predictedClass] : 'Split',
      isLeaf: node.isLeaf,
      predictedClass: node.predictedClass,
      splitAxis: node.splitAxis,
      splitValue: node.splitValue,
      samples: node.samples,
      impurity: node.impurity,
      itemStyle: {
        color: node.isLeaf ? this.classColors[node.predictedClass] : '#666',
        borderColor: node.isLeaf ? this.classColors[node.predictedClass] : '#333',
        borderWidth: 2
      }
    };
    
    if (!node.isLeaf && node.left && node.right) {
      data.children = [
        this.buildTreeData(node.left),
        this.buildTreeData(node.right)
      ];
    }
    
    return data;
  }

  // Helper for template
  formatNumber(n: number, decimals: number = 2): string {
    return n.toFixed(decimals);
  }

  // Axis name helper
  getAxisName(axis: number): string {
    return ['X', 'Y', 'Z'][axis];
  }
}