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
  @Input() value:number|null=15;
  @Input() title:string='';
  @Output() change = new EventEmitter<MatSliderChange>();
  @Output() input = new EventEmitter<MatSliderChange>();
  @Output() valueChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }
  onChange(event:MatSliderChange){
    if(this.value)
      this.valueChange.emit(this.value)
  }
}
