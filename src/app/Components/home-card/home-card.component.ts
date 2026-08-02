import { Component, Input, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'app-home-card',
    templateUrl: './home-card.component.html',
    styleUrls: ['./home-card.component.scss'],
    imports: [NgStyle]
})
export class HomeCardComponent implements OnInit {
  @Input() title='';
  @Input() imgURL=''

  constructor() { }

  ngOnInit(): void {
  }

}
