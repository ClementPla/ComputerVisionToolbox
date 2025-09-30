import { Component, OnInit, ViewChild } from '@angular/core';
import { TutorialImageClass } from 'src/app/Components/Toolbox/tutorial-parents/tutorial-image';

import * as ort from 'onnxruntime-web';
import { DrawCanvasComponent } from 'src/app/Components/Toolbox/draw-canvas/draw-canvas.component';

@Component({
  selector: 'app-cnn',
  templateUrl: './cnn.component.html',
  styleUrl: './cnn.component.scss',
})
export class CNNComponent extends TutorialImageClass implements OnInit {
  @ViewChild('drawCanvas') canvas: DrawCanvasComponent;
  @ViewChild('drawCanvas2') canvas2: DrawCanvasComponent;

  session: ort.InferenceSession;
  isready: boolean = false;
  probas: Array<number> = new Array(10).fill(0);
  maxProba: number = 0;
  predictedDigit: number = 0;
  useAntiAliasing: boolean = true;
  ngOnInit(): void {
    this.load_sessions();
  }

  async load_sessions() {
    this.session = await ort.InferenceSession.create(
      'assets/models/onnx_model.onnx'
    );
    this.isready = true;
  }

  async onDrawingEnded(event: boolean) {
    this.canvas2.drawArray(this.canvas.getArray());
    if (!this.isready) {
      return;
    }

    const data = this.canvas.getArray();

    let datafloat32 = [];
    for (let i = 0; i < data.length; i += 4) {
      datafloat32.push(data[i] / 255);
    }

    const float32Array = new Float32Array(datafloat32);

    const tensor = new ort.Tensor('float32', float32Array, [1, 1, 28, 28]);

    const output = await this.session.run({ 'input.1': tensor });

    this.probas = [];
    this.maxProba = 0;
    for (let i = 0; i < output[27].data.length; i++) {
      this.probas.push(output[27].data[i] as number);
      this.maxProba = Math.max(this.maxProba, output[27].data[i] as number);
      if (this.maxProba === output[27].data[i]) {
        this.predictedDigit = i;
      }
    }

    this.cdr.detectChanges();
  }
}
