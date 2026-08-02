/**
 * Transformer Attention Mechanisms
 * Pure TypeScript implementation for educational visualization
 */

// ==================== Utility Functions ====================

/**
 * Create a random matrix with Xavier initialization
 */
export function randomMatrix(rows: number, cols: number, scale: number = 1): number[][] {
  const xavier = Math.sqrt(2 / (rows + cols)) * scale;
  const matrix: number[][] = [];
  for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = (Math.random() * 2 - 1) * xavier;
    }
  }
  return matrix;
}

/**
 * Create a random vector
 */
export function randomVector(size: number, scale: number = 1): number[] {
  const result: number[] = [];
  for (let i = 0; i < size; i++) {
    result[i] = (Math.random() * 2 - 1) * scale;
  }
  return result;
}

/**
 * Matrix multiplication: A @ B
 */
export function matmul(A: number[][], B: number[][]): number[][] {
  const M = A.length;
  const K = A[0].length;
  const N = B[0].length;
  
  const result: number[][] = [];
  for (let i = 0; i < M; i++) {
    result[i] = [];
    for (let j = 0; j < N; j++) {
      let sum = 0;
      for (let k = 0; k < K; k++) {
        sum += A[i][k] * B[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

/**
 * Softmax along the last dimension (rows)
 */
export function softmax(matrix: number[][]): number[][] {
  return matrix.map(row => {
    const maxVal = Math.max(...row);
    const exps = row.map(x => Math.exp(x - maxVal));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map(x => x / sum);
  });
}

/**
 * Transpose a matrix
 */
export function transpose(matrix: number[][]): number[][] {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result: number[][] = [];
  for (let j = 0; j < cols; j++) {
    result[j] = [];
    for (let i = 0; i < rows; i++) {
      result[j][i] = matrix[i][j];
    }
  }
  return result;
}

// ==================== Attention Head ====================

export interface AttentionResult {
  Q: number[][];           // Query projections
  K: number[][];           // Key projections
  V: number[][];           // Value projections
  scores: number[][];      // Raw attention scores (before softmax)
  attention: number[][];   // Attention weights (after softmax)
  output: number[][];      // Final output
}

export class AttentionHead {
  W_q: number[][];
  W_k: number[][];
  W_v: number[][];
  d_k: number;

  constructor(
    public d_model: number,
    public d_head: number
  ) {
    this.d_k = d_head;
    this.W_q = randomMatrix(d_model, d_head);
    this.W_k = randomMatrix(d_model, d_head);
    this.W_v = randomMatrix(d_model, d_head);
  }

  /**
   * Compute attention with all intermediate values for visualization
   */
  forward(X: number[][]): AttentionResult {
    // Project to Q, K, V
    const Q = matmul(X, this.W_q);
    const K = matmul(X, this.W_k);
    const V = matmul(X, this.W_v);

    // Compute attention scores: Q @ K^T / sqrt(d_k)
    const K_T = transpose(K);
    const scores = matmul(Q, K_T);
    const scale = Math.sqrt(this.d_k);
    
    for (let i = 0; i < scores.length; i++) {
      for (let j = 0; j < scores[i].length; j++) {
        scores[i][j] /= scale;
      }
    }

    // Softmax to get attention weights
    const attention = softmax(scores);

    // Apply attention to values
    const output = matmul(attention, V);

    return { Q, K, V, scores, attention, output };
  }

  /**
   * Reset weights to new random values
   */
  reset(): void {
    this.W_q = randomMatrix(this.d_model, this.d_head);
    this.W_k = randomMatrix(this.d_model, this.d_head);
    this.W_v = randomMatrix(this.d_model, this.d_head);
  }
}

// ==================== Multi-Head Attention ====================

export interface MultiHeadAttentionResult {
  heads: AttentionResult[];    // Results from each head
  concatenated: number[][];    // Concatenated head outputs
  output: number[][];          // Final projected output
  averageAttention: number[][]; // Average attention across heads
}

export class MultiHeadAttention {
  heads: AttentionHead[];
  W_o: number[][];  // Output projection

  constructor(
    public d_model: number,
    public numHeads: number
  ) {
    const d_head = Math.floor(d_model / numHeads);
    
    this.heads = [];
    for (let i = 0; i < numHeads; i++) {
      this.heads.push(new AttentionHead(d_model, d_head));
    }
    
    // Output projection: (numHeads * d_head) -> d_model
    this.W_o = randomMatrix(numHeads * d_head, d_model);
  }

  /**
   * Compute multi-head attention with all intermediate values
   */
  forward(X: number[][]): MultiHeadAttentionResult {
    // Compute attention for each head
    const headResults = this.heads.map(head => head.forward(X));

    // Concatenate head outputs
    const seqLen = X.length;
    const d_head = this.heads[0].d_head;
    const concatenated: number[][] = [];
    
    for (let i = 0; i < seqLen; i++) {
      concatenated[i] = [];
      for (let h = 0; h < this.numHeads; h++) {
        for (let j = 0; j < d_head; j++) {
          concatenated[i].push(headResults[h].output[i][j]);
        }
      }
    }

    // Project back to d_model
    const output = matmul(concatenated, this.W_o);

    // Compute average attention across heads (for visualization)
    const averageAttention: number[][] = [];
    for (let i = 0; i < seqLen; i++) {
      averageAttention[i] = [];
      for (let j = 0; j < seqLen; j++) {
        let sum = 0;
        for (let h = 0; h < this.numHeads; h++) {
          sum += headResults[h].attention[i][j];
        }
        averageAttention[i][j] = sum / this.numHeads;
      }
    }

    return {
      heads: headResults,
      concatenated,
      output,
      averageAttention
    };
  }

  /**
   * Reset all weights
   */
  reset(): void {
    this.heads.forEach(head => head.reset());
    const d_head = this.heads[0].d_head;
    this.W_o = randomMatrix(this.numHeads * d_head, this.d_model);
  }
}

// ==================== Transformer Block ====================

export interface TransformerBlockResult {
  attention: MultiHeadAttentionResult;
  afterAttention: number[][];  // After attention + residual + norm
  ffnOutput: number[][];       // FFN output
  output: number[][];          // Final output after residual + norm
}

export class TransformerBlock {
  attention: MultiHeadAttention;
  W_ff1: number[][];
  W_ff2: number[][];
  b_ff1: number[];
  b_ff2: number[];
  d_ff: number;

  constructor(
    public d_model: number,
    public numHeads: number,
    d_ff?: number
  ) {
    this.d_ff = d_ff || d_model * 4;
    this.attention = new MultiHeadAttention(d_model, numHeads);
    
    // Feed-forward network weights
    this.W_ff1 = randomMatrix(d_model, this.d_ff);
    this.W_ff2 = randomMatrix(this.d_ff, d_model);
    this.b_ff1 = randomVector(this.d_ff, 0.1);
    this.b_ff2 = randomVector(d_model, 0.1);
  }

  /**
   * Layer normalization
   */
  private layerNorm(X: number[][]): number[][] {
    return X.map(row => {
      const mean = row.reduce((a, b) => a + b, 0) / row.length;
      const variance = row.reduce((a, b) => a + (b - mean) ** 2, 0) / row.length;
      const std = Math.sqrt(variance + 1e-6);
      return row.map(x => (x - mean) / std);
    });
  }

  /**
   * GELU activation
   */
  private gelu(x: number): number {
    return 0.5 * x * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * x ** 3)));
  }

  /**
   * Feed-forward network
   */
  private ffn(X: number[][]): number[][] {
    // First linear layer + GELU
    const hidden: number[][] = [];
    for (let i = 0; i < X.length; i++) {
      hidden[i] = [];
      for (let j = 0; j < this.d_ff; j++) {
        let sum = this.b_ff1[j];
        for (let k = 0; k < this.d_model; k++) {
          sum += X[i][k] * this.W_ff1[k][j];
        }
        hidden[i][j] = this.gelu(sum);
      }
    }

    // Second linear layer
    const output: number[][] = [];
    for (let i = 0; i < X.length; i++) {
      output[i] = [];
      for (let j = 0; j < this.d_model; j++) {
        let sum = this.b_ff2[j];
        for (let k = 0; k < this.d_ff; k++) {
          sum += hidden[i][k] * this.W_ff2[k][j];
        }
        output[i][j] = sum;
      }
    }

    return output;
  }

  /**
   * Add two matrices element-wise (residual connection)
   */
  private add(A: number[][], B: number[][]): number[][] {
    return A.map((row, i) => row.map((val, j) => val + B[i][j]));
  }

  forward(X: number[][]): TransformerBlockResult {
    // Multi-head attention
    const attentionResult = this.attention.forward(X);
    
    // Residual + LayerNorm
    const afterAttention = this.layerNorm(this.add(X, attentionResult.output));

    // Feed-forward network
    const ffnOutput = this.ffn(afterAttention);

    // Residual + LayerNorm
    const output = this.layerNorm(this.add(afterAttention, ffnOutput));

    return {
      attention: attentionResult,
      afterAttention,
      ffnOutput,
      output
    };
  }

  reset(): void {
    this.attention.reset();
    this.W_ff1 = randomMatrix(this.d_model, this.d_ff);
    this.W_ff2 = randomMatrix(this.d_ff, this.d_model);
    this.b_ff1 = randomVector(this.d_ff, 0.1);
    this.b_ff2 = randomVector(this.d_model, 0.1);
  }
}

// ==================== Positional Encoding ====================

/**
 * Generate sinusoidal positional encodings
 */
export function positionalEncoding(seqLen: number, d_model: number): number[][] {
  const pe: number[][] = [];
  
  for (let pos = 0; pos < seqLen; pos++) {
    pe[pos] = [];
    for (let i = 0; i < d_model; i++) {
      const angle = pos / Math.pow(10000, (2 * Math.floor(i / 2)) / d_model);
      if (i % 2 === 0) {
        pe[pos][i] = Math.sin(angle);
      } else {
        pe[pos][i] = Math.cos(angle);
      }
    }
  }
  
  return pe;
}

/**
 * Add positional encoding to embeddings
 */
export function addPositionalEncoding(embeddings: number[][], pe: number[][]): number[][] {
  return embeddings.map((row, i) => row.map((val, j) => val + pe[i][j]));
}