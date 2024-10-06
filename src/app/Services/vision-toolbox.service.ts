import { Injectable } from '@angular/core';
import { NgxOpenCVService} from 'ngx-opencv';

@Injectable({
  providedIn: 'root'
})
export class VisionToolboxService {
  cvState: string;
  constructor(private ngxOpenCv: NgxOpenCVService) {

  }

}
