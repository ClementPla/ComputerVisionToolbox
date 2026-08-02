import { Component, OnInit } from '@angular/core';
import { 
  LayerConfig, 
  LayerType, 
  ReceptiveFieldInfo, 
  calculateReceptiveField, 
  createLayer,
  getLayerRFContribution
} from './models/receptive-field';
import { TutorialTemplateComponent } from '../../../Toolbox/tutorial-template/tutorial-template.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription } from '@angular/material/expansion';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'app-receptive-field-tutorial',
    templateUrl: './receptive-field-tutorial.component.html',
    styleUrl: './receptive-field-tutorial.component.scss',
    imports: [TutorialTemplateComponent, MatButton, MatIcon, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription, MatSlider, MatSliderThumb, ReactiveFormsModule, FormsModule, MatIconButton, MatCheckbox, NgStyle]
})
export class ReceptiveFieldTutorialComponent implements OnInit {

  // Network configuration
  layers: LayerConfig[] = [];
  readonly maxLayers = 10;

  // Input configuration
  inputSize = 224;

  // Receptive field info
  rfInfo: ReceptiveFieldInfo | null = null;

  // Image settings
  imageUrl = 'assets/image_presets/Flower_noise.jpg';
  readonly displaySize = 400;

  // Visualization settings
  showTheoreticalRF = true;
  showEffectiveRF = true;
  rfCenterX = 0.5;
  rfCenterY = 0.5;

  ngOnInit(): void {
    // Start with a sample network
    this.addLayer('conv');
    this.addLayer('pool');
    this.addLayer('conv');
    
    this.updateReceptiveField();
  }

  // --- Layer Management ---
  addLayer(type: LayerType): void {
    if (this.layers.length >= this.maxLayers) return;
    
    const layer = createLayer(type, this.layers.length);
    this.layers.push(layer);
    this.updateReceptiveField();
  }

  removeLayer(index: number): void {
    this.layers.splice(index, 1);
    this.updateReceptiveField();
  }

  moveLayerUp(index: number): void {
    if (index <= 0) return;
    [this.layers[index], this.layers[index - 1]] = [this.layers[index - 1], this.layers[index]];
    this.updateReceptiveField();
  }

  moveLayerDown(index: number): void {
    if (index >= this.layers.length - 1) return;
    [this.layers[index], this.layers[index + 1]] = [this.layers[index + 1], this.layers[index]];
    this.updateReceptiveField();
  }

  onLayerChange(): void {
    this.updateReceptiveField();
  }

  // --- Receptive Field Calculation ---
  private updateReceptiveField(): void {
    if (this.layers.length === 0) {
      this.rfInfo = null;
      return;
    }

    this.rfInfo = calculateReceptiveField(this.layers, this.inputSize);
  }

  // --- Image Interaction ---
  onImageClick(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    
    this.rfCenterX = (event.clientX - rect.left) / rect.width;
    this.rfCenterY = (event.clientY - rect.top) / rect.height;
  }

  // --- Visualization Helpers ---
  get theoreticalRFPixels(): number {
    if (!this.rfInfo) return 0;
    return (this.rfInfo.theoreticalRF / this.inputSize) * this.displaySize;
  }

  get effectiveRFPixels(): number {
    if (!this.rfInfo) return 0;
    return (this.rfInfo.effectiveRF / this.inputSize) * this.displaySize;
  }

  get rfCenterPixelX(): number {
    return this.rfCenterX * this.displaySize;
  }

  get rfCenterPixelY(): number {
    return this.rfCenterY * this.displaySize;
  }

  get theoreticalRFStyle(): Record<string, string> {
    const size = this.theoreticalRFPixels;
    return {
      width: `${size}px`,
      height: `${size}px`,
      left: `${this.rfCenterPixelX - size / 2}px`,
      top: `${this.rfCenterPixelY - size / 2}px`
    };
  }

  get effectiveRFStyle(): Record<string, string> {
    const size = this.effectiveRFPixels;
    return {
      width: `${size}px`,
      height: `${size}px`,
      left: `${this.rfCenterPixelX - size / 2}px`,
      top: `${this.rfCenterPixelY - size / 2}px`
    };
  }

  get erfGradient(): string {
    return `radial-gradient(circle, rgba(139, 92, 246, 0.7) 0%, rgba(139, 92, 246, 0.3) 50%, rgba(139, 92, 246, 0) 100%)`;
  }

  // --- Layer Info Helpers ---
  getLayerIcon(type: LayerType): string {
    return type === 'conv' ? 'grid_on' : 'compress';
  }

  getLayerName(type: LayerType): string {
    return type === 'conv' ? 'Conv2D' : 'MaxPool';
  }

  getLayerSummary(layer: LayerConfig): string {
    if (layer.type === 'conv') {
      let s = `${layer.kernelSize}×${layer.kernelSize}, s=${layer.stride}, p=${layer.padding}`;
      if (layer.dilation > 1) s += `, d=${layer.dilation}`;
      return s;
    } else {
      return `${layer.kernelSize}×${layer.kernelSize}, s=${layer.stride}`;
    }
  }

  getOutputSizeAtLayer(index: number): number {
    if (!this.rfInfo || index >= this.rfInfo.layers.length) return 0;
    return this.rfInfo.layers[index].outputSize;
  }

  getRFAtLayer(index: number): number {
    if (!this.rfInfo || index >= this.rfInfo.layers.length) return 0;
    return this.rfInfo.layers[index].rf;
  }

  getJumpAtLayer(index: number): number {
    if (!this.rfInfo || index >= this.rfInfo.layers.length) return 1;
    return this.rfInfo.layers[index].jump;
  }

  // Get RF contribution breakdown for a layer
  getRFContribution(index: number): { growth: number; fromJump: number } {
    if (index < 0 || index >= this.layers.length) {
      return { growth: 0, fromJump: 1 };
    }
    
    // Get the jump from the previous layer (or 1 if first layer)
    const prevJump = index === 0 ? 1 : this.rfInfo?.layers[index - 1].jump ?? 1;
    const contribution = getLayerRFContribution(this.layers[index], prevJump);
    
    return {
      growth: contribution.rfGrowth,
      fromJump: prevJump
    };
  }

  // --- Validation ---
  isConfigValid(): boolean {
    return this.rfInfo !== null && this.rfInfo.isValid;
  }

  getValidationError(): string {
    if (!this.rfInfo) return '';
    if (!this.rfInfo.isValid) {
      return 'Invalid configuration: output size becomes zero or negative';
    }
    return '';
  }

  trackByLayerId(index: number, layer: LayerConfig): string {
    return layer.id;
  }
}