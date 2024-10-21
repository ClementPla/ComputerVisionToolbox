import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tutorial-template',
  templateUrl: './tutorial-template.component.html',
  styleUrls: ['./tutorial-template.component.scss']
})
export class TutorialTemplateComponent {

  @Input() leftDrawer:boolean=true
  @Input() rightDrawer:boolean=true

  constructor() { }


}
