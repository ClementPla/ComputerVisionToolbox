/**
 * Pure chart/geometry helpers for the gradient-descent tutorial: the decision
 * heatmap's input grid + colormap, and the ECharts option builders. Extracted
 * from the component so the (state-heavy) training orchestration there isn't
 * mixed with static chart configuration.
 */
import { EChartsOption } from 'echarts';
import { spectral } from 'src/app/utils/colormap';

/** Flat [x, y, x, y, …] grid over [-1, 1]² (resolution² points) for the heatmap. */
export function makeInputGrid(resolution: number): number[] {
  const data: number[] = [];
  for (let i = 0; i < resolution; i++) {
    for (let j = 0; j < resolution; j++) {
      data.push((i / resolution) * 2 - 1, (j / resolution) * 2 - 1);
    }
  }
  return data;
}

/** Map a value in [0, 1] to a CSS color from the spectral colormap. */
export function spectralColor(x: number): string {
  if (isNaN(x)) x = 0;
  const l = spectral.length;
  const idx = Math.max(0, Math.min(l - 1, Math.floor(x * l)));
  const c = spectral[idx];
  return `rgb(${c[0] * 255}, ${c[1] * 255}, ${c[2] * 255})`;
}

/** Empty per-layer parameter-norm line chart (Weights + Bias series). */
export function emptyNormChart(maxEpoch = 10): EChartsOption {
  return {
    legend: {
      show: true,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    tooltip: {},
    xAxis: {
      type: 'value',
      name: 'Epochs',
      min: 0,
      max: maxEpoch,
    },
    yAxis: {
      type: 'value',
      name: 'Norm',
    },
    series: [
      { data: [], type: 'line', name: 'Weights' },
      { data: [], type: 'line', name: 'Bias' },
    ],
  };
}

/** Loss-curve chart for the given loss history. */
export function lossChartOption(losses: number[]): EChartsOption {
  return {
    xAxis: {
      type: 'value',
      name: 'Epochs',
      min: 0,
      max: losses.length + 10,
    },
    yAxis: {
      type: 'value',
      name: 'Loss',
    },
    series: [
      {
        data: losses.map((loss, i) => [i, loss]),
        type: 'line',
      },
    ],
  };
}
