import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimizerComparisonComponent } from './optimizer-comparison.component';

describe('OptimizerComparisonComponent', () => {
  let component: OptimizerComparisonComponent;
  let fixture: ComponentFixture<OptimizerComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [OptimizerComparisonComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(OptimizerComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
