import { Point2D } from 'src/app/utils/geometry';

export function randn_bm(mean=0, std=1){
  /* Sampling using Box-Muller algorithm */
  let u = 1 - Math.random()
  let v = Math.random()
  let n =  Math.sqrt(-2.0*Math.log(u))*Math.cos(2.0*Math.PI*v)
  return (n*std)+mean
}

export function sample_randn(nPoints:number, mean=0, std=1):Array<number>{
  let output = new Array<number>(nPoints)
  for(let i=0;i<nPoints;i++){
    output[i] = randn_bm(mean, std)
  }
  return output
}

export function sample_randn_2D(nPoints:number, mean:Point2D={x:0, y:0}, std:Point2D={x:1, y:1}):Array<Point2D>{

  let output = new Array<Point2D>(nPoints)
  for(let i=0;i<nPoints;i++){
    output[i] = {x:randn_bm(mean.x, std.x), y:randn_bm(mean.y, std.y)}
  }
  return output
}


export function linspace(start:number, stop:number, n:number):Array<number>{
  let samples = new Array<number>(n)
  let step = (stop-start)/(n-1)
  for(let i=0; i<n; i++){
    samples[i] = start + step*i
  }
  return samples
}
