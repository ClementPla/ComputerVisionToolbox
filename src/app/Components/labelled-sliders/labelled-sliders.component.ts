import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-labelled-sliders',
  templateUrl: './labelled-sliders.component.html',
  styleUrls: ['./labelled-sliders.component.scss']
})
export class LabelledSlidersComponent implements OnInit, AfterViewInit {

  @Input() min:number=1;
  @Input() max:number=100;
  @Input() step:number=1;
  @Input() value:number|null=15;
  @Input() title:string='';
  @Output() change = new EventEmitter<MatSliderChange>();
  @Output() input = new EventEmitter<MatSliderChange>();
  @Output() valueChange = new EventEmitter<number>();

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.cdr.detectChanges()
  }
  onChange(event:MatSliderChange){
    if(event.value != null)
      this.valueChange.emit(event.value)
  }
  onInput(event:MatSliderChange){
    this.input.emit(event)
  }
}
