import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelledSlidersComponent } from './labelled-sliders.component';

describe('LabelledSlidersComponent', () => {
  let component: LabelledSlidersComponent;
  let fixture: ComponentFixture<LabelledSlidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [LabelledSlidersComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelledSlidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
