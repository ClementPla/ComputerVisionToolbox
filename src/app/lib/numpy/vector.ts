/**
 * vec — free-function helpers for 1D vectors represented as plain `number[]`.
 *
 * Vectors stay as plain arrays throughout the public API so results interop
 * with components and charts without conversion. This module collects the
 * common operations in one place instead of re-deriving them per component.
 */
export const vec = {
  zeros(n: number): number[] {
    return new Array<number>(n).fill(0);
  },

  full(n: number, value: number): number[] {
    return new Array<number>(n).fill(value);
  },

  add(a: number[], b: number[]): number[] {
    return a.map((v, i) => v + b[i]);
  },

  sub(a: number[], b: number[]): number[] {
    return a.map((v, i) => v - b[i]);
  },

  scale(a: number[], k: number): number[] {
    return a.map((v) => v * k);
  },

  /** Element-wise (Hadamard) product. */
  mul(a: number[], b: number[]): number[] {
    return a.map((v, i) => v * b[i]);
  },

  dot(a: number[], b: number[]): number {
    let s = 0;
    for (let i = 0; i < a.length; i++) s += a[i] * b[i];
    return s;
  },

  /** Outer product a ⊗ b, returned as nested rows. */
  outer(a: number[], b: number[]): number[][] {
    return a.map((av) => b.map((bv) => av * bv));
  },

  norm(a: number[], p: number = 2): number {
    if (p === 1) return a.reduce((s, v) => s + Math.abs(v), 0);
    if (p === 2) return Math.sqrt(vec.dot(a, a));
    if (p === Infinity) return Math.max(...a.map(Math.abs));
    return Math.pow(
      a.reduce((s, v) => s + Math.pow(Math.abs(v), p), 0),
      1 / p
    );
  },

  /** Euclidean distance. */
  distance(a: number[], b: number[]): number {
    let s = 0;
    for (let i = 0; i < a.length; i++) {
      const d = a[i] - b[i];
      s += d * d;
    }
    return Math.sqrt(s);
  },

  sum(a: number[]): number {
    return a.reduce((s, v) => s + v, 0);
  },

  mean(a: number[]): number {
    return a.length ? vec.sum(a) / a.length : 0;
  },

  /** Return a copy scaled to unit L2 norm (returns a copy of the input if it is zero). */
  normalize(a: number[]): number[] {
    const n = vec.norm(a, 2);
    return n > 0 ? vec.scale(a, 1 / n) : a.slice();
  },

  argmax(a: number[]): number {
    let best = 0;
    for (let i = 1; i < a.length; i++) if (a[i] > a[best]) best = i;
    return best;
  },

  argmin(a: number[]): number {
    let best = 0;
    for (let i = 1; i < a.length; i++) if (a[i] < a[best]) best = i;
    return best;
  },

  linspace(start: number, stop: number, num: number): number[] {
    if (num <= 1) return [start];
    const step = (stop - start) / (num - 1);
    return Array.from({ length: num }, (_, i) => start + i * step);
  },
};
