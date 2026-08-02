import { 
  Component, 
  ElementRef, 
  ViewChild, 
  AfterViewInit, 
  OnDestroy, 
  NgZone 
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TutorialTemplateComponent } from '../../../Toolbox/tutorial-template/tutorial-template.component';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';

export type NormType = 'batch' | 'layer' | 'instance' | 'group';
export type Mode = 'train' | 'inference';
export type ViewMode = 'cubes' | 'images';

interface CubeData {
  mesh: THREE.Mesh;
  b: number;
  c: number;
  n: number;
}

interface ImageDataStore {
  original: number[][][]; // [H][W][3] RGB 0-255
  normalized: number[][][];
}

@Component({
    selector: 'app-normalization-tutorial',
    templateUrl: './normalization-tutorial.component.html',
    styleUrl: './normalization-tutorial.component.scss',
    imports: [TutorialTemplateComponent, MatButtonToggleGroup, ReactiveFormsModule, FormsModule, MatButtonToggle, MatIcon, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatSlider, MatSliderThumb, MatCheckbox, MatButton]
})
export class NormalizationTutorialComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('imageCanvas', { static: false }) imageCanvas!: ElementRef<HTMLCanvasElement>;

  // View mode
  viewMode: ViewMode = 'cubes';

  // Configuration
  normType: NormType = 'batch';
  mode: Mode = 'train';
  
  // Tensor dimensions (for cubes)
  batchSize = 4;
  channels = 4;
  spatialSize = 4;
  groupSize = 2;

  // Selection
  selectedB = 0;
  selectedC = 0;
  selectedN = 0;

  // Image mode settings
  readonly imageSize = 64;
  readonly imageBatchSize = 4;
  showNormalized = true;
  showChannelSeparation = true;
  
  // Generated images
  images: ImageDataStore[] = [];

  // Three.js
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private cubes: CubeData[] = [];
  private labelSprites: THREE.Sprite[] = [];
  private animationId: number | null = null;

  // Colors
  private readonly baseColor = new THREE.Color(0x64748b);
  private readonly selectedColor = new THREE.Color(0xfbbf24);
  private readonly normalizedWithColor = new THREE.Color(0x3b82f6);
  private readonly runningStatsColor = new THREE.Color(0x22c55e);

  private readonly cubeSize = 0.8;
  private readonly gap = 1.2;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.initThreeJS();
    this.createVisualization();
    this.updateHighlighting();
    this.animate();
    this.generateSampleImages();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.renderer?.dispose();
  }

  // --- View Mode ---
  onViewModeChange(): void {
    if (this.viewMode === 'images') {
      setTimeout(() => {
        this.renderImages();
      }, 50);
    }
  }

  // --- Image Generation & Normalization ---
  generateSampleImages(): void {
    this.images = [];
    
    for (let b = 0; b < this.imageBatchSize; b++) {
      const img: number[][][] = [];
      
      for (let y = 0; y < this.imageSize; y++) {
        img[y] = [];
        for (let x = 0; x < this.imageSize; x++) {
          let r: number, g: number, bVal: number;
          
          switch (b % 4) {
            case 0: // Warm gradient
              r = Math.floor((x / this.imageSize) * 200) + 55;
              g = Math.floor((y / this.imageSize) * 100) + 50;
              bVal = 60;
              break;
            case 1: // Cool circular
              const cx = this.imageSize / 2, cy = this.imageSize / 2;
              const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
              r = Math.floor(80 - dist * 1.5);
              g = Math.floor(Math.cos(dist * 0.2) * 80 + 128);
              bVal = Math.floor(200 - dist * 2);
              break;
            case 2: // Green checkerboard
              const size = 8;
              const isLight = (Math.floor(x / size) + Math.floor(y / size)) % 2 === 0;
              r = isLight ? 100 : 40;
              g = isLight ? 200 : 120;
              bVal = isLight ? 100 : 60;
              break;
            case 3: // RGB stripes
              const stripe = Math.floor(y / 10) % 3;
              r = stripe === 0 ? 220 : 60;
              g = stripe === 1 ? 220 : 60;
              bVal = stripe === 2 ? 220 : 60;
              break;
            default:
              r = g = bVal = 128;
          }
          
          // Add noise
          r = Math.max(0, Math.min(255, r + (Math.random() - 0.5) * 20));
          g = Math.max(0, Math.min(255, g + (Math.random() - 0.5) * 20));
          bVal = Math.max(0, Math.min(255, bVal + (Math.random() - 0.5) * 20));
          
          img[y][x] = [r, g, bVal];
        }
      }
      
      this.images.push({
        original: img,
        normalized: [] // Will be computed
      });
    }
    
    this.recomputeAllNormalizations();
  }

  recomputeAllNormalizations(): void {
    const eps = 1e-5;
    const H = this.imageSize;
    const W = this.imageSize;

    // Reset normalized images
    for (const img of this.images) {
      img.normalized = [];
      for (let y = 0; y < H; y++) {
        img.normalized[y] = [];
        for (let x = 0; x < W; x++) {
          img.normalized[y][x] = [0, 0, 0];
        }
      }
    }

    switch (this.normType) {
      case 'batch': {
        // Compute stats per channel across ALL images
        for (let c = 0; c < 3; c++) {
          let sum = 0, sumSq = 0, count = 0;
          
          for (const img of this.images) {
            for (let y = 0; y < H; y++) {
              for (let x = 0; x < W; x++) {
                const val = img.original[y][x][c];
                sum += val;
                sumSq += val * val;
                count++;
              }
            }
          }
          
          const mean = sum / count;
          const variance = sumSq / count - mean * mean;
          const std = Math.sqrt(variance + eps);
          
          // Normalize all images for this channel
          for (const img of this.images) {
            for (let y = 0; y < H; y++) {
              for (let x = 0; x < W; x++) {
                const normalized = (img.original[y][x][c] - mean) / std;
                img.normalized[y][x][c] = Math.max(0, Math.min(255, normalized * 64 + 128));
              }
            }
          }
        }
        break;
      }
      
      case 'layer': {
        // Compute stats per image across all channels
        for (const img of this.images) {
          let sum = 0, sumSq = 0, count = 0;
          
          for (let y = 0; y < H; y++) {
            for (let x = 0; x < W; x++) {
              for (let c = 0; c < 3; c++) {
                const val = img.original[y][x][c];
                sum += val;
                sumSq += val * val;
                count++;
              }
            }
          }
          
          const mean = sum / count;
          const variance = sumSq / count - mean * mean;
          const std = Math.sqrt(variance + eps);
          
          for (let y = 0; y < H; y++) {
            for (let x = 0; x < W; x++) {
              for (let c = 0; c < 3; c++) {
                const normalized = (img.original[y][x][c] - mean) / std;
                img.normalized[y][x][c] = Math.max(0, Math.min(255, normalized * 64 + 128));
              }
            }
          }
        }
        break;
      }
      
      case 'instance': {
        // Compute stats per (image, channel)
        for (const img of this.images) {
          for (let c = 0; c < 3; c++) {
            let sum = 0, sumSq = 0, count = 0;
            
            for (let y = 0; y < H; y++) {
              for (let x = 0; x < W; x++) {
                const val = img.original[y][x][c];
                sum += val;
                sumSq += val * val;
                count++;
              }
            }
            
            const mean = sum / count;
            const variance = sumSq / count - mean * mean;
            const std = Math.sqrt(variance + eps);
            
            for (let y = 0; y < H; y++) {
              for (let x = 0; x < W; x++) {
                const normalized = (img.original[y][x][c] - mean) / std;
                img.normalized[y][x][c] = Math.max(0, Math.min(255, normalized * 64 + 128));
              }
            }
          }
        }
        break;
      }
      
      case 'group': {
        // Group: R+G together, B separate
        const groups = [[0, 1], [2]];
        
        for (const img of this.images) {
          for (const group of groups) {
            let sum = 0, sumSq = 0, count = 0;
            
            for (const c of group) {
              for (let y = 0; y < H; y++) {
                for (let x = 0; x < W; x++) {
                  const val = img.original[y][x][c];
                  sum += val;
                  sumSq += val * val;
                  count++;
                }
              }
            }
            
            const mean = sum / count;
            const variance = sumSq / count - mean * mean;
            const std = Math.sqrt(variance + eps);
            
            for (const c of group) {
              for (let y = 0; y < H; y++) {
                for (let x = 0; x < W; x++) {
                  const normalized = (img.original[y][x][c] - mean) / std;
                  img.normalized[y][x][c] = Math.max(0, Math.min(255, normalized * 64 + 128));
                }
              }
            }
          }
        }
        break;
      }
    }
  }

  renderImages(): void {
    if (!this.imageCanvas?.nativeElement) return;
    
    const canvas = this.imageCanvas.nativeElement;
    const ctx = canvas.getContext('2d')!;
    
    const padding = 8;
    const labelHeight = 18;
    const imgDisplaySize = 72;
    
    // Columns: R, G, B, RGB if showing channels, else just RGB
    const cols = this.showChannelSeparation ? 4 : 1;
    const rows = this.imageBatchSize;
    const sections = this.showNormalized ? 2 : 1;
    
    const sectionWidth = cols * imgDisplaySize + (cols - 1) * padding;
    const totalWidth = sections * sectionWidth + (sections + 1) * padding + 30; // +30 for batch labels
    const totalHeight = rows * (imgDisplaySize + labelHeight) + (rows - 1) * padding + labelHeight + padding * 2;
    
    canvas.width = totalWidth;
    canvas.height = totalHeight;
    
    // Background
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Section headers
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    
    const section1X = 30 + padding + sectionWidth / 2;
    ctx.fillText('Original', section1X, 14);
    
    if (this.showNormalized) {
      const section2X = 30 + padding * 2 + sectionWidth + sectionWidth / 2;
      ctx.fillText(`After ${this.getNormName()}`, section2X, 14);
    }
    
    // Draw each image row
    for (let b = 0; b < this.imageBatchSize; b++) {
      const rowY = labelHeight + padding + b * (imgDisplaySize + labelHeight + padding);
      
      // Batch label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(`B${b}`, 25, rowY + imgDisplaySize / 2 + 4);
      
      // Draw sections
      for (let section = 0; section < sections; section++) {
        const data = section === 0 ? this.images[b]?.original : this.images[b]?.normalized;
        if (!data) continue;
        
        const sectionX = 30 + padding + section * (sectionWidth + padding);
        
        if (this.showChannelSeparation) {
          const channelLabels = ['R', 'G', 'B', 'RGB'];
          const channelColors = ['#ef4444', '#22c55e', '#3b82f6', '#94a3b8'];
          
          for (let ci = 0; ci < 4; ci++) {
            const x = sectionX + ci * (imgDisplaySize + padding);
            
            // Channel label
            ctx.fillStyle = channelColors[ci];
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(channelLabels[ci], x + imgDisplaySize / 2, rowY - 3);
            
            // Draw image
            this.drawImageToCanvas(ctx, data, x, rowY, imgDisplaySize, ci === 3 ? -1 : ci);
            
            // Highlight for original section
            if (section === 0) {
              this.drawHighlightOverlay(ctx, b, ci, x, rowY, imgDisplaySize);
            }
          }
        } else {
          const x = sectionX;
          this.drawImageToCanvas(ctx, data, x, rowY, imgDisplaySize, -1);
          
          if (section === 0) {
            this.drawHighlightOverlay(ctx, b, -1, x, rowY, imgDisplaySize);
          }
        }
      }
    }
  }

  private drawImageToCanvas(
    ctx: CanvasRenderingContext2D, 
    imgData: number[][][], 
    x: number, 
    y: number, 
    displaySize: number,
    channel: number // -1 for RGB
  ): void {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = this.imageSize;
    tempCanvas.height = this.imageSize;
    const tempCtx = tempCanvas.getContext('2d')!;
    const imageData = tempCtx.createImageData(this.imageSize, this.imageSize);
    
    for (let py = 0; py < this.imageSize; py++) {
      for (let px = 0; px < this.imageSize; px++) {
        const idx = (py * this.imageSize + px) * 4;
        
        if (channel === -1) {
          imageData.data[idx] = imgData[py][px][0];
          imageData.data[idx + 1] = imgData[py][px][1];
          imageData.data[idx + 2] = imgData[py][px][2];
        } else {
          const val = imgData[py][px][channel];
          imageData.data[idx] = channel === 0 ? val : 0;
          imageData.data[idx + 1] = channel === 1 ? val : 0;
          imageData.data[idx + 2] = channel === 2 ? val : 0;
        }
        imageData.data[idx + 3] = 255;
      }
    }
    
    tempCtx.putImageData(imageData, 0, 0);
    
    // Draw border
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1;
    ctx.strokeRect(x - 0.5, y - 0.5, displaySize + 1, displaySize + 1);
    
    ctx.drawImage(tempCanvas, x, y, displaySize, displaySize);
  }

  private drawHighlightOverlay(
    ctx: CanvasRenderingContext2D,
    batchIdx: number,
    channelIdx: number, // -1 for combined
    x: number,
    y: number,
    size: number
  ): void {
    let shouldHighlight = false;
    
    switch (this.normType) {
      case 'batch':
        // Same channel across all batches
        shouldHighlight = channelIdx >= 0;
        break;
      case 'layer':
        // All channels for selected batch
        shouldHighlight = batchIdx === this.selectedB;
        break;
      case 'instance':
        // Specific (batch, channel)
        shouldHighlight = batchIdx === this.selectedB && (channelIdx >= 0 || channelIdx === -1);
        break;
      case 'group':
        // Channel groups for selected batch
        const group1 = [0, 1]; // R+G
        shouldHighlight = batchIdx === this.selectedB && 
                         (channelIdx === -1 || group1.includes(channelIdx));
        break;
    }
    
    if (shouldHighlight) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.strokeRect(x - 1, y - 1, size + 2, size + 2);
      
      ctx.fillStyle = 'rgba(59, 130, 246, 0.15)';
      ctx.fillRect(x, y, size, size);
    }
  }

  getNormName(): string {
    switch (this.normType) {
      case 'batch': return 'BatchNorm';
      case 'layer': return 'LayerNorm';
      case 'instance': return 'InstanceNorm';
      case 'group': return 'GroupNorm';
    }
  }

  onNormTypeChangeWithImages(): void {
    this.onNormTypeChange();
    if (this.viewMode === 'images') {
      this.recomputeAllNormalizations();
      this.renderImages();
    }
  }

  onImageSettingsChange(): void {
    if (this.viewMode === 'images') {
      this.renderImages();
    }
  }

  regenerateImages(): void {
    this.generateSampleImages();
    if (this.viewMode === 'images') {
      this.renderImages();
    }
  }

  // --- Three.js Setup ---
  private initThreeJS(): void {
    const container = this.canvasContainer.nativeElement;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 400;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1e293b);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(12, 10, 12);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 15, 10);
    this.scene.add(directionalLight);

    this.addAxisLabels();
    this.setupInteraction();
  }

  private addAxisLabels(): void {
    const createLabel = (text: string, position: THREE.Vector3) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      canvas.width = 256;
      canvas.height = 64;
      
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 28px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 128, 32);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);
      sprite.position.copy(position);
      sprite.scale.set(4, 1, 1);
      this.scene.add(sprite);
      this.labelSprites.push(sprite);
    };

    const bCenter = (this.batchSize - 1) * this.gap / 2;
    const cCenter = (this.channels - 1) * this.gap / 2;
    const nCenter = (this.spatialSize - 1) * this.gap / 2;

    createLabel('Batch (B)', new THREE.Vector3(bCenter, -2, -1.5));
    createLabel('Channel (C)', new THREE.Vector3(-2.5, cCenter, -1.5));
    createLabel('Spatial (N)', new THREE.Vector3(-1.5, -2, nCenter));
  }

  private setupInteraction(): void {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    this.renderer.domElement.addEventListener('click', (event) => {
      const rect = this.renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, this.camera);
      const intersects = raycaster.intersectObjects(this.cubes.map(c => c.mesh));

      if (intersects.length > 0) {
        const cube = this.cubes.find(c => c.mesh === intersects[0].object);
        if (cube) {
          this.ngZone.run(() => {
            this.selectedB = cube.b;
            this.selectedC = cube.c;
            this.selectedN = cube.n;
            this.updateHighlighting();
          });
        }
      }
    });
  }

  private createVisualization(): void {
    this.cubes.forEach(c => this.scene.remove(c.mesh));
    this.cubes = [];

    const geometry = new THREE.BoxGeometry(this.cubeSize, this.cubeSize, this.cubeSize);

    for (let b = 0; b < this.batchSize; b++) {
      for (let c = 0; c < this.channels; c++) {
        for (let n = 0; n < this.spatialSize; n++) {
          const material = new THREE.MeshLambertMaterial({ 
            color: this.baseColor,
            transparent: true,
            opacity: 0.7
          });

          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(b * this.gap, c * this.gap, n * this.gap);

          this.scene.add(mesh);
          this.cubes.push({ mesh, b, c, n });
        }
      }
    }

    const center = new THREE.Vector3(
      (this.batchSize - 1) * this.gap / 2,
      (this.channels - 1) * this.gap / 2,
      (this.spatialSize - 1) * this.gap / 2
    );
    this.controls.target.copy(center);
  }

  updateHighlighting(): void {
    this.cubes.forEach(cube => {
      const material = cube.mesh.material as THREE.MeshLambertMaterial;
      
      const isSelected = cube.b === this.selectedB && 
                         cube.c === this.selectedC && 
                         cube.n === this.selectedN;

      const isInNormGroup = this.isInNormalizationGroup(cube);

      if (isSelected) {
        material.color.copy(this.selectedColor);
        material.opacity = 1;
        cube.mesh.scale.setScalar(1.1);
      } else if (isInNormGroup) {
        if (this.normType === 'batch' && this.mode === 'inference') {
          material.color.copy(this.runningStatsColor);
        } else {
          material.color.copy(this.normalizedWithColor);
        }
        material.opacity = 0.9;
        cube.mesh.scale.setScalar(1);
      } else {
        material.color.copy(this.baseColor);
        material.opacity = 0.3;
        cube.mesh.scale.setScalar(1);
      }
    });
  }

  private isInNormalizationGroup(cube: CubeData): boolean {
    switch (this.normType) {
      case 'batch':
        return cube.c === this.selectedC;
      case 'layer':
        return cube.b === this.selectedB;
      case 'instance':
        return cube.b === this.selectedB && cube.c === this.selectedC;
      case 'group':
        const selectedGroup = Math.floor(this.selectedC / this.groupSize);
        const cubeGroup = Math.floor(cube.c / this.groupSize);
        return cube.b === this.selectedB && cubeGroup === selectedGroup;
      default:
        return false;
    }
  }

  private animate(): void {
    this.ngZone.runOutsideAngular(() => {
      const loop = () => {
        this.animationId = requestAnimationFrame(loop);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
      };
      loop();
    });
  }

  // --- UI Handlers ---
  onNormTypeChange(): void {
    this.updateHighlighting();
  }

  onModeChange(): void {
    this.updateHighlighting();
  }

  onDimensionChange(): void {
    this.selectedB = Math.min(this.selectedB, this.batchSize - 1);
    this.selectedC = Math.min(this.selectedC, this.channels - 1);
    this.selectedN = Math.min(this.selectedN, this.spatialSize - 1);
    
    this.cubes.forEach(c => this.scene.remove(c.mesh));
    this.createVisualization();
    this.updateHighlighting();
  }

  onSelectionChange(): void {
    this.updateHighlighting();
    if (this.viewMode === 'images') {
      this.renderImages();
    }
  }

  // --- Info Helpers ---
  getNormDescription(): string {
    switch (this.normType) {
      case 'batch':
        return 'Normalizes across Batch and Spatial dimensions for each Channel.';
      case 'layer':
        return 'Normalizes across Channel and Spatial dimensions for each Batch sample.';
      case 'instance':
        return 'Normalizes across Spatial dimension for each (Batch, Channel) pair.';
      case 'group':
        return `Normalizes across groups of ${this.groupSize} channels and Spatial for each Batch.`;
    }
  }

  getNormFormula(): string {
    switch (this.normType) {
      case 'batch':
        return 'μ, σ² over (B, N) per C';
      case 'layer':
        return 'μ, σ² over (C, N) per B';
      case 'instance':
        return 'μ, σ² over (N) per (B, C)';
      case 'group':
        return 'μ, σ² over (G, N) per B';
    }
  }

  getTrainInferenceNote(): string {
    if (this.normType === 'batch') {
      if (this.mode === 'train') {
        return 'Training: Uses mini-batch statistics (μ_batch, σ²_batch). Updates running mean/var.';
      } else {
        return 'Inference: Uses stored running statistics (μ_running, σ²_running). No batch dependency!';
      }
    } else {
      return 'Same behavior in training and inference (no running statistics).';
    }
  }

  getElementCount(): number {
    switch (this.normType) {
      case 'batch':
        return this.batchSize * this.spatialSize;
      case 'layer':
        return this.channels * this.spatialSize;
      case 'instance':
        return this.spatialSize;
      case 'group':
        return this.groupSize * this.spatialSize;
    }
  }
}