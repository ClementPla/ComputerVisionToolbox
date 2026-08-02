import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { canny, grayToRGBA, CannyResult } from 'src/app/lib/vision';
import { TutorialTemplateComponent } from '../../../Toolbox/tutorial-template/tutorial-template.component';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';

type Stage = 'blurred' | 'magnitude' | 'suppressed' | 'edges';

const PRESETS = ['House.jpeg', 'poivron.jpeg', 'papillon.jpg', 'Moon.jpeg'];

@Component({
  selector: 'app-canny',
  templateUrl: './canny.component.html',
  styleUrl: './canny.component.scss',
  imports: [
    TutorialTemplateComponent,
    FormsModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatSlider,
    MatSliderThumb,
  ],
})
export class CannyComponent implements AfterViewInit {
  @ViewChild('original', { static: true }) originalCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('result', { static: true }) resultCanvas!: ElementRef<HTMLCanvasElement>;

  readonly presets = PRESETS;
  image = PRESETS[0];

  sigma = 1.4;
  lowThreshold = 20;
  highThreshold = 50;
  stage: Stage = 'edges';

  private rgba: Uint8ClampedArray | null = null;
  private width = 0;
  private height = 0;

  ngAfterViewInit(): void {
    this.loadImage();
  }

  loadImage(): void {
    const img = new Image();
    img.onload = () => {
      // Downscale for snappy recomputation while dragging sliders.
      const maxDim = 320;
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
    img.src = `assets/image_presets/${this.image}`;
  }

  recompute(): void {
    if (!this.rgba) return;
    const res = canny(this.rgba, this.width, this.height, {
      sigma: this.sigma,
      lowThreshold: this.lowThreshold,
      highThreshold: this.highThreshold,
    });
    this.draw(res);
  }

  private draw(res: CannyResult): void {
    // Every stage is a single-channel buffer (0..255); pack it into RGBA.
    const rgba = grayToRGBA(res[this.stage], this.width, this.height);
    const ctx = this.resultCanvas.nativeElement.getContext('2d')!;
    const imageData = ctx.createImageData(this.width, this.height);
    imageData.data.set(rgba);
    ctx.putImageData(imageData, 0, 0);
  }
}
