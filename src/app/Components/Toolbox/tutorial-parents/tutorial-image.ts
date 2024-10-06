import {AfterContentChecked, AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChild, Directive, Input, OnInit, ViewChild } from '@angular/core';
import { NgOpenCVService, OpenCVLoadResult } from 'ng-open-cv';
import { DrawCanvasComponent } from '../draw-canvas/draw-canvas.component';
import { TutorialClass } from './tutorial';
import { UIControlService } from 'src/app/Services/uicontrol.service';
import { min } from 'rxjs';

@Directive({
})
export class TutorialImageClass extends TutorialClass implements AfterViewInit {

  cvState: OpenCVLoadResult;

  @ContentChild('outputCanvas')
  protected outputCanvasContained: DrawCanvasComponent; // This is the same thing as the ViewChild, but called from the Parent Class
  @ContentChild('inputCanvas')
  public drawCanvasContained: DrawCanvasComponent;

  @ViewChild('outputCanvas')
  protected outputCanvas: DrawCanvasComponent; // This is the same thing as the ContentChild, but called from the Child Class
  @ViewChild('inputCanvas')
  public drawCanvas: DrawCanvasComponent;

  // drawCanvas and drawCanvasContained refer to the same object but called from different classes (inherited or base)
  public profileOptions: any;
  public sideMenuContext = true;


  constructor(protected ngxOpenCv:NgOpenCVService, public uiservice: UIControlService, private cdr: ChangeDetectorRef) {
    super()
  }

  ngAfterViewInit(): void {
    this.ngxOpenCv.isReady$.subscribe((cvState: OpenCVLoadResult) => {
      // do something with the state string
      this.cvState = cvState;
      if (cvState.error) {
        // handle errors
      } else if (cvState.loading) {
        // e.g. show loading indicator
      } else if (cvState.ready) {

      }
    });
    this.cdr.detectChanges();

  }
  loadSelectedFileFromPath(path:string){
    const img = new Image()
    img.onerror = (error) => {
      console.log('Loading failed')
    }
    img.src = path;
    img.onload = () =>{
      if(this.drawCanvas){
        this.drawCanvas.drawImage(img)
      }
      else if(this.drawCanvasContained){
        this.drawCanvasContained.drawImage(img)
      }
    }
  }

  loadSelectedFile(file: File) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        const img = new Image()
        img.onerror = (error) => {
          console.log('Loading failed')
        }
        img.src = event.target.result;
        img.onload = () =>{
          this.drawCanvasContained.drawImage(img)
        }
      };
      reader.readAsDataURL(file)
  }

  clearCanvas(){
    this.drawCanvasContained.clearCanvas()
  }

  updateProfile() {
    const yData = this.outputCanvas.getProfile();
    this.profileOptions = {
      legend: {
        data: ['Profile'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: Array.from(Array(yData.length).keys()),
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: [
        {
          type: 'value',
          min: 0,
          max: 275,
        },
      ],
      series: [
        {
          symbol: 'none',
          name: 'profile',
          type: 'line',
          areaStyle: {},
          data: yData,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
  }

  toggleImagePresets(){
    this.sideMenuContext = !this.sideMenuContext
  }


}
