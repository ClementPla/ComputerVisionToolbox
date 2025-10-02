export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

export function getStandardDeviation(
  array: Array<number>,
  mean: number | null
): number {
  const n = array.length;
  if (mean == null) {
    let mean = array.reduce((a, b) => a + b) / n;
  }
  return Math.sqrt(
    array.map((x) => Math.pow(x - mean!, 2)).reduce((a, b) => a + b) / n
  );
}

export function getMean(array: Array<number>): number {
  return array.reduce((a, b) => a + b) / array.length;
}

export function gaussianRandom(mean = 0, stdev = 1) {
  const u = 1 - Math.random(); // Converting [0,1) to (0,1]
  const v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  // Transform to the desired mean and standard deviation:
  return z * stdev + mean;
}

export function arange(
  start: number,
  stop: number,
  step: number
): Array<number> {
  let arr = [];
  for (let i = start; i < stop; i += step) {
    arr.push(i);
  }
  return arr;
}

export function linspace(
  start: number,
  stop: number,
  num: number
): Array<number> {
  let step = (stop - start) / (num - 1);
  return arange(start, stop + step, step);
}

export function choice(
  arr: Array<any>,
  n: number,
  replace: boolean = false
): any {
  let res = [];
  let indices = arange(0, arr.length, 1);
  if (replace) {
    for (let i = 0; i < n; i++) {
      res.push(arr[indices[Math.floor(Math.random() * indices.length)]]);
    }
  } else {
    for (let i = 0; i < n; i++) {
      let idx = Math.floor(Math.random() * indices.length);
      res.push(arr[idx]);
      indices.splice(idx, 1);
    }
  }
  return res;
}

export function gaussian2D(
  min: number,
  max: number,
  n: number,
  mean: number[],
  stdev: number[]
): Array<Array<number>> {
  let x = linspace(min, max, n);
  let y = linspace(min, max, n);
  let data: Array<Array<number>> = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      data.push([
        x[i],
        y[j],
        (1 / (2 * Math.PI * stdev[0] * stdev[1])) *
          Math.exp(
            -(
              Math.pow(x[i] - mean[0], 2) / (2 * Math.pow(stdev[0], 2)) +
              Math.pow(y[j] - mean[1], 2) / (2 * Math.pow(stdev[1], 2))
            )
          ),
      ]);
    }
  }
  return data;
}
