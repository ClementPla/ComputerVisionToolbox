import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSpacesComponent } from './color-spaces.component';

describe('ColorSpacesComponent', () => {
  let component: ColorSpacesComponent;
  let fixture: ComponentFixture<ColorSpacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ColorSpacesComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
