import { AfterViewInit, Component, destroyPlatform, OnInit, ViewChild} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { DrawCanvasComponent } from '../../Toolbox/draw-canvas/draw-canvas.component';
import { FormControl } from '@angular/forms';
import {Color, NgxMatColorPickerComponent } from '@angular-material-components/color-picker';

import { TutorialTemplateImagesComponent } from '../../Toolbox/tutorial-template-images/tutorial-template-images.component';
declare var cv: any;

@Component({
  selector: 'app-color-spaces',
  templateUrl: './color-spaces.component.html',
  styleUrls: ['./color-spaces.component.scss']
})
export class ColorSpacesComponent extends TutorialTemplateImagesComponent implements AfterViewInit {

  @ViewChild('canvas1') canvas1: DrawCanvasComponent;
  @ViewChild('canvas2') canvas2: DrawCanvasComponent;
  @ViewChild('canvas3') canvas3: DrawCanvasComponent;
  @ViewChild('picker') pickerInput: NgxMatColorPickerComponent;

  color:ThemePalette = 'warn';
  colorCtr: FormControl = new FormControl(null);
  colorspace:string='RGB'


  ngAfterViewInit(){
    this.pickerInput.select(new Color(255,255,255))
    this.updateColorSpace()

  }
  updateInput():void{
    let canal1 = cv.imread(this.canvas1.getCanvas(),  cv.IMREAD_GRAYSCALE)
    let canal2 = cv.imread(this.canvas2.getCanvas(), cv.IMREAD_GRAYSCALE)
    let canal3 = cv.imread(this.canvas3.getCanvas(), cv.IMREAD_GRAYSCALE)
    cv.cvtColor(canal1, canal1, cv.COLOR_RGB2GRAY);
    cv.cvtColor(canal2, canal2, cv.COLOR_RGB2GRAY);
    cv.cvtColor(canal3, canal3, cv.COLOR_RGB2GRAY);
    let tmp = new cv.MatVector()
    let dst = new cv.Mat()

    switch(this.colorspace){
      case 'RGB':{
        tmp.push_back(canal1)
        tmp.push_back(canal2)
        tmp.push_back(canal3)
        cv.merge(tmp, dst)
        break
      }
      case 'YCrCb':{
        tmp.push_back(canal1)
        tmp.push_back(canal2)
        tmp.push_back(canal3)
        cv.merge(tmp, dst)
        cv.cvtColor(dst, dst, cv.COLOR_YCrCb2RGB);
        break
      }

      case 'LAB':{
        tmp.push_back(canal1)
        tmp.push_back(canal2)
        tmp.push_back(canal3)
        cv.merge(tmp, dst)
        cv.cvtColor(dst, dst, cv.COLOR_Lab2RGB);
        break

      }

      case 'HSV':{
        canal1.convertTo(canal1, cv.CV_32FC1)
        cv.convertScaleAbs(canal1, canal1, 179/255, 0)
        tmp.push_back(canal1)
        tmp.push_back(canal2)
        tmp.push_back(canal3)
        cv.merge(tmp, dst)
        cv.cvtColor(dst, dst, cv.COLOR_HSV2RGB);
        break

      }
    }
    cv.imshow(this.drawCanvas.getCanvas(), dst)
    canal1.delete()
    canal2.delete()
    canal3.delete()
    dst.delete()
    tmp.delete()
    this.updateColorSpace()

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


}
