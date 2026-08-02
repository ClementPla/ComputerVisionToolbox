import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DensityEstimationComponent } from './density-estimation.component';

describe('DensityEstimationComponent', () => {
  let component: DensityEstimationComponent;
  let fixture: ComponentFixture<DensityEstimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DensityEstimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DensityEstimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
