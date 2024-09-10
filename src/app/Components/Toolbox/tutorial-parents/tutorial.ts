import { Directive, Input} from '@angular/core';

@Directive({
})
export class TutorialClass {

  @Input() leftDrawer:boolean=true
  @Input() rightDrawer:boolean=true


}
