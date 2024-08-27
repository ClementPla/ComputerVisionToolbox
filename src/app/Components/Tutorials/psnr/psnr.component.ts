import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TutorialTemplateImagesComponent } from '../../Toolbox/tutorial-template-images/tutorial-template-images.component';
import { ROIProperty } from 'src/app/utils/interface';
import { ROIComponent } from '../../Toolbox/roi/roi.component';
import { gaussianRandom, getMean, getStandardDeviation } from 'src/app/utils/math';
@Component({
  selector: 'app-psnr',
  templateUrl: './psnr.component.html',
  styleUrls: ['./psnr.component.scss']
})
export class PSNRComponent extends TutorialTemplateImagesComponent implements AfterViewInit, OnInit
{ 

  viewerSize: number = 256;
  @ViewChild('foreground')
  private foregroundCanvas: ElementRef<HTMLCanvasElement>;

  @ViewChild('background')
  private backgroundCanvas: ElementRef<HTMLCanvasElement>;
  backgroundData: Array<number>;
  foregroundData: Array<number>;
  meanBG: number = 0;
  meanFG: number = 0;
  psnr: number = 0;
  localcontrast: number = 0;

  rois : Array<ROIProperty> = [
    {
    name: 'Background', 
    color: '#f55d42', 
    initial1: {x: 256, y:256},
    initial2: {x: 400, y:400}
    }, 
    {
      name: 'Foreground', 
      color: '#44ad52',
      initial1: {x: 128, y:128},
      initial2: {x: 256, y:256}
    },
   ];

   pepperSaltNoise: number = 0.1;
   gaussianNoise: number = 5;


  ngOnInit(): void {

  }
  
  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    super.loadSelectedFileFromPath('assets/image_presets/poivron.jpeg')

  }

  async updateCanvasROI(property: ROIProperty){
    let data = property.data;
    if(data == null){
      return;
    }

    if(property.name == 'Background'){
      var ctx = this.backgroundCanvas.nativeElement.getContext('2d');
      this.backgroundData = new Array<number>(data.data.length / 4);
      for(let i = 0; i < data.data.length; i+=4){
        this.backgroundData[i / 4] = (data.data[i] + data.data[i+1] + data.data[i+2]) / 3;
      }

    }
    else{
      var ctx = this.foregroundCanvas.nativeElement.getContext('2d');
      this.foregroundData = new Array<number>(data.data.length / 4);
      for(let i = 0; i < data.data.length; i+=4){
        this.foregroundData[i / 4] = (data.data[i] + data.data[i+1] + data.data[i+2]) / 3;
      }
    }
    let resize = {width: this.viewerSize, height: this.viewerSize};
        
    let ibm = await window.createImageBitmap(data, 0, 0, data.width, data.height, 
      {resizeHeight: resize.height, resizeWidth: resize.width});

    requestAnimationFrame( () => {
      if(ctx == null){
        return;
      }
      if(data == null){ 
        return;
      }
      
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      
      ctx.canvas.width = this.viewerSize;
      ctx.canvas.height = this.viewerSize;
      ctx.drawImage(ibm, 0, 0);
      this.updateStats();
    }
  )
    
  }
  updateStats(){
    let background = this.backgroundData;
    let foreground = this.foregroundData;
    this.meanBG = getMean(background);
    this.meanFG = getMean(foreground);
    let stdBG = getStandardDeviation(background, this.meanBG);
    this.psnr = (this.meanFG - this.meanBG) / stdBG;
    this.localcontrast = (this.meanFG - this.meanBG) / (this.meanBG);
  } 

  addPepperSaltNoise(){

    let currentData = this.drawCanvas.getCtx().getImageData(0, 0, this.drawCanvas.getCtx().canvas.width, this.drawCanvas.getCtx().canvas.height).data;
    for(let i = 0; i < currentData.length; i+=4){
      let addNoise = Math.random() < this.pepperSaltNoise;
      if(addNoise){
        let noiseType = Math.random() < 0.5;
        if(noiseType){
          currentData[i] = 0;
          currentData[i+1] = 0;
          currentData[i+2] = 0;
        }
        else{
          currentData[i] = 255;
          currentData[i+1] = 255;
          currentData[i+2] = 255;
        }
      }
    }
    this.drawCanvas.drawArray(currentData);
  }

  addGaussianNoise(){
    let currentData = this.drawCanvas.getCtx().getImageData(0, 0, this.drawCanvas.getCtx().canvas.width, this.drawCanvas.getCtx().canvas.height).data;
    for(let i = 0; i < currentData.length; i+=4){
      let randomNoise = gaussianRandom(0, this.gaussianNoise);
      currentData[i] += randomNoise
      currentData[i+1] += randomNoise
      currentData[i+2] += randomNoise
    }
    this.drawCanvas.drawArray(currentData);
  
  }

  
}
