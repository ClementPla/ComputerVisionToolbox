import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { UIControlService } from '../../../Services/uicontrol.service';

@Component({
  selector: 'app-loading-buttons',
  templateUrl: './loading-buttons.component.html',
  styleUrls: ['./loading-buttons.component.scss']
})
export class LoadingButtonsComponent implements OnInit {
  @Output() loadingEvent = new EventEmitter<File>();
  @Output() showPresetEvent = new EventEmitter();
  constructor(private uiservice:UIControlService) { }

  ngOnInit(): void {
  }

  loading(event:any) {
    if (event.target.files && event.target.files[0]) {

      this.loadingEvent.emit(event.target.files[0]);
    }
  }

  toggleShowImagePreset(){
    this.uiservice.toggleImagePreset()
  }
}
