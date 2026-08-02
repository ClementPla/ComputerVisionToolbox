/**
 * Tokenization for Text and Images
 * Simplified implementation for educational purposes
 */

import { randomMatrix, randomVector } from './attention';

// ==================== Token Types ====================

export interface Token {
  id: number;
  text: string;
  type: 'word' | 'subword' | 'special' | 'patch' | 'register';
  position: number;
  color?: string;
}

export interface TokenizedResult {
  tokens: Token[];
  embeddings: number[][];
}

// ==================== Color Palette for Tokens ====================

const TOKEN_COLORS = [
  '#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#00BCD4',
  '#E91E63', '#CDDC39', '#FF5722', '#3F51B5', '#009688',
  '#FFC107', '#673AB7', '#8BC34A', '#03A9F4', '#F44336',
];

const SPECIAL_TOKEN_COLORS: Record<string, string> = {
  '[CLS]': '#1a237e',
  '[SEP]': '#b71c1c',
  '[PAD]': '#9e9e9e',
  '[REG]': '#ff6f00',
  '[MASK]': '#4a148c',
};

// ==================== Text Tokenizer ====================

export class TextTokenizer {
  vocabulary: Map<string, number> = new Map();
  embeddings: number[][] = [];
  d_model: number;
  
  // Special token IDs
  readonly CLS_ID = 0;
  readonly SEP_ID = 1;
  readonly PAD_ID = 2;
  readonly REG_ID = 3;
  readonly UNK_ID = 4;

  constructor(d_model: number = 64) {
    this.d_model = d_model;
    this.initializeVocabulary();
  }

  private initializeVocabulary(): void {
    // Add special tokens
    this.vocabulary.set('[CLS]', this.CLS_ID);
    this.vocabulary.set('[SEP]', this.SEP_ID);
    this.vocabulary.set('[PAD]', this.PAD_ID);
    this.vocabulary.set('[REG]', this.REG_ID);
    this.vocabulary.set('[UNK]', this.UNK_ID);

    // Add common words/subwords (simplified vocabulary)
    const commonWords = [
      'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
      'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
      'may', 'might', 'must', 'shall', 'can', 'need', 'dare', 'ought', 'used', 'to',
      'and', 'but', 'or', 'nor', 'for', 'yet', 'so', 'both', 'either', 'neither',
      'not', 'only', 'own', 'same', 'than', 'too', 'very', 'just', 'also', 'now',
      'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
      'my', 'your', 'his', 'its', 'our', 'their', 'this', 'that', 'these', 'those',
      'what', 'which', 'who', 'whom', 'whose', 'where', 'when', 'why', 'how',
      'all', 'each', 'every', 'any', 'some', 'no', 'none', 'one', 'two', 'three',
      'cat', 'dog', 'bird', 'fish', 'mouse', 'horse', 'cow', 'pig', 'sheep', 'goat',
      'man', 'woman', 'child', 'boy', 'girl', 'person', 'people', 'family', 'friend',
      'house', 'home', 'room', 'door', 'window', 'floor', 'wall', 'roof', 'garden',
      'tree', 'flower', 'grass', 'leaf', 'branch', 'root', 'seed', 'fruit', 'plant',
      'water', 'fire', 'earth', 'air', 'sun', 'moon', 'star', 'sky', 'cloud', 'rain',
      'big', 'small', 'large', 'little', 'tall', 'short', 'long', 'wide', 'narrow',
      'good', 'bad', 'great', 'best', 'worst', 'new', 'old', 'young', 'happy', 'sad',
      'sat', 'on', 'mat', 'sat', 'run', 'runs', 'running', 'walk', 'walks', 'walking',
      'eat', 'eats', 'eating', 'drink', 'drinks', 'sleep', 'sleeps', 'work', 'works',
      'attention', 'transformer', 'model', 'token', 'embed', 'layer', 'head', 'query',
      'key', 'value', 'soft', 'max', 'neural', 'network', 'deep', 'learn', 'machine',
    ];

    let id = 5;
    for (const word of commonWords) {
      if (!this.vocabulary.has(word)) {
        this.vocabulary.set(word, id++);
      }
    }

    // Generate random embeddings for each token
    this.embeddings = randomMatrix(this.vocabulary.size, this.d_model, 1);
  }

  /**
   * Tokenize text into tokens with embeddings
   */
  tokenize(text: string, addSpecialTokens: boolean = true, numRegisters: number = 0): TokenizedResult {
    const tokens: Token[] = [];
    let position = 0;

    // Add [CLS] token
    if (addSpecialTokens) {
      tokens.push({
        id: this.CLS_ID,
        text: '[CLS]',
        type: 'special',
        position: position++,
        color: SPECIAL_TOKEN_COLORS['[CLS]'],
      });
    }

    // Add register tokens
    for (let i = 0; i < numRegisters; i++) {
      tokens.push({
        id: this.REG_ID,
        text: `[REG${i + 1}]`,
        type: 'register',
        position: position++,
        color: SPECIAL_TOKEN_COLORS['[REG]'],
      });
    }

    // Tokenize the text (simple word-based)
    const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 0);
    
    for (const word of words) {
      const id = this.vocabulary.get(word) ?? this.UNK_ID;
      const colorIdx = id % TOKEN_COLORS.length;
      
      tokens.push({
        id,
        text: word,
        type: this.vocabulary.has(word) ? 'word' : 'subword',
        position: position++,
        color: TOKEN_COLORS[colorIdx],
      });
    }

    // Add [SEP] token
    if (addSpecialTokens) {
      tokens.push({
        id: this.SEP_ID,
        text: '[SEP]',
        type: 'special',
        position: position++,
        color: SPECIAL_TOKEN_COLORS['[SEP]'],
      });
    }

    // Build embeddings matrix
    const embeddings = tokens.map(token => [...this.embeddings[token.id] || randomVector(this.d_model)]);

    return { tokens, embeddings };
  }

  /**
   * Get embedding for a token ID
   */
  getEmbedding(tokenId: number): number[] {
    return this.embeddings[tokenId] || randomVector(this.d_model);
  }

  /**
   * Reset embeddings to new random values
   */
  reset(): void {
    this.embeddings = randomMatrix(this.vocabulary.size, this.d_model, 1);
  }
}

// ==================== Image Tokenizer (Patch Embedding) ====================

export interface ImagePatch {
  x: number;
  y: number;
  width: number;
  height: number;
  pixels: number[]; // Flattened RGB values
  embedding: number[];
}

export interface ImageTokenizedResult {
  patches: ImagePatch[];
  tokens: Token[];
  embeddings: number[][];
  gridSize: [number, number]; // [rows, cols]
}

export class ImageTokenizer {
  patchSize: number;
  d_model: number;
  patchProjection: number[][]; // Linear projection for patch embedding
  clsEmbedding: number[];
  regEmbedding: number[];

  constructor(patchSize: number = 16, d_model: number = 64) {
    this.patchSize = patchSize;
    this.d_model = d_model;
    
    // Projection matrix: (patchSize * patchSize * 3) -> d_model
    const patchDim = patchSize * patchSize * 3;
    this.patchProjection = randomMatrix(patchDim, d_model);
    
    // Learnable embeddings for special tokens
    this.clsEmbedding = randomVector(d_model);
    this.regEmbedding = randomVector(d_model);
  }

  /**
   * Extract patches from image data
   */
  tokenize(
    imageData: ImageData | number[][][], 
    addCLS: boolean = true,
    numRegisters: number = 0
  ): ImageTokenizedResult {
    const tokens: Token[] = [];
    const embeddings: number[][] = [];
    const patches: ImagePatch[] = [];
    let position = 0;

    // Convert ImageData to 3D array if needed
    let pixels: number[][][];
    let width: number, height: number;
    
    if (imageData instanceof ImageData) {
      width = imageData.width;
      height = imageData.height;
      pixels = this.imageDataTo3D(imageData);
    } else {
      height = imageData.length;
      width = imageData[0].length;
      pixels = imageData;
    }

    // Add [CLS] token
    if (addCLS) {
      tokens.push({
        id: 0,
        text: '[CLS]',
        type: 'special',
        position: position++,
        color: SPECIAL_TOKEN_COLORS['[CLS]'],
      });
      embeddings.push([...this.clsEmbedding]);
    }

    // Add register tokens
    for (let i = 0; i < numRegisters; i++) {
      tokens.push({
        id: -1,
        text: `[REG${i + 1}]`,
        type: 'register',
        position: position++,
        color: SPECIAL_TOKEN_COLORS['[REG]'],
      });
      embeddings.push([...this.regEmbedding]);
    }

    // Extract patches
    const numPatchesY = Math.floor(height / this.patchSize);
    const numPatchesX = Math.floor(width / this.patchSize);

    for (let py = 0; py < numPatchesY; py++) {
      for (let px = 0; px < numPatchesX; px++) {
        const patchPixels: number[] = [];
        
        // Extract patch pixels
        for (let y = 0; y < this.patchSize; y++) {
          for (let x = 0; x < this.patchSize; x++) {
            const imgY = py * this.patchSize + y;
            const imgX = px * this.patchSize + x;
            
            if (imgY < height && imgX < width) {
              patchPixels.push(...pixels[imgY][imgX]);
            } else {
              patchPixels.push(0, 0, 0);
            }
          }
        }

        // Project patch to embedding
        const embedding = this.projectPatch(patchPixels);

        const patch: ImagePatch = {
          x: px * this.patchSize,
          y: py * this.patchSize,
          width: this.patchSize,
          height: this.patchSize,
          pixels: patchPixels,
          embedding,
        };
        patches.push(patch);

        const patchIdx = py * numPatchesX + px;
        const colorIdx = patchIdx % TOKEN_COLORS.length;
        
        tokens.push({
          id: patchIdx + 10, // Offset to avoid special tokens
          text: `P${patchIdx}`,
          type: 'patch',
          position: position++,
          color: TOKEN_COLORS[colorIdx],
        });
        embeddings.push(embedding);
      }
    }

    return {
      patches,
      tokens,
      embeddings,
      gridSize: [numPatchesY, numPatchesX],
    };
  }

  /**
   * Project patch pixels to embedding space
   */
  private projectPatch(pixels: number[]): number[] {
    // Normalize pixels to [0, 1]
    const normalized = pixels.map(p => p / 255);
    
    // Pad or truncate to match projection matrix
    const patchDim = this.patchSize * this.patchSize * 3;
    while (normalized.length < patchDim) normalized.push(0);
    normalized.length = patchDim;

    // Linear projection
    const embedding: number[] = [];
    for (let j = 0; j < this.d_model; j++) {
      let sum = 0;
      for (let i = 0; i < patchDim; i++) {
        sum += normalized[i] * this.patchProjection[i][j];
      }
      embedding.push(sum);
    }

    return embedding;
  }

  /**
   * Convert ImageData to 3D array [height][width][RGB]
   */
  private imageDataTo3D(imageData: ImageData): number[][][] {
    const { width, height, data } = imageData;
    const pixels: number[][][] = [];

    for (let y = 0; y < height; y++) {
      pixels[y] = [];
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        pixels[y][x] = [data[idx], data[idx + 1], data[idx + 2]];
      }
    }

    return pixels;
  }

  /**
   * Reset projections
   */
  reset(): void {
    const patchDim = this.patchSize * this.patchSize * 3;
    this.patchProjection = randomMatrix(patchDim, this.d_model);
    this.clsEmbedding = randomVector(this.d_model);
    this.regEmbedding = randomVector(this.d_model);
  }
}

// ==================== Sample Images ====================

/**
 * Generate a simple gradient image for testing
 */
export function generateGradientImage(width: number, height: number): number[][][] {
  const pixels: number[][][] = [];
  
  for (let y = 0; y < height; y++) {
    pixels[y] = [];
    for (let x = 0; x < width; x++) {
      const r = Math.floor((x / width) * 255);
      const g = Math.floor((y / height) * 255);
      const b = 128;
      pixels[y][x] = [r, g, b];
    }
  }
  
  return pixels;
}

/**
 * Generate a checkerboard pattern
 */
export function generateCheckerboard(width: number, height: number, squareSize: number = 16): number[][][] {
  const pixels: number[][][] = [];
  
  for (let y = 0; y < height; y++) {
    pixels[y] = [];
    for (let x = 0; x < width; x++) {
      const isWhite = (Math.floor(x / squareSize) + Math.floor(y / squareSize)) % 2 === 0;
      const color = isWhite ? 240 : 50;
      pixels[y][x] = [color, color, color];
    }
  }
  
  return pixels;
}

/**
 * Generate colored circles pattern
 */
export function generateCirclesPattern(width: number, height: number): number[][][] {
  const pixels: number[][][] = [];
  const cx = width / 2;
  const cy = height / 2;
  const maxR = Math.min(width, height) / 2;
  
  for (let y = 0; y < height; y++) {
    pixels[y] = [];
    for (let x = 0; x < width; x++) {
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const t = dist / maxR;
      
      const r = Math.floor(Math.sin(t * Math.PI * 3) * 127 + 128);
      const g = Math.floor(Math.sin(t * Math.PI * 3 + 2) * 127 + 128);
      const b = Math.floor(Math.sin(t * Math.PI * 3 + 4) * 127 + 128);
      
      pixels[y][x] = [r, g, b];
    }
  }
  
  return pixels;
}