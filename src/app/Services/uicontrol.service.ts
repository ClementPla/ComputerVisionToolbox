import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UIControlService {

  showImagePreset:boolean = false;

  constructor() { }

  toggleImagePreset(){
    this.showImagePreset = !this.showImagePreset;
  }

}
