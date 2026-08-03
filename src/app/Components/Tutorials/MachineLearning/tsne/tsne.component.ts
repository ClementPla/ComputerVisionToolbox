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
  // Pace the optimization by wall-clock time so the embedding forms gradually
  // (~40 steps/s ⇒ a 500-iteration run takes ~12s), independent of refresh rate.
  private readonly stepIntervalMs = 24;
  private lastStepTime = 0;

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
    this.lastStepTime = 0;
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
    // Advance at most one step per elapsed interval, so the layout evolves at a
    // watchable pace rather than snapping to the final result in a few frames.
    const now = performance.now();
    if (now - this.lastStepTime >= this.stepIntervalMs && this.iter < this.nIter) {
      this.tsne.step();
      this.iter++;
      this.lastStepTime = now;
      this.render2D();
    }
    if (this.iter < this.nIter) {
      this.frame = requestAnimationFrame(this.animate);
    } else {
      this.running = false;
    }
  };

  // --- Rendering ----------------------------------------------------------

  private render3D(): void {
    if (!this.chart3D) return;
    const dim = this.focus == null ? 0.9 : 0.25;
    const series: any[] = [];
    for (let c = 0; c < this.nClusters; c++) {
      series.push({
        type: 'scatter3D',
        name: `Cluster ${c + 1}`,
        symbolSize: 7,
        itemStyle: { color: CLUSTER_COLORS[c % CLUSTER_COLORS.length], opacity: dim },
        data: this.source.filter((_, i) => this.labels[i] === c),
      });
    }
    if (this.focus != null) {
      series.push({
        type: 'scatter3D',
        symbolSize: 10,
        itemStyle: { color: '#111827', opacity: 0.9 },
        data: this.neighbors[this.focus].map((j) => this.source[j]),
      });
      series.push({
        type: 'scatter3D',
        symbolSize: 16,
        itemStyle: { color: '#111827' },
        data: [this.source[this.focus]],
      });
    }
    this.chart3D.setOption(
      {
        title: { text: 'Original data (3D)', left: 'center', textStyle: { fontSize: 13 } },
        tooltip: { show: false },
        xAxis3D: {}, yAxis3D: {}, zAxis3D: {},
        grid3D: { boxWidth: 90, boxHeight: 90, boxDepth: 90, viewControl: { distance: 190 } },
        series,
      },
      { notMerge: true, lazyUpdate: true }
    );
  }

  private render2D(): void {
    if (!this.chart2D) return;
    const coords = this.tsne ? this.tsne.embedding.toArray() : this.source.map(() => [0, 0]);

    const series: any[] = [];
    for (let c = 0; c < this.nClusters; c++) {
      series.push({
        type: 'scatter',
        name: `Cluster ${c + 1}`,
        symbolSize: 9,
        itemStyle: { color: CLUSTER_COLORS[c % CLUSTER_COLORS.length], opacity: this.focus == null ? 0.85 : 0.35 },
        data: coords
          .map((p, i) => ({ value: p, gidx: i }))
          .filter((_, i) => this.labels[i] === c),
      });
    }

    // "Springs": lines from the focused point to its true high-D neighbours.
    if (this.focus != null) {
      const f = coords[this.focus];
      series.push({
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        silent: true,
        lineStyle: { color: '#111827', opacity: 0.55, width: 1.5 },
        data: this.neighbors[this.focus].map((j) => ({ coords: [f, coords[j]] })),
      });
      series.push({
        type: 'scatter',
        symbolSize: 16,
        itemStyle: { color: '#111827' },
        data: [{ value: f, gidx: this.focus }],
      });
    }

    this.chart2D.setOption(
      {
        title: {
          text: `t-SNE embedding (2D) — iteration ${this.iter}`,
          left: 'center',
          textStyle: { fontSize: 13 },
        },
        tooltip: { show: false },
        xAxis: { scale: true, axisLabel: { show: false }, splitLine: { show: false } },
        yAxis: { scale: true, axisLabel: { show: false }, splitLine: { show: false } },
        series,
      },
      { notMerge: true, lazyUpdate: true }
    );
  }

  private randn(): number {
    return Math.sqrt(-2 * Math.log(Math.random() + 1e-12)) * Math.cos(2 * Math.PI * Math.random());
  }
}
