export interface Kernel {
  width: number;
  height: number;
  active: boolean;
  mat: Array<Array<number>>;
  name: string;
  delete?:boolean;
}

export class KernelGenerator {
  static getGaussianKernel(
    width: number,
    height: number,
    stdX: number = 1,
    stdY: number = 1
  ): Kernel {

    width = (width % 2)==0? width+1:width
    height = (height % 2)==0? height+1:height

    const halfW = (width-1) / 2;
    const halfH = (height-1) / 2;
    const sqrt2 = Math.sqrt(2);
    let values = new Array<number>();

    for (let col = 0; col < width; col++) {
      for (let row = 0; row < height; row++) {
        const val = Math.exp(
          -Math.pow((col - halfW) / (sqrt2 * stdX), 2) -
            Math.pow((row - halfH) / (sqrt2 * stdY), 2)
        );
        values.push(val);
      }
    }
    const sum = values.reduce((partialSum, a) => partialSum + a, 0);
    values = values.map((v) => {
      return v / sum;
    });
    return {
      width: width,
      height: height,
      active: true,
      mat: [values],
      name: 'Gaussian',
    };
  }

  static getMeanKernel(width: number, height: number): Kernel {
    let values = new Array<number>(width * height).fill(1 / (width * height));
    return {
      width: width,
      height: height,
      active: true,
      mat: [values],
      name: 'Mean',
    };
  }
  static getSobelKernels(): Kernel {
    const valsX: Array<number> = [1, 0, -1, 2, 0, -2, 1, 0, -1];
    const valsY: Array<number> = [1, 2, 1, 0, 0, 0, -1, -2, -1];
    return {
      width: 3,
      height: 3,
      active: true,
      mat: [valsX, valsY],
      name: 'Sobel',
    };
  }
  static getPrewittKernels(): Kernel {
    const valsX: Array<number> = [1, 0, -1, 1, 0, -1, 1, 0, -1];
    const valsY: Array<number> = [1, 1, 1, 0, 0, 0, -1, -1, -1];
    return {
      width: 3,
      height: 3,
      active: true,
      mat: [valsX, valsY],
      name: 'Prewitt',
    };
  }
  static getLaplacianKernel(): Kernel {
    const vals: Array<number> = [-1, -1, -1, -1, 8, -1, -1, -1, -1];
    return {
      width: 3,
      height: 3,
      active: true,
      mat: [vals],
      name: 'Laplacian',
    };
  }

  static getAdditiveKernel(value:number):Kernel{
    const vals: Array<number> = [value];
    return {
      width: 1,
      height: 1,
      active: true,
      mat: [vals],
      name: 'Add',
    };
  }

  static getMultiplicativeKernel(value:number):Kernel{
    const vals: Array<number> = [value];
    return {
      width: 1,
      height: 1,
      active: true,
      mat: [vals],
      name: 'Multiply',
    };
  }
}
