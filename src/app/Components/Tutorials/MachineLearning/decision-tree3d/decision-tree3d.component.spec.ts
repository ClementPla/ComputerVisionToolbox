import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionTree3dComponent } from './decision-tree3d.component';

describe('DecisionTree3dComponent', () => {
  let component: DecisionTree3dComponent;
  let fixture: ComponentFixture<DecisionTree3dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DecisionTree3dComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(DecisionTree3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
