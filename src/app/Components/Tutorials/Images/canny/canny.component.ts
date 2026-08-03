import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  canny,
  grayToRGBA,
  CannyResult,
  HYST_STRONG,
  HYST_WEAK_KEPT,
  HYST_WEAK_DROPPED,
} from 'src/app/lib/vision';
import { TutorialTemplateComponent } from '../../../Toolbox/tutorial-template/tutorial-template.component';
import { ImagePresetsComponent } from '../../../Presets/image-presets/image-presets.component';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';

type StageKey = 'blurred' | 'magnitude' | 'suppressed' | 'hysteresis' | 'edges';
interface Stage { key: StageKey; label: string }

@Component({
  selector: 'app-canny',
  templateUrl: './canny.component.html',
  styleUrl: './canny.component.scss',
  imports: [TutorialTemplateComponent, FormsModule, ImagePresetsComponent, MatSlider, MatSliderThumb],
})
export class CannyComponent implements AfterViewInit {
  @ViewChild('original', { static: true }) originalCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('result', { static: true }) resultCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChildren('thumb') thumbs!: QueryList<ElementRef<HTMLCanvasElement>>;

  readonly stages: Stage[] = [
    { key: 'blurred', label: '1 · Blur' },
    { key: 'magnitude', label: '2 · Gradient' },
    { key: 'suppressed', label: '3 · Thin' },
    { key: 'hysteresis', label: '4 · Hysteresis' },
    { key: 'edges', label: '5 · Edges' },
  ];
  readonly thumbSize = 92;

  sigma = 1.4;
  low = 20;
  high = 50;
  stage: StageKey = 'edges';
  image = 'assets/image_presets/House.jpeg';

  private rgba: Uint8ClampedArray | null = null;
  private width = 0;
  private height = 0;
  private result: CannyResult | null = null;

  ngAfterViewInit(): void {
    this.loadImage();
  }

  onImageSelected(url: string): void {
    this.image = url;
    this.loadImage();
  }

  selectStage(key: StageKey): void {
    this.stage = key;
    this.drawResult();
  }

  recompute(): void {
    if (!this.rgba) return;
    this.result = canny(this.rgba, this.width, this.height, {
      sigma: this.sigma,
      lowThreshold: this.low,
      highThreshold: this.high,
    });
    this.drawResult();
    this.drawThumbs();
  }

  // --- Image loading -----------------------------------------------------

  private loadImage(): void {
    const img = new Image();
    img.onload = () => {
      const maxDim = 300;
      const s = Math.min(1, maxDim / Math.max(img.width, img.height));
      this.width = Math.round(img.width * s);
      this.height = Math.round(img.height * s);

      const oc = this.originalCanvas.nativeElement;
      oc.width = this.width;
      oc.height = this.height;
      const octx = oc.getContext('2d')!;
      octx.drawImage(img, 0, 0, this.width, this.height);
      this.rgba = octx.getImageData(0, 0, this.width, this.height).data;

      this.resultCanvas.nativeElement.width = this.width;
      this.resultCanvas.nativeElement.height = this.height;
      this.recompute();
    };
    img.src = this.image;
  }

  // --- Rendering ---------------------------------------------------------

  private drawResult(): void {
    if (!this.result) return;
    this.paint(this.resultCanvas.nativeElement, this.stageRGBA(this.stage));
  }

  private drawThumbs(): void {
    if (!this.result) return;
    const canvases = this.thumbs.toArray();
    this.stages.forEach((st, i) => {
      const cv = canvases[i]?.nativeElement;
      if (cv) this.paint(cv, this.stageRGBA(st.key), true);
    });
  }

  /** Draw a full-size RGBA buffer into a canvas, scaling if the canvas differs. */
  private paint(canvas: HTMLCanvasElement, rgba: Uint8ClampedArray, thumb = false): void {
    if (thumb) {
      canvas.width = this.thumbSize;
      canvas.height = this.thumbSize;
    }
    const off = document.createElement('canvas');
    off.width = this.width;
    off.height = this.height;
    const offCtx = off.getContext('2d')!;
    const imageData = offCtx.createImageData(this.width, this.height);
    imageData.data.set(rgba);
    offCtx.putImageData(imageData, 0, 0);

    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(off, 0, 0, canvas.width, canvas.height);
  }

  private stageRGBA(key: StageKey): Uint8ClampedArray {
    if (key === 'edges') return grayToRGBA(this.result!.edges, this.width, this.height);
    if (key === 'hysteresis') return this.hysteresisRGBA();
    return grayToRGBA(this.result![key], this.width, this.height);
  }

  /** Colour-code the hysteresis stage: strong=white, kept-weak=green, dropped-weak=red. */
  private hysteresisRGBA(): Uint8ClampedArray {
    const cls = this.result!.hysteresisClasses;
    const out = new Uint8ClampedArray(this.width * this.height * 4);
    for (let i = 0; i < cls.length; i++) {
      let r = 0, g = 0, b = 0;
      if (cls[i] === HYST_STRONG) { r = g = b = 255; }
      else if (cls[i] === HYST_WEAK_KEPT) { r = 34; g = 197; b = 94; }
      else if (cls[i] === HYST_WEAK_DROPPED) { r = 120; g = 30; b = 30; }
      out[i * 4] = r;
      out[i * 4 + 1] = g;
      out[i * 4 + 2] = b;
      out[i * 4 + 3] = 255;
    }
    return out;
  }
}
