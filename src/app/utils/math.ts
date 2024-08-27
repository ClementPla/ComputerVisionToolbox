export function clamp(num:number, min:number, max:number):number{
  return Math.min(Math.max(num, min), max);
}


export function getStandardDeviation (array: Array<number>, mean: number|null): number {
  const n = array.length
  if(mean == null){
    let mean = array.reduce((a, b) => a + b) / n
  }
  return Math.sqrt(array.map(x => Math.pow(x - mean!, 2)).reduce((a, b) => a + b) / n)
}

export function getMean(array: Array<number>): number {
  return array.reduce((a, b) => a + b) / array.length
}

export function gaussianRandom(mean=0, stdev=1) {
  const u = 1 - Math.random(); // Converting [0,1) to (0,1]
  const v = Math.random();
  const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  // Transform to the desired mean and standard deviation:
  return z * stdev + mean;
}