import { Directive, Input} from '@angular/core';

@Directive({
    standalone: false
})
export class TutorialClass {

  @Input() leftDrawer:boolean=true
  @Input() rightDrawer:boolean=true


}
