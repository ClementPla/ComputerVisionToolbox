import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-labelled-sliders',
  templateUrl: './labelled-sliders.component.html',
  styleUrls: ['./labelled-sliders.component.scss']
})
export class LabelledSlidersComponent implements OnInit {

  @Input() min:number=1;
  @Input() max:number=100;
  @Input() step:number=1;
  @Input() value:number|null=25;
  @Input() title:string='';
  @Output() change = new EventEmitter<MatSliderChange>();
  @Output() input = new EventEmitter<MatSliderChange>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(event:MatSliderChange){
    this.change.emit(event)
  }
  onInput(event:MatSliderChange){
    this.input.emit(event)
  }

}
