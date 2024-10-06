import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastFourierTransformComponent } from './fast-fourier-transform.component';

describe('FastFourierTransformComponent', () => {
  let component: FastFourierTransformComponent;
  let fixture: ComponentFixture<FastFourierTransformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [FastFourierTransformComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FastFourierTransformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
