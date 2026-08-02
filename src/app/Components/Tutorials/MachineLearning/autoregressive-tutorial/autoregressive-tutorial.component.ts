import { Component } from '@angular/core';

type TabType = 'concept' | 'transformer' | 'rnn' | 'comparison';
type PhaseType = 'training' | 'inference';

@Component({
  selector: 'app-autoregressive-tutorial',
  templateUrl: './autoregressive-tutorial.component.html',
  styleUrls: ['./autoregressive-tutorial.component.scss'],
  standalone: false,
})
export class AutoregressiveTutorialComponent {
  currentTab: TabType = 'concept';
  currentPhase: PhaseType = 'training';

  // Animation state for sequence generation
  currentStep = 0;
  maxSteps = 5;
  isAnimating = false;
  private animationTimer: any = null;

  // Highlight states
  highlightMask: number | null = null; // Which row of attention matrix to highlight
  highlightToken: number | null = null;

  // Sample sequence for illustrations
  readonly sampleTokens = ['The', 'cat', 'sat', 'on', 'the', 'mat'];
  readonly samplePredictions = ['cat', 'sat', 'on', 'the', 'mat', '<eos>'];

  setTab(tab: TabType): void {
    this.currentTab = tab;
    this.stopAnimation();
    this.currentStep = 0;
    this.highlightMask = null;
    this.highlightToken = null;
  }

  setPhase(phase: PhaseType): void {
    this.currentPhase = phase;
    this.stopAnimation();
    this.currentStep = 0;
  }

  // Animation controls
  toggleAnimation(): void {
    if (this.isAnimating) {
      this.stopAnimation();
    } else {
      this.startAnimation();
    }
  }

  startAnimation(): void {
    this.isAnimating = true;
    this.currentStep = 0;

    const animate = () => {
      if (!this.isAnimating) return;
      
      this.currentStep++;
      if (this.currentStep > this.maxSteps) {
        this.currentStep = 0;
      }

      this.animationTimer = setTimeout(animate, 1000);
    };

    this.animationTimer = setTimeout(animate, 1000);
  }

  stopAnimation(): void {
    this.isAnimating = false;
    if (this.animationTimer) {
      clearTimeout(this.animationTimer);
      this.animationTimer = null;
    }
  }

  stepForward(): void {
    if (this.currentStep < this.maxSteps) {
      this.currentStep++;
    }
  }

  stepBackward(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  // Mask visualization helpers
  onMaskRowHover(row: number | null): void {
    this.highlightMask = row;
  }

  onTokenHover(idx: number | null): void {
    this.highlightToken = idx;
  }

  // Check if attention is allowed (causal mask)
  isAttentionAllowed(query: number, key: number): boolean {
    return key <= query; // Can only attend to current and previous positions
  }

  // Get visible tokens up to current step (for inference illustration)
  getVisibleTokens(): string[] {
    return this.sampleTokens.slice(0, this.currentStep + 1);
  }

  getGeneratedTokens(): string[] {
    return this.samplePredictions.slice(0, this.currentStep);
  }
}