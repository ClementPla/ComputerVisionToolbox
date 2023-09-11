import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightsLossComponent } from './weights-loss.component';

describe('WeightsLossComponent', () => {
  let component: WeightsLossComponent;
  let fixture: ComponentFixture<WeightsLossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeightsLossComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeightsLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
