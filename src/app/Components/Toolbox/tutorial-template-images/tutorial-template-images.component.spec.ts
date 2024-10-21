import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialTemplateImagesComponent } from './tutorial-template-images.component';

describe('TutorialTemplateImagesComponent', () => {
  let component: TutorialTemplateImagesComponent;
  let fixture: ComponentFixture<TutorialTemplateImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [TutorialTemplateImagesComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(TutorialTemplateImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
