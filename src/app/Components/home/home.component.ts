import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeCardComponent } from '../home-card/home-card.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [RouterLink, HomeCardComponent],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
