import 'echarts-gl';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import { Matrix, vec } from 'src/app/lib/numpy';
import { TSNE } from 'src/app/lib/ml';
import { TutorialTemplateComponent } from '../../../Toolbox/tutorial-template/tutorial-template.component';
import { MatButton } from '@angular/material/button';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';

const CLUSTER_COLORS = ['#5470c6', '#91cc75', '#ee6666', '#fac858', '#73c0de'];
const MAX_CLUSTERS = 5;
const K_NEIGHBORS = 6;

@Component({
  selector: 'app-tsne',
  templateUrl: './tsne.component.html',
  styleUrl: './tsne.component.scss',
  imports: [
    TutorialTemplateComponent,
    FormsModule,
    NgxEchartsDirective,
    MatButton,
    MatSlider,
    MatSliderThumb,
  ],
})
export class TSNEComponent implements OnInit, OnDestroy {
  nClusters = 3;
  perCluster = 45;
  perplexity = 25;
  nIter = 500;

  iter = 0;
  running = false;
  focus: number | null = null;

  // Source data lives in 3D so it can be *shown* next to the 2D embedding.
  private source: number[][] = [];
  private labels: number[] = [];
  private neighbors: number[][] = []; // high-dimensional k-NN per point
  private tsne: TSNE | null = null;

  private chart3D: any = null;
  private chart2D: any = null;
  private frame = 0;

  option3D: EChartsOption = {};
  option2D: EChartsOption = {};

  ngOnInit(): void {
    this.generateData();
  }

  ngOnDestroy(): void {
    this.stop();
  }

  onChart3DInit(ec: any): void {
    this.chart3D = ec;
    this.render3D();
    // The chart can initialize before its flex container has a laid-out size;
    // resize once layout settles so it isn't stuck rendering at 0×0.
    setTimeout(() => ec.resize(), 60);
  }

  onChart2DInit(ec: any): void {
    this.chart2D = ec;
    // Hovering a point in the embedding focuses it in BOTH views.
    ec.on('mouseover', (p: any) => {
      if (p?.data && p.data.gidx != null) {
        this.focus = p.data.gidx;
        this.render3D();
        this.render2D();
      }
    });
    ec.on('mouseout', () => {
      this.focus = null;
      this.render3D();
      this.render2D();
    });
    this.render2D();
    setTimeout(() => ec.resize(), 60);
  }

  // --- Data ---------------------------------------------------------------

  generateData(): void {
    this.stop();
    this.source = [];
    this.labels = [];
    for (let c = 0; c < this.nClusters; c++) {
      const center = [0, 1, 2].map(() => (Math.random() - 0.5) * 16);
      for (let i = 0; i < this.perCluster; i++) {
        this.source.push(center.map((m) => m + this.randn() * 1.4));
        this.labels.push(c);
      }
    }
    this.computeNeighbors();
    this.iter = 0;
    this.tsne = null;
    this.focus = null;
    this.render3D();
    this.render2D();
  }

  /** Precompute each point's k nearest neighbours in the original 3D space. */
  private computeNeighbors(): void {
    this.neighbors = this.source.map((p, i) =>
      this.source
        .map((q, j) => ({ j, d: vec.distance(p, q) }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, K_NEIGHBORS)
        .map((o) => o.j)
    );
  }

  // --- Optimization -------------------------------------------------------

  run(): void {
    if (this.running) return;
    this.tsne = new TSNE({ perplexity: this.perplexity, nIter: this.nIter }).initialize(
      Matrix.fromRows(this.source)
    );
    this.iter = 0;
    this.running = true;
    this.animate();
  }

  stop(): void {
    this.running = false;
    if (this.frame) cancelAnimationFrame(this.frame);
    this.frame = 0;
  }

  reset(): void {
    this.generateData();
  }

  private animate = (): void => {
    if (!this.running || !this.tsne) return;
    // A couple of steps per frame: with chart animation off, every frame draws
    // the points at their current positions, so you see them slide apart.
    if (this.iter < this.nIter) {
      this.tsne.step();
      this.iter++;
    }
    this.render2D();
    if (this.iter < this.nIter) {
      this.frame = requestAnimationFrame(this.animate);
    } else {
      this.running = false;
    }
  };

  // --- Rendering ----------------------------------------------------------

  // Both charts render through their bound [options] input with a *fixed*
  // series structure (empty data for inactive clusters / overlays). This drives
  // rendering via the ngx-echarts directive lifecycle — which sizes the chart
  // correctly on first paint — and lets merge-updates move points in place.

  private render3D(): void {
    const dim = this.focus == null ? 0.9 : 0.25;
    const series: any[] = [];
    for (let c = 0; c < MAX_CLUSTERS; c++) {
      series.push({
        type: 'scatter3D',
        name: `Cluster ${c + 1}`,
        symbolSize: 7,
        animation: false,
        itemStyle: { color: CLUSTER_COLORS[c % CLUSTER_COLORS.length], opacity: dim },
        data: c < this.nClusters ? this.source.filter((_, i) => this.labels[i] === c) : [],
      });
    }
    series.push({
      type: 'scatter3D', symbolSize: 10, animation: false,
      itemStyle: { color: '#111827', opacity: 0.9 },
      data: this.focus != null ? this.neighbors[this.focus].map((j) => this.source[j]) : [],
    });
    series.push({
      type: 'scatter3D', symbolSize: 16, animation: false, itemStyle: { color: '#111827' },
      data: this.focus != null ? [this.source[this.focus]] : [],
    });

    this.option3D = {
      animation: false,
      title: { text: 'Original data (3D)', left: 'center', textStyle: { fontSize: 13 } },
      tooltip: { show: false },
      xAxis3D: {}, yAxis3D: {}, zAxis3D: {},
      grid3D: { boxWidth: 90, boxHeight: 90, boxDepth: 90, viewControl: { distance: 190 } },
      series,
    };
  }

  private render2D(): void {
    const coords = this.tsne ? this.tsne.embedding.toArray() : this.source.map(() => [0, 0]);
    const f = this.focus != null ? coords[this.focus] : null;
    const series: any[] = [];
    for (let c = 0; c < MAX_CLUSTERS; c++) {
      series.push({
        type: 'scatter',
        name: `Cluster ${c + 1}`,
        symbolSize: 9,
        itemStyle: { color: CLUSTER_COLORS[c % CLUSTER_COLORS.length], opacity: this.focus == null ? 0.85 : 0.35 },
        data: c < this.nClusters
          ? coords.map((p, i) => ({ value: p, gidx: i })).filter((_, i) => this.labels[i] === c)
          : [],
      });
    }
    // "Springs": lines from the focused point to its true high-D neighbours.
    series.push({
      type: 'lines', coordinateSystem: 'cartesian2d', silent: true,
      lineStyle: { color: '#111827', opacity: 0.55, width: 1.5 },
      data: f ? this.neighbors[this.focus!].map((j) => ({ coords: [f, coords[j]] })) : [],
    });
    series.push({
      type: 'scatter', symbolSize: 16, itemStyle: { color: '#111827' },
      data: f ? [{ value: f, gidx: this.focus }] : [],
    });

    this.option2D = {
      animation: false,
      title: {
        text: `t-SNE embedding (2D) — iteration ${this.iter}`,
        left: 'center', textStyle: { fontSize: 13 },
      },
      tooltip: { show: false },
      xAxis: { scale: true, axisLabel: { show: false }, splitLine: { show: false } },
      yAxis: { scale: true, axisLabel: { show: false }, splitLine: { show: false } },
      series,
    };
  }

  private randn(): number {
    return Math.sqrt(-2 * Math.log(Math.random() + 1e-12)) * Math.cos(2 * Math.PI * Math.random());
  }
}
