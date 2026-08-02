import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoregressiveTutorialComponent } from './autoregressive-tutorial.component';

describe('AutoregressiveTutorialComponent', () => {
  let component: AutoregressiveTutorialComponent;
  let fixture: ComponentFixture<AutoregressiveTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutoregressiveTutorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoregressiveTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
