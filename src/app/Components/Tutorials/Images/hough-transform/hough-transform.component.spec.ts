import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoughTransformComponent } from './hough-transform.component';

describe('HoughTransformComponent', () => {
  let component: HoughTransformComponent;
  let fixture: ComponentFixture<HoughTransformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [HoughTransformComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(HoughTransformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
