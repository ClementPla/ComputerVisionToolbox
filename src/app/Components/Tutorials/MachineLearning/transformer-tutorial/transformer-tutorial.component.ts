import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import {
  AttentionHead,
  AttentionResult,
  MultiHeadAttention,
  MultiHeadAttentionResult,
  positionalEncoding,
  addPositionalEncoding,
} from './attention';

import {
  TextTokenizer,
  ImageTokenizer,
  Token,
  TokenizedResult,
  ImageTokenizedResult,
  generateGradientImage,
  generateCheckerboard,
  generateCirclesPattern,
} from './tokenizer';
import { TutorialTemplateComponent } from '../../../Toolbox/tutorial-template/tutorial-template.component';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/list';
import { NgIf, NgFor } from '@angular/common';
import { MatFormField } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LabelledSlidersComponent } from '../../../labelled-sliders/labelled-sliders.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';

type ViewMode = 'text' | 'image';
type VisualizationStep = 'tokenization' | 'embedding' | 'qkv' | 'attention' | 'multihead' | 'output';

interface HeadVisualization {
  headIndex: number;
  attention: number[][];
  isSelected: boolean;
}

@Component({
    selector: 'app-transformer-tutorial',
    templateUrl: './transformer-tutorial.component.html',
    styleUrls: ['./transformer-tutorial.component.scss'],
    imports: [
        TutorialTemplateComponent,
        MatButtonToggleGroup,
        MatButtonToggle,
        MatIcon,
        MatDivider,
        NgIf,
        MatFormField,
        MatInput,
        ReactiveFormsModule,
        FormsModule,
        LabelledSlidersComponent,
        MatCheckbox,
        MatButton,
        NgFor,
    ],
})
export class TransformerTutorialComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('imageCanvas') imageCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('patchCanvas') patchCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('attentionCanvas') attentionCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('multiheadCanvas') multiheadCanvas: ElementRef<HTMLCanvasElement>;

  // Mode
  viewMode: ViewMode = 'text';
  currentStep: VisualizationStep = 'tokenization';

  // Text mode
  inputText = 'The cat sat on the mat';
  textTokenizer: TextTokenizer;
  textTokens: Token[] = [];
  textEmbeddings: number[][] = [];

  // Image mode
  imageTokenizer: ImageTokenizer;
  imageTokens: Token[] = [];
  imageEmbeddings: number[][] = [];
  imagePatches: any[] = [];
  imageGridSize: [number, number] = [0, 0];
  imageWidth = 64;
  imageHeight = 64;
  patchSize = 16;
  selectedImagePattern: 'gradient' | 'checkerboard' | 'circles' = 'gradient';
  currentImage: number[][][] = [];

  // Special tokens
  useClsToken = true;
  numRegisters = 0;

  // Attention
  d_model = 32;
  numHeads = 4;
  attentionHead: AttentionHead;
  multiHeadAttention: MultiHeadAttention;
  
  // Results
  singleHeadResult: AttentionResult | null = null;
  multiHeadResult: MultiHeadAttentionResult | null = null;
  headVisualizations: HeadVisualization[] = [];
  selectedHeadIndex = 0;

  // Interaction
  hoveredTokenIndex: number | null = null;
  selectedTokenIndex: number | null = null;
  showPositionalEncoding = true;

  // Animation
  isAnimating = false;
  animationSpeed = 500; // ms per step

  // Colors
  readonly attentionColormap = [
    '#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6',
    '#4292c6', '#2171b5', '#08519c', '#08306b'
  ];

  constructor() {
    this.textTokenizer = new TextTokenizer(this.d_model);
    this.imageTokenizer = new ImageTokenizer(this.patchSize, this.d_model);
    this.attentionHead = new AttentionHead(this.d_model, this.d_model);
    this.multiHeadAttention = new MultiHeadAttention(this.d_model, this.numHeads);
  }

  ngOnInit(): void {
    this.processInput();
  }

  ngAfterViewInit(): void {
    // Use timeout to ensure all views are initialized
    setTimeout(() => {
      if (this.viewMode === 'image') {
        this.generateImage();
      }
      this.computeAttention();
    }, 100);
  }

  ngOnDestroy(): void {}

  // ==================== Mode Switching ====================

  setViewMode(mode: ViewMode): void {
    this.viewMode = mode;
    this.selectedTokenIndex = null;
    this.hoveredTokenIndex = null;
    
    if (mode === 'image') {
      setTimeout(() => this.generateImage(), 0);
    } else {
      this.processInput();
    }
  }

  setVisualizationStep(step: VisualizationStep): void {
    this.currentStep = step;
    
    // Redraw attention matrix when switching to attention steps
    if (step === 'attention' || step === 'multihead') {
      // Use longer timeout to ensure canvas is visible
      setTimeout(() => {
        this.computeAttention();
      }, 100);
    }
  }

  // ==================== Text Processing ====================

  processInput(): void {
    if (this.viewMode === 'text') {
      this.processText();
    } else {
      this.processImage();
    }
    this.computeAttention();
  }

  processText(): void {
    const result = this.textTokenizer.tokenize(
      this.inputText,
      this.useClsToken,
      this.numRegisters
    );
    this.textTokens = result.tokens;
    this.textEmbeddings = result.embeddings;

    // Add positional encoding
    if (this.showPositionalEncoding && this.textEmbeddings.length > 0) {
      const pe = positionalEncoding(this.textEmbeddings.length, this.d_model);
      this.textEmbeddings = addPositionalEncoding(this.textEmbeddings, pe);
    }
  }

  onTextChange(): void {
    this.processText();
    this.computeAttention();
  }

  // ==================== Image Processing ====================

  generateImage(): void {
    switch (this.selectedImagePattern) {
      case 'gradient':
        this.currentImage = generateGradientImage(this.imageWidth, this.imageHeight);
        break;
      case 'checkerboard':
        this.currentImage = generateCheckerboard(this.imageWidth, this.imageHeight, this.patchSize);
        break;
      case 'circles':
        this.currentImage = generateCirclesPattern(this.imageWidth, this.imageHeight);
        break;
    }
    
    this.drawImage();
    this.processImage();
  }

  drawImage(): void {
    if (!this.imageCanvas?.nativeElement) return;

    const canvas = this.imageCanvas.nativeElement;
    const ctx = canvas.getContext('2d')!;
    
    canvas.width = this.imageWidth;
    canvas.height = this.imageHeight;

    const imageData = ctx.createImageData(this.imageWidth, this.imageHeight);
    
    for (let y = 0; y < this.imageHeight; y++) {
      for (let x = 0; x < this.imageWidth; x++) {
        const idx = (y * this.imageWidth + x) * 4;
        const pixel = this.currentImage[y]?.[x] || [0, 0, 0];
        imageData.data[idx] = pixel[0];
        imageData.data[idx + 1] = pixel[1];
        imageData.data[idx + 2] = pixel[2];
        imageData.data[idx + 3] = 255;
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  }

  processImage(): void {
    if (this.currentImage.length === 0) return;

    const result = this.imageTokenizer.tokenize(
      this.currentImage,
      this.useClsToken,
      this.numRegisters
    );
    
    this.imageTokens = result.tokens;
    this.imageEmbeddings = result.embeddings;
    this.imagePatches = result.patches;
    this.imageGridSize = result.gridSize;

    // Add positional encoding
    if (this.showPositionalEncoding && this.imageEmbeddings.length > 0) {
      const pe = positionalEncoding(this.imageEmbeddings.length, this.d_model);
      this.imageEmbeddings = addPositionalEncoding(this.imageEmbeddings, pe);
    }

    this.drawPatchOverlay();
    this.computeAttention();
  }

  drawPatchOverlay(): void {
    if (!this.patchCanvas?.nativeElement) return;

    const canvas = this.patchCanvas.nativeElement;
    const ctx = canvas.getContext('2d')!;
    
    canvas.width = this.imageWidth;
    canvas.height = this.imageHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw patch grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 1;

    for (let y = 0; y <= this.imageHeight; y += this.patchSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.imageWidth, y);
      ctx.stroke();
    }

    for (let x = 0; x <= this.imageWidth; x += this.patchSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.imageHeight);
      ctx.stroke();
    }

    // Highlight selected/hovered patch
    const highlightIndex = this.selectedTokenIndex ?? this.hoveredTokenIndex;
    if (highlightIndex !== null && this.viewMode === 'image') {
      const token = this.imageTokens[highlightIndex];
      if (token?.type === 'patch') {
        const patchIndex = token.id - 10;
        const [rows, cols] = this.imageGridSize;
        const py = Math.floor(patchIndex / cols);
        const px = patchIndex % cols;

        ctx.fillStyle = 'rgba(255, 215, 0, 0.5)';
        ctx.fillRect(px * this.patchSize, py * this.patchSize, this.patchSize, this.patchSize);
        
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 2;
        ctx.strokeRect(px * this.patchSize, py * this.patchSize, this.patchSize, this.patchSize);
      }
    }
  }

  // ==================== Attention Computation ====================

  computeAttention(): void {
    const embeddings = this.viewMode === 'text' ? this.textEmbeddings : this.imageEmbeddings;
    
    if (embeddings.length === 0) return;

    // Single head attention
    this.singleHeadResult = this.attentionHead.forward(embeddings);

    // Multi-head attention
    this.multiHeadResult = this.multiHeadAttention.forward(embeddings);

    // Prepare head visualizations
    this.headVisualizations = this.multiHeadResult.heads.map((head, idx) => ({
      headIndex: idx,
      attention: head.attention,
      isSelected: idx === this.selectedHeadIndex,
    }));

    this.drawAttentionMatrix();
  }

  selectHead(index: number): void {
    this.selectedHeadIndex = index;
    this.headVisualizations.forEach((h, i) => h.isSelected = i === index);
    setTimeout(() => this.drawAttentionMatrix(), 10);
  }

  // ==================== Attention Visualization ====================

  drawAttentionMatrix(): void {
    // Choose the correct canvas based on current step
    const canvas = this.currentStep === 'multihead' 
      ? this.multiheadCanvas?.nativeElement 
      : this.attentionCanvas?.nativeElement;
    
    if (!canvas) return;
    if (!this.multiHeadResult) return;

    const ctx = canvas.getContext('2d')!;

    const attention = this.multiHeadResult.heads[this.selectedHeadIndex]?.attention;
    if (!attention) return;

    const tokens = this.viewMode === 'text' ? this.textTokens : this.imageTokens;
    const n = tokens.length;
    
    if (n === 0) return;
    
    const cellSize = Math.min(400 / n, 40);
    const labelOffset = 60;

    canvas.width = n * cellSize + labelOffset;
    canvas.height = n * cellSize + labelOffset;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw attention cells
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const value = attention[i][j];
        ctx.fillStyle = this.getAttentionColor(value);
        ctx.fillRect(
          labelOffset + j * cellSize,
          labelOffset + i * cellSize,
          cellSize - 1,
          cellSize - 1
        );

        // Highlight row/column for selected token
        if (this.selectedTokenIndex !== null) {
          if (i === this.selectedTokenIndex || j === this.selectedTokenIndex) {
            ctx.strokeStyle = 'rgba(255, 215, 0, 0.8)';
            ctx.lineWidth = 2;
            ctx.strokeRect(
              labelOffset + j * cellSize,
              labelOffset + i * cellSize,
              cellSize - 1,
              cellSize - 1
            );
          }
        }
      }
    }

    // Draw labels
    ctx.fillStyle = '#333';
    ctx.font = `${Math.min(cellSize * 0.6, 10)}px sans-serif`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < n; i++) {
      const label = this.getTokenLabel(tokens[i]);
      ctx.fillText(label, labelOffset - 5, labelOffset + i * cellSize + cellSize / 2);
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    
    for (let j = 0; j < n; j++) {
      const label = this.getTokenLabel(tokens[j]);
      ctx.save();
      ctx.translate(labelOffset + j * cellSize + cellSize / 2, labelOffset - 5);
      ctx.rotate(-Math.PI / 4);
      ctx.fillText(label, 0, 0);
      ctx.restore();
    }
  }

  getTokenLabel(token: Token): string {
    if (token.type === 'special' || token.type === 'register') {
      return token.text;
    }
    if (token.type === 'patch') {
      return `P${token.id - 10}`;
    }
    return token.text.substring(0, 6);
  }

  getAttentionColor(value: number): string {
    const idx = Math.min(
      Math.floor(value * this.attentionColormap.length),
      this.attentionColormap.length - 1
    );
    return this.attentionColormap[Math.max(0, idx)];
  }

  // ==================== Token Interaction ====================

  onTokenHover(index: number): void {
    this.hoveredTokenIndex = index;
    if (this.viewMode === 'image') {
      this.drawPatchOverlay();
    }
  }

  onTokenLeave(): void {
    this.hoveredTokenIndex = null;
    if (this.viewMode === 'image') {
      this.drawPatchOverlay();
    }
  }

  onTokenClick(index: number): void {
    this.selectedTokenIndex = this.selectedTokenIndex === index ? null : index;
    setTimeout(() => this.drawAttentionMatrix(), 10);
    if (this.viewMode === 'image') {
      this.drawPatchOverlay();
    }
  }

  // ==================== Settings ====================

  get currentTokens(): Token[] {
    return this.viewMode === 'text' ? this.textTokens : this.imageTokens;
  }

  get currentEmbeddings(): number[][] {
    return this.viewMode === 'text' ? this.textEmbeddings : this.imageEmbeddings;
  }

  get currentAttention(): number[][] | null {
    if (!this.multiHeadResult) return null;
    return this.multiHeadResult.heads[this.selectedHeadIndex]?.attention || null;
  }

  onSettingsChange(): void {
    this.attentionHead = new AttentionHead(this.d_model, this.d_model);
    this.multiHeadAttention = new MultiHeadAttention(this.d_model, this.numHeads);
    this.textTokenizer = new TextTokenizer(this.d_model);
    this.imageTokenizer = new ImageTokenizer(this.patchSize, this.d_model);
    
    this.processInput();
  }

  resetWeights(): void {
    this.attentionHead.reset();
    this.multiHeadAttention.reset();
    this.textTokenizer.reset();
    this.imageTokenizer.reset();
    this.computeAttention();
  }

  // ==================== Embedding Visualization ====================

  getEmbeddingBarHeight(value: number): number {
    // Normalize to [0, 100]
    return Math.abs(value) * 50 + 2;
  }

  getEmbeddingBarColor(value: number): string {
    if (value > 0) {
      const intensity = Math.min(value * 2, 1);
      return `rgba(33, 150, 243, ${0.3 + intensity * 0.7})`;
    } else {
      const intensity = Math.min(-value * 2, 1);
      return `rgba(244, 67, 54, ${0.3 + intensity * 0.7})`;
    }
  }

  // ==================== Attention for Selected Token ====================

  getAttentionForToken(tokenIndex: number): { token: Token; weight: number }[] {
    if (!this.currentAttention || tokenIndex < 0) return [];

    const tokens = this.currentTokens;
    const weights = this.currentAttention[tokenIndex];

    return tokens.map((token, idx) => ({
      token,
      weight: weights[idx],
    })).sort((a, b) => b.weight - a.weight);
  }

  getAttentionWidthPercent(weight: number): number {
    return Math.max(weight * 100, 2);
  }
}