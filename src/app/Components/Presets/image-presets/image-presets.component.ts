import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { UIControlService } from '../../../Services/uicontrol.service';


import image_presets from '../image-presets/local_db/list_images.json';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgFor } from '@angular/common';


@Component({
    selector: 'app-image-presets',
    templateUrl: './image-presets.component.html',
    styleUrls: ['./image-presets.component.scss'],
    imports: [MatButton, MatIcon, NgFor]
})
export class ImagePresetsComponent implements OnInit {
  @Output() presetEvent = new EventEmitter<string>();

  public images_presets = image_presets;
  constructor(public uiservice:UIControlService) {
  }

  ngOnInit(): void {
  }
  loadSelectedImage(image:string){
    this.uiservice.toggleImagePreset()
    this.presetEvent.emit(image);
  }

}
