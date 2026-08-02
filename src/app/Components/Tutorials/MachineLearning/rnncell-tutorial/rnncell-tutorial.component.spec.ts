import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RNNCellTutorialComponent } from './rnncell-tutorial.component';

describe('RNNCellTutorialComponent', () => {
  let component: RNNCellTutorialComponent;
  let fixture: ComponentFixture<RNNCellTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RNNCellTutorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RNNCellTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
