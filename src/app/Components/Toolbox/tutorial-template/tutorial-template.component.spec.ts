import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialTemplateComponent } from './tutorial-template.component';

describe('TutorialTemplateComponent', () => {
  let component: TutorialTemplateComponent;
  let fixture: ComponentFixture<TutorialTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [TutorialTemplateComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(TutorialTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
