import { Component, OnInit, OnDestroy } from '@angular/core';
import { ECharts } from 'echarts';
import { Matrix, eigSymmetric } from 'src/app/lib/numpy';
import { PCA, FisherDiscriminant } from 'src/app/lib/ml';
import { sampleGaussian2D } from 'src/app/utils/sampling';
import { TutorialTemplateComponent } from '../../../Toolbox/tutorial-template/tutorial-template.component';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import { LabelledSlidersComponent } from '../../../labelled-sliders/labelled-sliders.component';


/**
 * Project points onto a direction and compute statistics
 */
function projectAndAnalyze(
  points: [number, number][],
  direction: [number, number]
): { projected: number[], mean: number, variance: number } {
  const projected = points.map(p => p[0] * direction[0] + p[1] * direction[1]);
  const mean = projected.reduce((a, b) => a + b, 0) / projected.length;
  const variance = projected.reduce((a, b) => a + (b - mean) ** 2, 0) / projected.length;
  return { projected, mean, variance };
}

/**
 * Compute Fisher criterion J(w) = (m1 - m2)² / (s1² + s2²)
 */
function computeFisherCriterion(
  proj1: { mean: number, variance: number },
  proj2: { mean: number, variance: number }
): number {
  const betweenClassVariance = (proj1.mean - proj2.mean) ** 2;
  const withinClassVariance = proj1.variance + proj2.variance;
  if (withinClassVariance < 1e-10) return 0;
  return betweenClassVariance / withinClassVariance;
}

/**
 * Generate ellipse points for covariance visualization
 */
function generateEllipse(
  mean: [number, number],
  covariance: number[][],
  nPoints: number = 64,
  scale: number = 2
): [number, number][] {
  // A with A Aᵀ = Σ maps the unit circle onto the covariance ellipse; the
  // symmetric eig-sqrt is robust to (near-)singular Σ.
  const { values, vectors } = eigSymmetric(Matrix.fromRows(covariance));
  const A = vectors.matmul(Matrix.diag(values.map((v) => Math.sqrt(Math.max(0, v)))));
  const points: [number, number][] = [];

  for (let i = 0; i <= nPoints; i++) {
    const theta = (i / nPoints) * 2 * Math.PI;
    const [tx, ty] = A.matvec([Math.cos(theta) * scale, Math.sin(theta) * scale]);
    points.push([mean[0] + tx, mean[1] + ty]);
  }
  return points;
}

/**
 * Compute histogram bins
 */
function computeHistogram(
  data: number[],
  min: number,
  max: number,
  nBins: number
): number[] {
  const binWidth = (max - min) / nBins;
  const bins = new Array(nBins).fill(0);
  
  for (const val of data) {
    const idx = Math.min(Math.floor((val - min) / binWidth), nBins - 1);
    if (idx >= 0) bins[idx]++;
  }
  
  return bins;
}

/**
 * Estimate overlap between two distributions (simple histogram-based)
 */
function estimateOverlap(
  data1: number[],
  data2: number[],
  nBins: number = 30
): number {
  const allData = [...data1, ...data2];
  const min = Math.min(...allData);
  const max = Math.max(...allData);
  
  const hist1 = computeHistogram(data1, min, max, nBins);
  const hist2 = computeHistogram(data2, min, max, nBins);
  
  // Normalize
  const sum1 = hist1.reduce((a, b) => a + b, 0);
  const sum2 = hist2.reduce((a, b) => a + b, 0);
  
  // Compute overlap (intersection of normalized histograms)
  let overlap = 0;
  for (let i = 0; i < nBins; i++) {
    overlap += Math.min(hist1[i] / sum1, hist2[i] / sum2);
  }
  
  return overlap * 100;
}

// ============================================
// COMPONENT
// ============================================

@Component({
    selector: 'app-fisher-discriminant',
    templateUrl: './fisher-discriminant.component.html',
    styleUrls: ['./fisher-discriminant.component.scss'],
    imports: [TutorialTemplateComponent, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatSlider, MatSliderThumb, ReactiveFormsModule, FormsModule, MatButton, NgClass, NgxEchartsDirective, LabelledSlidersComponent]
})
export class FisherDiscriminantComponent implements OnInit, OnDestroy {
  // Chart instances
  chart2D: ECharts | null = null;
  chartHistogram: ECharts | null = null;

  // Class 1 parameters (Blue)
  mean1: [number, number] = [-1.5, 1];
  var1X: number = 2.0;
  var1Y: number = 0.3;
  cov1XY: number = 0.8;  // This creates the elongated diagonal shape
  
  // Class 2 parameters (Orange)
  mean2: [number, number] = [1.5, -1];
  var2X: number = 2.0;
  var2Y: number = 0.3;
  cov2XY: number = 0.8;

  // Generated data
  class1Data: [number, number][] = [];
  class2Data: [number, number][] = [];
  nSamplesPerClass: number = 150;

  // Projection angle (degrees)
  projectionAngle: number = 45;

  // Computed directions
  projectionVector: [number, number] = [1, 0];
  fisherDirection: [number, number] = [1, 0];
  pcaDirection: [number, number] = [1, 0];

  // Computed metrics
  fisherCriterion: number = 0;
  fisherCriterionOptimal: number = 0;
  fisherCriterionPCA: number = 0;
  overlapPercentage: number = 0;
  overlapOptimal: number = 0;
  overlapPCA: number = 0;

  // Chart options
  option2D: any = {};
  optionHistogram: any = {};

  // Chart state
  private chart2DInitialized = false;
  private chartHistogramInitialized = false;
  private axisRange: number = 5;

  constructor() {}

  ngOnInit(): void {
    this.generateData();
  }

  ngOnDestroy(): void {
    this.chart2D?.dispose();
    this.chartHistogram?.dispose();
  }

  get covariance1(): number[][] {
    return [
      [this.var1X, this.cov1XY],
      [this.cov1XY, this.var1Y]
    ];
  }

  get covariance2(): number[][] {
    return [
      [this.var2X, this.cov2XY],
      [this.cov2XY, this.var2Y]
    ];
  }

  onChart2DInit(chart: any): void {
    this.chart2D = chart;
    this.initialize2DChart();
  }

  onChartHistogramInit(chart: any): void {
    this.chartHistogram = chart;
    this.initializeHistogramChart();
  }

  generateData(): void {
    // Generate samples for both classes
    this.class1Data = sampleGaussian2D(this.nSamplesPerClass, {x: this.mean1[0], y: this.mean1[1]}, this.covariance1).map(p => [p.x, p.y]);
    this.class2Data = sampleGaussian2D(this.nSamplesPerClass, {x: this.mean2[0], y: this.mean2[1]}, this.covariance2).map(p => [p.x, p.y]);

    // Compute optimal directions using the ml/ estimators.
    const X = Matrix.fromRows([...this.class1Data, ...this.class2Data]);
    const y = [
      ...this.class1Data.map(() => 0),
      ...this.class2Data.map(() => 1),
    ];
    this.fisherDirection = new FisherDiscriminant()
      .fit(X, y)
      .direction() as [number, number];
    this.pcaDirection = new PCA(1).fit(X).firstComponent() as [number, number];

    // Compute axis range
    const allPoints = [...this.class1Data, ...this.class2Data];
    let maxRange = 0;
    allPoints.forEach(p => {
      maxRange = Math.max(maxRange, Math.abs(p[0]), Math.abs(p[1]));
    });
    this.axisRange = Math.ceil(maxRange * 1.3);

    this.updateProjectionVector();
    this.computeMetrics();

    if (this.chart2D && this.chart2DInitialized) {
      this.update2DChartData();
    }
    if (this.chartHistogram && this.chartHistogramInitialized) {
      this.updateHistogramChartData();
    }
  }

  updateProjectionVector(): void {
    const angleRad = (this.projectionAngle * Math.PI) / 180;
    this.projectionVector = [Math.cos(angleRad), Math.sin(angleRad)];
  }

  computeMetrics(): void {
    // Current projection
    const proj1 = projectAndAnalyze(this.class1Data, this.projectionVector);
    const proj2 = projectAndAnalyze(this.class2Data, this.projectionVector);
    this.fisherCriterion = computeFisherCriterion(proj1, proj2);
    this.overlapPercentage = estimateOverlap(proj1.projected, proj2.projected);

    // Fisher optimal projection
    const projFisher1 = projectAndAnalyze(this.class1Data, this.fisherDirection);
    const projFisher2 = projectAndAnalyze(this.class2Data, this.fisherDirection);
    this.fisherCriterionOptimal = computeFisherCriterion(projFisher1, projFisher2);
    this.overlapOptimal = estimateOverlap(projFisher1.projected, projFisher2.projected);

    // PCA projection
    const projPCA1 = projectAndAnalyze(this.class1Data, this.pcaDirection);
    const projPCA2 = projectAndAnalyze(this.class2Data, this.pcaDirection);
    this.fisherCriterionPCA = computeFisherCriterion(projPCA1, projPCA2);
    this.overlapPCA = estimateOverlap(projPCA1.projected, projPCA2.projected);
  }

  onAngleChange(): void {
    this.updateProjectionVector();
    this.computeMetrics();
    this.update2DChartData();
    this.updateHistogramChartData();
  }

  onClassParameterChange(): void {
    this.generateData();
  }

  alignWithFisher(): void {
    const angle = Math.atan2(this.fisherDirection[1], this.fisherDirection[0]) * 180 / Math.PI;
    this.projectionAngle = angle < 0 ? angle + 180 : angle;
    this.onAngleChange();
  }

  alignWithPCA(): void {
    const angle = Math.atan2(this.pcaDirection[1], this.pcaDirection[0]) * 180 / Math.PI;
    this.projectionAngle = angle < 0 ? angle + 180 : angle;
    this.onAngleChange();
  }

  private initialize2DChart(): void {
    if (!this.chart2D) return;

    const lineLength = this.axisRange * 0.9;
    const v = this.projectionVector;
    const f = this.fisherDirection;
    const p = this.pcaDirection;

    // Generate covariance ellipses
    const ellipse1 = generateEllipse(this.mean1, this.covariance1, 64, 2);
    const ellipse2 = generateEllipse(this.mean2, this.covariance2, 64, 2);

    this.option2D = {
      tooltip: { trigger: 'item' },
      legend: {
        data: ['Class 1', 'Class 2', 'Your Direction', 'Fisher (Optimal)', 'PCA'],
        top: 10
      },
      xAxis: {
        type: 'value',
        min: -this.axisRange,
        max: this.axisRange,
        name: 'X'
      },
      yAxis: {
        type: 'value',
        min: -this.axisRange,
        max: this.axisRange,
        name: 'Y'
      },
      series: [
        // Class 1 scatter
        {
          name: 'Class 1',
          type: 'scatter',
          data: this.class1Data,
          symbolSize: 6,
          itemStyle: { color: '#5470c6', opacity: 0.7 }
        },
        // Class 2 scatter
        {
          name: 'Class 2',
          type: 'scatter',
          data: this.class2Data,
          symbolSize: 6,
          itemStyle: { color: '#ee6666', opacity: 0.7 }
        },
        // Class 1 ellipse
        {
          name: 'Class 1 Covariance',
          type: 'line',
          data: ellipse1,
          showSymbol: false,
          lineStyle: { color: '#5470c6', width: 2, type: 'dashed' },
          silent: true
        },
        // Class 2 ellipse
        {
          name: 'Class 2 Covariance',
          type: 'line',
          data: ellipse2,
          showSymbol: false,
          lineStyle: { color: '#ee6666', width: 2, type: 'dashed' },
          silent: true
        },
        // User's projection direction
        {
          name: 'Your Direction',
          type: 'line',
          data: [[-v[0] * lineLength, -v[1] * lineLength], [v[0] * lineLength, v[1] * lineLength]],
          showSymbol: false,
          lineStyle: { color: '#9a60b4', width: 3 },
          z: 10
        },
        // Fisher direction
        {
          name: 'Fisher (Optimal)',
          type: 'line',
          data: [[-f[0] * lineLength, -f[1] * lineLength], [f[0] * lineLength, f[1] * lineLength]],
          showSymbol: false,
          lineStyle: { color: '#91cc75', width: 2, type: 'dashed' },
          z: 5
        },
        // PCA direction
        {
          name: 'PCA',
          type: 'line',
          data: [[-p[0] * lineLength, -p[1] * lineLength], [p[0] * lineLength, p[1] * lineLength]],
          showSymbol: false,
          lineStyle: { color: '#fac858', width: 2, type: 'dashed' },
          z: 5
        },
        // Mean markers
        {
          name: 'Class 1 Mean',
          type: 'scatter',
          data: [this.mean1],
          symbolSize: 15,
          symbol: 'diamond',
          itemStyle: { color: '#5470c6', borderColor: '#fff', borderWidth: 2 },
          z: 20
        },
        {
          name: 'Class 2 Mean',
          type: 'scatter',
          data: [this.mean2],
          symbolSize: 15,
          symbol: 'diamond',
          itemStyle: { color: '#ee6666', borderColor: '#fff', borderWidth: 2 },
          z: 20
        }
      ]
    };

    this.chart2D.setOption(this.option2D);
    this.chart2DInitialized = true;
  }

  private update2DChartData(): void {
    if (!this.chart2D || !this.chart2DInitialized) return;

    const lineLength = this.axisRange * 0.9;
    const v = this.projectionVector;
    const f = this.fisherDirection;
    const p = this.pcaDirection;

    // Generate covariance ellipses
    const ellipse1 = generateEllipse(this.mean1, this.covariance1, 64, 2);
    const ellipse2 = generateEllipse(this.mean2, this.covariance2, 64, 2);

    this.chart2D.setOption({
      xAxis: { min: -this.axisRange, max: this.axisRange },
      yAxis: { min: -this.axisRange, max: this.axisRange },
      series: [
        { data: this.class1Data },
        { data: this.class2Data },
        { data: ellipse1 },
        { data: ellipse2 },
        { data: [[-v[0] * lineLength, -v[1] * lineLength], [v[0] * lineLength, v[1] * lineLength]] },
        { data: [[-f[0] * lineLength, -f[1] * lineLength], [f[0] * lineLength, f[1] * lineLength]] },
        { data: [[-p[0] * lineLength, -p[1] * lineLength], [p[0] * lineLength, p[1] * lineLength]] },
        { data: [this.mean1] },
        { data: [this.mean2] }
      ]
    });
  }

  private initializeHistogramChart(): void {
    if (!this.chartHistogram) return;
    this.updateHistogramChartData();
    this.chartHistogramInitialized = true;
  }

  private updateHistogramChartData(): void {
    if (!this.chartHistogram) return;

    // Project data
    const proj1 = projectAndAnalyze(this.class1Data, this.projectionVector);
    const proj2 = projectAndAnalyze(this.class2Data, this.projectionVector);

    // Compute histogram range
    const allProjected = [...proj1.projected, ...proj2.projected];
    const minVal = Math.min(...allProjected);
    const maxVal = Math.max(...allProjected);
    const range = maxVal - minVal;
    const histMin = minVal - range * 0.1;
    const histMax = maxVal + range * 0.1;

    // Create histograms
    const nBins = 25;
    const binWidth = (histMax - histMin) / nBins;
    const hist1 = computeHistogram(proj1.projected, histMin, histMax, nBins);
    const hist2 = computeHistogram(proj2.projected, histMin, histMax, nBins);

    // Create bar data with x positions
    const hist1Data = hist1.map((count, i) => [histMin + (i + 0.5) * binWidth, count]);
    const hist2Data = hist2.map((count, i) => [histMin + (i + 0.5) * binWidth, count]);

    this.chartHistogram.setOption({
      title: {
        text: 'Projected Distributions',
        left: 'center',
        top: 5
      },
      tooltip: { trigger: 'axis' },
      legend: {
        data: ['Class 1', 'Class 2'],
        top: 30
      },
      xAxis: {
        type: 'value',
        name: 'Projected Value',
        nameLocation: 'center',
        nameGap: 25,
        min: histMin,
        max: histMax
      },
      yAxis: {
        type: 'value',
        name: 'Count'
      },
      series: [
        {
          name: 'Class 1',
          type: 'bar',
          data: hist1Data,
          barWidth: '90%',
          itemStyle: { color: 'rgba(84, 112, 198, 0.7)' },
          barGap: '-100%'
        },
        {
          name: 'Class 2',
          type: 'bar',
          data: hist2Data,
          barWidth: '90%',
          itemStyle: { color: 'rgba(238, 102, 102, 0.7)' }
        },
        // Class 1 mean line
        {
          name: 'Mean 1',
          type: 'line',
          markLine: {
            silent: true,
            symbol: 'none',
            data: [{ xAxis: proj1.mean }],
            lineStyle: { color: '#5470c6', width: 2, type: 'solid' },
            label: { show: false }
          }
        },
        // Class 2 mean line
        {
          name: 'Mean 2',
          type: 'line',
          markLine: {
            silent: true,
            symbol: 'none',
            data: [{ xAxis: proj2.mean }],
            lineStyle: { color: '#ee6666', width: 2, type: 'solid' },
            label: { show: false }
          }
        }
      ]
    }, true);
  }

  // Helper for template
  formatNumber(n: number, decimals: number = 2): string {
    return n.toFixed(decimals);
  }

  // Get Fisher direction angle for display
  get fisherAngle(): number {
    return Math.atan2(this.fisherDirection[1], this.fisherDirection[0]) * 180 / Math.PI;
  }

  // Get PCA direction angle for display
  get pcaAngle(): number {
    return Math.atan2(this.pcaDirection[1], this.pcaDirection[0]) * 180 / Math.PI;
  }
}