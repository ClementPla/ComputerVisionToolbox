import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptiveFieldTutorialComponent } from './receptive-field-tutorial.component';

describe('ReceptiveFieldTutorialComponent', () => {
  let component: ReceptiveFieldTutorialComponent;
  let fixture: ComponentFixture<ReceptiveFieldTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceptiveFieldTutorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptiveFieldTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
