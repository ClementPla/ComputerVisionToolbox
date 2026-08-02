import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalizationTutorialComponent } from './normalization-tutorial.component';

describe('NormalizationTutorialComponent', () => {
  let component: NormalizationTutorialComponent;
  let fixture: ComponentFixture<NormalizationTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [NormalizationTutorialComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(NormalizationTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
