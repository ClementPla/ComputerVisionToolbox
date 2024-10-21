import { AfterViewInit, ChangeDetectorRef, Component, ContentChild, Input, OnInit, ViewChild } from '@angular/core';
import { NgxOpenCVService, OpenCVState} from 'ngx-opencv';
import { DrawCanvasComponent } from '../draw-canvas/draw-canvas.component';
import { TutorialTemplateComponent } from '../tutorial-template/tutorial-template.component';

import { UIControlService } from '../../../Services/uicontrol.service';

@Component({
  selector: 'app-tutorial-template-images',
  templateUrl: './tutorial-template-images.component.html',
  styleUrls: ['./tutorial-template-images.component.scss',
  '../tutorial-template/tutorial-template.component.scss']
})
export class TutorialTemplateImagesComponent extends TutorialTemplateComponent implements AfterViewInit {

  cvState: string;

  @ContentChild('inputCanvas')
  public drawCanvasContained: DrawCanvasComponent;

  public profileOptions: any;
  public sideMenuContext = true;
  constructor(protected ngxOpenCv:NgxOpenCVService, public uiservice: UIControlService, private cdr: ChangeDetectorRef) {
    super()
  }

  ngAfterViewInit(): void {
    this.ngxOpenCv.cvState.subscribe((val: OpenCVState) => {
      console.log('OpenCV.js is ready', val);
      this.cvState = val.toString();
    
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
       if(this.drawCanvasContained){
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

  toggleImagePresets(){
    this.sideMenuContext = !this.sideMenuContext
  }


}
