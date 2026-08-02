import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  NgZone,
} from '@angular/core';

import {
  SimpleRNN,
  LSTM,
  GRU,
  RNNStepResult,
  LSTMStepResult,
  GRUStepResult,
  RNNForwardResult,
  LSTMForwardResult,
  CharTokenizer,
  SequenceToken,
  zeros,
} from './models/rnn';

type ModelType = 'rnn' | 'lstm' | 'gru';
type VisualizationStep = 'sequence' | 'unrolled' | 'hidden' | 'gates' | 'cellstate';

@Component({
  selector: 'app-rnn-tutorial',
  templateUrl: './rnn-tutorial.component.html',
  styleUrls: ['./rnn-tutorial.component.scss'],
  standalone: false,
})
export class RnnTutorialComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('hiddenCanvas') hiddenCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('cellCanvas') cellCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('gatesCanvas') gatesCanvas: ElementRef<HTMLCanvasElement>;

  // Model selection
  modelType: ModelType = 'rnn';
  currentStep: VisualizationStep = 'sequence';

  // Input
  inputText = 'hello world';
  tokenizer: CharTokenizer;
  tokens: SequenceToken[] = [];

  // Model parameters
  embeddingSize = 16;
  hiddenSize = 32;
  outputSize = 8;

  // Models
  rnn: SimpleRNN;
  lstm: LSTM;
  gru: GRU;

  // Results
  rnnResult: RNNForwardResult | null = null;
  lstmResult: LSTMForwardResult | null = null;
  gruResult: { steps: GRUStepResult[]; finalHidden: number[]; outputs: number[][] } | null = null;

  // Animation
  currentTimeStep = 0;
  isAnimating = false;
  animationSpeed = 500; // ms
  private animationId: number | null = null;

  // Interaction
  hoveredTimeStep: number | null = null;
  selectedGate: 'forget' | 'input' | 'candidate' | 'output' | null = null;

  // Colors - Dark Theme
  readonly gateColors = {
    forget: '#ef5350',   // Red
    input: '#66BB6A',    // Green
    candidate: '#42A5F5', // Blue
    output: '#FFA726',   // Orange
  };

  readonly hiddenColorPositive = '#81C784';
  readonly hiddenColorNegative = '#E57373';
  readonly cellColorPositive = '#64B5F6';
  readonly cellColorNegative = '#FFB74D';
  
  // Canvas background colors
  readonly canvasBg = '#1e1e1e';
  readonly canvasText = '#e0e0e0';
  readonly canvasTextSecondary = '#a0a0a0';
  readonly canvasGridLine = '#444';

  constructor(private ngZone: NgZone) {
    this.tokenizer = new CharTokenizer(this.embeddingSize);
    this.initializeModels();
  }

  ngOnInit(): void {
    this.processInput();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.drawVisualizations(), 100);
  }

  ngOnDestroy(): void {
    this.stopAnimation();
  }

  // ==================== Model Management ====================

  initializeModels(): void {
    this.rnn = new SimpleRNN(this.embeddingSize, this.hiddenSize, this.outputSize);
    this.lstm = new LSTM(this.embeddingSize, this.hiddenSize, this.outputSize);
    this.gru = new GRU(this.embeddingSize, this.hiddenSize, this.outputSize);
  }

  setModelType(type: ModelType): void {
    this.modelType = type;
    this.currentTimeStep = 0;
    this.stopAnimation();
    this.processInput();
  }

  setVisualizationStep(step: VisualizationStep): void {
    this.currentStep = step;
    setTimeout(() => this.drawVisualizations(), 50);
  }

  // ==================== Input Processing ====================

  processInput(): void {
    this.tokens = this.tokenizer.tokenize(this.inputText);
    const embeddings = this.tokens.map(t => t.embedding);

    if (embeddings.length === 0) return;

    // Run forward pass
    switch (this.modelType) {
      case 'rnn':
        this.rnnResult = this.rnn.forward(embeddings);
        break;
      case 'lstm':
        this.lstmResult = this.lstm.forward(embeddings);
        break;
      case 'gru':
        this.gruResult = this.gru.forward(embeddings);
        break;
    }

    this.currentTimeStep = Math.min(this.currentTimeStep, this.tokens.length - 1);
    this.drawVisualizations();
  }

  onTextChange(): void {
    this.currentTimeStep = 0;
    this.stopAnimation();
    this.processInput();
  }

  // ==================== Animation ====================

  toggleAnimation(): void {
    if (this.isAnimating) {
      this.stopAnimation();
    } else {
      this.startAnimation();
    }
  }

  startAnimation(): void {
    if (this.tokens.length === 0) return;
    
    this.isAnimating = true;
    this.currentTimeStep = 0;

    this.ngZone.runOutsideAngular(() => {
      const animate = () => {
        if (!this.isAnimating) return;

        this.ngZone.run(() => {
          this.currentTimeStep++;
          if (this.currentTimeStep >= this.tokens.length) {
            this.currentTimeStep = 0;
          }
          this.drawVisualizations();
        });

        this.animationId = window.setTimeout(animate, this.animationSpeed);
      };

      this.animationId = window.setTimeout(animate, this.animationSpeed);
    });
  }

  stopAnimation(): void {
    this.isAnimating = false;
    if (this.animationId !== null) {
      clearTimeout(this.animationId);
      this.animationId = null;
    }
  }

  stepForward(): void {
    if (this.currentTimeStep < this.tokens.length - 1) {
      this.currentTimeStep++;
      this.drawVisualizations();
    }
  }

  stepBackward(): void {
    if (this.currentTimeStep > 0) {
      this.currentTimeStep--;
      this.drawVisualizations();
    }
  }

  goToStep(step: number): void {
    this.currentTimeStep = Math.max(0, Math.min(step, this.tokens.length - 1));
    this.drawVisualizations();
  }

  // ==================== Visualization ====================

  drawVisualizations(): void {
    this.drawHiddenState();
    if (this.modelType === 'lstm') {
      this.drawCellState();
      this.drawGates();
    }
  }

  drawHiddenState(): void {
    const canvas = this.hiddenCanvas?.nativeElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    const steps = this.getCurrentSteps();
    if (!steps || steps.length === 0) return;

    const numSteps = steps.length;
    const cellWidth = Math.min(40, (canvas.width - 60) / numSteps);
    const cellHeight = Math.min(8, (canvas.height - 40) / this.hiddenSize);

    canvas.width = Math.max(400, numSteps * cellWidth + 60);
    canvas.height = Math.max(200, this.hiddenSize * cellHeight + 40);

    // Dark background
    ctx.fillStyle = this.canvasBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw title
    ctx.fillStyle = this.canvasText;
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Hidden State Evolution', canvas.width / 2, 20);

    // Draw heatmap
    const offsetX = 40;
    const offsetY = 35;

    for (let t = 0; t < numSteps; t++) {
      const hidden = this.getHiddenAtStep(t);
      if (!hidden) continue;

      for (let h = 0; h < this.hiddenSize; h++) {
        const value = hidden[h];
        ctx.fillStyle = this.getHiddenColor(value);
        ctx.fillRect(
          offsetX + t * cellWidth,
          offsetY + h * cellHeight,
          cellWidth - 1,
          cellHeight - 1
        );
      }

      // Highlight current step
      if (t === this.currentTimeStep) {
        ctx.strokeStyle = '#FFD54F';
        ctx.lineWidth = 3;
        ctx.strokeRect(
          offsetX + t * cellWidth - 1,
          offsetY - 1,
          cellWidth + 1,
          this.hiddenSize * cellHeight + 2
        );
      }
    }

    // Draw time labels
    ctx.fillStyle = this.canvasTextSecondary;
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    for (let t = 0; t < numSteps; t++) {
      const char = this.tokens[t]?.char || '';
      ctx.fillText(char, offsetX + t * cellWidth + cellWidth / 2, canvas.height - 5);
    }
  }

  drawCellState(): void {
    const canvas = this.cellCanvas?.nativeElement;
    if (!canvas || this.modelType !== 'lstm') return;

    const ctx = canvas.getContext('2d')!;
    if (!this.lstmResult) return;

    const steps = this.lstmResult.steps;
    const numSteps = steps.length;
    const cellWidth = Math.min(40, (canvas.width - 60) / numSteps);
    const cellHeight = Math.min(8, (canvas.height - 40) / this.hiddenSize);

    canvas.width = Math.max(400, numSteps * cellWidth + 60);
    canvas.height = Math.max(200, this.hiddenSize * cellHeight + 40);

    // Dark background
    ctx.fillStyle = this.canvasBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw title
    ctx.fillStyle = this.canvasText;
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Cell State (Long-Term Memory)', canvas.width / 2, 20);

    const offsetX = 40;
    const offsetY = 35;

    for (let t = 0; t < numSteps; t++) {
      const cell = steps[t].cellNext;

      for (let h = 0; h < this.hiddenSize; h++) {
        const value = cell[h];
        ctx.fillStyle = this.getCellColor(value);
        ctx.fillRect(
          offsetX + t * cellWidth,
          offsetY + h * cellHeight,
          cellWidth - 1,
          cellHeight - 1
        );
      }

      if (t === this.currentTimeStep) {
        ctx.strokeStyle = '#FFD54F';
        ctx.lineWidth = 3;
        ctx.strokeRect(
          offsetX + t * cellWidth - 1,
          offsetY - 1,
          cellWidth + 1,
          this.hiddenSize * cellHeight + 2
        );
      }
    }

    // Time labels
    ctx.fillStyle = this.canvasTextSecondary;
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    for (let t = 0; t < numSteps; t++) {
      const char = this.tokens[t]?.char || '';
      ctx.fillText(char, offsetX + t * cellWidth + cellWidth / 2, canvas.height - 5);
    }
  }

  drawGates(): void {
    const canvas = this.gatesCanvas?.nativeElement;
    if (!canvas || this.modelType !== 'lstm') return;
    if (!this.lstmResult || this.currentTimeStep >= this.lstmResult.steps.length) return;

    const ctx = canvas.getContext('2d')!;
    const step = this.lstmResult.steps[this.currentTimeStep];
    const gates = step.gates;

    const gateWidth = 80;
    const gateHeight = 120;
    const spacing = 30;
    const startX = 30;
    const startY = 40;

    canvas.width = 4 * gateWidth + 3 * spacing + 60;
    canvas.height = gateHeight + 80;

    // Dark background
    ctx.fillStyle = this.canvasBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.fillStyle = this.canvasText;
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`LSTM Gates at t=${this.currentTimeStep} ("${this.tokens[this.currentTimeStep]?.char}")`, canvas.width / 2, 20);

    // Draw each gate
    const gateData = [
      { name: 'Forget', key: 'forget' as const, values: gates.forget },
      { name: 'Input', key: 'input' as const, values: gates.input },
      { name: 'Candidate', key: 'candidate' as const, values: gates.candidate },
      { name: 'Output', key: 'output' as const, values: gates.output },
    ];

    gateData.forEach((gate, idx) => {
      const x = startX + idx * (gateWidth + spacing);
      const y = startY;

      // Gate background (dark)
      ctx.fillStyle = '#2d2d2d';
      ctx.strokeStyle = this.gateColors[gate.key];
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(x, y, gateWidth, gateHeight, 8);
      ctx.fill();
      ctx.stroke();

      // Gate name
      ctx.fillStyle = this.gateColors[gate.key];
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(gate.name, x + gateWidth / 2, y + 18);

      // Draw values as vertical bars
      const numBars = Math.min(gate.values.length, 16);
      const barWidth = (gateWidth - 20) / numBars;
      const maxBarHeight = gateHeight - 40;

      for (let i = 0; i < numBars; i++) {
        const value = gate.values[i];
        const barHeight = Math.abs(value) * maxBarHeight;
        const barX = x + 10 + i * barWidth;
        const barY = gate.key === 'candidate' 
          ? y + 25 + maxBarHeight / 2 - (value > 0 ? barHeight : 0)
          : y + 25 + (maxBarHeight - barHeight);

        ctx.fillStyle = gate.key === 'candidate'
          ? (value > 0 ? this.hiddenColorPositive : this.hiddenColorNegative)
          : this.gateColors[gate.key];
        ctx.globalAlpha = 0.4 + Math.abs(value) * 0.6;
        ctx.fillRect(barX, barY, barWidth - 1, barHeight);
        ctx.globalAlpha = 1;
      }

      // Mean value
      const mean = gate.values.reduce((a, b) => a + b, 0) / gate.values.length;
      ctx.fillStyle = this.canvasTextSecondary;
      ctx.font = '10px sans-serif';
      ctx.fillText(`μ=${mean.toFixed(2)}`, x + gateWidth / 2, y + gateHeight - 5);
    });
  }

  // ==================== Helper Methods ====================

  getCurrentSteps(): any[] {
    switch (this.modelType) {
      case 'rnn':
        return this.rnnResult?.steps || [];
      case 'lstm':
        return this.lstmResult?.steps || [];
      case 'gru':
        return this.gruResult?.steps || [];
      default:
        return [];
    }
  }

  getHiddenAtStep(t: number): number[] | null {
    switch (this.modelType) {
      case 'rnn':
        return this.rnnResult?.steps[t]?.hiddenNext || null;
      case 'lstm':
        return this.lstmResult?.steps[t]?.hiddenNext || null;
      case 'gru':
        return this.gruResult?.steps[t]?.hiddenNext || null;
      default:
        return null;
    }
  }

  getCurrentHidden(): number[] {
    return this.getHiddenAtStep(this.currentTimeStep) || zeros(this.hiddenSize);
  }

  getCurrentCell(): number[] {
    if (this.modelType === 'lstm' && this.lstmResult) {
      return this.lstmResult.steps[this.currentTimeStep]?.cellNext || zeros(this.hiddenSize);
    }
    return zeros(this.hiddenSize);
  }

  getCurrentGates(): any {
    if (this.modelType === 'lstm' && this.lstmResult) {
      return this.lstmResult.steps[this.currentTimeStep]?.gates;
    }
    if (this.modelType === 'gru' && this.gruResult) {
      return this.gruResult.steps[this.currentTimeStep]?.gates;
    }
    return null;
  }

  getHiddenColor(value: number): string {
    const intensity = Math.min(Math.abs(value) * 2, 1);
    if (value > 0) {
      // Green - brighter on dark background
      return `rgba(129, 199, 132, ${0.3 + intensity * 0.7})`;
    } else {
      // Red - brighter on dark background
      return `rgba(229, 115, 115, ${0.3 + intensity * 0.7})`;
    }
  }

  getCellColor(value: number): string {
    const intensity = Math.min(Math.abs(value), 1);
    if (value > 0) {
      // Blue - brighter on dark background
      return `rgba(100, 181, 246, ${0.3 + intensity * 0.7})`;
    } else {
      // Orange - brighter on dark background
      return `rgba(255, 183, 77, ${0.3 + intensity * 0.7})`;
    }
  }

  getGateAverages(): { forget: number; input: number; candidate: number; output: number } | null {
    const gates = this.getCurrentGates();
    if (!gates) return null;

    const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

    return {
      forget: avg(gates.forget || []),
      input: avg(gates.input || []),
      candidate: avg(gates.candidate || []),
      output: avg(gates.output || []),
    };
  }

  // ==================== Settings ====================

  onSettingsChange(): void {
    this.tokenizer = new CharTokenizer(this.embeddingSize);
    this.initializeModels();
    this.processInput();
  }

  resetWeights(): void {
    this.rnn.reset();
    this.lstm.reset();
    this.gru.reset();
    this.tokenizer.reset();
    this.processInput();
  }

  // ==================== Token Interaction ====================

  onTokenHover(index: number): void {
    this.hoveredTimeStep = index;
  }

  onTokenLeave(): void {
    this.hoveredTimeStep = null;
  }

  onTokenClick(index: number): void {
    this.stopAnimation();
    this.goToStep(index);
  }

  isTokenActive(index: number): boolean {
    return index <= this.currentTimeStep;
  }

  isTokenCurrent(index: number): boolean {
    return index === this.currentTimeStep;
  }

  // ==================== Value Display ====================

  getValueBarHeight(value: number, maxHeight: number = 30): number {
    return Math.min(Math.abs(value) * maxHeight, maxHeight);
  }

  getValueBarColor(value: number): string {
    return value >= 0 ? this.hiddenColorPositive : this.hiddenColorNegative;
  }
}