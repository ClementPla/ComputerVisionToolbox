import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectralFilteringComponent } from './spectral-filtering.component';

describe('SpectralFilteringComponent', () => {
  let component: SpectralFilteringComponent;
  let fixture: ComponentFixture<SpectralFilteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpectralFilteringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpectralFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
