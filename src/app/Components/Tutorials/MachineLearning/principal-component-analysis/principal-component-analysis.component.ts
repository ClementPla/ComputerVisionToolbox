import { Component, OnInit, OnDestroy } from '@angular/core';
import { ECharts } from 'echarts';
import { Matrix, eigSymmetric } from 'src/app/lib/numpy';
import { sampleGaussian3D } from 'src/app/utils/sampling';

/**
 * Symmetric square root A of a covariance Σ (A Aᵀ = Σ), used to map the unit
 * sphere onto the covariance ellipsoid. Built from the eigendecomposition, so
 * it is robust to (near-)singular Σ — negative eigenvalues are clamped to 0.
 */
function ellipsoidTransform(covariance: number[][]): Matrix {
  const { values, vectors } = eigSymmetric(Matrix.fromRows(covariance));
  const sqrtLambda = Matrix.diag(values.map((v) => Math.sqrt(Math.max(0, v))));
  return vectors.matmul(sqrtLambda);
}
import * as echarts from 'echarts';
import 'echarts-gl';
import { TutorialTemplateComponent } from '../../../Toolbox/tutorial-template/tutorial-template.component';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import { LabelledSlidersComponent } from '../../../labelled-sliders/labelled-sliders.component';
// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Generate ellipsoid wireframe lines (latitude and longitude)
 */
function generateEllipsoidWireframe(
  covariance: number[][],
  center: number[],
  nLatitude: number = 12,
  nLongitude: number = 16,
  scale: number = 2,
  pointsPerLine: number = 50
): { latitudeLines: number[][][], longitudeLines: number[][][] } {
  const A = ellipsoidTransform(covariance);

  const latitudeLines: number[][][] = [];
  const longitudeLines: number[][][] = [];

  // Generate latitude lines (horizontal circles at different theta values)
  for (let i = 1; i < nLatitude; i++) {
    const theta = (i / nLatitude) * Math.PI;
    const line: number[][] = [];
    
    for (let j = 0; j <= pointsPerLine; j++) {
      const phi = (j / pointsPerLine) * 2 * Math.PI;
      const x = Math.sin(theta) * Math.cos(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(theta);
      
      const transformed = A.matvec([x * scale, y * scale, z * scale]);
      line.push([
        center[0] + transformed[0],
        center[1] + transformed[1],
        center[2] + transformed[2]
      ]);
    }
    latitudeLines.push(line);
  }

  // Generate longitude lines (vertical arcs at different phi values)
  for (let j = 0; j < nLongitude; j++) {
    const phi = (j / nLongitude) * 2 * Math.PI;
    const line: number[][] = [];
    
    for (let i = 0; i <= pointsPerLine; i++) {
      const theta = (i / pointsPerLine) * Math.PI;
      const x = Math.sin(theta) * Math.cos(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(theta);
      
      const transformed = A.matvec([x * scale, y * scale, z * scale]);
      line.push([
        center[0] + transformed[0],
        center[1] + transformed[1],
        center[2] + transformed[2]
      ]);
    }
    longitudeLines.push(line);
  }

  return { latitudeLines, longitudeLines };
}

/**
 * Generate a circle for the azimuth angle (φ) - horizontal circle in XY plane
 */
function generateAzimuthCircle(
  radius: number,
  zHeight: number = 0,
  nPoints: number = 64
): number[][] {
  const points: number[][] = [];
  for (let i = 0; i <= nPoints; i++) {
    const phi = (i / nPoints) * 2 * Math.PI;
    points.push([
      radius * Math.cos(phi),
      radius * Math.sin(phi),
      zHeight
    ]);
  }
  return points;
}

/**
 * Generate an arc for the polar angle (θ) - vertical arc from Z axis
 */
function generatePolarArc(
  radius: number,
  currentPhi: number,
  nPoints: number = 64
): number[][] {
  const points: number[][] = [];
  const phiRad = (currentPhi * Math.PI) / 180;
  
  for (let i = 0; i <= nPoints; i++) {
    const theta = (i / nPoints) * Math.PI;
    points.push([
      radius * Math.sin(theta) * Math.cos(phiRad),
      radius * Math.sin(theta) * Math.sin(phiRad),
      radius * Math.cos(theta)
    ]);
  }
  return points;
}

/**
 * Generate a small arc showing current theta position
 */
function generateThetaIndicator(
  radius: number,
  currentTheta: number,
  currentPhi: number,
  arcLength: number = 30,
  nPoints: number = 20
): number[][] {
  const points: number[][] = [];
  const phiRad = (currentPhi * Math.PI) / 180;
  const startTheta = Math.max(0, currentTheta - arcLength / 2);
  const endTheta = Math.min(180, currentTheta + arcLength / 2);
  
  for (let i = 0; i <= nPoints; i++) {
    const theta = ((startTheta + (i / nPoints) * (endTheta - startTheta)) * Math.PI) / 180;
    points.push([
      radius * Math.sin(theta) * Math.cos(phiRad),
      radius * Math.sin(theta) * Math.sin(phiRad),
      radius * Math.cos(theta)
    ]);
  }
  return points;
}

/**
 * Generate a small arc showing current phi position
 */
function generatePhiIndicator(
  radius: number,
  currentTheta: number,
  currentPhi: number,
  arcLength: number = 40,
  nPoints: number = 20
): number[][] {
  const points: number[][] = [];
  const thetaRad = (currentTheta * Math.PI) / 180;
  const startPhi = currentPhi - arcLength / 2;
  const endPhi = currentPhi + arcLength / 2;
  
  for (let i = 0; i <= nPoints; i++) {
    const phi = ((startPhi + (i / nPoints) * (endPhi - startPhi)) * Math.PI) / 180;
    points.push([
      radius * Math.sin(thetaRad) * Math.cos(phi),
      radius * Math.sin(thetaRad) * Math.sin(phi),
      radius * Math.cos(thetaRad)
    ]);
  }
  return points;
}


// ============================================
// COMPONENT
// ============================================

@Component({
    selector: 'app-principal-component-analysis',
    templateUrl: './principal-component-analysis.component.html',
    styleUrls: ['./principal-component-analysis.component.scss'],
    imports: [TutorialTemplateComponent, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatSlider, MatSliderThumb, ReactiveFormsModule, FormsModule, MatButton, NgClass, NgxEchartsDirective, LabelledSlidersComponent]
})
export class PrincipalComponentAnalysisComponent implements OnInit, OnDestroy {
    // Chart instances
  chart3D: ECharts | null = null;
  chartProjection: ECharts | null = null;

  // Data
  data3D: number[][] = [];
  ellipsoidWireframe: { latitudeLines: number[][][], longitudeLines: number[][][] } = { latitudeLines: [], longitudeLines: [] };
  projectedData: number[] = [];
  
  // Covariance matrix parameters (user adjustable)
  covXY: number = 0.6;
  covXZ: number = 0.3;
  covYZ: number = 0.2;
  varX: number = 1.5;
  varY: number = 1.0;
  varZ: number = 0.5;

  // Projection vector (spherical coordinates)
  theta: number = 45;  // polar angle (0-180)
  phi: number = 45;    // azimuthal angle (0-360)

  // Computed values
  projectionVector: number[] = [1, 0, 0];
  projectedVariance: number = 0;
  maxVariance: number = 0;
  eigenvalues: number[] = [1, 1, 1];
  eigenvectors: number[][] = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];

  // Sample size
  nSamples: number = 500;

  // Chart options - initialized once
  option3D: any = {};
  optionProjection: any = {};

  // Track if charts are initialized
  private chart3DInitialized = false;
  private chartProjectionInitialized = false;

  // Axis range (computed from data)
  private axisRange: number = 5;

  constructor() {}

  ngOnInit(): void {
    this.generateData();
  }

  ngOnDestroy(): void {
    this.chart3D?.dispose();
    this.chartProjection?.dispose();
  }

  get covariance(): number[][] {
    return [
      [this.varX, this.covXY, this.covXZ],
      [this.covXY, this.varY, this.covYZ],
      [this.covXZ, this.covYZ, this.varZ]
    ];
  }

  onChart3DInit(chart: any): void {
    this.chart3D = chart;
    this.initialize3DChart();
  }

  onChartProjectionInit(chart: any): void {
    this.chartProjection = chart;
    this.initializeProjectionChart();
  }

  generateData(): void {
    // Generate 3D Gaussian samples
    this.data3D = sampleGaussian3D(this.nSamples, [0, 0, 0], this.covariance);
    
    // Generate ellipsoid wireframe
    this.ellipsoidWireframe = generateEllipsoidWireframe(this.covariance, [0, 0, 0], 8, 12, 2, 40);
    
    // Compute eigendecomposition (eigenvectors returned as columns -> rows)
    const eigen = eigSymmetric(Matrix.fromRows(this.covariance));
    this.eigenvalues = eigen.values;
    this.eigenvectors = eigen.vectors.T().toArray();
    this.maxVariance = eigen.values[0];

    // Compute axis range from data points
    let maxRange = 0;
    this.data3D.forEach(p => {
      maxRange = Math.max(maxRange, Math.abs(p[0]), Math.abs(p[1]), Math.abs(p[2]));
    });
    // Also check ellipsoid extent
    this.ellipsoidWireframe.latitudeLines.forEach(line => {
      line.forEach(p => {
        maxRange = Math.max(maxRange, Math.abs(p[0]), Math.abs(p[1]), Math.abs(p[2]));
      });
    });
    this.axisRange = Math.ceil(maxRange * 1.2);

    this.updateProjectionVector();
    
    // If charts exist, update axis ranges and data
    if (this.chart3D && this.chart3DInitialized) {
      this.update3DAxisRange();
      this.update3DChartData();
    }
    if (this.chartProjection && this.chartProjectionInitialized) {
      this.updateProjectionChartData();
    }
  }

  updateProjectionVector(): void {
    // Convert spherical to Cartesian coordinates
    const thetaRad = (this.theta * Math.PI) / 180;
    const phiRad = (this.phi * Math.PI) / 180;
    
    this.projectionVector = [
      Math.sin(thetaRad) * Math.cos(phiRad),
      Math.sin(thetaRad) * Math.sin(phiRad),
      Math.cos(thetaRad)
    ];

    // Compute projected data and variance
    this.projectData();
  }

  projectData(): void {
    const v = this.projectionVector;
    
    // Project all points onto the vector
    this.projectedData = this.data3D.map(point => 
      point[0] * v[0] + point[1] * v[1] + point[2] * v[2]
    );

    // Compute variance of projected data
    if (this.projectedData.length > 0) {
      const mean = this.projectedData.reduce((s, x) => s + x, 0) / this.projectedData.length;
      this.projectedVariance = this.projectedData.reduce((s, x) => s + (x - mean) ** 2, 0) / this.projectedData.length;
    }
  }

  onAngleChange(): void {
    this.updateProjectionVector();
    this.update3DChartData();
    this.updateProjectionChartData();
  }

  onCovarianceChange(): void {
    this.generateData();
  }

  alignWithPC(index: number): void {
    // Align projection vector with the i-th principal component
    const pc = this.eigenvectors[index];
    
    // Convert to spherical coordinates
    const r = Math.sqrt(pc[0]**2 + pc[1]**2 + pc[2]**2);
    this.theta = Math.acos(pc[2] / r) * 180 / Math.PI;
    this.phi = Math.atan2(pc[1], pc[0]) * 180 / Math.PI;
    if (this.phi < 0) this.phi += 360;

    this.updateProjectionVector();
    this.update3DChartData();
    this.updateProjectionChartData();
  }

  /**
   * Initialize the 3D chart structure (called once)
   */
  private initialize3DChart(): void {
    if (!this.chart3D) return;

    const arrowLength = this.axisRange * 0.8;
    const v = this.projectionVector;
    const pcLength = arrowLength * 0.6;
    const guideRadius = arrowLength * 0.5;

    // Generate angle guide circles
    const azimuthCircle = generateAzimuthCircle(guideRadius, 0, 64);
    const polarArc = generatePolarArc(guideRadius, this.phi, 64);
    const thetaIndicator = generateThetaIndicator(guideRadius * 1.05, this.theta, this.phi);
    const phiIndicator = generatePhiIndicator(guideRadius * 1.05, this.theta, this.phi);

    // Build series array
    const series: any[] = [
      // 0: Data points
      {
        type: 'scatter3D',
        name: 'Data',
        data: this.data3D,
        symbolSize: 4,
        itemStyle: { color: '#5470c6', opacity: 0.6 }
      },
      // 1: Projection vector line
      {
        type: 'line3D',
        name: 'Projection Vector',
        data: [[0, 0, 0], [v[0] * arrowLength, v[1] * arrowLength, v[2] * arrowLength]],
        lineStyle: { color: '#ee6666', width: 4 }
      },
      // 2: Arrow head
      {
        type: 'scatter3D',
        name: 'Arrow Head',
        data: [[v[0] * arrowLength, v[1] * arrowLength, v[2] * arrowLength]],
        symbolSize: 12,
        symbol: 'triangle',
        itemStyle: { color: '#ee6666' }
      },
      // 3: PC1
      {
        type: 'line3D',
        name: 'PC1',
        data: [
          [-this.eigenvectors[0][0] * pcLength, -this.eigenvectors[0][1] * pcLength, -this.eigenvectors[0][2] * pcLength],
          [this.eigenvectors[0][0] * pcLength, this.eigenvectors[0][1] * pcLength, this.eigenvectors[0][2] * pcLength]
        ],
        lineStyle: { color: '#fac858', width: 3, type: 'dashed' as const }
      },
      // 4: PC2
      {
        type: 'line3D',
        name: 'PC2',
        data: [
          [-this.eigenvectors[1][0] * pcLength, -this.eigenvectors[1][1] * pcLength, -this.eigenvectors[1][2] * pcLength],
          [this.eigenvectors[1][0] * pcLength, this.eigenvectors[1][1] * pcLength, this.eigenvectors[1][2] * pcLength]
        ],
        lineStyle: { color: '#73c0de', width: 3, type: 'dashed' as const }
      },
      // 5: PC3
      {
        type: 'line3D',
        name: 'PC3',
        data: [
          [-this.eigenvectors[2][0] * pcLength, -this.eigenvectors[2][1] * pcLength, -this.eigenvectors[2][2] * pcLength],
          [this.eigenvectors[2][0] * pcLength, this.eigenvectors[2][1] * pcLength, this.eigenvectors[2][2] * pcLength]
        ],
        lineStyle: { color: '#9a60b4', width: 3, type: 'dashed' as const }
      },
      // 6: Azimuth guide circle (φ rotation)
      {
        type: 'line3D',
        name: 'Azimuth Circle (φ)',
        data: azimuthCircle,
        lineStyle: { color: '#aaaaaa', width: 1, opacity: 0.5 }
      },
      // 7: Polar guide arc (θ rotation)
      {
        type: 'line3D',
        name: 'Polar Arc (θ)',
        data: polarArc,
        lineStyle: { color: '#aaaaaa', width: 1, opacity: 0.5 }
      },
      // 8: Theta indicator (current position)
      {
        type: 'line3D',
        name: 'θ indicator',
        data: thetaIndicator,
        lineStyle: { color: '#ff9800', width: 4, opacity: 0.9 }
      },
      // 9: Phi indicator (current position)
      {
        type: 'line3D',
        name: 'φ indicator',
        data: phiIndicator,
        lineStyle: { color: '#4caf50', width: 4, opacity: 0.9 }
      }
    ];

    // Add ellipsoid latitude lines (starting at index 10)
    this.ellipsoidWireframe.latitudeLines.forEach((line, i) => {
      series.push({
        type: 'line3D',
        name: `Ellipsoid Lat ${i}`,
        data: line,
        lineStyle: { color: '#91cc75', width: 1, opacity: 0.4 },
        silent: true
      });
    });

    // Add ellipsoid longitude lines
    this.ellipsoidWireframe.longitudeLines.forEach((line, i) => {
      series.push({
        type: 'line3D',
        name: `Ellipsoid Lon ${i}`,
        data: line,
        lineStyle: { color: '#91cc75', width: 1, opacity: 0.4 },
        silent: true
      });
    });

    this.option3D = {
      tooltip: {},
      xAxis3D: { type: 'value', min: -this.axisRange, max: this.axisRange, name: 'X' },
      yAxis3D: { type: 'value', min: -this.axisRange, max: this.axisRange, name: 'Y' },
      zAxis3D: { type: 'value', min: -this.axisRange, max: this.axisRange, name: 'Z' },
      grid3D: {
        viewControl: {
          autoRotate: false,
          distance: 200
        },
        boxWidth: 100,
        boxHeight: 100,
        boxDepth: 100
      },
      series: series
    };

    this.chart3D.setOption(this.option3D);
    this.chart3DInitialized = true;
  }

  /**
   * Update only the axis range (when data changes significantly)
   */
  private update3DAxisRange(): void {
    if (!this.chart3D) return;

    this.chart3D.setOption({
      xAxis3D: { min: -this.axisRange, max: this.axisRange },
      yAxis3D: { min: -this.axisRange, max: this.axisRange },
      zAxis3D: { min: -this.axisRange, max: this.axisRange }
    });
  }

  /**
   * Update only the series data (preserves camera view)
   */
  private update3DChartData(): void {
    if (!this.chart3D || !this.chart3DInitialized) return;

    const arrowLength = this.axisRange * 0.8;
    const v = this.projectionVector;
    const pcLength = arrowLength * 0.6;
    const guideRadius = arrowLength * 0.5;

    // Generate updated angle guides
    const polarArc = generatePolarArc(guideRadius, this.phi, 64);
    const thetaIndicator = generateThetaIndicator(guideRadius * 1.05, this.theta, this.phi);
    const phiIndicator = generatePhiIndicator(guideRadius * 1.05, this.theta, this.phi);

    // Build series update array - must match initialization order
    const seriesUpdate: any[] = [
      // 0: Data points
      { data: this.data3D },
      // 1: Projection vector line
      { data: [[0, 0, 0], [v[0] * arrowLength, v[1] * arrowLength, v[2] * arrowLength]] },
      // 2: Arrow head
      { data: [[v[0] * arrowLength, v[1] * arrowLength, v[2] * arrowLength]] },
      // 3: PC1
      { 
        data: [
          [-this.eigenvectors[0][0] * pcLength, -this.eigenvectors[0][1] * pcLength, -this.eigenvectors[0][2] * pcLength],
          [this.eigenvectors[0][0] * pcLength, this.eigenvectors[0][1] * pcLength, this.eigenvectors[0][2] * pcLength]
        ]
      },
      // 4: PC2
      { 
        data: [
          [-this.eigenvectors[1][0] * pcLength, -this.eigenvectors[1][1] * pcLength, -this.eigenvectors[1][2] * pcLength],
          [this.eigenvectors[1][0] * pcLength, this.eigenvectors[1][1] * pcLength, this.eigenvectors[1][2] * pcLength]
        ]
      },
      // 5: PC3
      { 
        data: [
          [-this.eigenvectors[2][0] * pcLength, -this.eigenvectors[2][1] * pcLength, -this.eigenvectors[2][2] * pcLength],
          [this.eigenvectors[2][0] * pcLength, this.eigenvectors[2][1] * pcLength, this.eigenvectors[2][2] * pcLength]
        ]
      },
      // 6: Azimuth guide circle (doesn't change with angles)
      {},
      // 7: Polar guide arc (updates with phi)
      { data: polarArc },
      // 8: Theta indicator
      { data: thetaIndicator },
      // 9: Phi indicator
      { data: phiIndicator }
    ];

    // Add ellipsoid wireframe updates
    this.ellipsoidWireframe.latitudeLines.forEach((line) => {
      seriesUpdate.push({ data: line });
    });
    this.ellipsoidWireframe.longitudeLines.forEach((line) => {
      seriesUpdate.push({ data: line });
    });

    // Only update series data - this preserves the viewControl state
    this.chart3D.setOption({
      series: seriesUpdate
    });
  }

  /**
   * Initialize the projection chart structure (called once)
   */
  private initializeProjectionChart(): void {
    if (!this.chartProjection || this.projectedData.length === 0) return;

    // Create histogram
    const bins = 30;
    const min = Math.min(...this.projectedData);
    const max = Math.max(...this.projectedData);
    const binWidth = (max - min) / bins || 1;
    
    const histogram: number[] = new Array(bins).fill(0);
    this.projectedData.forEach(val => {
      const binIndex = Math.min(Math.floor((val - min) / binWidth), bins - 1);
      histogram[binIndex]++;
    });

    const histogramData = histogram.map((count, i) => [min + (i + 0.5) * binWidth, count]);
    const varianceRatio = this.projectedVariance / this.maxVariance;

    this.optionProjection = {
      title: {
        text: 'Projected Data Distribution',
        left: 'center',
        top: 10
      },
      grid: [
        { left: '10%', right: '55%', top: '20%', bottom: '15%' },
        { left: '55%', right: '10%', top: '20%', bottom: '15%' }
      ],
      xAxis: [
        { 
          type: 'value', 
          gridIndex: 0,
          name: 'Projected Value',
          nameLocation: 'center',
          nameGap: 25
        },
        { 
          type: 'category', 
          gridIndex: 1,
          data: ['Current', 'Maximum'],
          axisLabel: { interval: 0 }
        }
      ],
      yAxis: [
        { type: 'value', gridIndex: 0, name: 'Count' },
        { type: 'value', gridIndex: 1, name: 'Variance', max: this.maxVariance * 1.1 }
      ],
      series: [
        {
          type: 'bar',
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: histogramData,
          barWidth: '90%',
          itemStyle: { color: '#5470c6' }
        },
        {
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: [
            {
              value: this.projectedVariance,
              itemStyle: { color: varianceRatio > 0.95 ? '#91cc75' : '#ee6666' }
            },
            {
              value: this.maxVariance,
              itemStyle: { color: '#91cc75' }
            }
          ],
          barWidth: '50%',
          label: {
            show: true,
            position: 'top',
            formatter: (params: any) => params.value.toFixed(3)
          }
        }
      ],
      tooltip: { trigger: 'axis' }
    };

    this.chartProjection.setOption(this.optionProjection);
    this.chartProjectionInitialized = true;
  }

  /**
   * Update only the projection chart data
   */
  private updateProjectionChartData(): void {
    if (!this.chartProjection || !this.chartProjectionInitialized || this.projectedData.length === 0) return;

    // Create histogram
    const bins = 30;
    const min = Math.min(...this.projectedData);
    const max = Math.max(...this.projectedData);
    const binWidth = (max - min) / bins || 1;
    
    const histogram: number[] = new Array(bins).fill(0);
    this.projectedData.forEach(val => {
      const binIndex = Math.min(Math.floor((val - min) / binWidth), bins - 1);
      histogram[binIndex]++;
    });

    const histogramData = histogram.map((count, i) => [min + (i + 0.5) * binWidth, count]);
    const varianceRatio = this.projectedVariance / this.maxVariance;

    this.chartProjection.setOption({
      yAxis: [
        { gridIndex: 0 },
        { max: this.maxVariance * 1.1 }
      ],
      series: [
        { data: histogramData },
        {
          data: [
            {
              value: this.projectedVariance,
              itemStyle: { color: varianceRatio > 0.95 ? '#91cc75' : '#ee6666' }
            },
            {
              value: this.maxVariance,
              itemStyle: { color: '#91cc75' }
            }
          ]
        }
      ]
    });
  }

  // Format number for display
  formatNumber(n: number): string {
    return n.toFixed(3);
  }
}