import { Injectable } from '@angular/core';
import { NgxOpenCVService, OpenCVState} from 'ngx-opencv';

@Injectable({
  providedIn: 'root'
})
export class VisionToolboxService {
  cvState: string;
  constructor(private ngxOpenCv: NgxOpenCVService) {

  }

}
