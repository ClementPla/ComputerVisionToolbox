import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientDescentComponent } from './gradient-descent.component';

describe('GradientDescentComponent', () => {
  let component: GradientDescentComponent;
  let fixture: ComponentFixture<GradientDescentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [GradientDescentComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(GradientDescentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
