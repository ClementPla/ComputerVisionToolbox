/**
 * Test functions for optimization with analytical gradients
 */

export type FunctionType = 'himmelblau' | 'rosenbrock' | 'beale' | 'booth' | 'matyas';

export interface TestFunction {
  name: string;
  // Domain bounds
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  // Evaluation
  f(x: number, y: number): number;
  grad(x: number, y: number): { gx: number; gy: number };
  // Known minima for reference
  minima: { x: number; y: number; f: number }[];
}

/**
 * Himmelblau's function
 * f(x,y) = (x² + y - 11)² + (x + y² - 7)²
 * Has 4 local minima, all with f = 0
 */
export const Himmelblau: TestFunction = {
  name: "Himmelblau",
  xMin: -5, xMax: 5,
  yMin: -5, yMax: 5,
  
  f(x: number, y: number): number {
    const a = x * x + y - 11;
    const b = x + y * y - 7;
    return a * a + b * b;
  },
  
  grad(x: number, y: number): { gx: number; gy: number } {
    const a = x * x + y - 11;
    const b = x + y * y - 7;
    return {
      gx: 4 * x * a + 2 * b,
      gy: 2 * a + 4 * y * b
    };
  },
  
  minima: [
    { x: 3.0, y: 2.0, f: 0 },
    { x: -2.805118, y: 3.131312, f: 0 },
    { x: -3.779310, y: -3.283186, f: 0 },
    { x: 3.584428, y: -1.848126, f: 0 }
  ]
};

/**
 * Rosenbrock function (Banana function)
 * f(x,y) = (a - x)² + b(y - x²)²
 * Classic benchmark, valley-shaped
 */
export const Rosenbrock: TestFunction = {
  name: "Rosenbrock",
  xMin: -2, xMax: 2,
  yMin: -1, yMax: 3,
  
  f(x: number, y: number): number {
    const a = 1, b = 100;
    return Math.pow(a - x, 2) + b * Math.pow(y - x * x, 2);
  },
  
  grad(x: number, y: number): { gx: number; gy: number } {
    const a = 1, b = 100;
    return {
      gx: -2 * (a - x) - 4 * b * x * (y - x * x),
      gy: 2 * b * (y - x * x)
    };
  },
  
  minima: [
    { x: 1, y: 1, f: 0 }
  ]
};

/**
 * Beale's function
 * Has a flat valley
 */
export const Beale: TestFunction = {
  name: "Beale",
  xMin: -4.5, xMax: 4.5,
  yMin: -4.5, yMax: 4.5,
  
  f(x: number, y: number): number {
    const a = 1.5 - x + x * y;
    const b = 2.25 - x + x * y * y;
    const c = 2.625 - x + x * y * y * y;
    return a * a + b * b + c * c;
  },
  
  grad(x: number, y: number): { gx: number; gy: number } {
    const y2 = y * y;
    const y3 = y2 * y;
    const a = 1.5 - x + x * y;
    const b = 2.25 - x + x * y2;
    const c = 2.625 - x + x * y3;
    
    return {
      gx: 2 * a * (y - 1) + 2 * b * (y2 - 1) + 2 * c * (y3 - 1),
      gy: 2 * a * x + 2 * b * 2 * x * y + 2 * c * 3 * x * y2
    };
  },
  
  minima: [
    { x: 3, y: 0.5, f: 0 }
  ]
};

/**
 * Booth's function
 * Simple quadratic-ish
 */
export const Booth: TestFunction = {
  name: "Booth",
  xMin: -10, xMax: 10,
  yMin: -10, yMax: 10,
  
  f(x: number, y: number): number {
    const a = x + 2 * y - 7;
    const b = 2 * x + y - 5;
    return a * a + b * b;
  },
  
  grad(x: number, y: number): { gx: number; gy: number } {
    const a = x + 2 * y - 7;
    const b = 2 * x + y - 5;
    return {
      gx: 2 * a + 4 * b,
      gy: 4 * a + 2 * b
    };
  },
  
  minima: [
    { x: 1, y: 3, f: 0 }
  ]
};

/**
 * Matyas function
 * Shallow bowl
 */
export const Matyas: TestFunction = {
  name: "Matyas",
  xMin: -10, xMax: 10,
  yMin: -10, yMax: 10,
  
  f(x: number, y: number): number {
    return 0.26 * (x * x + y * y) - 0.48 * x * y;
  },
  
  grad(x: number, y: number): { gx: number; gy: number } {
    return {
      gx: 0.52 * x - 0.48 * y,
      gy: 0.52 * y - 0.48 * x
    };
  },
  
  minima: [
    { x: 0, y: 0, f: 0 }
  ]
};

export const TEST_FUNCTIONS: Record<FunctionType, TestFunction> = {
  himmelblau: Himmelblau,
  rosenbrock: Rosenbrock,
  beale: Beale,
  booth: Booth,
  matyas: Matyas
};

export function getTestFunction(type: FunctionType): TestFunction {
  return TEST_FUNCTIONS[type];
}