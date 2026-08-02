import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BayesianRegressionComponent } from './bayesian-regression.component';

describe('BayesianRegressionComponent', () => {
  let component: BayesianRegressionComponent;
  let fixture: ComponentFixture<BayesianRegressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BayesianRegressionComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(BayesianRegressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
