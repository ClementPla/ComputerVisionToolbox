/**
 * RNN and LSTM Implementations
 * Pure TypeScript for educational visualization
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
  return Array.from({ length: size }, () => (Math.random() * 2 - 1) * scale);
}

/**
 * Create a zero vector
 */
export function zeros(size: number): number[] {
  return new Array(size).fill(0);
}

/**
 * Sigmoid activation
 */
export function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-Math.max(-500, Math.min(500, x))));
}

/**
 * Tanh activation
 */
export function tanh(x: number): number {
  return Math.tanh(x);
}

/**
 * Element-wise sigmoid for vector
 */
export function sigmoidVec(v: number[]): number[] {
  return v.map(sigmoid);
}

/**
 * Element-wise tanh for vector
 */
export function tanhVec(v: number[]): number[] {
  return v.map(tanh);
}

/**
 * Matrix-vector multiplication
 */
export function matvec(M: number[][], v: number[]): number[] {
  return M.map(row => row.reduce((sum, val, i) => sum + val * v[i], 0));
}

/**
 * Vector addition
 */
export function addVec(a: number[], b: number[]): number[] {
  return a.map((val, i) => val + b[i]);
}

/**
 * Element-wise vector multiplication (Hadamard product)
 */
export function mulVec(a: number[], b: number[]): number[] {
  return a.map((val, i) => val * b[i]);
}

/**
 * Concatenate two vectors
 */
export function concat(a: number[], b: number[]): number[] {
  return [...a, ...b];
}

// ==================== RNN Step Result ====================

export interface RNNStepResult {
  input: number[];
  hiddenPrev: number[];
  hiddenNext: number[];
  preActivation: number[];  // Before tanh
  output: number[];
}

export interface RNNForwardResult {
  steps: RNNStepResult[];
  finalHidden: number[];
  outputs: number[][];
}

// ==================== Simple RNN ====================

export class SimpleRNN {
  W_ih: number[][];  // Input to hidden
  W_hh: number[][];  // Hidden to hidden
  W_ho: number[][];  // Hidden to output
  b_h: number[];     // Hidden bias
  b_o: number[];     // Output bias

  constructor(
    public inputSize: number,
    public hiddenSize: number,
    public outputSize: number
  ) {
    this.W_ih = randomMatrix(hiddenSize, inputSize);
    this.W_hh = randomMatrix(hiddenSize, hiddenSize);
    this.W_ho = randomMatrix(outputSize, hiddenSize);
    this.b_h = randomVector(hiddenSize, 0.1);
    this.b_o = randomVector(outputSize, 0.1);
  }

  /**
   * Single RNN step
   */
  step(input: number[], hiddenPrev: number[]): RNNStepResult {
    // h_t = tanh(W_ih * x_t + W_hh * h_{t-1} + b_h)
    const ih = matvec(this.W_ih, input);
    const hh = matvec(this.W_hh, hiddenPrev);
    const preActivation = addVec(addVec(ih, hh), this.b_h);
    const hiddenNext = tanhVec(preActivation);

    // y_t = W_ho * h_t + b_o
    const output = addVec(matvec(this.W_ho, hiddenNext), this.b_o);

    return {
      input,
      hiddenPrev,
      hiddenNext,
      preActivation,
      output,
    };
  }

  /**
   * Forward pass through entire sequence
   */
  forward(inputs: number[][], initialHidden?: number[]): RNNForwardResult {
    const steps: RNNStepResult[] = [];
    let hidden = initialHidden || zeros(this.hiddenSize);
    const outputs: number[][] = [];

    for (const input of inputs) {
      const result = this.step(input, hidden);
      steps.push(result);
      hidden = result.hiddenNext;
      outputs.push(result.output);
    }

    return {
      steps,
      finalHidden: hidden,
      outputs,
    };
  }

  reset(): void {
    this.W_ih = randomMatrix(this.hiddenSize, this.inputSize);
    this.W_hh = randomMatrix(this.hiddenSize, this.hiddenSize);
    this.W_ho = randomMatrix(this.outputSize, this.hiddenSize);
    this.b_h = randomVector(this.hiddenSize, 0.1);
    this.b_o = randomVector(this.outputSize, 0.1);
  }
}

// ==================== LSTM Step Result ====================

export interface LSTMGates {
  forget: number[];    // f_t
  input: number[];     // i_t
  candidate: number[]; // c̃_t (cell candidate)
  output: number[];    // o_t
}

export interface LSTMStepResult {
  input: number[];
  hiddenPrev: number[];
  cellPrev: number[];
  gates: LSTMGates;
  cellNext: number[];
  hiddenNext: number[];
  output: number[];
}

export interface LSTMForwardResult {
  steps: LSTMStepResult[];
  finalHidden: number[];
  finalCell: number[];
  outputs: number[][];
}

// ==================== LSTM ====================

export class LSTM {
  // Weights for all gates combined: [forget, input, candidate, output]
  W_i: number[][];   // Input weights (4 * hiddenSize, inputSize)
  W_h: number[][];   // Hidden weights (4 * hiddenSize, hiddenSize)
  b: number[];       // Biases (4 * hiddenSize)
  
  // Output projection
  W_o: number[][];
  b_o: number[];

  constructor(
    public inputSize: number,
    public hiddenSize: number,
    public outputSize: number
  ) {
    const gateSize = 4 * hiddenSize;
    this.W_i = randomMatrix(gateSize, inputSize);
    this.W_h = randomMatrix(gateSize, hiddenSize);
    this.b = randomVector(gateSize, 0.1);
    
    // Initialize forget gate bias to 1.0 (helps with gradient flow)
    for (let i = 0; i < hiddenSize; i++) {
      this.b[i] = 1.0;
    }
    
    this.W_o = randomMatrix(outputSize, hiddenSize);
    this.b_o = randomVector(outputSize, 0.1);
  }

  /**
   * Single LSTM step with all gate computations exposed
   */
  step(input: number[], hiddenPrev: number[], cellPrev: number[]): LSTMStepResult {
    const h = this.hiddenSize;

    // Compute all gates at once: [f, i, c̃, o] = W_i * x + W_h * h + b
    const gatesInput = matvec(this.W_i, input);
    const gatesHidden = matvec(this.W_h, hiddenPrev);
    const gatesRaw = addVec(addVec(gatesInput, gatesHidden), this.b);

    // Split and apply activations
    const forgetGate = sigmoidVec(gatesRaw.slice(0, h));
    const inputGate = sigmoidVec(gatesRaw.slice(h, 2 * h));
    const candidateGate = tanhVec(gatesRaw.slice(2 * h, 3 * h));
    const outputGate = sigmoidVec(gatesRaw.slice(3 * h, 4 * h));

    // Cell state update: c_t = f_t ⊙ c_{t-1} + i_t ⊙ c̃_t
    const cellNext = addVec(
      mulVec(forgetGate, cellPrev),
      mulVec(inputGate, candidateGate)
    );

    // Hidden state: h_t = o_t ⊙ tanh(c_t)
    const hiddenNext = mulVec(outputGate, tanhVec(cellNext));

    // Output
    const output = addVec(matvec(this.W_o, hiddenNext), this.b_o);

    return {
      input,
      hiddenPrev,
      cellPrev,
      gates: {
        forget: forgetGate,
        input: inputGate,
        candidate: candidateGate,
        output: outputGate,
      },
      cellNext,
      hiddenNext,
      output,
    };
  }

  /**
   * Forward pass through entire sequence
   */
  forward(inputs: number[][], initialHidden?: number[], initialCell?: number[]): LSTMForwardResult {
    const steps: LSTMStepResult[] = [];
    let hidden = initialHidden || zeros(this.hiddenSize);
    let cell = initialCell || zeros(this.hiddenSize);
    const outputs: number[][] = [];

    for (const input of inputs) {
      const result = this.step(input, hidden, cell);
      steps.push(result);
      hidden = result.hiddenNext;
      cell = result.cellNext;
      outputs.push(result.output);
    }

    return {
      steps,
      finalHidden: hidden,
      finalCell: cell,
      outputs,
    };
  }

  reset(): void {
    const gateSize = 4 * this.hiddenSize;
    this.W_i = randomMatrix(gateSize, this.inputSize);
    this.W_h = randomMatrix(gateSize, this.hiddenSize);
    this.b = randomVector(gateSize, 0.1);
    
    for (let i = 0; i < this.hiddenSize; i++) {
      this.b[i] = 1.0;
    }
    
    this.W_o = randomMatrix(this.outputSize, this.hiddenSize);
    this.b_o = randomVector(this.outputSize, 0.1);
  }
}

// ==================== GRU (Bonus) ====================

export interface GRUGates {
  reset: number[];   // r_t
  update: number[];  // z_t
  candidate: number[]; // h̃_t
}

export interface GRUStepResult {
  input: number[];
  hiddenPrev: number[];
  gates: GRUGates;
  hiddenNext: number[];
  output: number[];
}

export class GRU {
  W_ir: number[][];  // Input to reset
  W_hr: number[][];  // Hidden to reset
  W_iz: number[][];  // Input to update
  W_hz: number[][];  // Hidden to update
  W_in: number[][];  // Input to candidate
  W_hn: number[][];  // Hidden to candidate
  b_r: number[];
  b_z: number[];
  b_n: number[];
  
  W_o: number[][];
  b_o: number[];

  constructor(
    public inputSize: number,
    public hiddenSize: number,
    public outputSize: number
  ) {
    this.W_ir = randomMatrix(hiddenSize, inputSize);
    this.W_hr = randomMatrix(hiddenSize, hiddenSize);
    this.W_iz = randomMatrix(hiddenSize, inputSize);
    this.W_hz = randomMatrix(hiddenSize, hiddenSize);
    this.W_in = randomMatrix(hiddenSize, inputSize);
    this.W_hn = randomMatrix(hiddenSize, hiddenSize);
    this.b_r = randomVector(hiddenSize, 0.1);
    this.b_z = randomVector(hiddenSize, 0.1);
    this.b_n = randomVector(hiddenSize, 0.1);
    
    this.W_o = randomMatrix(outputSize, hiddenSize);
    this.b_o = randomVector(outputSize, 0.1);
  }

  step(input: number[], hiddenPrev: number[]): GRUStepResult {
    // Reset gate: r_t = σ(W_ir * x + W_hr * h + b_r)
    const resetGate = sigmoidVec(
      addVec(addVec(matvec(this.W_ir, input), matvec(this.W_hr, hiddenPrev)), this.b_r)
    );

    // Update gate: z_t = σ(W_iz * x + W_hz * h + b_z)
    const updateGate = sigmoidVec(
      addVec(addVec(matvec(this.W_iz, input), matvec(this.W_hz, hiddenPrev)), this.b_z)
    );

    // Candidate: h̃_t = tanh(W_in * x + W_hn * (r_t ⊙ h) + b_n)
    const candidateGate = tanhVec(
      addVec(
        addVec(matvec(this.W_in, input), matvec(this.W_hn, mulVec(resetGate, hiddenPrev))),
        this.b_n
      )
    );

    // Hidden: h_t = (1 - z_t) ⊙ h̃_t + z_t ⊙ h_{t-1}
    const oneMinusZ = updateGate.map(z => 1 - z);
    const hiddenNext = addVec(mulVec(oneMinusZ, candidateGate), mulVec(updateGate, hiddenPrev));

    const output = addVec(matvec(this.W_o, hiddenNext), this.b_o);

    return {
      input,
      hiddenPrev,
      gates: {
        reset: resetGate,
        update: updateGate,
        candidate: candidateGate,
      },
      hiddenNext,
      output,
    };
  }

  forward(inputs: number[][]): { steps: GRUStepResult[]; finalHidden: number[]; outputs: number[][] } {
    const steps: GRUStepResult[] = [];
    let hidden = zeros(this.hiddenSize);
    const outputs: number[][] = [];

    for (const input of inputs) {
      const result = this.step(input, hidden);
      steps.push(result);
      hidden = result.hiddenNext;
      outputs.push(result.output);
    }

    return { steps, finalHidden: hidden, outputs };
  }

  reset(): void {
    this.W_ir = randomMatrix(this.hiddenSize, this.inputSize);
    this.W_hr = randomMatrix(this.hiddenSize, this.hiddenSize);
    this.W_iz = randomMatrix(this.hiddenSize, this.inputSize);
    this.W_hz = randomMatrix(this.hiddenSize, this.hiddenSize);
    this.W_in = randomMatrix(this.hiddenSize, this.inputSize);
    this.W_hn = randomMatrix(this.hiddenSize, this.hiddenSize);
    this.b_r = randomVector(this.hiddenSize, 0.1);
    this.b_z = randomVector(this.hiddenSize, 0.1);
    this.b_n = randomVector(this.hiddenSize, 0.1);
    this.W_o = randomMatrix(this.outputSize, this.hiddenSize);
    this.b_o = randomVector(this.outputSize, 0.1);
  }
}

// ==================== Simple Tokenizer ====================

export interface SequenceToken {
  char: string;
  embedding: number[];
  index: number;
}

export class CharTokenizer {
  vocabulary: Map<string, number> = new Map();
  embeddings: number[][] = [];
  
  constructor(public embeddingSize: number = 16) {
    this.initVocabulary();
  }

  private initVocabulary(): void {
    const chars = ' abcdefghijklmnopqrstuvwxyz0123456789.,!?-';
    chars.split('').forEach((char, idx) => {
      this.vocabulary.set(char, idx);
    });
    
    // Generate embeddings
    this.embeddings = [];
    for (let i = 0; i < this.vocabulary.size; i++) {
      this.embeddings.push(randomVector(this.embeddingSize, 0.5));
    }
  }

  tokenize(text: string): SequenceToken[] {
    const tokens: SequenceToken[] = [];
    const normalized = text.toLowerCase();
    
    for (let i = 0; i < normalized.length; i++) {
      const char = normalized[i];
      const idx = this.vocabulary.get(char) ?? 0;
      tokens.push({
        char,
        embedding: [...this.embeddings[idx]],
        index: i,
      });
    }
    
    return tokens;
  }

  getEmbeddings(text: string): number[][] {
    return this.tokenize(text).map(t => t.embedding);
  }

  reset(): void {
    this.embeddings = [];
    for (let i = 0; i < this.vocabulary.size; i++) {
      this.embeddings.push(randomVector(this.embeddingSize, 0.5));
    }
  }
}