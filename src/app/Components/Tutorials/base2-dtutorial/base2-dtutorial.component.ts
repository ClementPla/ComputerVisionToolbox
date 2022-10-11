import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxOpenCVService, OpenCVState } from 'ngx-opencv';
import { DrawCanvasComponent } from '../../Toolbox/draw-canvas/draw-canvas.component';

@Component({
  selector: 'app-base2-dtutorial',
  templateUrl: './base2-dtutorial.component.html',
  styleUrls: ['./base2-dtutorial.component.scss']
})
export class Base2DTutorialComponent implements OnInit {
  cvState: string;

  @ViewChild('drawingCanvas')
  public drawCanvas: DrawCanvasComponent;

  constructor(protected ngxOpenCv:NgxOpenCVService) { }

  ngOnInit(): void {
    this.ngxOpenCv.cvState.subscribe((cvState: OpenCVState) => {
      // do something with the state string
      this.cvState = cvState.state;
      if (cvState.error) {
        // handle errors
      } else if (cvState.loading) {
        // e.g. show loading indicator
      } else if (cvState.ready) {

      }
    });
  }
  loadSelectedFile(event: any) {
    if (event.target.files && event.target.files[0]) {

      var reader = new FileReader();
      reader.onload = (event: any) => {
        const img = new Image()
        img.src = event.target.result;
        img.onload = () =>{
          this.drawCanvas.drawImage(img)

        }
      };
      reader.readAsDataURL(event.target.files[0])
    }
  }

}
