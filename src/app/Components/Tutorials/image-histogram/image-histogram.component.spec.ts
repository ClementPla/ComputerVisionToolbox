import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageHistogramComponent } from './image-histogram.component';

describe('ImageHistogramComponent', () => {
  let component: ImageHistogramComponent;
  let fixture: ComponentFixture<ImageHistogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageHistogramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageHistogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
