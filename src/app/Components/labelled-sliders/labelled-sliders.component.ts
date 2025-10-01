import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-labelled-sliders',
  templateUrl: './labelled-sliders.component.html',
  styleUrls: ['./labelled-sliders.component.scss'],
  standalone: false,
})
export class LabelledSlidersComponent implements OnInit {
  @Input() min: number = 1;
  @Input() max: number = 100;
  @Input() step: number = 1;
  @Input() value: number | null = 15;
  @Input() title: string = '';
  @Output() valueChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  onChange(event: any) {
    this.valueChange.emit(event);
  }
}
