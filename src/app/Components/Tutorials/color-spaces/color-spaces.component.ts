import { Component, destroyPlatform, OnInit, ViewChild} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { DrawCanvasComponent } from '../../Toolbox/draw-canvas/draw-canvas.component';
import { FormControl } from '@angular/forms';
import { NgxMatColorPickerInput, Color, NgxMatColorPickerComponent } from '@angular-material-components/color-picker';

import { NgxOpenCVService, OpenCVState} from 'ngx-opencv';
declare var cv: any;

@Component({
  selector: 'app-color-spaces',
  templateUrl: './color-spaces.component.html',
  styleUrls: ['./color-spaces.component.scss']
})
export class ColorSpacesComponent implements OnInit {
  @ViewChild('drawingCanvas') drawCanvas: DrawCanvasComponent;
  @ViewChild('canvas1') canvas1: DrawCanvasComponent;
  @ViewChild('canvas2') canvas2: DrawCanvasComponent;
  @ViewChild('canvas3') canvas3: DrawCanvasComponent;
  @ViewChild('picker') pickerInput: NgxMatColorPickerComponent;

  color:ThemePalette = 'warn';
  colorCtr: FormControl = new FormControl(null);
  colorspace:string='RGB'
  cvState:string;

  constructor(private ngxOpenCv:NgxOpenCVService) { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {

    this.ngxOpenCv.cvState.subscribe((cvState: OpenCVState) => {
      // do something with the state string
      this.cvState = cvState.state;
      if (cvState.error) {
        // handle errors
      } else if (cvState.loading) {
        // e.g. show loading indicator
      } else if (cvState.ready) {

        this.pickerInput.select(new Color(255,0,255))
        this.updateColorSpace()

      }
    });

  }
  updateColorSpace():void{

    let mat = cv.imread(this.drawCanvas.getCanvas());
    let dst = new cv.MatVector();
    switch(this.colorspace){
      case 'RGB':{
        this.canvas1.title = 'R'
        this.canvas2.title = 'G'
        this.canvas3.title = 'B'
        break
      }
      case 'LAB':{
        this.canvas1.title = 'L'
        this.canvas2.title = 'A'
        this.canvas3.title = 'B'
        cv.cvtColor(mat, mat, cv.COLOR_RGB2Lab);
        break
      }
      case 'HSV':{
        this.canvas1.title = 'H'
        this.canvas2.title = 'S'
        this.canvas3.title = 'V'
        cv.cvtColor(mat, mat, cv.COLOR_RGB2HSV);
        break
      }
      case 'YCrCb':{
        this.canvas1.title = 'Y'
        this.canvas2.title = 'Cr'
        this.canvas3.title = 'Cb'
        cv.cvtColor(mat, mat, cv.COLOR_RGB2YCrCb);
        break
      }
    }

    cv.split(mat, dst)
    if(this.colorspace=='HSV'){
      cv.convertScaleAbs(dst.get(0), dst.get(0), 1.42)
    }

    cv.imshow(this.canvas1.getCanvas(), dst.get(0));
    cv.imshow(this.canvas2.getCanvas(), dst.get(1));
    cv.imshow(this.canvas3.getCanvas(), dst.get(2));

    mat.delete();
    dst.delete();
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
