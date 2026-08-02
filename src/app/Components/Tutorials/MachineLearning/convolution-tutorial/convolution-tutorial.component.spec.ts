import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvolutionTutorialComponent } from './convolution-tutorial.component';

describe('ConvolutionTutorialComponent', () => {
  let component: ConvolutionTutorialComponent;
  let fixture: ComponentFixture<ConvolutionTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ConvolutionTutorialComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ConvolutionTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
