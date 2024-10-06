import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePresetsComponent } from './image-presets.component';

describe('ImagePresetsComponent', () => {
  let component: ImagePresetsComponent;
  let fixture: ComponentFixture<ImagePresetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ImagePresetsComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ImagePresetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
