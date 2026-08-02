import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformerTutorialComponent } from './transformer-tutorial.component';

describe('TransformerTutorialComponent', () => {
  let component: TransformerTutorialComponent;
  let fixture: ComponentFixture<TransformerTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransformerTutorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransformerTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
