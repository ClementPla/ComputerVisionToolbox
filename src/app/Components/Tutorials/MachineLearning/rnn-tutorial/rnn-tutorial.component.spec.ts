import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RnnTutorialComponent } from './rnn-tutorial.component';

describe('RnnTutorialComponent', () => {
  let component: RnnTutorialComponent;
  let fixture: ComponentFixture<RnnTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RnnTutorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RnnTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
