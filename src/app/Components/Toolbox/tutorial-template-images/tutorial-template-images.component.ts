import {AfterContentChecked, AfterContentInit, Component, ContentChild, Input, OnInit, ViewChild } from '@angular/core';
import { NgxOpenCVService, OpenCVState } from 'ngx-opencv';
import { DrawCanvasComponent } from '../draw-canvas/draw-canvas.component';
import { TutorialTemplateComponent } from '../tutorial-template/tutorial-template.component';
import { UIControlService } from 'src/app/Services/uicontrol.service';

@Component({
  selector: 'app-tutorial-template-images',
  templateUrl: './tutorial-template-images.component.html',
  styleUrls: ['./tutorial-template-images.component.scss',
  '../tutorial-template/tutorial-template.component.scss']
})
export class TutorialTemplateImagesComponent extends TutorialTemplateComponent implements AfterContentInit {

  cvState: string;

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


  constructor(protected ngxOpenCv:NgxOpenCVService, public uiservice: UIControlService) {
    super()
  }

  ngAfterContentInit(): void {
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
  loadSelectedFileFromPath(path:string){
    const img = new Image()
    img.onerror = (error) => {
      console.log('Loading failed')
    }
    img.src = path;
    img.onload = () =>{
      this.drawCanvasContained.drawImage(img)
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
