import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import { Matrix } from 'src/app/lib/numpy';
import { TSNE } from 'src/app/lib/ml';
import { TutorialTemplateComponent } from '../../../Toolbox/tutorial-template/tutorial-template.component';
import { MatButton } from '@angular/material/button';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';

const CLUSTER_COLORS = ['#5470c6', '#91cc75', '#ee6666', '#fac858', '#73c0de'];

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
  // Dataset controls.
  nClusters = 4;
  perCluster = 40;
  dims = 10;
  perplexity = 25;
  nIter = 500;

  iter = 0;
  running = false;

  private data: number[][] = [];
  private labels: number[] = [];
  private tsne: TSNE | null = null;
  private chart: any = null;
  private frame = 0;

  option: EChartsOption = {};

  ngOnInit(): void {
    this.generateData();
  }

  ngOnDestroy(): void {
    this.stop();
  }

  onChartInit(ec: any): void {
    this.chart = ec;
    this.render();
  }

  /** Sample `nClusters` Gaussian blobs in `dims`-dimensional space. */
  generateData(): void {
    this.stop();
    this.data = [];
    this.labels = [];
    for (let c = 0; c < this.nClusters; c++) {
      // Each cluster centered on a distinct random high-dim location.
      const center = Array.from({ length: this.dims }, () => (Math.random() - 0.5) * 20);
      for (let i = 0; i < this.perCluster; i++) {
        this.data.push(center.map((m) => m + this.randn() * 1.2));
        this.labels.push(c);
      }
    }
    this.iter = 0;
    this.tsne = null;
    this.render(); // show the initial (unembedded) collapsed cloud
  }

  run(): void {
    if (this.running) return;
    this.tsne = new TSNE({ perplexity: this.perplexity, nIter: this.nIter }).initialize(
      Matrix.fromRows(this.data)
    );
    this.iter = 0;
    this.running = true;
    // Runs in the Angular zone: zone.js patches requestAnimationFrame, so the
    // iteration counter updates each frame alongside the chart.
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
    // A few gradient steps per frame for a smooth-but-quick animation.
    for (let s = 0; s < 5 && this.iter < this.nIter; s++) {
      this.tsne.step();
      this.iter++;
    }
    this.render();
    if (this.iter < this.nIter) {
      this.frame = requestAnimationFrame(this.animate);
    } else {
      this.running = false;
    }
  };

  /** Draw the current embedding (or the collapsed cloud before running). */
  private render(): void {
    if (!this.chart) return;
    const coords = this.tsne
      ? this.tsne.embedding.toArray()
      : this.data.map(() => [0, 0]);

    const series = [];
    for (let c = 0; c < this.nClusters; c++) {
      series.push({
        type: 'scatter' as const,
        name: `Cluster ${c + 1}`,
        symbolSize: 8,
        itemStyle: { color: CLUSTER_COLORS[c % CLUSTER_COLORS.length], opacity: 0.8 },
        data: coords.filter((_, i) => this.labels[i] === c),
      });
    }

    this.chart.setOption(
      {
        title: {
          text: `t-SNE embedding — iteration ${this.iter}`,
          left: 'center',
          textStyle: { fontSize: 14 },
        },
        tooltip: { show: false },
        legend: { bottom: 0 },
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
