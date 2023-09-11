import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { UIControlService } from 'src/app/Services/uicontrol.service';
import images_presets from 'src/app/Components/Presets/image-presets/local_db/list_images.json';

@Component({
  selector: 'app-image-presets',
  templateUrl: './image-presets.component.html',
  styleUrls: ['./image-presets.component.scss']
})
export class ImagePresetsComponent implements OnInit {
  @Output() presetEvent = new EventEmitter<string>();

  public images_presets = images_presets;
  constructor(public uiservice:UIControlService) {
  }

  ngOnInit(): void {
  }
  loadSelectedImage(image:string){
    this.uiservice.toggleImagePreset()
    this.presetEvent.emit(image);
  }

}
