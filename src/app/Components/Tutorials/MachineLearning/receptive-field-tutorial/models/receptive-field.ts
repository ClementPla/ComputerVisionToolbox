/**
 * Receptive Field Calculator for CNN layers
 * 
 * The receptive field (RF) is the region in the input that affects a single output neuron.
 * 
 * Key formulas:
 *   RF_n = RF_{n-1} + (k_eff - 1) * jump_{n-1}
 *   jump_n = jump_{n-1} * stride_n
 *   
 * Where k_eff = dilation * (kernel - 1) + 1 for dilated convolutions
 */

export type LayerType = 'conv' | 'pool';

export interface LayerConfig {
  id: string;
  type: LayerType;
  kernelSize: number;
  stride: number;
  padding: number;
  dilation: number;
}

export interface LayerRFInfo {
  rf: number;           // RF at this layer's output
  jump: number;         // Cumulative stride up to and including this layer
  outputSize: number;   // Spatial size after this layer
}

export interface ReceptiveFieldInfo {
  layers: LayerRFInfo[];
  theoreticalRF: number;
  effectiveRF: number;
  totalStride: number;
  finalOutputSize: number;
  isValid: boolean;
}

/**
 * Calculate receptive field for a stack of layers
 * 
 * Reference: "A guide to receptive field arithmetic for CNNs"
 * https://distill.pub/2019/computing-receptive-fields/
 */
export function calculateReceptiveField(
  layers: LayerConfig[],
  inputSize: number
): ReceptiveFieldInfo {
  
  const layerInfos: LayerRFInfo[] = [];
  
  // Initial state: a single input pixel has RF=1, jump=1
  let rf = 1;
  let jump = 1;
  let size = inputSize;
  
  for (const layer of layers) {
    const k = layer.kernelSize;
    const s = layer.stride;
    const p = layer.padding;
    const d = layer.type === 'conv' ? layer.dilation : 1;
    
    // Effective kernel size with dilation
    // For kernel size k with dilation d, the effective size is: d*(k-1) + 1
    const kEff = d * (k - 1) + 1;
    
    // Output spatial size
    const newSize = Math.floor((size + 2 * p - kEff) / s) + 1;
    
    if (newSize <= 0) {
      return {
        layers: layerInfos,
        theoreticalRF: rf,
        effectiveRF: Math.round(rf * 0.7),
        totalStride: jump,
        finalOutputSize: 0,
        isValid: false
      };
    }
    
    // Update RF: each kernel position spans (kEff-1) additional input pixels
    // scaled by the current jump (cumulative stride of previous layers)
    rf = rf + (kEff - 1) * jump;
    
    // Update jump: multiply by current stride
    jump = jump * s;
    
    // Update size
    size = newSize;
    
    layerInfos.push({
      rf,
      jump,
      outputSize: size
    });
  }
  
  // Effective RF approximation (empirically ~70% of theoretical for deep networks)
  // This is because edge pixels contribute less than center pixels (Gaussian falloff)
  const effectiveRF = Math.round(rf * 0.7);
  
  return {
    layers: layerInfos,
    theoreticalRF: rf,
    effectiveRF,
    totalStride: jump,
    finalOutputSize: size,
    isValid: true
  };
}

/**
 * Generate a Gaussian kernel for ERF visualization
 */
export function generateGaussianKernel(size: number, sigma?: number): number[][] {
  const kernel: number[][] = [];
  const s = sigma ?? size / 4;
  const center = (size - 1) / 2;
  let sum = 0;
  
  for (let y = 0; y < size; y++) {
    kernel[y] = [];
    for (let x = 0; x < size; x++) {
      const dx = x - center;
      const dy = y - center;
      const value = Math.exp(-(dx * dx + dy * dy) / (2 * s * s));
      kernel[y][x] = value;
      sum += value;
    }
  }
  
  // Normalize
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      kernel[y][x] /= sum;
    }
  }
  
  return kernel;
}

/**
 * Create a default layer configuration
 */
export function createLayer(type: LayerType, index: number): LayerConfig {
  return {
    id: `layer-${Date.now()}-${index}`,
    type,
    kernelSize: type === 'conv' ? 3 : 2,
    stride: type === 'conv' ? 1 : 2,
    padding: type === 'conv' ? 1 : 0,
    dilation: 1
  };
}

/**
 * Calculate RF growth contribution of a single layer
 * Useful for debugging and understanding
 */
export function getLayerRFContribution(
  layer: LayerConfig, 
  previousJump: number
): { rfGrowth: number; newJump: number } {
  const d = layer.type === 'conv' ? layer.dilation : 1;
  const kEff = d * (layer.kernelSize - 1) + 1;
  
  return {
    rfGrowth: (kEff - 1) * previousJump,
    newJump: previousJump * layer.stride
  };
}